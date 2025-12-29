/**
 * ArticleHeader - Hero header for interactive articles
 * 
 * @param {string} category - Category label (e.g., "Interactive Guide")
 * @param {string} title - Main title
 * @param {string} subtitle - Subtitle/description
 * @param {Array} badges - Array of { icon, text } for meta badges
 */
const ArticleHeader = ({ category, title, subtitle, badges = [] }) => (
  <header className="bg-slate-900 text-white py-16 px-6">
    <div className="max-w-3xl mx-auto">
      {category && (
        <div className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-4">
          {category}
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl text-slate-300 leading-relaxed">
          {subtitle}
        </p>
      )}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-8 text-sm">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2"
            >
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </header>
);

export default ArticleHeader;

