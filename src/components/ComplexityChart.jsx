export default function ComplexityChart({ tc }) {
    if (!tc) return null;
  
    const complexities = [
      { label: 'Best', value: tc.best, color: '#16a34a', bg: '#dcfce7' },
      { label: 'Average', value: tc.average, color: '#ca8a04', bg: '#fef9c3' },
      { label: 'Worst', value: tc.worst, color: '#dc2626', bg: '#fee2e2' },
      { label: 'Space', value: tc.space, color: '#4f46e5', bg: '#ede9fe' },
    ];
  
    const growthOrder = ['O(1)','O(log n)','O(n)','O(n log n)','O(n²)','O(n³)','O(2^n)','O(n!)'];
  
    function getBarWidth(val) {
      const idx = growthOrder.findIndex(g => val?.includes(g.replace('O(','').replace(')','')));
      if (idx === -1) return 30;
      return Math.round((idx / (growthOrder.length - 1)) * 100);
    }
  
    function getLabel(val) {
      if (!val) return '';
      if (val.includes('1)')) return 'Constant ⚡';
      if (val.includes('log')) return 'Logarithmic 🚀';
      if (val.includes('n log')) return 'Linearithmic ✅';
      if (val.includes('n²') || val.includes('n^2')) return 'Quadratic ⚠';
      if (val.includes('2^n')) return 'Exponential 🐢';
      if (val.includes('n!')) return 'Factorial 💀';
      if (val.includes('n)') || val.includes('n,')) return 'Linear 👍';
      return '';
    }
  
    return (
      <div className="tc-panel">
        <h4 className="tc-title">📊 Time & Space Complexity</h4>
  
        <div className="tc-bars">
          {complexities.map(c => (
            <div key={c.label} className="tc-row">
              <span className="tc-label">{c.label}</span>
              <div className="tc-bar-bg">
                <div
                  className="tc-bar-fill"
                  style={{
                    width: `${getBarWidth(c.value)}%`,
                    background: c.color,
                    minWidth: 32
                  }}
                >
                  <span className="tc-bar-text">{c.value}</span>
                </div>
              </div>
              <span className="tc-class" style={{color:c.color}}>{getLabel(c.value)}</span>
            </div>
          ))}
        </div>
  
        {tc.note && (
          <div className="tc-note">
            💡 {tc.note}
          </div>
        )}
  
        {/* Growth reference */}
        <div className="tc-ref">
          <p className="tc-ref-title">Complexity scale (slowest → fastest):</p>
          <div className="tc-ref-row">
            {['O(1)','O(log n)','O(n)','O(n log n)','O(n²)','O(2^n)','O(n!)'].map((g,i) => {
              const colors = ['#16a34a','#22c55e','#84cc16','#ca8a04','#f97316','#dc2626','#7c2d12'];
              return (
                <span key={g} className="tc-ref-item" style={{background:colors[i]+'22',color:colors[i]}}>
                  {g}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }