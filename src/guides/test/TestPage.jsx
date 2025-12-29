import { Link } from 'react-router-dom';
import {
  ArticleLayout,
  SectionDivider,
  StatBox,
  CalloutBox,
} from '../../components';

/**
 * TestPage - A dummy test page for development
 */
function TestPage() {
  const headerConfig = {
    category: "Test Page",
    title: "This is a Test Page",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  return (
    <ArticleLayout header={headerConfig}>
      {/* Navigation */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Dummy content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-slate-700 leading-relaxed">
          This is a test page with dummy content. It demonstrates the basic 
          structure of a page using the shared components.
        </p>

        <div className="grid md:grid-cols-3 gap-4 my-8">
          <StatBox value="123" label="Test stat one" />
          <StatBox value="456" label="Test stat two" />
          <StatBox value="789" label="Test stat three" />
        </div>

        <CalloutBox
          type="info"
          title="This is an info callout"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
      </div>

      <SectionDivider number="1" title="First Section" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur.
        </p>
        <p className="text-slate-600 mt-4">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
          officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <SectionDivider number="2" title="Second Section" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa 
          quae ab illo inventore veritatis et quasi architecto beatae vitae 
          dicta sunt explicabo.
        </p>

        <CalloutBox
          type="warning"
          title="Warning callout example"
          message="Nemo enim ipsam voluptatem quia voluptas sit aspernatur."
        />

        <CalloutBox
          type="success"
          title="Success callout example"
          message="At vero eos et accusamus et iusto odio dignissimos ducimus."
        />
      </div>
    </ArticleLayout>
  );
}

export default TestPage;


