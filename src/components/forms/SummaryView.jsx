/**
 * SummaryView - Full-page summary of user selections
 * 
 * @param {string} title - Summary title
 * @param {string} description - Summary description
 * @param {Array} items - Array of { label, value }
 * @param {Object} nextSteps - { title, description } for what happens next
 * @param {function} onBack - Back button handler
 * @param {string} backText - Back button text
 * @param {function} onDownloadPDF - Optional PDF download handler
 */
const SummaryView = ({ 
  title, 
  description, 
  items = [], 
  nextSteps,
  onBack,
  backText = "← Back to article",
  onDownloadPDF
}) => (
  <div className="min-h-screen bg-brand-cream">
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-brand-indigo/10">
        <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-brand-green"
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
        
        <h2 className="text-2xl font-bold text-center text-brand-indigo mb-4">
          {title}
        </h2>
        
        {description && (
          <p className="text-brand-indigo/70 text-center mb-8">{description}</p>
        )}
        
        <div className="space-y-4 bg-brand-cream rounded-xl p-6">
          {items.map(({ label, value }, index) => (
            <div 
              key={label} 
              className={`flex justify-between py-2 ${index < items.length - 1 ? 'border-b border-brand-indigo/10' : ''}`}
            >
              <span className="text-brand-indigo/70">{label}</span>
              <span className="font-semibold text-brand-indigo">
                {value || "Not selected"}
              </span>
            </div>
          ))}
        </div>
        
        {nextSteps && (
          <div className="mt-8 p-6 bg-brand-indigo rounded-xl text-white text-center">
            <p className="text-lg font-semibold mb-2">{nextSteps.title}</p>
            <p className="text-white/80 text-sm">{nextSteps.description}</p>
          </div>
        )}
        
        {onDownloadPDF && (
          <button
            type="button"
            onClick={onDownloadPDF}
            className="mt-6 w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-indigo font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF Summary
          </button>
        )}
        
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-brand-blue hover:text-brand-indigo font-medium text-sm w-full text-center"
          >
            {backText}
          </button>
        )}
      </div>
    </div>
  </div>
);

export default SummaryView;
