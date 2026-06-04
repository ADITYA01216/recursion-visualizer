import { useEffect, useRef, useMemo, useState, useCallback } from 'react';

/* ─── Layout constants ─── */
const NR   = 34;
const HGAP = 190;
const VGAP = 150;
const PAD  = 100;

/* ─── Node palette per step-type ─── */
const PALETTE = {
  call:      { fill:'#dbeafe', stroke:'#3b82f6', text:'#1d4ed8', g:'59,130,246'  },
  base_case: { fill:'#dcfce7', stroke:'#22c55e', text:'#15803d', g:'34,197,94'   },
  return:    { fill:'#fef9c3', stroke:'#eab308', text:'#854d0e', g:'234,179,8'   },
  backtrack: { fill:'#fee2e2', stroke:'#ef4444', text:'#991b1b', g:'239,68,68'   },
  explore:   { fill:'#ede9fe', stroke:'#8b5cf6', text:'#5b21b6', g:'139,92,246'  },
  prune:     { fill:'#fce7f3', stroke:'#ec4899', text:'#9d174d', g:'236,72,153'  },
  memo:      { fill:'#f1f5f9', stroke:'#94a3b8', text:'#475569', g:'148,163,184' },
  current:   { fill:'#bbf7d0', stroke:'#16a34a', text:'#14532d', g:'22,163,74'   },
  pending:   { fill:'#f8fafc', stroke:'#d1d5db', text:'#9ca3af', g:'209,213,219' },
};

/* ─── Tree layout builder ─── */
function buildLayout(steps) {
  const nodes = {}, kids = {}, order = [];
  for (const s of steps) {
    if (nodes[s.nodeId]) continue;
    nodes[s.nodeId] = { id: s.nodeId, pid: s.parentId || null, label: s.label || s.nodeId, depth: s.depth ?? 0 };
    order.push(s.nodeId);
    if (!kids[s.nodeId]) kids[s.nodeId] = [];
    if (s.parentId) {
      if (!kids[s.parentId]) kids[s.parentId] = [];
      if (!kids[s.parentId].includes(s.nodeId)) kids[s.parentId].push(s.nodeId);
    }
  }
  const pos = {};
  let leaf = 0;
  function place(id) {
    const ch = kids[id] || [];
    if (!ch.length) { pos[id] = { x: leaf++ * HGAP + PAD, y: nodes[id].depth * VGAP + PAD }; return; }
    ch.forEach(place);
    const xs = ch.map(c => pos[c].x);
    pos[id] = { x: (xs[0] + xs[xs.length - 1]) / 2, y: nodes[id].depth * VGAP + PAD };
  }
  const root = order.find(id => !nodes[id].pid);
  if (root) place(root);
  const ax = Object.values(pos).map(p => p.x);
  const ay = Object.values(pos).map(p => p.y);
  return { nodes, kids, pos, w: Math.max(...ax, 400) + PAD + 60, h: Math.max(...ay, 300) + PAD + 60 };
}

/* ─── Per-step status map ─── */
function statusMap(steps, idx) {
  const m = {};
  for (let i = 0; i <= idx && i < steps.length; i++) m[steps[i].nodeId] = steps[i].type;
  if (idx < steps.length) m[steps[idx].nodeId] = 'current';
  return m;
}

/* ─── Which nodes are brand-new at this step ─── */
function freshNodes(steps, idx) {
  const seen = new Set();
  for (let i = 0; i < idx && i < steps.length; i++) seen.add(steps[i].nodeId);
  const out = new Set();
  if (idx < steps.length && !seen.has(steps[idx].nodeId)) out.add(steps[idx].nodeId);
  return out;
}

