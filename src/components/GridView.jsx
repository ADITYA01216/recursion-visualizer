export default function GridView({ step, boardSize, problemType }) {
    const size = boardSize || 4;
    const board = step?.boardState;
    const isMaze = problemType === 'maze';
  
    if (!board || !Array.isArray(board)) {
      return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'#94a3b8',fontSize:14}}>
          Board state will appear here
        </div>
      );
    }
  
    const typeColors = {
      call:      '#3b82f6',
      base_case: '#16a34a',
      return:    '#ca8a04',
      backtrack: '#dc2626',
      explore:   '#6366f1',
      prune:     '#db2777',
    };
  
    const borderColor = typeColors[step?.type] || '#e2e8f0';

    // Maze cell colors: 0=wall, 1=open, 2=rat current, 3=correct path
    function getMazeCellStyle(cell) {
      switch (Number(cell)) {
        case 0: return { bg: '#1e293b', emoji: '', border: '#334155' };       // wall (dark)
        case 1: return { bg: '#f1f5f9', emoji: '', border: '#e2e8f0' };       // open path
        case 2: return { bg: '#fef08a', emoji: '🐀', border: '#eab308' };     // rat current
        case 3: return { bg: '#bbf7d0', emoji: '✓', border: '#16a34a' };      // correct path
        default: return { bg: '#f1f5f9', emoji: '', border: '#e2e8f0' };
      }
    }

    // N-Queens cell style
    function getQueensCellStyle(cell, ri, ci) {
      const isQueen = cell === 'Q' || cell === 'q';
      const isDark = (ri + ci) % 2 === 1;
      return {
        bg: isQueen
          ? (step?.type === 'backtrack' ? '#fecaca' : '#bbf7d0')
          : isDark ? '#94a3b8' : '#f1f5f9',
        emoji: isQueen ? '♛' : '',
        border: isQueen
          ? (step?.type === 'backtrack' ? '#dc2626' : '#16a34a')
          : 'transparent',
      };
    }
  
    return (
      <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        padding:20,
        gap:16
      }}>
        {/* Current action banner */}
        {step?.currentAction && (
          <div style={{
            padding:'8px 16px',
            background:'#1e293b',
            color:'#86efac',
            borderRadius:8,
            fontSize:13,
            fontFamily:'monospace',
            fontWeight:600,
            textAlign:'center',
            borderLeft:`4px solid ${borderColor}`,
            width:'100%',
            maxWidth:400,
            boxSizing:'border-box'
          }}>
            {step.currentAction}
          </div>
        )}
  
        {/* Grid */}
        <div style={{
          display:'inline-grid',
          gridTemplateColumns:`repeat(${size}, 1fr)`,
          gap:4,
          padding:16,
          background:'white',
          borderRadius:12,
          border:`2px solid ${borderColor}`,
          boxShadow:`0 0 0 4px ${borderColor}22`
        }}>
          {board.map((row, ri) =>
            Array.isArray(row) ? row.map((cell, ci) => {
              const cellStyle = isMaze
                ? getMazeCellStyle(cell)
                : getQueensCellStyle(cell, ri, ci);

              return (
                <div
                  key={`${ri}-${ci}`}
                  style={{
                    width: 64,
                    height: 64,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    background: cellStyle.bg,
                    borderRadius:6,
                    fontSize: 28,
                    border: `2px solid ${cellStyle.border}`,
                    transition:'all 0.3s ease',
                    cursor:'default',
                    position:'relative',
                    color: isMaze && Number(cell) === 3 ? '#16a34a' : undefined,
                    fontWeight: isMaze && Number(cell) === 3 ? 700 : undefined,
                  }}
                >
                  {cellStyle.emoji}
                  {/* Row label */}
                  {ci === 0 && (
                    <span style={{
                      position:'absolute',
                      top:2,left:3,
                      fontSize:9,
                      color: '#94a3b8',
                      fontFamily:'monospace'
                    }}>{ri}</span>
                  )}
                </div>
              );
            }) : null
          )}
        </div>
  
        {/* Column numbers below */}
        <div style={{display:'flex',gap:4,marginTop:-8}}>
          {Array.from({length:size}).map((_,i) => (
            <div key={i} style={{
              width: 64,
              textAlign:'center',
              fontSize:10,
              color:'#94a3b8',
              fontFamily:'monospace'
            }}>{i}</div>
          ))}
        </div>
  
        {/* Legend */}
        {isMaze ? (
          <div style={{display:'flex',gap:12,fontSize:11,color:'#64748b',flexWrap:'wrap',justifyContent:'center'}}>
            <span>⬛ Wall</span>
            <span>⬜ Open path</span>
            <span>🐀 Rat (current)</span>
            <span style={{color:'#16a34a'}}>✓ Correct path</span>
          </div>
        ) : (
          <div style={{display:'flex',gap:12,fontSize:11,color:'#64748b'}}>
            <span>♛ = Queen placed</span>
            <span style={{color:'#dc2626'}}>♛ red = backtracking</span>
            <span style={{color:'#16a34a'}}>♛ green = valid</span>
          </div>
        )}
  
        {/* Step type indicator */}
        {step?.type === 'backtrack' && (
          <div style={{
            padding:'6px 14px',
            background:'#fee2e2',
            color:'#991b1b',
            borderRadius:20,
            fontSize:12,
            fontWeight:600
          }}>
            {isMaze
              ? '↩ Backtracking — this path is a dead end'
              : '↩ Backtracking — this placement was invalid, removing queen'}
          </div>
        )}
        {step?.type === 'base_case' && (
          <div style={{
            padding:'6px 14px',
            background:'#dcfce7',
            color:'#15803d',
            borderRadius:20,
            fontSize:12,
            fontWeight:600
          }}>
            {isMaze
              ? '✓ Destination reached! Path found'
              : `✓ Solution found! All ${size} queens placed safely`}
          </div>
        )}
      </div>
    );
  }