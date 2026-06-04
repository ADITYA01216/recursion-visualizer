export default function GridView({ step, boardSize, problemType }) {
  const size = boardSize || 4;
  const board = step?.boardState;
  const isMaze = problemType === 'maze';

  if (!board || !Array.isArray(board)) {
    return (
      <div className="gv-empty">
        <div className="gv-empty-icon">{isMaze ? '🧩' : '♛'}</div>
        <p className="gv-empty-text">Board will appear here</p>
      </div>
    );
  }

  const typeColors = {
    call: '#3b82f6', base_case: '#16a34a', return: '#ca8a04',
    backtrack: '#dc2626', explore: '#6366f1', prune: '#db2777',
  };
  const borderColor = typeColors[step?.type] || '#e2e8f0';

  /* ── cell sizing based on board size ── */
  const cellPx = size <= 4 ? 64 : size <= 6 ? 52 : size <= 8 ? 42 : 34;

  /* ── Maze cell ── */
  function mazeCellStyle(cell) {
    switch (Number(cell)) {
      case 0: return { bg: '#1e293b', emoji: '', border: '#334155', glow: false };
      case 1: return { bg: '#f1f5f9', emoji: '', border: '#e2e8f0', glow: false };
      case 2: return { bg: '#fef08a', emoji: '🐀', border: '#eab308', glow: true };
      case 3: return { bg: '#bbf7d0', emoji: '✓', border: '#16a34a', glow: false };
      default: return { bg: '#f1f5f9', emoji: cell, border: '#e2e8f0', glow: false };
    }
  }

  /* ── N-Queens cell ── */
  function queenCellStyle(cell, ri, ci) {
    const isQ = cell === 'Q' || cell === 'q';
    const dark = (ri + ci) % 2 === 1;
    return {
      bg: isQ ? (step?.type === 'backtrack' ? '#fecaca' : '#bbf7d0') : dark ? '#94a3b8' : '#f1f5f9',
      emoji: isQ ? '♛' : '',
      border: isQ ? (step?.type === 'backtrack' ? '#dc2626' : '#16a34a') : 'transparent',
      glow: isQ,
    };
  }

  /* ── Generic ── */
  function genericCellStyle(cell) {
    return { bg: '#f1f5f9', emoji: cell, border: '#e2e8f0', glow: false };
  }

  return (
    <div className="gv-wrapper">

      {/* Action banner */}
      {step?.currentAction && (
        <div className="gv-action" style={{ borderLeftColor: borderColor }}>
          {step.currentAction}
        </div>
      )}

      {/* Grid */}
      <div className="gv-board" style={{
        gridTemplateColumns: `repeat(${size}, ${cellPx}px)`,
        borderColor: borderColor,
        boxShadow: `0 0 0 4px ${borderColor}22, 0 8px 24px rgba(0,0,0,0.08)`,
      }}>
        {board.map((row, ri) =>
          Array.isArray(row) ? row.map((cell, ci) => {
            const cs = isMaze ? mazeCellStyle(cell)
              : problemType === 'nqueens' ? queenCellStyle(cell, ri, ci)
              : genericCellStyle(cell);

            return (
              <div key={`${ri}-${ci}`} className={`gv-cell ${cs.glow ? 'gv-cell-glow' : ''}`}
                style={{
                  width: cellPx, height: cellPx,
                  background: cs.bg, borderColor: cs.border,
                  fontSize: cellPx <= 36 ? 16 : cellPx <= 46 ? 20 : 28,
                  color: isMaze && Number(cell) === 3 ? '#16a34a' : undefined,
                  fontWeight: isMaze && Number(cell) === 3 ? 700 : undefined,
                }}>
                {cs.emoji}
                {ci === 0 && <span className="gv-row-label">{ri}</span>}
              </div>
            );
          }) : null
        )}
      </div>

      {/* Column labels */}
      <div className="gv-col-labels" style={{ gridTemplateColumns: `repeat(${size}, ${cellPx}px)` }}>
        {Array.from({ length: size }).map((_, i) => (
          <div key={i} className="gv-col-label">{i}</div>
        ))}
      </div>

      {/* Legend */}
      <div className="gv-legend">
        {isMaze ? <>
          <span>⬛ Wall</span><span>⬜ Open</span><span>🐀 Current</span>
          <span style={{ color: '#16a34a' }}>✓ Path</span>
        </> : problemType === 'nqueens' ? <>
          <span>♛ = Queen</span>
          <span style={{ color: '#dc2626' }}>♛ = Backtrack</span>
          <span style={{ color: '#16a34a' }}>♛ = Valid</span>
        </> : <span>Grid values shown as-is</span>}
      </div>

      {/* Step type pill */}
      {step?.type === 'backtrack' && (
        <div className="gv-pill gv-pill-back">
          ↩ Backtracking — {isMaze ? 'dead end, undoing move' : 'invalid placement, removing queen'}
        </div>
      )}
      {step?.type === 'base_case' && (
        <div className="gv-pill gv-pill-ok">
          ✓ {isMaze ? 'Destination reached! Path found'
            : problemType === 'nqueens' ? `All ${size} queens placed safely!`
            : 'Base case reached!'}
        </div>
      )}
    </div>
  );
}