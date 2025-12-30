import {
  ArticleLayout,
  SectionDivider,
  SelectionGroup,
  ProgressTracker,
  StatBox,
  CalloutBox,
  CaseStudy,
  LeadCapture,
  SummaryView,
} from '../../components';
import { useArticleSelections } from '../../hooks';
import { generatePDF } from '../../utils/generatePDF';

// Icons for header badges
const ClockIcon = () => (
  <svg className="w-4 h-4 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const ClipboardIcon = () => (
  <svg className="w-4 h-4 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
  </svg>
);

// Selection options configuration
const SELECTION_OPTIONS = {
  employeeSize: [
    { value: "1-249", label: "1-249 employees", description: "Small organization" },
    { value: "250-499", label: "250-499 employees", description: "Small to mid-size organization" },
    { value: "500-999", label: "500-999 employees", description: "Mid-size growing company" },
    { value: "1000-2499", label: "1,000-2,499 employees", description: "Large organization" },
    { value: "2500-5000", label: "2,500-5,000 employees", description: "Enterprise-level company" },
    { value: "5000+", label: "5,000+ employees", description: "Large enterprise organization" },
  ],
  primaryGoal: [
    { value: "Retention & Turnover", label: "Retention & Turnover", description: "Reduce costly attrition, especially among high performers" },
    { value: "Leadership Pipeline", label: "Leadership Pipeline", description: "Develop emerging leaders for succession planning" },
    { value: "DEI & Belonging", label: "DEI & Belonging", description: "Support underrepresented groups and improve inclusion" },
    { value: "Onboarding & Ramp", label: "Onboarding & Ramp", description: "Accelerate time-to-productivity for new hires" },
  ],
  programType: [
    { value: "Traditional 1:1", label: "Traditional 1:1", description: "Senior-junior pairing for career development" },
    { value: "Group Mentoring", label: "Group Mentoring", description: "One mentor with multiple mentees" },
    { value: "Reverse Mentoring", label: "Reverse Mentoring", description: "Junior employees mentor senior leaders" },
    { value: "Peer Mentoring", label: "Peer Mentoring", description: "Similar-level mutual support" },
  ],
  audienceSize: [
    { value: "Pilot (50-200)", label: "Pilot (50-200)", description: "Prove concept before scaling" },
    { value: "Department (200-500)", label: "Department (200-500)", description: "One business unit or function" },
    { value: "Multi-Department (500-2000)", label: "Multi-Department (500-2000)", description: "Several units with phased rollout" },
    { value: "Enterprise (2000+)", label: "Enterprise (2000+)", description: "Organization-wide from launch" },
  ],
  matchingApproach: [
    { value: "Algorithm-led", label: "Algorithm-led", description: "System matches based on goals, skills, preferences" },
    { value: "Admin-curated", label: "Admin-curated", description: "Administrators make final pairing decisions" },
    { value: "Hybrid", label: "Hybrid", description: "Algorithm suggests, admin approves" },
    { value: "Self-service", label: "Self-service", description: "Participants browse and select their own matches" },
  ],
  measurementFocus: [
    { value: "Retention & Turnover", label: "Retention & Turnover", description: "Track participant retention vs. non-participants" },
    { value: "Career Progression", label: "Career Progression", description: "Monitor promotions, role changes, skill growth" },
    { value: "Engagement & Satisfaction", label: "Engagement & Satisfaction", description: "Survey-based feedback and engagement scores" },
    { value: "Time to Productivity", label: "Time to Productivity", description: "New hire ramp time and performance milestones" },
    { value: "Manager Effectiveness", label: "Manager Effectiveness", description: "Improve people management skills and effectiveness" },
  ],
  timeline: [
    { value: "This quarter", label: "This quarter", description: "Ready to move quickly" },
    { value: "Next quarter", label: "Next quarter", description: "Building the case now" },
    { value: "6+ months", label: "6+ months", description: "Planning for future budget cycle" },
    { value: "Exploring options", label: "Exploring options", description: "Just researching for now" },
  ],
};

// Progress tracker fields configuration
const TRACKER_FIELDS = [
  { key: 'primaryGoal', label: 'Goal' },
  { key: 'employeeSize', label: 'Company Size' },
  { key: 'programType', label: 'Type' },
  { key: 'audienceSize', label: 'Size' },
  { key: 'matchingApproach', label: 'Matching' },
  { key: 'measurementFocus', label: 'Measure' },
  { key: 'timeline', label: 'Timeline' },
];

// Initial selections state
const INITIAL_SELECTIONS = {
  primaryGoal: null,
  employeeSize: null,
  programType: null,
  audienceSize: null,
  matchingApproach: null,
  measurementFocus: null,
  timeline: null,
};

