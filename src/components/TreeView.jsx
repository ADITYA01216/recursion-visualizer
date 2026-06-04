import { useEffect, useRef, useMemo, useState, useCallback } from 'react';

/* ─── Visual constants ─── */
const R    = 44;       // node radius — BIG like VisuAlgo
const HGAP = 100;      // horizontal gap between siblings
const VGAP = 110;      // vertical gap between levels
const PAD  = 60;       // canvas padding

/* ─── Colors per step type ─── */
const C = {
  call:      { fill:'#dbeafe', stroke:'#3b82f6', text:'#1e40af', glow:'59,130,246'  },
  base_case: { fill:'#dcfce7', stroke:'#16a34a', text:'#14532d', glow:'22,163,74'   },
  return:    { fill:'#fef9c3', stroke:'#ca8a04', text:'#713f12', glow:'202,138,4'   },
  backtrack: { fill:'#fee2e2', stroke:'#dc2626', text:'#7f1d1d', glow:'220,38,38'   },
  explore:   { fill:'#ede9fe', stroke:'#7c3aed', text:'#4c1d95', glow:'124,58,237'  },
  prune:     { fill:'#fce7f3', stroke:'#db2777', text:'#831843', glow:'219,39,119'  },
  memo:      { fill:'#f0f9ff', stroke:'#0284c7', text:'#0c4a6e', glow:'2,132,199'   },
  current:   { fill:'#bbf7d0', stroke:'#16a34a', text:'#052e16', glow:'22,163,74'   },
};

/* ─── Build tree layout from ONLY visited nodes ─── */
function buildVisibleLayout(steps, upTo) {
  const nodeMap = {};
  const children = {};
  const order = [];

  // Only process steps up to current
  for (let i = 0; i <= upTo && i < steps.length; i++) {
    const s = steps[i];
    if (!nodeMap[s.nodeId]) {
      nodeMap[s.nodeId] = {
        id: s.nodeId,
        parentId: s.parentId || null,
        label: s.label || s.nodeId,
        depth: s.depth ?? 0,
      };
      order.push(s.nodeId);
      if (!children[s.nodeId]) children[s.nodeId] = [];
      if (s.parentId) {
        if (!children[s.parentId]) children[s.parentId] = [];
        if (!children[s.parentId].includes(s.nodeId)) {
          children[s.parentId].push(s.nodeId);
        }
      }
    }
  }

  // Position with compact layout
  const pos = {};
  let leafIdx = 0;

  function place(id) {
    const ch = children[id] || [];
    const visibleChildren = ch.filter(c => nodeMap[c]);
    if (!visibleChildren.length) {
      pos[id] = { x: leafIdx * HGAP + PAD, y: (nodeMap[id]?.depth || 0) * VGAP + PAD };
      leafIdx++;
      return;
    }
    visibleChildren.forEach(place);
    const xs = visibleChildren.map(c => pos[c]?.x || 0);
    pos[id] = {
      x: (Math.min(...xs) + Math.max(...xs)) / 2,
      y: (nodeMap[id]?.depth || 0) * VGAP + PAD,
    };
  }

  const root = order.find(id => !nodeMap[id].parentId);
  if (root) place(root);

  // Handle any orphan nodes (parentId not yet visible)
  order.forEach(id => {
    if (!pos[id]) {
      pos[id] = { x: leafIdx * HGAP + PAD, y: (nodeMap[id]?.depth || 0) * VGAP + PAD };
      leafIdx++;
    }
  });

  const allX = Object.values(pos).map(p => p.x);
  const allY = Object.values(pos).map(p => p.y);

  return {
    nodeMap, children, pos, order,
    w: (allX.length ? Math.max(...allX) : 200) + PAD + R,
    h: (allY.length ? Math.max(...allY) : 200) + PAD + R,
  };
}

/* ─── Get latest status for each node ─── */
function getStatuses(steps, idx) {
  const m = {};
  for (let i = 0; i <= idx && i < steps.length; i++) {
    m[steps[i].nodeId] = steps[i].type;
  }
  // Mark current
  if (idx >= 0 && idx < steps.length) {
    m[steps[idx].nodeId] = 'current';
  }
  return m;
}

