import {
  ArticleLayout,
  SectionDivider,
  SelectionGroup,
  MultiSelectGroup,
  ProgressTracker,
  StatBox,
  CalloutBox,
  CaseStudy,
  LeadCapture,
  SummaryView,
} from '../../components';
import { useArticleSelections } from '../../hooks';
import { useCallback } from 'react';
import { generateMentorshipPDF } from '../../utils/pdf/mentorship';

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
  programGoal: [
    { value: "Leadership Development", label: "Leadership Development", description: "Build a pipeline of future leaders by pairing high-potential employees with senior executives" },
    { value: "New Manager Training", label: "New Manager Training", description: "Equip first-time managers with the skills and confidence to lead effectively" },
    { value: "Employee Onboarding", label: "Employee Onboarding", description: "Accelerate time-to-productivity for new hires by connecting them with experienced colleagues" },
    { value: "Diversity, Equity & Inclusion", label: "Diversity, Equity & Inclusion", description: "Create pathways for underrepresented employees to access sponsorship, visibility, and career advancement" },
    { value: "Employee Retention", label: "Employee Retention", description: "Strengthen engagement and reduce turnover by fostering meaningful workplace connections" },
    { value: "Skills Development", label: "Skills Development", description: "Enable targeted skill-building through knowledge transfer from experienced practitioners" },
    { value: "General Career Development", label: "General Career Development", description: "Support employees at all levels in navigating their career paths and growth opportunities" },
    { value: "Culture & Connection", label: "Culture & Connection", description: "Combat isolation in hybrid/remote environments by facilitating cross-functional relationships" },
  ],
  employeePopulations: [
    { value: "New hires (first 90 days)", label: "New hires (first 90 days)" },
    { value: "Individual contributors seeking promotion", label: "Individual contributors seeking promotion" },
    { value: "First-time managers", label: "First-time managers" },
    { value: "High-potential employees", label: "High-potential employees" },
    { value: "Women in leadership pipelines", label: "Women in leadership pipelines" },
    { value: "Underrepresented groups (ERG members)", label: "Underrepresented groups (ERG members)" },
    { value: "Cross-functional movers", label: "Cross-functional movers" },
    { value: "Remote/distributed employees", label: "Remote/distributed employees" },
    { value: "Technical specialists", label: "Technical specialists" },
    { value: "All employees (open enrollment)", label: "All employees (open enrollment)" },
  ],
  programFormat: [
    { value: "Cohort-based", label: "Cohort-based", description: "Fixed duration with structured milestones and defined participant groups" },
    { value: "Always-open", label: "Always-open", description: "Continuous enrollment with flexible, ongoing relationships" },
  ],
  mentoringStyle: [
    { value: "Traditional 1:1 Mentoring", label: "Traditional 1:1 Mentoring", description: "Deep, sustained relationships with dedicated mentor-mentee pairs" },
    { value: "Group Mentoring", label: "Group Mentoring", description: "One mentor guiding multiple mentees through shared sessions" },
    { value: "Peer Mentoring", label: "Peer Mentoring", description: "Colleagues at similar levels learning from each other" },
    { value: "Reverse Mentoring", label: "Reverse Mentoring", description: "Junior employees mentoring senior leaders on specific topics" },
    { value: "Flash Mentoring / Coffee Chats", label: "Flash Mentoring / Coffee Chats", description: "Short-term, informal connections for quick learning or networking" },
  ],
  matchingProcess: [
    { value: "Algorithm-led", label: "Algorithm-led", description: "Automated matching based on skills, goals, and preferences" },
    { value: "Admin-selected", label: "Admin-selected", description: "Program administrators manually create all pairings" },
    { value: "Hybrid", label: "Hybrid", description: "Algorithm generates recommendations; admins review and approve" },
    { value: "Self-directed", label: "Self-directed", description: "Participants browse profiles and choose their own matches" },
  ],
};

