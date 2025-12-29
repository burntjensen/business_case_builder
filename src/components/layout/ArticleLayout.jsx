import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';

/**
 * ArticleLayout - Wrapper component for interactive articles
 * 
 * @param {Object} header - Props for ArticleHeader { category, title, subtitle, badges }
 * @param {ReactNode} footer - Custom footer content (optional)
 * @param {ReactNode} children - Main article content
 * @param {ReactNode} floatingElements - Fixed position elements (like ProgressTracker)
 */
const ArticleLayout = ({ header, footer, children, floatingElements }) => (
  <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <ArticleHeader {...header} />
    
    <main className="max-w-3xl mx-auto px-6 py-12">
      {children}
    </main>
    
    {floatingElements}
    
    <ArticleFooter>{footer}</ArticleFooter>
  </div>
);

export default ArticleLayout;

