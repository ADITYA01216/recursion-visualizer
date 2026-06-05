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

/* ─── Helper to unify call and return steps of the same recursion node ─── */
function getBaseId(id) {
  if (!id) return null;
  return id.endsWith('r') ? id.slice(0, -1) : id;
}

/* ─── Build stable tree layout from ALL steps ─── */
function buildFullLayout(steps) {
  if (!steps || !steps.length) return null;
  const nodeMap = {};
  const children = {};
  const order = [];

  // Process ALL steps to build the complete stable tree coordinates
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    const nodeId = getBaseId(s.nodeId);
    const parentId = getBaseId(s.parentId);

    if (!nodeMap[nodeId]) {
      nodeMap[nodeId] = {
        id: nodeId,
        parentId: parentId || null,
        label: s.label || nodeId,
        depth: s.depth ?? 0,
      };
      order.push(nodeId);
      if (!children[nodeId]) children[nodeId] = [];
      if (parentId) {
        if (!children[parentId]) children[parentId] = [];
        if (!children[parentId].includes(nodeId)) {
          children[parentId].push(nodeId);
        }
      }
    }
  }

  // Position with compact layout (classical tree positioning)
  const pos = {};
  let leafIdx = 0;

  function place(id) {
    const ch = children[id] || [];
    if (!ch.length) {
      pos[id] = { x: leafIdx * HGAP + PAD, y: (nodeMap[id]?.depth || 0) * VGAP + PAD };
      leafIdx++;
      return;
    }
    ch.forEach(place);
    const xs = ch.map(c => pos[c]?.x || 0);
    pos[id] = {
      x: (Math.min(...xs) + Math.max(...xs)) / 2,
      y: (nodeMap[id]?.depth || 0) * VGAP + PAD,
    };
  }

  const root = order.find(id => !nodeMap[id].parentId);
  if (root) place(root);

  // Handle any orphan nodes
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
    const baseId = getBaseId(steps[i].nodeId);
    m[baseId] = steps[i].type;
  }
  // Mark current
  if (idx >= 0 && idx < steps.length) {
    const activeId = getBaseId(steps[idx].nodeId);
    m[activeId] = 'current';
  }
  return m;
}

/* ─── Detect new node at this step ─── */
function getNewNode(steps, idx) {
  if (idx < 0 || idx >= steps.length) return null;
  const seen = new Set();
  for (let i = 0; i < idx; i++) seen.add(getBaseId(steps[i].nodeId));
  const activeId = getBaseId(steps[idx].nodeId);
  return seen.has(activeId) ? null : activeId;
}

