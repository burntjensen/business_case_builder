/**
 * SummaryView - Full-page summary of user selections
 * 
 * @param {string} title - Summary title
 * @param {string} description - Summary description
 * @param {Array} items - Array of { label, value }
 * @param {Object} nextSteps - { title, description } for what happens next
 * @param {function} onBack - Back button handler
 * @param {string} backText - Back button text
 */
const SummaryView = ({ 
  title, 
  description, 
  items = [], 
  nextSteps,
  onBack,
  backText = "← Back to article"
}) => (
  <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
          {title}
        </h2>
        
        {description && (
          <p className="text-slate-600 text-center mb-8">{description}</p>
        )}
        
        <div className="space-y-4 bg-slate-50 rounded-xl p-6">
          {items.map(({ label, value }, index) => (
            <div 
              key={label} 
              className={`flex justify-between py-2 ${index < items.length - 1 ? 'border-b border-slate-200' : ''}`}
            >
              <span className="text-slate-600">{label}</span>
              <span className="font-semibold text-slate-800">
                {value || "Not selected"}
              </span>
            </div>
          ))}
        </div>
        
        {nextSteps && (
          <div className="mt-8 p-6 bg-emerald-600 rounded-xl text-white text-center">
            <p className="text-lg font-semibold mb-2">{nextSteps.title}</p>
            <p className="text-emerald-100 text-sm">{nextSteps.description}</p>
          </div>
        )}
        
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-6 text-emerald-600 hover:text-emerald-700 font-medium text-sm w-full text-center"
          >
            {backText}
          </button>
        )}
      </div>
    </div>
  </div>
);

export default SummaryView;

