import { useMemo } from 'react';

/**
 * ProgressTracker - A fixed floating panel showing selection progress
 * 
 * @param {Object} selections - Current selection values
 * @param {Array} fields - Array of { key, label } defining tracked fields
 */
const ProgressTracker = ({ selections, fields }) => {
  const selectionCount = useMemo(() => {
    return fields.filter(field => selections[field.key]).length;
  }, [selections, fields]);

  const progressPercent = (selectionCount / fields.length) * 100;

  return (
    <div 
      className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 w-64 hidden md:block"
      style={{
        position: 'fixed',
        bottom: '48px',
        right: '24px',
        zIndex: 9999,
      }}
    >
      <div className="text-sm font-semibold text-slate-700 mb-3">
        Your Selections
      </div>
      <div className="space-y-2 text-sm">
        {fields.map(({ key, label }) => (
          <div key={key} className="flex justify-between">
            <span className="text-slate-500">{label}</span>
            <span
              className={
                selections[key]
                  ? "text-emerald-600 font-medium"
                  : "text-slate-300"
              }
            >
              {selections[key] || "—"}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100">
        <div 
          className="w-full bg-slate-100 rounded-full h-2" 
          role="progressbar" 
          aria-valuenow={progressPercent} 
          aria-valuemin="0" 
          aria-valuemax="100"
        >
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;