/* ─── Detect new node at this step ─── */
function getNewNode(steps, idx) {
  if (idx < 0 || idx >= steps.length) return null;
  const seen = new Set();
  for (let i = 0; i < idx; i++) seen.add(steps[i].nodeId);
  return seen.has(steps[idx].nodeId) ? null : steps[idx].nodeId;
}

/* ═══════ COMPONENT ═══════ */
export default function TreeView({ steps, currentStep }) {
  const boxRef = useRef(null);
  const [cam, setCam] = useState({ x: 0, y: 0, s: 1 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ mx: 0, my: 0, cx: 0, cy: 0 });

  // Build layout from only visited nodes — tree GROWS as you step
  const layout  = useMemo(() => steps?.length ? buildVisibleLayout(steps, currentStep) : null, [steps, currentStep]);
  const statuses = useMemo(() => steps ? getStatuses(steps, currentStep) : {}, [steps, currentStep]);
  const newNodeId = useMemo(() => steps ? getNewNode(steps, currentStep) : null, [steps, currentStep]);

  /* ── Center on current node ── */
  useEffect(() => {
    if (!layout || !steps?.[currentStep] || !boxRef.current) return;
    const p = layout.pos[steps[currentStep].nodeId];
    if (!p) return;
    const el = boxRef.current;
    const targetX = el.clientWidth / 2 - p.x * cam.s;
    const targetY = el.clientHeight / 2 - p.y * cam.s;
    setCam(prev => ({ ...prev, x: targetX, y: targetY }));
  }, [currentStep, layout, steps]);

  /* ── Fit to screen ── */
  const fitScreen = useCallback(() => {
    if (!layout || !boxRef.current) return;
    const el = boxRef.current;
    const sx = (el.clientWidth  - 40) / layout.w;
    const sy = (el.clientHeight - 40) / layout.h;
    const ns = Math.max(0.5, Math.min(sx, sy, 1.2));
    setCam({
      s: ns,
      x: (el.clientWidth  - layout.w * ns) / 2,
      y: (el.clientHeight - layout.h * ns) / 2,
    });
  }, [layout]);

  // Fit on first load or when layout changes significantly
  useEffect(() => {
    if (layout) fitScreen();
  }, [steps]); // Only re-fit when new problem loaded, not every step

  /* ── Mouse wheel zoom ── */
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const handler = (e) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      setCam(prev => {
        const ns = Math.max(0.2, Math.min(3, prev.s * factor));
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        return {
          s: ns,
          x: mx - (mx - prev.x) * (ns / prev.s),
          y: my - (my - prev.y) * (ns / prev.s),
        };
      });
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  /* ── Pan handlers ── */
  const onDown = (e) => {
    if (e.button !== 0) return;
    setDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, cx: cam.x, cy: cam.y };
  };
  const onMove = (e) => {
    if (!dragging) return;
    setCam(prev => ({
      ...prev,
      x: dragStart.current.cx + (e.clientX - dragStart.current.mx),
      y: dragStart.current.cy + (e.clientY - dragStart.current.my),
    }));
  };
  const onUp = () => setDragging(false);

  /* ── Empty state ── */
  if (!layout || !layout.order.length) return (
    <div className="tv-empty">
      <div className="tv-empty-icon">🌳</div>
      <p className="tv-empty-text">Recursion tree will appear here</p>
      <p className="tv-empty-hint">Select a problem or paste code to start</p>
    </div>
  );

  const { nodeMap, children, pos, order } = layout;

  /* ── Render edges ── */
  const edgeElements = [];
  order.forEach(id => {
    const p = pos[id];
    if (!p) return;
    (children[id] || []).forEach(cid => {
      if (!pos[cid]) return;
      const cp = pos[cid];
      const childStatus = statuses[cid] || 'call';
      const isCurrent = childStatus === 'current';
      const isNew = cid === newNodeId;
      const edgeColor = C[childStatus]?.stroke || '#64748b';
      // Curved path
      const midY = (p.y + R + cp.y - R) / 2;
      edgeElements.push(
        <path
          key={`e-${id}-${cid}`}
          d={`M${p.x},${p.y + R} C${p.x},${midY} ${cp.x},${midY} ${cp.x},${cp.y - R}`}
          fill="none"
          stroke={edgeColor}
          strokeWidth={isCurrent ? 4.5 : 3.5}
          opacity={isCurrent ? 1 : 0.75}
          className={isNew ? 'tv-edge-enter' : ''}
          pathLength="1"
        />
      );
    });
  });

  /* ── Render nodes ── */
  const nodeElements = [];
  order.forEach(id => {
    const p = pos[id];
    if (!p) return;
    const st = statuses[id] || 'call';
    const col = C[st] || C.call;
    const isCurrent = st === 'current';
    const isNew = id === newNodeId;
    const label = nodeMap[id].label;
    const shortLabel = label.length > 12 ? label.slice(0, 11) + '…' : label;
    const fontSize = shortLabel.length > 9 ? 11 : shortLabel.length > 6 ? 12.5 : 14;

    nodeElements.push(
      <g key={id} transform={`translate(${p.x},${p.y})`}
         className={`tv-node ${isNew ? 'tv-node-enter' : ''} ${isCurrent ? 'tv-node-cur' : ''}`}>

        {/* Glow rings for current node */}
        {isCurrent && <>
          <circle r={R + 20} fill="none" stroke={`rgba(${col.glow},0.1)`} strokeWidth={2} className="tv-pulse" />
          <circle r={R + 10} fill="none" stroke={`rgba(${col.glow},0.25)`} strokeWidth={2} />
        </>}

        {/* Main circle */}
        <circle
          r={R}
          fill={col.fill}
          stroke={col.stroke}
          strokeWidth={isCurrent ? 3.5 : 2.5}
          style={{
            filter: isCurrent ? `drop-shadow(0 0 12px rgba(${col.glow},0.5))` : `drop-shadow(0 2px 4px rgba(0,0,0,0.1))`,
            transition: 'fill .35s, stroke .35s, filter .35s',
          }}
        />

        {/* Label text */}
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fill={col.text}
          fontSize={fontSize}
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="700"
          style={{ pointerEvents: 'none' }}
        >
          {shortLabel}
        </text>

        {/* "NOW" badge on current node */}
        {isCurrent && (
          <g>
            <rect x={-26} y={R + 8} width={52} height={20} rx={10} fill="#16a34a" />
            <text textAnchor="middle" y={R + 21} fill="#fff" fontSize={10}
              fontFamily="'JetBrains Mono', monospace" fontWeight="800">▶ NOW</text>
          </g>
        )}

        {/* Status micro-label for visited non-current nodes */}
        {!isCurrent && (
          <text textAnchor="middle" y={R + 18} fill={col.stroke}
            fontSize={9} fontFamily="monospace" fontWeight="600" opacity={0.8}>
            {st === 'base_case' ? '✓ base' : st === 'return' ? '↑ return' :
             st === 'backtrack' ? '↩ back' : st === 'prune' ? '✂ prune' : ''}
          </text>
        )}
      </g>
    );
  });

  return (
    <div className="tv-canvas" ref={boxRef}
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}>

      {/* Controls */}
      <div className="tv-controls">
        <button onClick={() => setCam(p => ({ ...p, s: Math.min(3, p.s * 1.3) }))} title="Zoom in">+</button>
        <button onClick={() => setCam(p => ({ ...p, s: Math.max(0.2, p.s * 0.75) }))} title="Zoom out">−</button>
        <button onClick={fitScreen} title="Fit to screen">⊞</button>
      </div>

      <svg width="100%" height="100%" style={{ display: 'block' }}>
        <g transform={`translate(${cam.x},${cam.y}) scale(${cam.s})`}>
          {edgeElements}
          {nodeElements}
        </g>
      </svg>

      <div className="tv-zoom-badge">{Math.round(cam.s * 100)}%</div>
    </div>
  );
}