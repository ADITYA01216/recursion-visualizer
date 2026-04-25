export default function ArrayView({ step, problemType }) {
    const arr = step?.arrayState?.arr;
    const left = step?.arrayState?.left ?? -1;
    const right = step?.arrayState?.right ?? -1;
    const found = step?.arrayState?.found;
    const target = step?.arrayState?.target;
    const windowSum = step?.arrayState?.windowSum;
  
    if (!arr || !arr.length) return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',flexDirection:'column',gap:12,color:'#94a3b8'}}>
        <div style={{fontSize:40}}>{problemType === 'slidingwindow' ? '🪟' : '👈👉'}</div>
        <p style={{fontSize:14}}>Array visualization will appear here</p>
      </div>
    );
  
    const isSW = problemType === 'slidingwindow';
    const isFound = found !== -1 && found !== undefined && found !== null;
  
    const typeColors = {
      call:'#3b82f6', base_case:'#16a34a', return:'#ca8a04',
      backtrack:'#dc2626', explore:'#6366f1', prune:'#db2777'
    };
    const borderColor = typeColors[step?.type] || '#4f46e5';
  
    function getCellStyle(i) {
      const isLeft = i === left;
      const isRight = i === right;
      const inWindow = isSW && i >= left && i <= right;
      const isBoth = isLeft && isRight;
  
      if (isFound && (isLeft || isRight)) {
        return { bg:'#bbf7d0', border:'#16a34a', text:'#14532d', scale:1.15 };
      }
      if (isBoth) return { bg:'#fef9c3', border:'#eab308', text:'#854d0e', scale:1.1 };
      if (inWindow && isSW) return { bg:'#dbeafe', border:'#3b82f6', text:'#1d4ed8', scale:1.05 };
      if (isLeft) return { bg:'#fee2e2', border:'#ef4444', text:'#991b1b', scale:1.1 };
      if (isRight) return { bg:'#dcfce7', border:'#16a34a', text:'#15803d', scale:1.1 };
      return { bg:'#f8fafc', border:'#e2e8f0', text:'#475569', scale:1 };
    }
  
    const cellSize = arr.length <= 8 ? 56 : arr.length <= 12 ? 44 : 36;
  
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',padding:20,gap:16,overflowY:'auto'}}>
  
        {/* Action banner */}
        {step?.currentAction && (
          <div style={{padding:'8px 16px',background:'#0f172a',color:'#86efac',borderRadius:8,fontSize:13,fontFamily:'monospace',fontWeight:600,textAlign:'center',borderLeft:`4px solid ${borderColor}`,width:'100%',maxWidth:600,boxSizing:'border-box'}}>
            {step.currentAction}
          </div>
        )}
  
        {/* Target / window sum info */}
        <div style={{display:'flex',gap:16,flexWrap:'wrap',justifyContent:'center'}}>
          {target !== undefined && target !== null && target !== -1 && (
            <div style={{padding:'6px 16px',background:'#eef2ff',borderRadius:20,fontSize:13,fontWeight:700,color:'#4f46e5'}}>
              Target: {target}
            </div>
          )}
          {windowSum !== undefined && windowSum !== null && windowSum !== 0 && (
            <div style={{padding:'6px 16px',background:'#dbeafe',borderRadius:20,fontSize:13,fontWeight:700,color:'#1d4ed8'}}>
              Window sum: {windowSum}
            </div>
          )}
          {isFound && found !== undefined && (
            <div style={{padding:'6px 16px',background:'#dcfce7',borderRadius:20,fontSize:13,fontWeight:700,color:'#15803d'}}>
              ✅ {isSW ? `Max sum: ${found}` : `Found: ${found}`}
            </div>
          )}
        </div>
  
        {/* Array cells */}
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
  
          {/* Pointer labels above */}
          <div style={{display:'flex',gap:4}}>
            {arr.map((_, i) => {
              const isLeft = i === left;
              const isRight = i === right;
              const isBoth = isLeft && isRight;
              return (
                <div key={i} style={{width:cellSize,textAlign:'center',fontSize:11,fontWeight:700,height:20}}>
                  {isBoth && <span style={{color:'#854d0e'}}>L/R</span>}
                  {isLeft && !isBoth && <span style={{color:'#dc2626'}}>L</span>}
                  {isRight && !isBoth && <span style={{color:'#16a34a'}}>R</span>}
                </div>
              );
            })}
          </div>
  
          {/* Array row */}
          <div style={{display:'flex',gap:4}}>
            {arr.map((val, i) => {
              const style = getCellStyle(i);
              return (
                <div key={i} style={{
                  width:cellSize,height:cellSize,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  background:style.bg,border:`2px solid ${style.border}`,
                  borderRadius:8,fontSize:cellSize<=36?13:16,fontWeight:700,
                  color:style.text,transform:`scale(${style.scale})`,
                  transition:'all 0.3s ease',
                  fontFamily:'monospace'
                }}>
                  {val}
                </div>
              );
            })}
          </div>
  
          {/* Index labels below */}
          <div style={{display:'flex',gap:4}}>
            {arr.map((_, i) => (
              <div key={i} style={{width:cellSize,textAlign:'center',fontSize:10,color:'#94a3b8',fontFamily:'monospace'}}>
                [{i}]
              </div>
            ))}
          </div>
        </div>
  
        {/* Pointer arrows */}
        <div style={{display:'flex',gap:24,flexWrap:'wrap',justifyContent:'center',fontSize:13}}>
          {left !== -1 && (
            <div style={{display:'flex',alignItems:'center',gap:6,padding:'4px 12px',background:'#fee2e2',borderRadius:20,color:'#991b1b',fontWeight:700}}>
              <span>👈</span>
              <span>left = {left} (arr[{left}]={arr[left]})</span>
            </div>
          )}
          {right !== -1 && right !== left && (
            <div style={{display:'flex',alignItems:'center',gap:6,padding:'4px 12px',background:'#dcfce7',borderRadius:20,color:'#15803d',fontWeight:700}}>
              <span>👉</span>
              <span>right = {right} (arr[{right}]={arr[right]})</span>
            </div>
          )}
        </div>
  
        {/* Algorithm hint */}
        <div style={{fontSize:12,color:'#64748b',textAlign:'center',maxWidth:500,lineHeight:1.6,padding:'8px 16px',background:'#f8fafc',borderRadius:10,border:'1px solid #e2e8f0'}}>
          {isSW
            ? '🪟 Sliding window: add new right element, remove old left element — O(1) per slide'
            : '👈👉 Two pointers: sum too small → move left right. Sum too large → move right left'
          }
        </div>
      </div>
    );
  }