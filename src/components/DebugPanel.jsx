import { useState } from 'react';

function computeDiff(oldStr, newStr) {
  const oldLines = (oldStr || '').split('\n');
  const newLines = (newStr || '').split('\n');
  const M = oldLines.length;
  const N = newLines.length;

  const dp = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
  for (let i = 1; i <= M; i++) {
    for (let j = 1; j <= N; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const diff = [];
  let i = M, j = N;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      diff.push({ type: 'normal', val: oldLines[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.push({ type: 'added', val: newLines[j - 1] });
      j--;
    } else {
      diff.push({ type: 'removed', val: oldLines[i - 1] });
      i--;
    }
  }
  return diff.reverse();
}


const SEV_COLORS = {
  critical:   { bg:'#fee2e2', border:'#fca5a5', text:'#991b1b', icon:'🔴' },
  warning:    { bg:'#fef9c3', border:'#fde047', text:'#854d0e', icon:'🟡' },
  suggestion: { bg:'#dbeafe', border:'#93c5fd', text:'#1d4ed8', icon:'🔵' },
};

const CAT_LABELS = {
  base_case: '🎯 Base Case', recursion_params: '🔄 Params', backtracking: '↩ Backtrack',
  off_by_one: '±1 Off-by-one', infinite_recursion: '♾ Infinite', return_value: '↑ Return',
  boundary: '🚧 Boundary', logic: '🧠 Logic',
};

export default function DebugPanel({ onClose }) {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('bugs');

  async function handleDebug() {
    if (!code.trim()) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const r = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, mode: 'debug' })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setResult(data.debugResult);
      setActiveTab('bugs');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="debug-overlay" onClick={onClose}>
      <div className="debug-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="debug-header">
          <div>
            <h2 className="debug-title">🔍 Debug My Code</h2>
            <p className="debug-sub">AI analyzes your recursive code for bugs, wrong base cases, and missing backtracking</p>
          </div>
          <button className="debug-close" onClick={onClose}>✕</button>
        </div>

        {/* Code input */}
        <div className="debug-editor">
          <div className="debug-editor-bar">
            <span className="debug-editor-dot" style={{background:'#ff5f57'}}/>
            <span className="debug-editor-dot" style={{background:'#febc2e'}}/>
            <span className="debug-editor-dot" style={{background:'#28c840'}}/>
            <span style={{fontSize:11,color:'#94a3b8',marginLeft:'auto',fontFamily:'monospace'}}>C++</span>
          </div>
          <textarea
            className="debug-code"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder={'// Paste your recursive C++ code here\n// AI will find bugs, wrong base cases,\n// missing backtracking, and more!\n\nvoid solve(int n) {\n    // your code...\n}'}
            rows={10}
            spellCheck={false}
          />
        </div>

        <button
          className="debug-btn"
          onClick={handleDebug}
          disabled={loading || !code.trim()}
        >
          {loading ? <><span className="ip-spinner"/>Analyzing for bugs...</> : '🔍 Analyze Code →'}
        </button>

        {error && (
          <div style={{padding:'10px 14px',background:'#fee2e2',color:'#991b1b',borderRadius:8,fontSize:13}}>
            ⚠ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="debug-results">

            {/* Overall assessment */}
            <div className={`debug-assessment ${result.hasErrors ? 'has-errors' : 'no-errors'}`}>
              <span className="debug-assessment-icon">{result.hasErrors ? '⚠' : '✅'}</span>
              <span>{result.overallAssessment}</span>
            </div>

            {/* Tabs */}
            <div className="debug-tabs">
              {['bugs','complexity','corrected'].map(t => (
                <button
                  key={t}
                  className={`debug-tab ${activeTab===t?'active':''}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t === 'bugs' ? `🐛 Bugs (${result.bugs?.length || 0})` :
                   t === 'complexity' ? '📊 Complexity' : '✅ Fixed Code'}
                </button>
              ))}
            </div>

            {/* Bugs tab */}
            {activeTab === 'bugs' && (
              <div className="debug-bugs">
                {/* Execution Trace */}
                {result.executionTrace && (
                  <div style={{marginTop:12,marginBottom:12,padding:'10px 14px',background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:8}}>
                    <p style={{fontWeight:700,fontSize:12,color:'#15803d',marginBottom:6}}>🔍 How the bug manifests at runtime:</p>
                    <p style={{fontSize:12,color:'#166534',lineHeight:1.6,fontFamily:'monospace',whiteSpace:'pre-wrap'}}>{result.executionTrace}</p>
                  </div>
                )}
                {(!result.bugs || result.bugs.length === 0) ? (
                  <div className="debug-no-bugs">
                    <div style={{fontSize:48}}>✅</div>
                    <p>No bugs found! Your code looks correct.</p>
                    {result.suggestions?.length > 0 && (
                      <div className="debug-suggestions">
                        <p style={{fontWeight:600,marginBottom:8}}>💡 Suggestions:</p>
                        {result.suggestions.map((s,i) => (
                          <div key={i} className="debug-suggestion">• {s}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  result.bugs.map((bug, i) => {
                    const sc = SEV_COLORS[bug.severity] || SEV_COLORS.suggestion;
                    return (
                      <div key={i} className="debug-bug-card" style={{borderColor:sc.border,background:sc.bg}}>
                        <div className="debug-bug-header">
                          <span className="debug-bug-sev" style={{color:sc.text}}>
                            {sc.icon} {bug.severity?.toUpperCase()}
                          </span>
                          {bug.line && (
                            <span className="debug-bug-line">Line {bug.line}</span>
                          )}
                          {bug.category && CAT_LABELS[bug.category] && (
                            <span style={{fontSize:10,padding:'2px 8px',background:'#f1f5f9',borderRadius:10,color:'#475569',fontWeight:600}}>
                              {CAT_LABELS[bug.category]}
                            </span>
                          )}
                        </div>
                        <p className="debug-bug-issue" style={{color:sc.text}}>{bug.issue}</p>
                        {bug.code && (
                          <div className="debug-code-block debug-code-bad">
                            <span className="debug-code-label">❌ Your code:</span>
                            <code>{bug.code}</code>
                          </div>
                        )}
                        {bug.fix && (
                          <div className="debug-code-block debug-code-good">
                            <span className="debug-code-label">✅ Fix:</span>
                            <code>{bug.fix}</code>
                          </div>
                        )}
                        {bug.explanation && (
                          <p className="debug-bug-explain">{bug.explanation}</p>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Complexity tab */}
            {activeTab === 'complexity' && (
              <div className="debug-complexity">
                <div className="comp-grid">
                  {[
                    {label:'Best Case',value:result.timeComplexity,color:'#16a34a'},
                    {label:'Space',value:result.spaceComplexity,color:'#4f46e5'},
                  ].map(c => (
                    <div key={c.label} className="comp-card" style={{borderLeft:`4px solid ${c.color}`}}>
                      <p className="comp-label">{c.label}</p>
                      <p className="comp-value" style={{color:c.color}}>{c.value}</p>
                    </div>
                  ))}
                </div>
                {result.suggestions?.length > 0 && (
                  <div className="debug-suggestions" style={{marginTop:12}}>
                    <p style={{fontWeight:600,marginBottom:8,fontSize:13}}>💡 Optimization suggestions:</p>
                    {result.suggestions.map((s,i) => (
                      <div key={i} className="debug-suggestion">• {s}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Corrected code tab */}
            {activeTab === 'corrected' && result.correctedCode && (() => {
              const diff = computeDiff(code, result.correctedCode);
              return (
                <div>
                  <p style={{fontSize:12,color:'#64748b',marginBottom:12}}>
                    💡 Comparing your input code (<span style={{color:'#f87171',fontWeight:600}}>- removed</span>) with the AI-corrected version (<span style={{color:'#4ade80',fontWeight:600}}>+ added</span>):
                  </p>
                  <div className="debug-diff-container">
                    {diff.map((item, index) => {
                      const isAdded = item.type === 'added';
                      const isRemoved = item.type === 'removed';
                      const className = `diff-line ${isAdded ? 'diff-line-added' : isRemoved ? 'diff-line-removed' : 'diff-line-normal'}`;
                      return (
                        <div key={index} className={className}>
                          <span className="diff-sign">
                            {isAdded ? '+' : isRemoved ? '-' : ' '}
                          </span>
                          <span className="diff-text">{item.val || ' '}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}