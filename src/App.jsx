import { useState, useEffect, useRef } from 'react';
import InputPanel from './components/InputPanel';
import TreeView from './components/TreeView';
import GridView from './components/GridView';
import StepPanel from './components/StepPanel';
import Controls from './components/Controls';
import DebugPanel from './components/DebugPanel';
import ComplexityChart from './components/ComplexityChart';
import StackView from './components/StackView';
import './App.css';

const LEGEND = [
  { type:'call',      label:'Call',      color:'#3b82f6' },
  { type:'base_case', label:'Base case', color:'#16a34a' },
  { type:'return',    label:'Return',    color:'#ca8a04' },
  { type:'backtrack', label:'Backtrack', color:'#dc2626' },
  { type:'explore',   label:'Explore',   color:'#8b5cf6' },
  { type:'prune',     label:'Prune',     color:'#db2777' },
];

export default function App() {
  const [view, setView]         = useState('input');
  const [vizData, setVizData]   = useState(null);
  const [step, setStep]         = useState(0);
  const [playing, setPlaying]   = useState(false);
  const [speed, setSpeed]       = useState(900);
  const [error, setError]       = useState('');
  const [loadMsg, setLoadMsg]   = useState('');
  const [inputCode, setInputCode] = useState('');
  const [vizMode, setVizMode]   = useState('tree');
  const [showDebug, setShowDebug] = useState(false);

  const timerRef = useRef(null);
  const msgRef   = useRef(0);

  const MSGS = [
    'Reading your code...',
    'Understanding the algorithm...',
    'Tracing recursive calls...',
    'Building visualization...',
    'Almost ready...',
  ];

  // Rotate loading messages
  useEffect(() => {
    if (view !== 'loading') return;
    setLoadMsg(MSGS[0]);
    msgRef.current = 0;
    const iv = setInterval(() => {
      msgRef.current = (msgRef.current + 1) % MSGS.length;
      setLoadMsg(MSGS[msgRef.current]);
    }, 1800);
    return () => clearInterval(iv);
  }, [view]);

  // Playback timer
  useEffect(() => {
    if (playing && vizData) {
      timerRef.current = setInterval(() => {
        setStep(s => {
          if (s >= vizData.steps.length - 1) {
            setPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, speed);
    }
    return () => clearInterval(timerRef.current);
  }, [playing, speed, vizData]);

  // ✅ Detect recursion type
  function detectVizMode(steps) {
    const childCount = {};

    steps.forEach(s => {
      if (!s.parentId) return;
      childCount[s.parentId] = (childCount[s.parentId] || 0) + 1;
    });

    const maxChildren = Math.max(0, ...Object.values(childCount));
    return maxChildren <= 1 ? 'stack' : 'tree';
  }

  async function handleVisualize({ problem, code, boardN }) {
    setView('loading');
    setError('');
    setInputCode(code || '');
    try {
      const r = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem, code, boardN }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Something went wrong');

      setVizData(data);
      setStep(0);
      setPlaying(false);

      const type = (data.problemType || '').toLowerCase();

      // ✅ Smart visualization mode
      setVizMode((type === 'nqueens' || type === 'maze') ? 'grid' : 'tree');

      setView('viz');
    } catch (err) {
      setError(err.message);
      setView('input');
    }
  }

  function handleReset() {
    setPlaying(false);
    setView('input');
    setVizData(null);
    setStep(0);
    setError('');
    setShowDebug(false);
  }

  const steps   = vizData?.steps || [];
  const cur     = steps[step];
  const isGrid  = ['nqueens','maze'].includes((vizData?.problemType||'').toLowerCase());
  const isArray = vizData?.problemType === 'twopointer' || vizData?.problemType === 'slidingwindow';
  const codeLines = (inputCode || vizData?.generatedCode || '').split('\n');
  const hasCode   = codeLines.length > 1;

  // INPUT / LOADING
  if (view === 'input' || view === 'loading') {
    return (
      <div className="app-input-view">
        <InputPanel onVisualize={handleVisualize} loading={view === 'loading'} />

        {view === 'loading' && (
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <p className="loading-message">{loadMsg}</p>
          </div>
        )}

        {error && (
          <div className="error-toast">
            ⚠ {error}
            <button onClick={() => setError('')}>✕</button>
          </div>
        )}
      </div>
    );
  }

  // VISUALIZATION
  return (
    <div className="app-viz-view">

      <header className="viz-header">
        <button className="back-btn" onClick={handleReset}>← RecurseViz</button>
        <h2 className="viz-title">{vizData?.problem}</h2>

        <button className="debug-trigger-btn" onClick={() => setShowDebug(true)}>
          🔍 Debug Code
        </button>

        {/* ✅ FIXED TOGGLE */}
        {(isGrid || vizData?.problemType === 'twopointer' || vizData?.problemType === 'slidingwindow') && (
  <div className="view-toggle">

            <button
              className={vizMode === 'grid' ? 'active' : ''}
              onClick={() => setVizMode('grid')}
            >
              Grid
            </button>

            <button
              className={vizMode === 'tree' ? 'active' : ''}
              onClick={() => setVizMode('tree')}
            >
              Tree
            </button>
          </div>
        )}

        <div className="legend">
          {LEGEND.map(l => (
            <span key={l.type} className="legend-item">
              <span className="legend-dot" style={{ background: l.color }} />
              <span className="legend-text">{l.label}</span>
            </span>
          ))}
        </div>
      </header>

      <main className="viz-main">

        {hasCode && (
          <section className="code-panel">
            <div className="code-panel-header">Code</div>
            <div className="code-lines">
              {codeLines.map((line, i) => {
                const lineNum = i + 1;
                const isHighlighted = cur?.highlightLine === lineNum;

                return (
                  <div
                    key={i}
                    className={`code-line ${isHighlighted ? 'code-line-active' : ''}`}
                  >
                    <span className="code-line-num">{lineNum}</span>
                    <span className="code-line-text">{line || ' '}</span>
                    {isHighlighted && (
                      <span className="code-line-arrow">◀ executing</span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="viz-panel">
          {vizMode === 'grid' && isGrid ? (
            <GridView step={cur} boardSize={vizData?.boardSize || 4} problemType={vizData?.problemType} />
          ) : vizMode === 'stack' ? (
            <StackView steps={steps} currentStep={step} />
          ) : (
            <TreeView steps={steps} currentStep={step} />
          )}
        </section>

        <aside className="info-panel">
          <StepPanel
            step={cur}
            totalSteps={steps.length}
            generatedCode={vizData?.generatedCode}
          />
          <ComplexityChart tc={vizData?.timeComplexity} />
        </aside>

      </main>

      <Controls
        step={step}
        totalSteps={steps.length}
        playing={playing}
        onFirst={() => { setStep(0); setPlaying(false); }}
        onPrev={() => setStep(s => Math.max(0, s - 1))}
        onNext={() => setStep(s => Math.min(steps.length - 1, s + 1))}
        onLast={() => { setStep(steps.length - 1); setPlaying(false); }}
        onPlay={() => setPlaying(p => !p)}
        onReset={handleReset}
        speed={speed}
        onSpeedChange={setSpeed}
      />

      {showDebug && (
        <DebugPanel onClose={() => setShowDebug(false)} />
      )}
    </div>
  );
}