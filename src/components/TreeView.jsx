import { useEffect, useRef, useMemo } from 'react';

const NR = 30, HG = 180, VG = 140, PD = 100;

const TYPE_COLORS = {
  call:      {fill:'#dbeafe', stroke:'#3b82f6', text:'#1d4ed8'},
  base_case: {fill:'#dcfce7', stroke:'#22c55e', text:'#15803d'},
  return:    {fill:'#fef9c3', stroke:'#eab308', text:'#854d0e'},
  backtrack: {fill:'#fee2e2', stroke:'#ef4444', text:'#991b1b'},
  explore:   {fill:'#ede9fe', stroke:'#8b5cf6', text:'#5b21b6'},
  prune:     {fill:'#fce7f3', stroke:'#ec4899', text:'#9d174d'},
  current:   {fill:'#bbf7d0', stroke:'#16a34a', text:'#14532d'},
  pending: {fill:'#ffffff', stroke:'#94a3b8', text:'#64748b'},
};

function buildLayout(steps) {
  const nodes = {}, kids = {}, order = [];
  for (const s of steps) {
    if (!nodes[s.nodeId]) {
      nodes[s.nodeId] = { id: s.nodeId, parentId: s.parentId || null, label: s.label || s.nodeId, depth: s.depth || 0 };
      order.push(s.nodeId);
      if (!kids[s.nodeId]) kids[s.nodeId] = [];
      if (s.parentId) {
        if (!kids[s.parentId]) kids[s.parentId] = [];
        if (!kids[s.parentId].includes(s.nodeId)) kids[s.parentId].push(s.nodeId);
      }
    }
  }
  const pos = {}; let leaf = 0;
  function place(id) {
    const ch = kids[id] || [];
    if (!ch.length) { pos[id] = { x: leaf++ * HG + PD, y: nodes[id].depth * VG + PD }; return; }
    ch.forEach(place);
    const xs = ch.map(c => pos[c].x);
    pos[id] = { x: (xs[0] + xs[xs.length-1]) / 2, y: nodes[id].depth * VG + PD };
  }
  const root = order.find(id => !nodes[id].parentId);
  if (root) place(root);
  const allX = Object.values(pos).map(p => p.x);
  const allY = Object.values(pos).map(p => p.y);
  return { nodes, kids, pos, w: Math.max(...allX, 400) + PD + 60, h: Math.max(...allY, 300) + PD + 60 };
}

function getStatus(steps, idx) {
  const st = {};
  for (let i = 0; i <= idx && i < steps.length; i++) st[steps[i].nodeId] = steps[i].type;
  if (idx < steps.length) st[steps[idx].nodeId] = 'current';
  return st;
}

export default function TreeView({ steps, currentStep }) {
  const containerRef = useRef(null);
  const layout = useMemo(() => steps?.length ? buildLayout(steps) : null, [steps]);
  const status = useMemo(() => steps ? getStatus(steps, currentStep) : {}, [steps, currentStep]);

  useEffect(() => {
    if (!layout || !steps?.[currentStep] || !containerRef.current) return;
    const p = layout.pos[steps[currentStep].nodeId];
    if (!p) return;
    containerRef.current.scrollTo({ left: p.x - containerRef.current.clientWidth/2, top: p.y - containerRef.current.clientHeight/2, behavior: 'smooth' });
  }, [currentStep, layout, steps]);

  if (!layout) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',flexDirection:'column',gap:8,color:'#94a3b8'}}>
      <div style={{fontSize:32}}>🌳</div>
      <p style={{fontSize:14}}>Recursion tree will appear here</p>
    </div>
  );

  const { nodes, kids, pos, w, h } = layout;
  const edges = [], circles = [];

  Object.keys(nodes).forEach(id => {
    const p = pos[id]; if (!p) return;
    (kids[id] || []).forEach(cid => {
      const cp = pos[cid]; if (!cp) return;
      const visited = status[cid] && status[cid] !== 'pending';
      const isCurrent = status[cid] === 'current';
      edges.push(
        <line key={`e-${id}-${cid}`} x1={p.x} y1={p.y + NR} x2={cp.x} y2={cp.y - NR}
          stroke={isCurrent ? '#16a34a' : visited ? '#94a3b8' : '#e2e8f0'}
          strokeWidth={isCurrent ? 2.5 : visited ? 1.5 : 1}
          strokeDasharray={visited ? undefined : '5 5'}
        />
      );
    });

    const st = status[id] || 'pending';
    const c = TYPE_COLORS[st] || TYPE_COLORS.pending;
    const isCurrent = st === 'current';
    const label = nodes[id].label;
    const short = label.length > 10 ? label.slice(0, 9) + '…' : label;
    const fontSize = short.length > 7 ? 9 : short.length > 5 ? 10 : 11;

    circles.push(
      <g key={id} transform={`translate(${p.x},${p.y})`}>
        {isCurrent && (
          <>
            <circle r={NR + 12} fill="none" stroke="#16a34a" strokeWidth={1} opacity={0.2} className="pulse-ring" />
            <circle r={NR + 6} fill="none" stroke="#16a34a" strokeWidth={1.5} opacity={0.4} />
          </>
        )}
        <circle r={NR} fill={c.fill} stroke={c.stroke} strokeWidth={isCurrent ? 2.5 : 1.5}
          style={{filter: isCurrent ? 'drop-shadow(0 0 6px rgba(22,163,74,0.4))' : 'none', transition:'all 0.3s'}} />
        <text textAnchor="middle" dominantBaseline="central" fill={c.text}
          fontSize={fontSize} fontFamily="monospace" fontWeight="600">{short}</text>
        {isCurrent && (
          <text textAnchor="middle" dominantBaseline="central" fill="#16a34a"
            fontSize={8} fontFamily="monospace" y={NR + 14}>▼ now</text>
        )}
      </g>
    );
  });

  return (
    <div className="tree-container" ref={containerRef}>
      <svg width={w} height={h} style={{ display: 'block', minWidth: w, minHeight: h }}>
        {edges}
        {circles}
      </svg>
    </div>
  );
}