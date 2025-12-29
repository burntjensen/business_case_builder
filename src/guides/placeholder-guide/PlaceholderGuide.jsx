import { Link } from 'react-router-dom';
import {
  ArticleLayout,
  SectionDivider,
  SelectionGroup,
  ProgressTracker,
  StatBox,
  CalloutBox,
  LeadCapture,
  SummaryView,
} from '../../components';
import { useArticleSelections } from '../../hooks';

/**
 * PlaceholderGuide - Example second guide demonstrating the pattern
 * 
 * This shows how to create a new interactive article using the shared components.
 * Each guide defines its own:
 * - Header configuration
 * - Selection options
 * - Tracker fields
 * - Content
 */

// Icons for header badges
const ClockIcon = () => (
  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Selection options for this guide
const SELECTION_OPTIONS = {
  programGoal: [
    { value: "Skill Development", label: "Skill Development", description: "Build specific technical or soft skills" },
    { value: "Career Transition", label: "Career Transition", description: "Support employees changing roles or paths" },
    { value: "Knowledge Transfer", label: "Knowledge Transfer", description: "Preserve institutional knowledge" },
  ],
  duration: [
    { value: "3 months", label: "3 months", description: "Quick sprint for focused goals" },
    { value: "6 months", label: "6 months", description: "Standard program length" },
    { value: "12 months", label: "12 months", description: "Deep, long-term development" },
  ],
};

// Progress tracker fields
const TRACKER_FIELDS = [
  { key: 'programGoal', label: 'Goal' },
  { key: 'duration', label: 'Duration' },
];

// Initial selections
const INITIAL_SELECTIONS = {
  programGoal: null,
  duration: null,
};

function PlaceholderGuide() {
  const {
    selections,
    handleSelect,
    handleEmailChange,
    handleSubmit,
    handleBack,
  } = useArticleSelections(INITIAL_SELECTIONS);

  // Show summary view after submission
  if (selections.submitted) {
    return (
      <SummaryView
        title="Your Program Summary"
        description="Here's a snapshot of your selections."
        items={[
          { label: 'Program Goal', value: selections.programGoal },
          { label: 'Duration', value: selections.duration },
        ]}
        nextSteps={{
          title: "What happens next?",
          description: "This is a placeholder guide. In a real guide, you'd receive customized resources here."
        }}
        onBack={handleBack}
      />
    );
  }

  const headerConfig = {
    category: "Interactive Guide",
    title: "Placeholder Guide: How to Create New Articles",
    subtitle: "This is an example showing the pattern for creating new interactive articles. Copy this structure for your next guide.",
    badges: [
      { icon: <ClockIcon />, text: "5 min read" },
      { icon: <StarIcon />, text: "Example guide" },
    ],
  };

  return (
    <ArticleLayout
      header={headerConfig}
      floatingElements={<ProgressTracker selections={selections} fields={TRACKER_FIELDS} />}
    >
      {/* Navigation back */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
        >
          ← Back to Business Case Guide
        </Link>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-slate-700 leading-relaxed">
          This is a placeholder guide demonstrating how to create new interactive 
          articles using the shared component library. Each guide is self-contained 
          with its own content, but uses common building blocks.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-8">
          <StatBox value="10+" label="Shared components available" />
          <StatBox value="~50" label="Lines of config per guide" />
        </div>

        <CalloutBox
          type="info"
          title="How to Create a New Guide"
          message="1. Create a new folder in /src/guides/ 2. Copy this file as a starting point 3. Define your selection options and tracker fields 4. Write your content using the shared components 5. Add a route in App.jsx"
        />
      </div>

      {/* Section 1 */}
      <SectionDivider number="1" title="Define Your Selection Options" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          Each guide defines its own selection options. These are configured at 
          the top of your guide component and passed to SelectionGroup components.
        </p>
      </div>

      <SelectionGroup
        number={1}
        question="What's the primary goal of your program?"
        field="programGoal"
        options={SELECTION_OPTIONS.programGoal}
        selectedValue={selections.programGoal}
        onSelect={handleSelect}
      />

      {/* Section 2 */}
      <SectionDivider number="2" title="Configure the Progress Tracker" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          The ProgressTracker component accepts a fields array that defines 
          which selections to display. Each field has a key (matching your 
          selection state) and a display label.
        </p>
      </div>

      <SelectionGroup
        number={2}
        question="How long should the program run?"
        field="duration"
        options={SELECTION_OPTIONS.duration}
        selectedValue={selections.duration}
        onSelect={handleSelect}
      />

      {/* Lead Capture */}
      <LeadCapture
        title="Complete This Example"
        description="This demonstrates the lead capture component. In your guide, customize the title, description, and follow-up actions."
        buttonText="Get Summary"
        email={selections.email}
        onEmailChange={handleEmailChange}
        onSubmit={handleSubmit}
        secondaryLinks={[
          { href: "https://github.com", text: "View source code" },
        ]}
      />
    </ArticleLayout>
  );
}

export default PlaceholderGuide;

