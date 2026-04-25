export default function StackView({ steps, currentStep }) {
    if (!steps?.length) return null;
  
    const visible = steps.slice(0, currentStep + 1);
  
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        padding: 20,
        gap: 12
      }}>
        {visible.map((s, i) => {
          const isBase = s.type === 'base_case';
  
          return (
            <div key={i}
              style={{
                padding: '10px 16px',
                borderRadius: 12,
                background: isBase ? '#dcfce7' : '#dbeafe',
                border: `2px solid ${isBase ? '#22c55e' : '#3b82f6'}`,
                fontWeight: 600,
                minWidth: 140,
                textAlign: 'center'
              }}
            >
              {s.label}
            </div>
          );
        })}
      </div>
    );
  }