// Progress tracker fields configuration
const TRACKER_FIELDS = [
  { key: 'programGoal', label: 'Goal' },
  { key: 'employeePopulations', label: 'Audience' },
  { key: 'programFormat', label: 'Format' },
  { key: 'mentoringStyle', label: 'Style' },
  { key: 'matchingProcess', label: 'Matching' },
];

// Initial selections state
const INITIAL_SELECTIONS = {
  programGoal: null,
  employeePopulations: [],
  programFormat: null,
  mentoringStyle: null,
  matchingProcess: null,
};

function MentorshipTemplateGuide() {
  const {
    selections,
    handleSelect,
    handleEmailChange,
    handleSubmit,
    handleBack,
  } = useArticleSelections(INITIAL_SELECTIONS);

  // Handle multi-select toggle
  const handleMultiSelectToggle = useCallback((field, value) => {
    const currentValues = selections[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleSelect(field, newValues);
  }, [selections, handleSelect]);

  // Handle PDF download
  const handleDownloadPDF = useCallback(async () => {
    try {
      await generateMentorshipPDF(selections, 'mentorship-program-template.pdf');
      
      // Push event to GTM data layer (also tracked in generateMentorshipPDF)
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'pdf_download',
          pdf_name: 'mentorship-program-template',
          program_goal: selections.programGoal,
          program_format: selections.programFormat,
        });
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  }, [selections]);

  // Format multi-select for display
  const formatEmployeePopulations = (populations) => {
    if (!populations || populations.length === 0) return null;
    if (populations.length <= 2) return populations.join(', ');
    return `${populations.length} populations selected`;
  };

  // Show summary view after submission
  if (selections.submitted) {
    return (
      <SummaryView
        title="Your Mentorship Program Template"
        description="Here's a snapshot of the program you're building. Download your personalized PDF template below."
        items={[
          { label: 'Primary Goal', value: selections.programGoal },
          { label: 'Employee Populations', value: selections.employeePopulations?.join(', ') || 'Not selected' },
          { label: 'Program Format', value: selections.programFormat },
          { label: 'Mentoring Style', value: selections.mentoringStyle },
          { label: 'Matching Process', value: selections.matchingProcess },
        ]}
        nextSteps={{
          title: "What happens next?",
          description: "Your customized template includes program overview, implementation timeline, promotion plan, success metrics, and feedback framework—ready to present to leadership or use as your launch roadmap."
        }}
        onDownloadPDF={handleDownloadPDF}
        onBack={handleBack}
      />
    );
  }

  const headerConfig = {
    category: "Interactive Guide",
    title: "The 2026 Framework: A Complete Mentorship Program Template for HR Leaders",
    subtitle: "Interactively build your perfect mentorship program template—tailored to your goals, your people, and your timeline.",
    badges: [
      { icon: <ClockIcon />, text: "10 min read" },
      { icon: <ClipboardIcon />, text: "Interactive selections" },
      { icon: <DownloadIcon />, text: "Get template at end" },
    ],
  };

  // Custom display for progress tracker with multi-select support
  const selectionsForTracker = {
    ...selections,
    employeePopulations: formatEmployeePopulations(selections.employeePopulations),
  };

  return (
    <ArticleLayout
      header={headerConfig}
      floatingElements={<ProgressTracker selections={selectionsForTracker} fields={TRACKER_FIELDS} />}
    >
      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-slate-700 leading-relaxed">
          Most mentorship programs fail before they launch. Not because leaders don&apos;t see the value—they do. But because translating &quot;we need mentoring&quot; into a structured, executable program feels overwhelming.
        </p>

        <p className="text-slate-600 mt-4">
          You don&apos;t need another 50-page guide. You need a framework you can actually use.
        </p>

        <p className="text-slate-600 mt-4">
          This interactive template walks you through the five decisions that define every successful workplace mentorship program. Answer each question, and you&apos;ll walk away with a customized mentoring program template—complete with timelines, metrics, and promotion strategies—ready to present to leadership or launch next quarter.
        </p>
      </div>

      {/* Why Mentorship Programs Fail Section */}
      <SectionDivider number="•" title="Why Mentorship Programs Fail (And How Templates Fix It)" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          The difference between programs that deliver ROI and those that fizzle out? Structure.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-8">
          <StatBox value="50%" label="Higher retention among program participants" />
          <StatBox value="5x" label="More likely to be promoted (mentored employees)" />
        </div>

        <p className="text-slate-600">
          Organizations with formal mentorship programs see 50% higher retention among participants and report that mentored employees are promoted 5x more often than their peers. Yet most HR leaders still rely on ad-hoc matching and hope-based engagement tracking.
        </p>

        <p className="text-slate-600 mt-4">
          Getting the structure right is what separates thriving mentorship programs from abandoned initiatives. The questions below are informed by our experience helping over 500 organizations—from Fortune 500 enterprises to fast-growing startups—launch successful mentoring programs. Each recommendation reflects patterns we&apos;ve seen work across industries, company sizes, and program goals.
        </p>
      </div>

      {/* Step 1: Define Your Program Goal */}
      <SectionDivider number="1" title="Define Your Program Goal" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          Every mentorship program starts with a single question: <em>What business problem are you trying to solve?</em>
        </p>

        <p className="text-slate-600 mt-4">
          Your answer shapes everything—who participates, how you match, what you measure, and how you communicate value to stakeholders.
        </p>
      </div>

      <SelectionGroup
        number={1}
        question="What is the primary goal of your mentorship program?"
        field="programGoal"
        options={SELECTION_OPTIONS.programGoal}
        selectedValue={selections.programGoal}
        onSelect={handleSelect}
        columns={1}
      />

      <div className="bg-brand-indigo rounded-xl p-6 my-8 text-white">
        <div className="text-brand-yellow text-sm font-semibold uppercase tracking-wide mb-2">
          Metric Callout
        </div>
        <p className="text-2xl font-bold mb-2">49% lower turnover.</p>
        <p className="text-white/80">
          Randstad, a global HR consulting firm, achieved a 49% reduction in employee turnover after implementing a structured mentorship program—saving an average of $2,800 per participant annually in retention costs.
        </p>
      </div>

      {/* Step 2: Identify Your Employee Population */}
      <SectionDivider number="2" title="Identify Your Employee Population" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          Who needs mentoring most urgently? And who has the expertise (and bandwidth) to mentor them?
        </p>

        <p className="text-slate-600 mt-4">
          Getting this right prevents the two most common mentorship failures: mentors who are stretched too thin, and mentees who don&apos;t see the relevance to their career.
        </p>
      </div>

      <MultiSelectGroup
        number={2}
        question="Which employee populations will participate in your program?"
        field="employeePopulations"
        options={SELECTION_OPTIONS.employeePopulations}
        selectedValues={selections.employeePopulations}
        onToggle={handleMultiSelectToggle}
        columns={2}
      />

      <CalloutBox
        type="success"
        title="Best Practice"
        message="Match your audience breadth to your program format and goals. Specific populations with specific outcomes—like training first-time managers—benefit from deeper, structured relationships. Broader audiences pursuing general development often thrive with lighter-touch formats like peer mentoring or coffee chats."
      />

      <CalloutBox
        type="warning"
        title="Common Mistake"
        message="Misaligning audience scope with program intensity. If you're targeting general career development across all employees, a traditional 1:1 dedicated mentor model creates unsustainable demand on senior leaders. Conversely, casual coffee chats won't deliver the depth needed to develop first-time managers or prepare high-potentials for executive roles."
      />

      {/* Step 3: Choose Your Program Format */}
      <SectionDivider number="3" title="Choose Your Program Format" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          The structure of your program determines everything from administrative workload to participant experience. There&apos;s no universally &quot;best&quot; format—only the format that fits your goal and your organizational reality.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
          Cohort-Based vs. Always-Open Programs
        </h3>

        <p className="text-slate-600">
          <strong>Cohort programs</strong> run for a fixed duration (typically 3-6 months) with defined start and end dates. Everyone begins together, progresses through structured milestones, and graduates as a group. This format works well for leadership development, onboarding cohorts, or any program where you want to create peer connections alongside mentoring relationships.
        </p>

        <p className="text-slate-600 mt-4">
          <strong>Always-open (evergreen) programs</strong> allow employees to join and exit at any time. Matches continue indefinitely or until participants opt out. This format suits ongoing development needs, culture-building initiatives, or organizations wanting maximum flexibility.
        </p>
      </div>

      <SelectionGroup
        number={3}
        question="Which program format best fits your needs?"
        field="programFormat"
        options={SELECTION_OPTIONS.programFormat}
        selectedValue={selections.programFormat}
        onSelect={handleSelect}
        columns={2}
      />

      <CalloutBox
        type="success"
        title="Best Practice"
        message="Align your format to your goal's timeline. If you need measurable outcomes by a specific date—like preparing a cohort of new managers before Q3 or onboarding a hiring class—cohort programs create accountability and momentum. For ongoing priorities like career development, culture building, or general retention, evergreen programs provide the flexibility for employees to engage when they're ready and stay as long as they're benefiting."
      />

      {/* Step 4: Select Your Mentoring Style */}
      <SectionDivider number="4" title="Select Your Mentoring Style" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          Different mentoring styles serve different purposes. Traditional one-on-one mentoring isn&apos;t always the answer—and increasingly, organizations are blending multiple styles within a single program.
        </p>

        <p className="text-slate-600 mt-4">
          <strong>Traditional 1:1 Mentoring</strong> pairs one mentor with one mentee for sustained, relationship-focused development. Best for deep skill transfer, career guidance, and leadership readiness.
        </p>

        <p className="text-slate-600 mt-4">
          <strong>Group Mentoring</strong> connects one mentor with multiple mentees who learn together. Efficient for scaling expertise and building peer cohorts, though individual attention is limited.
        </p>

        <p className="text-slate-600 mt-4">
          <strong>Peer Mentoring</strong> matches colleagues at similar career stages to learn from each other&apos;s experiences. Powerful for knowledge-sharing across functions and reducing hierarchy barriers.
        </p>

        <p className="text-slate-600 mt-4">
          <strong>Reverse Mentoring</strong> pairs junior employees as mentors to senior leaders—typically for technology adoption, generational insight, or DEI perspective-building.
        </p>

        <p className="text-slate-600 mt-4">
          <strong>Flash Mentoring (Coffee Chats)</strong> facilitates one-time or short-term connections focused on specific questions or networking. Low commitment, high flexibility.
        </p>
      </div>

      <SelectionGroup
        number={4}
        question="Which mentoring style will you use?"
        field="mentoringStyle"
        options={SELECTION_OPTIONS.mentoringStyle}
        selectedValue={selections.mentoringStyle}
        onSelect={handleSelect}
        columns={1}
      />

      <CaseStudy
        label="Case Study"
        title="Cooley LLP's Reverse Mentoring Success"
        description="Global law firm Cooley implemented a reverse mentoring program pairing associates with partners to bridge generational and technological divides."
        stats={[
          { value: "98%", label: "Satisfaction rates" },
        ]}
        quote="The program achieved 98% satisfaction rates and accelerated partner adoption of new collaboration tools—while giving associates unprecedented access to firm leadership."
      />

      {/* Step 5: Define Your Matching Process */}
      <SectionDivider number="5" title="Define Your Matching Process" />

      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">
          The match makes the program. Research consistently shows that mentor-mentee compatibility is the single biggest predictor of program success—and the primary driver of participant satisfaction (or frustration).
        </p>

        <p className="text-slate-600 mt-4">
          You have four matching approaches to choose from:
        </p>

        <p className="text-slate-600 mt-4">
          <strong>Algorithm-led matching</strong> uses registration data—skills, goals, experience, preferences—to automatically generate optimal pairings. Best for large programs, reduces bias, and saves significant admin time.
        </p>

        <p className="text-slate-600 mt-4">
          <strong>Admin-selected matching</strong> puts program administrators in control, manually pairing participants based on organizational knowledge and strategic considerations. Offers maximum control but doesn&apos;t scale well.
        </p>

        <p className="text-slate-600 mt-4">
          <strong>Hybrid matching</strong> combines algorithmic recommendations with admin review and approval. Balances efficiency with human judgment.
        </p>

        <p className="text-slate-600 mt-4">
          <strong>Self-directed matching</strong> empowers participants to browse profiles and select their own mentors. Increases buy-in but can create &quot;popular mentor&quot; bottlenecks.
        </p>
      </div>

      <SelectionGroup
        number={5}
        question="How will mentors and mentees be matched?"
        field="matchingProcess"
        options={SELECTION_OPTIONS.matchingProcess}
        selectedValue={selections.matchingProcess}
        onSelect={handleSelect}
        columns={2}
      />

      <div className="bg-brand-indigo rounded-xl p-6 my-8 text-white">
        <div className="text-brand-yellow text-sm font-semibold uppercase tracking-wide mb-2">
          Metric Callout
        </div>
        <p className="text-2xl font-bold mb-2">5x more promotions.</p>
        <p className="text-white/80">
          Employees who participate in formal mentoring programs are promoted five times more often than those who don&apos;t—and 25% of mentees report salary increases directly attributable to their mentoring relationship.
        </p>
      </div>

      <CaseStudy
        label="Case Study"
        title="Avison Young's DEI Mentorship Impact"
        description="Commercial real estate firm Avison Young launched a mentorship program specifically for women in their organization. By pairing emerging female leaders with senior executives and tracking promotion rates, they demonstrated measurable progress toward gender equity in leadership—while giving participants the sponsorship relationships that drive career advancement."
        stats={[]}
      />

      {/* Lead Capture */}
      <div className="bg-white rounded-2xl border-2 border-brand-yellow p-8 my-12">
        <h3 className="text-2xl font-bold text-brand-indigo mb-4">Get Your Customized Mentorship Program Template</h3>
        <p className="text-brand-indigo/70 mb-4">
          You&apos;ve made the five decisions that define successful mentorship programs. Now let us turn your selections into an actionable plan.
        </p>
        <p className="text-brand-indigo/70 mb-6">
          Your customized template will include:
        </p>
        <ul className="text-brand-indigo/70 mb-6 space-y-2">
          <li>• <strong>Program overview</strong> summarizing your goal, audience, format, style, and matching approach</li>
          <li>• <strong>Implementation timeline</strong> with launch phases, milestones, and registration windows tailored to your format</li>
          <li>• <strong>Promotion plan</strong> with pre-launch, registration, and post-launch activities</li>
          <li>• <strong>Success metrics</strong> aligned to your stated goal—both engagement KPIs and outcome measures</li>
          <li>• <strong>Feedback framework</strong> with session-level pulses, mid-program check-ins, and completion surveys</li>
        </ul>
      </div>

      <LeadCapture
        title="Get Your Program Template"
        description="Submit your selections and receive your customized mentorship program template—ready to present to leadership or use as your launch roadmap."
        buttonText="Get My Template"
        email={selections.email}
        onEmailChange={handleEmailChange}
        onSubmit={handleSubmit}
        secondaryLinks={[
          { href: "https://www.togetherplatform.com/book-a-demo", text: "Book a 15-min consultation" },
        ]}
      />

      {/* About Together */}
      <div className="bg-slate-100 rounded-xl p-6 my-8">
        <h4 className="font-bold text-brand-indigo mb-2">About Together</h4>
        <p className="text-slate-600 text-sm">
          Together is the mentorship platform trusted by enterprises like Randstad, Kellogg&apos;s, and Cooley to launch, manage, and measure mentoring programs at scale. Our platform automates matching, scheduling, and reporting—so you can focus on what matters: developing your people.
        </p>
        <a 
          href="https://www.togetherplatform.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-brand-blue hover:text-brand-indigo font-medium text-sm mt-3 inline-block"
        >
          Learn how Together can help you launch your mentorship program →
        </a>
      </div>
    </ArticleLayout>
  );
}

export default MentorshipTemplateGuide;

