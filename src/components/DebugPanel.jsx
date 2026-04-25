import { useState } from 'react';

const SEV_COLORS = {
  critical:   { bg:'#fee2e2', border:'#fca5a5', text:'#991b1b', icon:'🔴' },
  warning:    { bg:'#fef9c3', border:'#fde047', text:'#854d0e', icon:'🟡' },
  suggestion: { bg:'#dbeafe', border:'#93c5fd', text:'#1d4ed8', icon:'🔵' },
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
            {activeTab === 'corrected' && result.correctedCode && (
              <div>
                <p style={{fontSize:12,color:'#64748b',marginBottom:8}}>✅ Here is the corrected version of your code:</p>
                <pre className="debug-corrected">{result.correctedCode}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}