/* ═══════ COMPONENT ═══════ */
export default function TreeView({ steps, currentStep }) {
  const boxRef = useRef(null);
  const [cam, setCam] = useState({ x: 0, y: 0, s: 1 });
  const [dragging, setDragging] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const dragStart = useRef({ mx: 0, my: 0, cx: 0, cy: 0 });

  // Build full stable layout once for the entire trace
  const layout = useMemo(() => steps?.length ? buildFullLayout(steps) : null, [steps]);
  const statuses = useMemo(() => steps ? getStatuses(steps, currentStep) : {}, [steps, currentStep]);
  const newNodeId = useMemo(() => steps ? getNewNode(steps, currentStep) : null, [steps, currentStep]);

  // Compute set of nodes visited up to currentStep
  const visitedNodes = useMemo(() => {
    const set = new Set();
    if (!steps) return set;
    for (let i = 0; i <= currentStep && i < steps.length; i++) {
      set.add(getBaseId(steps[i].nodeId));
    }
    return set;
  }, [steps, currentStep]);

  // Find latest step info for hovered node
  const hoveredStep = useMemo(() => {
    if (!hoveredNode || !steps) return null;
    for (let i = currentStep; i >= 0; i--) {
      if (getBaseId(steps[i].nodeId) === hoveredNode) return steps[i];
    }
    return null;
  }, [hoveredNode, steps, currentStep]);

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
  }, [steps, layout]); // Only re-fit when new problem loaded or layout computed, not every step

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
    if (!visitedNodes.has(id)) return;
    const p = pos[id];
    if (!p) return;
    (children[id] || []).forEach(cid => {
      if (!visitedNodes.has(cid) || !pos[cid]) return;
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
    if (!visitedNodes.has(id)) return;
    const p = pos[id];
    if (!p) return;
    const st = statuses[id] || 'call';
    const col = C[st] || C.call;
    const isCurrent = st === 'current';
    const isNew = id === newNodeId;

    // Retrieve label and dynamically add return value if available in steps up to current step
    let label = nodeMap[id].label;
    for (let i = currentStep; i >= 0; i--) {
      if (getBaseId(steps[i].nodeId) === id) {
        if ((steps[i].type === 'return' || steps[i].type === 'base_case') && steps[i].returnValue !== null && steps[i].returnValue !== undefined) {
          label = `${nodeMap[id].label} = ${JSON.stringify(steps[i].returnValue)}`;
        }
        break;
      }
    }

    const shortLabel = label.length > 12 ? label.slice(0, 11) + '…' : label;
    const fontSize = shortLabel.length > 9 ? 11 : shortLabel.length > 6 ? 12.5 : 14;

    nodeElements.push(
      <g key={id} transform={`translate(${p.x},${p.y})`}
         className={`tv-node ${isNew ? 'tv-node-enter' : ''} ${isCurrent ? 'tv-node-cur' : ''}`}
         onMouseEnter={() => setHoveredNode(id)}
         onMouseLeave={() => setHoveredNode(null)}
         style={{ cursor: 'pointer' }}>

         {/* Glow rings for current/hovered node */}
         {isCurrent ? (
           <>
             <circle r={R + 20} fill="none" stroke={`rgba(${col.glow},0.1)`} strokeWidth={2} className="tv-pulse" />
             <circle r={R + 10} fill="none" stroke={`rgba(${col.glow},0.25)`} strokeWidth={2} />
           </>
         ) : (
           hoveredNode === id && (
             <circle r={R + 8} fill="none" stroke={`rgba(${col.glow},0.35)`} strokeWidth={2.5} />
           )
         )}

        {/* Main circle */}
        <circle
          r={R}
          fill={col.fill}
          stroke={col.stroke}
          strokeWidth={isCurrent || hoveredNode === id ? 3.5 : 2.5}
          style={{
            transition: 'fill .35s, stroke .35s',
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

  const tooltipElement = (() => {
    if (!hoveredNode || !hoveredStep || !pos[hoveredNode]) return null;
    const p = pos[hoveredNode];
    const tx = p.x * cam.s + cam.x;
    const ty = p.y * cam.s + cam.y;

    const args = hoveredStep.variables || hoveredStep.args || {};
    const localVars = hoveredStep.localVars || {};
    const returnVal = hoveredStep.returnValue ?? hoveredStep.ret;
    const desc = hoveredStep.desc || '';
    const st = statuses[hoveredNode] || 'call';
    const col = C[st] || C.call;

    const argList = Object.entries(args);
    const varList = Object.entries(localVars);

    return (
      <div
        className="tv-tooltip"
        style={{
          left: `${tx}px`,
          top: `${ty - R * cam.s - 12}px`,
          borderLeft: `4px solid ${col.stroke}`,
        }}
      >
        <div className="tv-tooltip-header">
          <span className="tv-tooltip-title">{hoveredStep.label || hoveredNode}</span>
          <span className="tv-tooltip-badge" style={{ background: col.fill, color: col.text }}>
            {st.replace('_', ' ')}
          </span>
        </div>
        <div className="tv-tooltip-body">
          {argList.length > 0 && (
            <div className="tv-tooltip-section">
              <span className="tv-tooltip-section-title">Arguments:</span>
              <div className="tv-tooltip-vars">
                {argList.map(([k, v]) => (
                  <div key={k} className="tv-tooltip-var">
                    <span className="tv-var-name">{k}</span> = <span className="tv-var-val">{JSON.stringify(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {varList.length > 0 && (
            <div className="tv-tooltip-section">
              <span className="tv-tooltip-section-title">Locals:</span>
              <div className="tv-tooltip-vars">
                {varList.map(([k, v]) => (
                  <div key={k} className="tv-tooltip-var">
                    <span className="tv-var-name">{k}</span> = <span className="tv-var-val">{JSON.stringify(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {returnVal !== undefined && (
            <div className="tv-tooltip-section tv-tooltip-ret">
              <span className="tv-tooltip-section-title">Returns:</span>
              <span className="tv-ret-val">{JSON.stringify(returnVal)}</span>
            </div>
          )}
          {desc && <p className="tv-tooltip-desc">{desc}</p>}
        </div>
      </div>
    );
  })();

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
      {tooltipElement}
    </div>
  );
}