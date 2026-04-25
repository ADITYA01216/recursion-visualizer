export default function Controls({
    step, totalSteps, playing,
    onPrev, onNext, onPlay, onFirst, onLast, onReset,
    speed, onSpeedChange
  }) {
    const progress = totalSteps > 0 ? ((step + 1) / totalSteps) * 100 : 0;
  
    function handleProgressClick(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const newStep = Math.round(pct * (totalSteps - 1));
      onFirst();
      setTimeout(() => {
        for (let i = 0; i < newStep; i++) onNext();
      }, 0);
    }
  
    return (
      <div className="controls">
        {/* Progress bar */}
        <div className="progress-bar" onClick={handleProgressClick}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
  
        <div className="controls-row">
          {/* Navigation buttons */}
          <div className="nav-buttons">
            <button className="ctrl-btn" onClick={onFirst} title="First step">|◀</button>
            <button className="ctrl-btn" onClick={onPrev} disabled={step === 0} title="Previous">◀</button>
            <button className="ctrl-btn play-btn" onClick={onPlay} title={playing ? 'Pause' : 'Play'}>
              {playing ? '⏸' : '▶'}
            </button>
            <button className="ctrl-btn" onClick={onNext} disabled={step >= totalSteps - 1} title="Next">▶</button>
            <button className="ctrl-btn" onClick={onLast} title="Last step">▶|</button>
          </div>
  
          {/* Step counter */}
          <span className="step-counter">
            Step {totalSteps > 0 ? step + 1 : 0} of {totalSteps}
          </span>
  
          {/* Speed control */}
          <div className="speed-control">
            <span className="speed-label">Speed</span>
            <input
              type="range"
              min={200}
              max={2000}
              step={100}
              value={2200 - speed}
              onChange={e => onSpeedChange(2200 - Number(e.target.value))}
              className="speed-slider"
            />
          </div>
  
          {/* New question button */}
          <button className="new-btn" onClick={onReset}>New question</button>
        </div>
      </div>
    );
  }