function BusinessCaseGuide() {
  const {
    selections,
    handleSelect,
    handleEmailChange,
    handleSubmit,
    handleBack,
  } = useArticleSelections(INITIAL_SELECTIONS);

  // Handle PDF download
  const handleDownloadPDF = () => {
    generatePDF(selections, 'mentorship-business-case.pdf');
    
    // Push event to GTM data layer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pdf_download',
        pdf_name: 'mentorship-business-case',
        employee_size: selections.employeeSize,
        primary_goal: selections.primaryGoal,
      });
    }
  };

  // Show summary view after submission
  if (selections.submitted) {
    return (
      <SummaryView
        title="Your Mentorship Program Summary"
        description="Here's a snapshot of the program you're building. Our team will reach out with customized recommendations."
        items={[
          { label: 'Primary Goal', value: selections.primaryGoal },
          { label: 'Company Size', value: selections.employeeSize && `${selections.employeeSize} employees` },
          { label: 'Program Type', value: selections.programType },
          { label: 'Audience Size', value: selections.audienceSize },
          { label: 'Matching Approach', value: selections.matchingApproach },
          { label: 'Measurement Focus', value: selections.measurementFocus },
          { label: 'Timeline', value: selections.timeline },
        ]}
        nextSteps={{
          title: "What happens next?",
          description: "Our team will review your selections and send you a customized proposal template and ROI projection within 24 hours."
        }}
        onDownloadPDF={handleDownloadPDF}
        onBack={handleBack}
      />
    );
  }

  const headerConfig = {
    category: "Interactive Guide",
    title: "The 5-Step Business Case for Enterprise Mentorship",
    subtitle: 'Your CEO doesn\'t care about "connection"—they care about retention and ROI. Build your internal pitch as you read.',
    badges: [
      { icon: <ClockIcon />, text: "12 min read" },
      { icon: <ClipboardIcon />, text: "Interactive selections" },
      { icon: <DownloadIcon />, text: "Get summary at end" },
    ],
  };

  return (
    <ArticleLayout
      header={headerConfig}
      floatingElements={<ProgressTracker selections={selections} fields={TRACKER_FIELDS} />}
    >
      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-slate-700 leading-relaxed">
          You know mentorship works. You&apos;ve seen it transform careers
          informally for years. Now you need to turn that intuition into a
          formal program—and that means convincing leadership to invest.
        </p>

        <p className="text-slate-600 mt-4">
          Here&apos;s the challenge: 67% of mentorship programs fail within the
          first year, not because mentorship doesn&apos;t work, but because
          programs lack the structure, measurement, and executive buy-in
          needed to sustain them.
        </p>

        <div className="grid md:grid-cols-3 gap-4 my-8">
          <StatBox value="$3.2M" label="Saved by CDM Smith in one year" />
          <StatBox value="5x" label="Higher promotion rate for mentees" />
          <StatBox value="50%" label="Better retention with mentorship" />
        </div>

        <p className="text-slate-600">
          This guide will walk you through exactly how to build a business
          case that gets approved. As you read, you&apos;ll make selections about
          your program—at the end, you&apos;ll have a customized summary to share
          with stakeholders.
        </p>
      </div>

      {/* Section 1 */}
      <SectionDivider number="1" title="Define Your Business Objective" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          The single biggest mistake L&D professionals make when pitching
          mentorship? Leading with the program instead of the problem.
        </p>

        <p className="text-slate-600 mt-4">
          Your CFO doesn&apos;t wake up thinking &quot;we need mentorship.&quot; They wake up
          thinking about turnover costs, leadership pipeline gaps, and
          engagement scores. Your job is to connect mentorship to the business
          outcomes they already care about.
        </p>

        <p className="text-slate-600 mt-4">
          Consider CDM Smith, an engineering firm with 5,000+ employees. They
          didn&apos;t pitch &quot;mentorship software.&quot; They pitched a solution to their
          retention challenge—and saw a 5% improvement in retention that
          translated to $3.2 million in savings within one year.
        </p>

        <CalloutBox
          type="warning"
          title={'The Hidden Need Behind "Mentorship Program Proposal"'}
          message="You're not just looking for a proposal template. You need to transform mentorship from a vague idea into something with internal traction. That requires speaking the language of business outcomes, not HR buzzwords."
        />
      </div>

      <SelectionGroup
        number={1}
        question="What's the primary business objective you're trying to address?"
        field="primaryGoal"
        options={SELECTION_OPTIONS.primaryGoal}
        selectedValue={selections.primaryGoal}
        onSelect={handleSelect}
      />

      {/* Section 2 */}
      <SectionDivider number="2" title="Quantify the Cost of Inaction" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          Before you can make the case for investment, you need to make the
          case that the status quo is costing money. This is where most
          proposals fall short—they jump straight to &quot;mentorship benefits&quot;
          without establishing the baseline pain.
        </p>

        <p className="text-slate-600 mt-4">
          Let&apos;s do the math. If you&apos;re a 1,000-person company with 20% annual
          turnover (the US average), you&apos;re losing 200 employees per year. At
          an average replacement cost of 75% of salary—which includes
          recruiting, onboarding, lost productivity, and knowledge
          transfer—that&apos;s $7.5 million annually for a workforce with a $50K
          average salary. For professional roles, it&apos;s often higher.
        </p>

        <div className="bg-slate-100 rounded-xl p-6 my-6 font-mono text-sm">
          <p className="text-slate-500 mb-2">// Turnover cost formula</p>
          <p className="text-slate-800">
            Annual Turnover Cost = Employees × Turnover Rate × (Avg Salary × 0.75)
          </p>
          <p className="text-slate-800 mt-2">
            1,000 × 0.20 × ($50,000 × 0.75) = <strong>$7,500,000</strong>
          </p>
        </div>

        <p className="text-slate-600">
          Studies consistently show mentorship programs reduce turnover by
          25-50% among participants. Even a conservative 25% reduction in a
          500-person participant cohort could save over $900,000 annually.
        </p>

        <p className="text-slate-600 mt-4">
          This is the number that gets CFO attention. Not &quot;improved
          engagement&quot; or &quot;better culture&quot;—dollars saved.
        </p>
      </div>

      <SelectionGroup
        number={2}
        question="How many employees does your organization have?"
        field="employeeSize"
        options={SELECTION_OPTIONS.employeeSize}
        selectedValue={selections.employeeSize}
        onSelect={handleSelect}
      />

      {/* Section 3 */}
      <SectionDivider number="3" title="Choose Your Program Model" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          Not all mentorship programs are created equal. The right model
          depends on your objectives, audience, and organizational culture.
          Here&apos;s how to think about the key decisions:
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
          Program Types
        </h3>
        <p className="text-slate-600">
          <strong>Traditional 1:1 Mentorship</strong> pairs a senior employee
          with a junior one for ongoing developmental conversations. It&apos;s
          ideal for career development and retention, typically running 6-12
          months.
        </p>
        <p className="text-slate-600 mt-3">
          <strong>Group Mentoring</strong> connects one mentor with multiple
          mentees, creating peer learning alongside mentor guidance. It&apos;s
          efficient for scaling and works well for cohort-based programs.
        </p>
        <p className="text-slate-600 mt-3">
          <strong>Reverse Mentoring</strong> flips the script—junior employees
          mentor senior leaders on topics like technology, generational
          perspectives, or emerging trends. It&apos;s powerful for inclusion and
          breaking down hierarchical barriers.
        </p>
        <p className="text-slate-600 mt-3">
          <strong>Peer Mentoring</strong> matches employees at similar levels
          for mutual support and knowledge sharing. It builds community and is
          especially effective for remote teams.
        </p>
      </div>

      <SelectionGroup
        number={3}
        question="Which program model aligns best with your objectives?"
        field="programType"
        options={SELECTION_OPTIONS.programType}
        selectedValue={selections.programType}
        onSelect={handleSelect}
      />

      <div className="prose prose-lg max-w-none">
        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
          Audience Scope
        </h3>
        <p className="text-slate-600">
          Should you start with a pilot or go organization-wide? The answer
          depends on your risk tolerance and organizational culture.
        </p>
        <p className="text-slate-600 mt-3">
          A pilot lets you prove concept with a smaller group (typically
          50-200 participants), gather data, and iterate before scaling. It&apos;s
          lower risk but takes longer to demonstrate enterprise impact.
        </p>
        <p className="text-slate-600 mt-3">
          An enterprise launch makes mentorship available to everyone from day
          one. It signals organizational commitment and creates more data
          faster, but requires more upfront investment in change management.
        </p>
        <p className="text-slate-600 mt-3">
          CDM Smith took a phased approach—starting with one business unit,
          then expanding to 3,400 mentees and 1,950 mentors across the
          organization. This hybrid approach let them refine their model while
          demonstrating scalability.
        </p>
      </div>

      <SelectionGroup
        number={4}
        question="What's your target audience size for the initial program?"
        field="audienceSize"
        options={SELECTION_OPTIONS.audienceSize}
        selectedValue={selections.audienceSize}
        onSelect={handleSelect}
      />

      {/* Section 4 */}
      <SectionDivider number="4" title="Address the Matching Challenge" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          Here&apos;s where many programs quietly fail: the match. A poor
          mentor-mentee pairing doesn&apos;t just waste time—it actively damages
          participants&apos; perception of mentorship and makes future programs
          harder to sell internally.
        </p>

        <p className="text-slate-600 mt-4">
          Manual matching (the spreadsheet-and-manager-network approach) has
          two critical flaws. First, it doesn&apos;t scale—matching 200 participants
          manually takes 40+ hours of administrative time. Second, it&apos;s limited
          by the matcher&apos;s network. As one CDM Smith leader put it, &quot;matching
          opportunities extended only as far as the manager&apos;s network.&quot;
        </p>

        <p className="text-slate-600 mt-4">
          Algorithm-based matching considers multiple variables simultaneously:
          goals, skills, experience level, location, availability, personality
          preferences, and more. It expands the pool of potential matches
          beyond any single person&apos;s network and achieves 95%+ match satisfaction
          rates compared to 60-70% for self-service approaches.
        </p>

        <CalloutBox
          type="success"
          title="Together's Matching Algorithm"
          message={'Together\'s matching considers 30+ variables and achieves 98% participant satisfaction with matches. The platform supports administrator oversight—you maintain the "people connection" while eliminating manual busywork.'}
        />
      </div>

      <SelectionGroup
        number={5}
        question="How do you want to handle mentor-mentee matching?"
        field="matchingApproach"
        options={SELECTION_OPTIONS.matchingApproach}
        selectedValue={selections.matchingApproach}
        onSelect={handleSelect}
      />

      {/* Section 5 */}
      <SectionDivider number="5" title="Build Your Measurement Framework" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          The programs that get sustained investment are the ones that prove
          their value. Your measurement framework should connect program
          activities to business outcomes your stakeholders care about.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
          What to Measure
        </h3>

        <p className="text-slate-600">
          <strong>Leading indicators</strong> tell you if the program is on
          track: registration rates, match acceptance, session frequency,
          agenda completion. These help you intervene early if engagement
          drops.
        </p>

        <p className="text-slate-600 mt-3">
          <strong>Lagging indicators</strong> show business impact: retention
          rates (participants vs. non-participants), promotion rates, time to
          productivity, engagement scores. These take longer to materialize
          but are what leadership cares about.
        </p>

        <p className="text-slate-600 mt-3">
          <strong>Qualitative feedback</strong> adds context: participant
          satisfaction, skill development, relationship quality. These
          explain the &quot;why&quot; behind the numbers.
        </p>

        <p className="text-slate-600 mt-4">
          CDM Smith tracked all three. Their data showed 96% of participants
          reported gains in confidence and leadership capabilities, 34% of
          mentees received promotions (compared to 13% of non-participants),
          and the program achieved 4.51/5 satisfaction among mentees.
        </p>
      </div>

      <SelectionGroup
        number={6}
        question="What's your primary measurement focus?"
        field="measurementFocus"
        options={SELECTION_OPTIONS.measurementFocus}
        selectedValue={selections.measurementFocus}
        onSelect={handleSelect}
      />

      <div className="prose prose-lg max-w-none">
        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
          Timeline Expectations
        </h3>

        <p className="text-slate-600">
          Set realistic expectations with stakeholders. Leading indicators
          (engagement, satisfaction) show within 30-60 days. Lagging
          indicators (retention, promotions) take 6-12 months to demonstrate
          statistical significance.
        </p>

        <p className="text-slate-600 mt-3">
          Plan for quarterly reviews with executive sponsors, showing both
          activity metrics and early signals of business impact. This keeps
          the program visible and builds confidence before hard ROI data is
          available.
        </p>
      </div>

      <SelectionGroup
        number={7}
        question="When are you hoping to launch your program?"
        field="timeline"
        options={SELECTION_OPTIONS.timeline}
        selectedValue={selections.timeline}
        onSelect={handleSelect}
      />

      {/* Case Study */}
      <CaseStudy
        label="Case Study"
        title="CDM Smith: From Manual to $3.2M in Savings"
        description="CDM Smith, a 5,000+ employee engineering firm, transformed their Career Compass mentorship program from a manually-coordinated, single-business-unit initiative to an enterprise-wide platform."
        stats={[
          { value: "3,400", label: "Registered mentees" },
          { value: "34%", label: "Mentee promotion rate" },
          { value: "5%", label: "Retention improvement" },
        ]}
        quote="By integrating Together's smart matching and analytics into our Career Compass program, we transformed mentorship from a manual, limited initiative into a scalable, data-driven experience."
        attribution="Jason Beck, Manager of Learning Systems, CDM Smith"
      />

      {/* Lead Capture */}
      <LeadCapture
        title="Get Your Personalized Summary"
        description="Based on your selections, we'll send you a customized proposal outline and ROI projection. No sales pitch—just practical resources to help you build your business case."
        buttonText="Get My Summary"
        email={selections.email}
        onEmailChange={handleEmailChange}
        onSubmit={handleSubmit}
        secondaryLinks={[
          { href: "https://www.togetherplatform.com/", text: "Book a 15-min consultation" },
        ]}
      />
    </ArticleLayout>
  );
}

export default BusinessCaseGuide;

