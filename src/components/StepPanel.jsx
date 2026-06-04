const TYPE_INFO = {
  call:      {label:'Function Call', color:'#3b82f6', bg:'#dbeafe', icon:'→'},
  base_case: {label:'Base Case',     color:'#16a34a', bg:'#dcfce7', icon:'✓'},
  return:    {label:'Return',        color:'#ca8a04', bg:'#fef9c3', icon:'↑'},
  backtrack: {label:'Backtrack',     color:'#dc2626', bg:'#fee2e2', icon:'↩'},
  explore:   {label:'Explore',       color:'#6366f1', bg:'#dbeafe', icon:'◈'},
  prune:     {label:'Prune',         color:'#db2777', bg:'#fce7f3', icon:'✂'},
  memo:      {label:'Memoized',      color:'#94a3b8', bg:'#f1f5f9', icon:'📦'},
};

function getHighlightedLine(step) {
  if (!step) return null;
  switch(step.type) {
    case 'call':      return `→ Entering: ${step.functionName}(${Object.entries(step.arguments||{}).map(([k,v])=>`${k}=${JSON.stringify(v)}`).join(', ')})`;
    case 'base_case': return `→ Base case hit! Returning ${JSON.stringify(step.returnValue)}`;
    case 'return':    return `→ Returning ${JSON.stringify(step.returnValue)} to caller`;
    case 'backtrack': return `→ Backtracking! Undoing last choice`;
    case 'explore':   return `→ Trying new choice: exploring branch`;
    case 'prune':     return `→ Pruning! This branch violates constraints`;
    case 'memo':      return `→ Already computed! Returning cached result`;
    default: return null;
  }
}

function getMistakeHint(step) {
  if (!step) return null;
  const hints = [];
  // AI-detected bugs
  if (step.bugDetected) {
    hints.push({ type: 'bug', text: step.bugExplanation || 'Bug detected at this step — check your logic here.' });
  }
  if (step.type === 'base_case' && step.depth > 8) {
    hints.push({ type: 'warn', text: '⚠ Very deep recursion! Check if your base case is correct — it might be triggering too late.' });
  }
  if (step.type === 'backtrack') {
    hints.push({ type: 'info', text: '↩ Backtrack happening here — the previous choice was wrong. The algorithm is trying a different path.' });
  }
  if (step.type === 'prune') {
    hints.push({ type: 'info', text: '✂ This branch is cut off — a constraint check failed, saving unnecessary computation.' });
  }
  if (step.type === 'call' && step.depth > 10) {
    hints.push({ type: 'warn', text: '⚠ Very deep call stack! If you see infinite recursion, check your base case condition.' });
  }
  return hints.length > 0 ? hints : null;
}