/* ─── Component ─── */
export default function TreeView({ steps, currentStep }) {
  const boxRef = useRef(null);
  const [cam, setCam] = useState({ x: 0, y: 0, s: 1 });
  const [drag, setDrag] = useState(false);
  const anchor = useRef({ mx: 0, my: 0, cx: 0, cy: 0 });

  const layout  = useMemo(() => steps?.length ? buildLayout(steps) : null, [steps]);
  const status  = useMemo(() => steps ? statusMap(steps, currentStep) : {}, [steps, currentStep]);
  const newSet  = useMemo(() => steps ? freshNodes(steps, currentStep) : new Set(), [steps, currentStep]);

  /* ── auto-center on current node ── */
  useEffect(() => {
    if (!layout || !steps?.[currentStep] || !boxRef.current) return;
    const p = layout.pos[steps[currentStep].nodeId];
    if (!p) return;
    const el = boxRef.current;
    setCam(prev => ({
      ...prev,
      x: el.clientWidth  / 2 - p.x * prev.s,
      y: el.clientHeight / 2 - p.y * prev.s,
    }));
  }, [currentStep, layout, steps]);

  /* ── fit everything on first load ── */
  const fitScreen = useCallback(() => {
    if (!layout || !boxRef.current) return;
    const el = boxRef.current;
    const sx = (el.clientWidth  - 60) / layout.w;
    const sy = (el.clientHeight - 60) / layout.h;
    const ns = Math.min(sx, sy, 1.4);
    setCam({ s: ns, x: (el.clientWidth - layout.w * ns) / 2, y: (el.clientHeight - layout.h * ns) / 2 });
  }, [layout]);

  useEffect(() => { if (layout) fitScreen(); }, [layout]);

  /* ── zoom (mouse-wheel) ── */
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const handler = (e) => {
      e.preventDefault();
      const d = e.deltaY > 0 ? 0.9 : 1.1;
      setCam(p => {
        const ns = Math.max(0.15, Math.min(3.5, p.s * d));
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left, my = e.clientY - r.top;
        return { s: ns, x: mx - (mx - p.x) * (ns / p.s), y: my - (my - p.y) * (ns / p.s) };
      });
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  /* ── pan (mouse drag) ── */
  const onDown = (e) => { if (e.button !== 0) return; setDrag(true); anchor.current = { mx: e.clientX, my: e.clientY, cx: cam.x, cy: cam.y }; };
  const onMove = (e) => { if (!drag) return; setCam(p => ({ ...p, x: anchor.current.cx + (e.clientX - anchor.current.mx), y: anchor.current.cy + (e.clientY - anchor.current.my) })); };
  const onUp   = () => setDrag(false);

  /* ── empty state ── */
  if (!layout) return (
    <div className="tv-empty">
      <div className="tv-empty-icon">🌳</div>
      <p className="tv-empty-text">Recursion tree will appear here</p>
      <p className="tv-empty-hint">Select a problem or paste your code to start</p>
    </div>
  );

  const { nodes, kids, pos, w, h } = layout;

  /* ── edges ── */
  const edges = [];
  Object.keys(nodes).forEach(id => {
    const p = pos[id]; if (!p) return;
    (kids[id] || []).forEach(cid => {
      const cp = pos[cid]; if (!cp) return;
      const vis = status[cid] && status[cid] !== 'pending';
      const cur = status[cid] === 'current';
      const isNew = newSet.has(cid);
      const my = (p.y + NR + cp.y - NR) / 2;
      edges.push(
        <path
          key={`e-${id}-${cid}`}
          d={`M${p.x},${p.y + NR} C${p.x},${my} ${cp.x},${my} ${cp.x},${cp.y - NR}`}
          fill="none"
          stroke={cur ? '#16a34a' : vis ? '#94a3b8' : '#d1d5db'}
          strokeWidth={cur ? 3 : vis ? 2 : 1.2}
          strokeDasharray={vis ? 'none' : '6 4'}
          className={isNew ? 'tv-edge-enter' : ''}
          pathLength="1"
        />
      );
    });
  });

  /* ── nodes ── */
  const circles = [];
  Object.keys(nodes).forEach(id => {
    const p = pos[id]; if (!p) return;
    const st = status[id] || 'pending';
    const c  = PALETTE[st] || PALETTE.pending;
    const cur = st === 'current';
    const isNew = newSet.has(id);
    const lbl = nodes[id].label;
    const short = lbl.length > 13 ? lbl.slice(0, 12) + '…' : lbl;
    const fs = short.length > 9 ? 9 : short.length > 6 ? 10 : 11.5;

    circles.push(
      <g key={id} transform={`translate(${p.x},${p.y})`}
         className={`tv-node ${isNew ? 'tv-node-enter' : ''} ${cur ? 'tv-node-cur' : ''}`}>

        {/* animated glow rings */}
        {cur && <>
          <circle r={NR + 18} fill="none" stroke={`rgba(${c.g},0.12)`} strokeWidth={2} className="tv-pulse" />
          <circle r={NR + 10} fill="none" stroke={`rgba(${c.g},0.25)`} strokeWidth={2} />
        </>}

        {/* soft shadow */}
        <circle r={NR} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={4} />

        {/* main circle */}
        <circle r={NR} fill={c.fill} stroke={c.stroke}
          strokeWidth={cur ? 3 : 2}
          style={{ filter: cur ? `drop-shadow(0 0 10px rgba(${c.g},0.45))` : 'none',
                   transition: 'fill .4s, stroke .4s, filter .4s, stroke-width .3s' }} />

        {/* label */}
        <text textAnchor="middle" dominantBaseline="central" fill={c.text}
          fontSize={fs} fontFamily="'JetBrains Mono',monospace" fontWeight="700"
          style={{ transition: 'fill .4s', pointerEvents: 'none' }}>
          {short}
        </text>

        {/* "NOW" badge */}
        {cur && <g>
          <rect x={-22} y={NR + 6} width={44} height={18} rx={9} fill="#16a34a" />
          <text textAnchor="middle" y={NR + 18} fill="#fff" fontSize={9}
            fontFamily="monospace" fontWeight="800">▶ NOW</text>
        </g>}

        {/* step type micro-label for non-current visited nodes */}
        {!cur && st !== 'pending' && <text textAnchor="middle" y={NR + 16} fill={c.stroke}
          fontSize={8} fontFamily="monospace" fontWeight="600" opacity={0.7}>
          {st === 'base_case' ? '✓ base' : st === 'return' ? '↑ ret' : st === 'backtrack' ? '↩ back' : st === 'prune' ? '✂ cut' : ''}
        </text>}
      </g>
    );
  });

  return (
    <div className="tv-canvas" ref={boxRef}
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
      style={{ cursor: drag ? 'grabbing' : 'grab' }}>

      {/* zoom / fit controls */}
      <div className="tv-controls">
        <button onClick={() => setCam(p => ({ ...p, s: Math.min(3.5, p.s * 1.25) }))} title="Zoom in">+</button>
        <button onClick={() => setCam(p => ({ ...p, s: Math.max(0.15, p.s * 0.8) }))} title="Zoom out">−</button>
        <button onClick={fitScreen} title="Fit to screen">⊞</button>
      </div>

      <svg width="100%" height="100%" style={{ display: 'block' }}>
        <g transform={`translate(${cam.x},${cam.y}) scale(${cam.s})`}>
          {edges}
          {circles}
        </g>
      </svg>

      <div className="tv-zoom-badge">{Math.round(cam.s * 100)}%</div>
    </div>
  );
}