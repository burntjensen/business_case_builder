/**
 * CaseStudy - Highlighted case study block
 * 
 * @param {string} label - Label text (e.g., "Case Study")
 * @param {string} title - Case study title
 * @param {string} description - Case study description
 * @param {Array} stats - Array of { value, label }
 * @param {string} quote - Optional quote
 * @param {string} attribution - Quote attribution
 */
const CaseStudy = ({ label, title, description, stats = [], quote, attribution }) => (
  <div className="bg-brand-indigo rounded-2xl p-8 my-12 text-white">
    {label && (
      <div className="text-brand-yellow text-sm font-semibold uppercase tracking-wide mb-3">
        {label}
      </div>
    )}
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    {description && (
      <p className="text-white/80 mb-6">{description}</p>
    )}
    
    {stats.length > 0 && (
      <div className={`grid gap-4 mb-6 ${stats.length === 3 ? 'md:grid-cols-3' : stats.length === 2 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-brand-yellow">{stat.value}</div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </div>
        ))}
      </div>
    )}
    
    {quote && (
      <>
        <p className="text-white/70 text-sm italic">&quot;{quote}&quot;</p>
        {attribution && (
          <p className="text-white/50 text-sm mt-2">— {attribution}</p>
        )}
      </>
    )}
  </div>
);

export default CaseStudy;
