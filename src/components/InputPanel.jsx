import { useState } from 'react';

const CATEGORIES = [
  { id:'basic',    label:'Basic Recursion', emoji:'🔄' },
  { id:'sorting',  label:'Sorting',         emoji:'📊' },
  { id:'search',   label:'Searching',       emoji:'🔍' },
  { id:'backtrack',label:'Backtracking',    emoji:'↩' },
  { id:'grid',     label:'Grid Problems',   emoji:'⊞' },
  { id:'custom',   label:'Custom Code',     emoji:'⌨️' },
];

const EXAMPLES = [
  { id:'fibonacci',     label:'Fibonacci',           cat:'basic',    diff:'Easy',   emoji:'🌀', desc:'Overlapping subproblems, branching recursion',  problem:'Compute fibonacci(5) recursively' },
  { id:'factorial',     label:'Factorial',           cat:'basic',    diff:'Easy',   emoji:'✖️', desc:'Linear recursion, call stack unwinding',         problem:'Compute factorial of 5' },
  { id:'sumdigits',     label:'Sum of Digits',       cat:'basic',    diff:'Easy',   emoji:'🔢', desc:'Extract digits using modulo recursion',          problem:'Sum of digits of 12345 recursively' },
  { id:'palindrome',    label:'Palindrome Check',    cat:'basic',    diff:'Easy',   emoji:'🪞', desc:'Two-pointer recursion shrinking inward',         problem:'Is racecar a palindrome? Check recursively' },
  { id:'climbstairs',   label:'Climb Stairs',        cat:'basic',    diff:'Easy',   emoji:'🪜', desc:'Count ways — identical to Fibonacci pattern',    problem:'Count ways to climb 5 stairs taking 1 or 2 steps' },
  { id:'powerfunction', label:'Fast Power (2^10)',   cat:'basic',    diff:'Medium', emoji:'⚡', desc:'O(log n) exponentiation using even/odd split',   problem:'Compute power(2, 10) using fast exponentiation' },
  { id:'gcd',           label:'GCD (Euclid)',        cat:'basic',    diff:'Easy',   emoji:'📐', desc:'Ancient algorithm, elegant base case',           problem:'Find GCD of 48 and 18 using Euclidean algorithm' },
  { id:'hanoi',         label:'Tower of Hanoi',      cat:'basic',    diff:'Medium', emoji:'🗼', desc:'Minimum 2^n-1 moves, elegant 3-line solution',   problem:'Solve Tower of Hanoi for 3 disks' },
  { id:'mergesort',     label:'Merge Sort',          cat:'sorting',  diff:'Medium', emoji:'📊', desc:'Divide and conquer, O(n log n) guaranteed',      problem:'Sort array {5,3,8,1} using merge sort' },
  { id:'binarysearch',  label:'Binary Search',       cat:'search',   diff:'Easy',   emoji:'🔍', desc:'Halve search space each call — O(log n)',         problem:'Binary search for 7 in sorted array {1,3,5,7,9,11}' },
  { id:'subsetsum',     label:'Subset Sum',          cat:'backtrack',diff:'Medium', emoji:'➕', desc:'Include/exclude pattern, pruning bad paths',     problem:'Find all subsets of {1,2,3,4} that sum to 5' },
  { id:'permutations',  label:'Permutations',        cat:'backtrack',diff:'Medium', emoji:'🔀', desc:'Swap-recurse-swap backtracking pattern',          problem:'Generate all permutations of {1,2,3}' },
  { id:'generateparens',label:'Generate Parentheses',cat:'backtrack',diff:'Medium', emoji:'()', desc:'Valid bracket combinations, Catalan numbers',    problem:'Generate all valid parentheses for n=3' },
  { id:'nqueens',       label:'N-Queens',            cat:'grid',     diff:'Hard',   emoji:'♛', desc:'Backtracking on a 4×4 chessboard',  problem:'Solve N-Queens for n=4 using backtracking' },
  { id:'ratmaze',       label:'Rat in a Maze',       cat:'grid',     diff:'Medium', emoji:'🐀', desc:'Pathfinding with backtracking on a 4×4 grid', problem:'Find path for rat in 4x4 maze using backtracking' },
  { id:'graphdfs', label:'Graph DFS', cat:'search', diff:'Medium', emoji:'🕸', desc:'Depth-first search — goes deep before wide using recursion', problem:'Graph DFS depth first traversal from node 0' },
];

const DIFF_COLORS = {
  Easy:   { bg:'#dcfce7', text:'#15803d' },
  Medium: { bg:'#fef9c3', text:'#854d0e' },
  Hard:   { bg:'#fee2e2', text:'#991b1b' },
};