export default function StepPanel({ step, totalSteps, generatedCode }) {
  if (!step) return (
    <div className="step-panel-empty">
      <p>Press <strong>Play</strong> or use <kbd>→</kbd> <kbd>←</kbd> arrow keys to step through.</p>
      <div className="sp-hint-box">
        <strong style={{color:'#475569'}}>🔍 How to spot mistakes:</strong><br/>
        • <span style={{color:'#dc2626',fontWeight:600}}>Red backtrack</span> nodes = your logic failed there<br/>
        • <span style={{color:'#16a34a',fontWeight:600}}>Green base case</span> = wrong base case → wrong answer<br/>
        • Follow the <strong>call stack</strong> — it shows exact execution path<br/>
        • Compare <strong>local variables</strong> with what you expected<br/>
        • <span style={{color:'#4f46e5',fontWeight:600}}>🐛 Bug badges</span> appear when AI detects errors in your code
      </div>
      <div className="sp-shortcuts">
        <span><kbd>→</kbd> Next step</span>
        <span><kbd>←</kbd> Prev step</span>
        <span><kbd>Space</kbd> Play/Pause</span>
        <span><kbd>Home</kbd> First</span>
        <span><kbd>End</kbd> Last</span>
      </div>
      {generatedCode && (
        <div className="generated-code-box" style={{marginTop:12}}>
          <p className="generated-code-label">Generated C++ code:</p>
          <pre className="generated-code">{generatedCode}</pre>
        </div>
      )}
    </div>
  );

  const typeInfo = TYPE_INFO[step.type] || TYPE_INFO.call;
  const argStr = Object.entries(step.arguments||{}).map(([k,v])=>`${k}=${JSON.stringify(v)}`).join(', ');
  const highlightLine = getHighlightedLine(step);
  const hints = getMistakeHint(step);

  return (
    <div className="step-panel">

      {/* Step type badge */}
      <div className="step-header">
        <span className="step-badge" style={{background:typeInfo.bg,color:typeInfo.color}}>
          {typeInfo.icon} {typeInfo.label}
        </span>
        <code className="step-fn">{step.functionName}({argStr})</code>
      </div>

      {/* Current execution line highlight */}
      {highlightLine && (
        <div className="sp-exec-line">
          {highlightLine}
        </div>
      )}

      {/* Bug detection banner (from AI) */}
      {step.bugDetected && (
        <div className="sp-bug-banner">
          <span className="sp-bug-icon">🐛</span>
          <div>
            <strong>Bug Detected</strong>
            <p>{step.bugExplanation || 'Check this step — something is wrong here.'}</p>
          </div>
        </div>
      )}

      {/* Mistake hints */}
      {hints && !step.bugDetected && hints.map((hint,i) => (
        <div key={i} className={`sp-hint sp-hint-${hint.type}`}>
          {hint.text}
        </div>
      ))}

      {/* Educational description */}
      <p className="step-description">{step.description}</p>

      {/* Return value */}
      {step.returnValue !== null && step.returnValue !== undefined && (
        <div className="return-value">
          <span className="return-label">Returns:</span>
          <code className="return-val">{JSON.stringify(step.returnValue)}</code>
        </div>
      )}

      {/* Call stack */}
      {step.callStack?.length > 0 && (
        <div className="info-section">
          <h4 className="info-title">Call Stack (top = current)</h4>
          <div className="call-stack">
            {[...step.callStack].reverse().map((frame,i) => (
              <div key={i} className={`stack-frame ${i===0?'stack-frame-top':''}`}>
                <span className="stack-arrow">{i===0?'▶':' '}</span>
                <code>{frame}</code>
                {i===0 && <span style={{fontSize:10,color:'#6366f1',marginLeft:'auto'}}>← executing now</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Local variables */}
      {step.localVars && Object.keys(step.localVars).length > 0 && (
        <div className="info-section">
          <h4 className="info-title">Local Variables at this step</h4>
          <div className="vars-grid">
            {Object.entries(step.localVars).map(([k,v]) => (
              <div key={k} className="var-row">
                <span className="var-name">{k}</span>
                <code className="var-value">{JSON.stringify(v)}</code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Depth indicator */}
      <div className="info-section">
        <h4 className="info-title">Recursion depth</h4>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          {Array.from({length:Math.min(step.depth+1,12)}).map((_,i) => (
            <div key={i} style={{
              width:14, height:14, borderRadius:3,
              background: i===step.depth ? '#4f46e5' : '#e2e8f0',
              transition:'background 0.3s'
            }}/>
          ))}
          <span style={{fontSize:11,color:'#94a3b8',marginLeft:4}}>depth {step.depth}</span>
        </div>
        {step.depth > 6 && (
          <p style={{fontSize:11,color:'#f59e0b',marginTop:4}}>
            ⚠ Deep recursion — make sure your base case will be reached!
          </p>
        )}
      </div>

      {/* Generated code */}
      {generatedCode && (
        <div className="info-section">
          <h4 className="info-title">Generated Code</h4>
          <pre className="generated-code">{generatedCode}</pre>
        </div>
      )}
    </div>
  );
}