/**
 * ArticleFooter - Footer for interactive articles
 * 
 * @param {ReactNode} children - Custom footer content (optional)
 */
const ArticleFooter = ({ children }) => (
  <footer className="bg-slate-100 py-12 px-6">
    <div className="max-w-3xl mx-auto text-center">
      {children || (
        <>
          <p className="text-slate-600 mb-4">
            Together helps 500+ companies run mentorship programs at scale.
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-6 text-sm text-slate-500">
            <span>Programs in 90+ countries</span>
            <span className="hidden md:inline">•</span>
            <span>10,000+ participant programs</span>
            <span className="hidden md:inline">•</span>
            <span>Average launch in 14 days</span>
          </div>
        </>
      )}
    </div>
  </footer>
);

export default ArticleFooter;