export default function InputPanel({ onVisualize, loading }) {
  const [cat, setCat] = useState('basic');
  const [problem, setProblem] = useState('');
  const [code, setCode] = useState('');
  const [customMode, setCustomMode] = useState('problem');

  const filtered = cat === 'custom' ? [] : EXAMPLES.filter(e => e.cat === cat);

  function loadExample(ex) {
    onVisualize({ problem: ex.problem, code: '', boardN: 4 });
  }

  function handleCustomSubmit() {
    if (!problem.trim() && !code.trim()) return;
    onVisualize({ problem, code });
  }

  return (
    <div className="ip-root">

      {/* Header */}
      <div className="ip-header">
        <div className="ip-logo">
          <span className="ip-logo-icon">🌳</span>
          <div>
            <h1 className="ip-title">RecurseViz</h1>
            <p className="ip-sub">Understand recursion & backtracking through visualization</p>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="ip-cats">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`ip-cat-btn ${cat === c.id ? 'active' : ''}`}
            onClick={() => setCat(c.id)}
          >
            <span>{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Example grid */}
      {cat !== 'custom' && (
        <div className="ip-grid">
          {filtered.map(ex => (
            <button
              key={ex.id}
              className="ip-card"
              onClick={() => loadExample(ex)}
              disabled={loading}
            >
              <div className="ip-card-top">
                <span className="ip-card-emoji">{ex.emoji}</span>
                <span className="ip-card-diff" style={{ background:DIFF_COLORS[ex.diff].bg, color:DIFF_COLORS[ex.diff].text }}>
                  {ex.diff}
                </span>
              </div>
              <div className="ip-card-name">{ex.label}</div>
              <div className="ip-card-desc">{ex.desc}</div>

              <div className="ip-card-arrow">Visualize →</div>
            </button>
          ))}
        </div>
      )}

      {/* Custom section */}
      {cat === 'custom' && (
        <div className="ip-custom">
          <div className="ip-custom-tabs">
            <button className={customMode==='problem'?'active':''} onClick={()=>setCustomMode('problem')}>
              💬 Ask a question
            </button>
            <button className={customMode==='code'?'active':''} onClick={()=>setCustomMode('code')}>
              ⌨️ Paste C++ code
            </button>
            <button className={customMode==='both'?'active':''} onClick={()=>setCustomMode('both')}>
              📝 Both
            </button>
          </div>

          {(customMode==='problem'||customMode==='both') && (
            <div className="ip-field">
              <label className="ip-label">Your question or problem description</label>
              <textarea
                className="ip-textarea"
                value={problem}
                onChange={e=>setProblem(e.target.value)}
                placeholder="e.g. How does quicksort work recursively? / Show DFS traversal / Explain coin change problem"
                rows={3}
              />
              {customMode==='problem' && (
                <p className="ip-hint">💡 No code needed — just describe what you want. AI writes and traces the code for you.</p>
              )}
            </div>
          )}

          {(customMode==='code'||customMode==='both') && (
            <div className="ip-field">
              <label className="ip-label">Your C++ code</label>
              <div className="ip-editor">
                <div className="ip-editor-header">
                  <span className="ip-editor-dot" style={{background:'#ff5f57'}}/>
                  <span className="ip-editor-dot" style={{background:'#febc2e'}}/>
                  <span className="ip-editor-dot" style={{background:'#28c840'}}/>
                  <span className="ip-editor-lang">C++</span>
                </div>
                <div className="ip-editor-body">
                  <div className="ip-line-nums">
                    {(code||'').split('\n').map((_,i)=>(
                      <div key={i} className="ip-line-num">{i+1}</div>
                    ))}
                    {!code && [1,2,3,4,5,6,7].map(i=>(
                      <div key={i} className="ip-line-num">{i}</div>
                    ))}
                  </div>
                  <textarea
                    className="ip-code-area"
                    value={code}
                    onChange={e=>setCode(e.target.value)}
                    placeholder={'// paste your C++ recursive code here\nvoid solve(int n) {\n    if (n == 0) return;\n    solve(n - 1);\n}\nint main() {\n    solve(5);\n}'}
                    rows={12}
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            className="ip-viz-btn"
            onClick={handleCustomSubmit}
            disabled={loading || (!problem.trim() && !code.trim())}
          >
            {loading
              ? <><span className="ip-spinner"/>Analyzing your code...</>
              : <>🚀 Visualize →</>
            }
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="ip-footer">
        <span>🎓 15 built-in problems</span>
        <span>•</span>
        <span>⌨️ Custom code via AI</span>
      </div>


    </div>
  );
}