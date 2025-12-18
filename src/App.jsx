import { useState, useCallback, useMemo, useEffect, useRef } from "react";

// Selection Card Component
const SelectionCard = ({ field, value, label, description, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(field, value)}
    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
      selected
        ? "border-emerald-600 bg-emerald-50"
        : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50"
    }`}
    aria-pressed={selected}
  >
    <div className="flex items-start gap-3">
      <div
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
          selected ? "border-emerald-600 bg-emerald-600" : "border-slate-300"
        }`}
        aria-hidden="true"
      >
        {selected && (
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div>
        <div className="font-semibold text-slate-800">{label}</div>
        <div className="text-sm text-slate-600 mt-1">{description}</div>
      </div>
    </div>
  </button>
);

// Section Divider Component
const SectionDivider = ({ number, title }) => (
  <div className="flex items-center gap-4 my-12">
    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
      {number}
    </div>
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    <div className="flex-1 h-px bg-slate-200" aria-hidden="true"></div>
  </div>
);

// Stat Box Component
const StatBox = ({ value, label }) => (
  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
    <div className="text-3xl font-bold text-emerald-700">{value}</div>
    <div className="text-sm text-slate-600 mt-1">{label}</div>
  </div>
);

// Progress Tracker Component - iframe compatible
const ProgressTracker = ({ selections }) => {
  const [transformOffset, setTransformOffset] = useState(0);
  const trackerRef = useRef(null);

  const selectionCount = useMemo(() => {
    const fields = ['primaryGoal', 'programType', 'audienceSize', 'matchingApproach', 'measurementFocus', 'timeline'];
    return fields.filter(field => selections[field]).length;
  }, [selections]);

  const progressPercent = (selectionCount / 6) * 100;

  useEffect(() => {
    const updatePosition = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bottomMargin = 24;
      
      // Position tracker at bottom of document (bottom: 24px, position: absolute)
      // Use transform to keep it at bottom of viewport as we scroll
      // When at top of page: move tracker up to viewport bottom
      // When at bottom of page: tracker naturally at viewport bottom (offset = 0)
      const distanceFromBottom = documentHeight - viewportHeight - scrollY;
      
      // Calculate offset: move tracker up only if it would be below viewport
      // When distanceFromBottom > bottomMargin: tracker is below viewport, move it up
      // When distanceFromBottom <= bottomMargin: tracker is in viewport, no offset needed
      const offset = -Math.max(0, distanceFromBottom - bottomMargin);
      
      // Clamp offset to prevent moving tracker above viewport top
      const maxOffset = -(documentHeight - viewportHeight - bottomMargin);
      const clampedOffset = Math.max(maxOffset, offset);
      
      setTransformOffset(clampedOffset);
    };

    updatePosition();
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return (
    <div 
      ref={trackerRef}
      className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 w-64 hidden md:block"
      style={{
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        transform: `translateY(${transformOffset}px)`,
        willChange: 'transform',
      }}
    >
      <div className="text-sm font-semibold text-slate-700 mb-3">
        Your Selections
      </div>
      <div className="space-y-2 text-sm">
        {[
          { key: 'primaryGoal', label: 'Goal' },
          { key: 'programType', label: 'Type' },
          { key: 'audienceSize', label: 'Size' },
          { key: 'matchingApproach', label: 'Matching' },
          { key: 'measurementFocus', label: 'Measure' },
          { key: 'timeline', label: 'Timeline' },
        ].map(({ key, label }) => (
          <div key={key} className="flex justify-between">
            <span className="text-slate-500">{label}</span>
            <span
              className={
                selections[key]
                  ? "text-emerald-600 font-medium"
                  : "text-slate-300"
              }
            >
              {selections[key] || "—"}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100">
        <div className="w-full bg-slate-100 rounded-full h-2" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Summary View Component
const SummaryView = ({ selections, onBack }) => (
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
          Your Mentorship Program Summary
        </h2>
        <p className="text-slate-600 text-center mb-8">
          Here&apos;s a snapshot of the program you&apos;re building. Our team will
          reach out with customized recommendations.
        </p>

        <div className="space-y-4 bg-slate-50 rounded-xl p-6">
          {[
            { label: 'Primary Goal', value: selections.primaryGoal },
            { label: 'Program Type', value: selections.programType },
            { label: 'Audience Size', value: selections.audienceSize },
            { label: 'Matching Approach', value: selections.matchingApproach },
            { label: 'Measurement Focus', value: selections.measurementFocus },
            { label: 'Timeline', value: selections.timeline },
          ].map(({ label, value }, index, arr) => (
            <div 
              key={label} 
              className={`flex justify-between py-2 ${index < arr.length - 1 ? 'border-b border-slate-200' : ''}`}
            >
              <span className="text-slate-600">{label}</span>
              <span className="font-semibold text-slate-800">
                {value || "Not selected"}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-emerald-600 rounded-xl text-white text-center">
          <p className="text-lg font-semibold mb-2">What happens next?</p>
          <p className="text-emerald-100 text-sm">
            Our team will review your selections and send you a customized
            proposal template and ROI projection within 24 hours.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 text-emerald-600 hover:text-emerald-700 font-medium text-sm w-full text-center"
        >
          ← Back to article
        </button>
      </div>
    </div>
  </div>
);

// Main App Component
function App() {
  const [selections, setSelections] = useState({
    primaryGoal: null,
    programType: null,
    audienceSize: null,
    matchingApproach: null,
    measurementFocus: null,
    timeline: null,
    email: "",
    submitted: false,
  });

  const handleSelect = useCallback((field, value) => {
    setSelections((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (selections.email && selections.email.includes('@')) {
      setSelections((prev) => ({ ...prev, submitted: true }));
    }
  }, [selections.email]);

  const handleBack = useCallback(() => {
    setSelections((prev) => ({ ...prev, submitted: false }));
  }, []);

  const handleEmailChange = useCallback((e) => {
    setSelections((prev) => ({ ...prev, email: e.target.value }));
  }, []);

  if (selections.submitted) {
    return <SummaryView selections={selections} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-4">
            Interactive Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            The 5-Step Business Case for Enterprise Mentorship
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Your CEO doesn&apos;t care about &quot;connection&quot;—they care about retention
            and ROI. Build your internal pitch as you read.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 text-sm">
            <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>12 min read</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Interactive selections</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Get summary at end</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Section 1: Hook */}
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

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-amber-800">
                  The Hidden Need Behind &quot;Mentorship Program Proposal&quot;
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  You&apos;re not just looking for a proposal template. You need to
                  transform mentorship from a vague idea into something with
                  internal traction. That requires speaking the language of
                  business outcomes, not HR buzzwords.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Selection: Primary Goal */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 my-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xs font-bold">1</span>
            </div>
            <span className="font-semibold text-slate-700">Your Selection</span>
          </div>
          <p className="text-slate-800 font-medium mb-4">
            What&apos;s the primary business objective you&apos;re trying to address?
          </p>
          <div className="grid md:grid-cols-2 gap-3" role="group" aria-label="Primary business objective">
            <SelectionCard
              field="primaryGoal"
              value="Retention & Turnover"
              label="Retention & Turnover"
              description="Reduce costly attrition, especially among high performers"
              selected={selections.primaryGoal === "Retention & Turnover"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="primaryGoal"
              value="Leadership Pipeline"
              label="Leadership Pipeline"
              description="Develop emerging leaders for succession planning"
              selected={selections.primaryGoal === "Leadership Pipeline"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="primaryGoal"
              value="DEI & Belonging"
              label="DEI & Belonging"
              description="Support underrepresented groups and improve inclusion"
              selected={selections.primaryGoal === "DEI & Belonging"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="primaryGoal"
              value="Onboarding & Ramp"
              label="Onboarding & Ramp"
              description="Accelerate time-to-productivity for new hires"
              selected={selections.primaryGoal === "Onboarding & Ramp"}
              onSelect={handleSelect}
            />
          </div>
        </div>

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
              Annual Turnover Cost = Employees × Turnover Rate × (Avg Salary ×
              0.75)
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

        {/* Interactive Selection: Program Type */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 my-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xs font-bold">2</span>
            </div>
            <span className="font-semibold text-slate-700">Your Selection</span>
          </div>
          <p className="text-slate-800 font-medium mb-4">
            Which program model aligns best with your objectives?
          </p>
          <div className="grid md:grid-cols-2 gap-3" role="group" aria-label="Program model">
            <SelectionCard
              field="programType"
              value="Traditional 1:1"
              label="Traditional 1:1"
              description="Senior-junior pairing for career development"
              selected={selections.programType === "Traditional 1:1"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="programType"
              value="Group Mentoring"
              label="Group Mentoring"
              description="One mentor with multiple mentees"
              selected={selections.programType === "Group Mentoring"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="programType"
              value="Reverse Mentoring"
              label="Reverse Mentoring"
              description="Junior employees mentor senior leaders"
              selected={selections.programType === "Reverse Mentoring"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="programType"
              value="Peer Mentoring"
              label="Peer Mentoring"
              description="Similar-level mutual support"
              selected={selections.programType === "Peer Mentoring"}
              onSelect={handleSelect}
            />
          </div>
        </div>

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

        {/* Interactive Selection: Audience Size */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 my-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xs font-bold">3</span>
            </div>
            <span className="font-semibold text-slate-700">Your Selection</span>
          </div>
          <p className="text-slate-800 font-medium mb-4">
            What&apos;s your target audience size for the initial program?
          </p>
          <div className="grid md:grid-cols-2 gap-3" role="group" aria-label="Audience size">
            <SelectionCard
              field="audienceSize"
              value="Pilot (50-200)"
              label="Pilot (50-200)"
              description="Prove concept before scaling"
              selected={selections.audienceSize === "Pilot (50-200)"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="audienceSize"
              value="Department (200-500)"
              label="Department (200-500)"
              description="One business unit or function"
              selected={selections.audienceSize === "Department (200-500)"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="audienceSize"
              value="Multi-Department (500-2000)"
              label="Multi-Department (500-2000)"
              description="Several units with phased rollout"
              selected={selections.audienceSize === "Multi-Department (500-2000)"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="audienceSize"
              value="Enterprise (2000+)"
              label="Enterprise (2000+)"
              description="Organization-wide from launch"
              selected={selections.audienceSize === "Enterprise (2000+)"}
              onSelect={handleSelect}
            />
          </div>
        </div>

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

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-emerald-800">
                  Together&apos;s Matching Algorithm
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  Together&apos;s matching considers 30+ variables and achieves 98%
                  participant satisfaction with matches. The platform supports
                  administrator oversight—you maintain the &quot;people connection&quot;
                  while eliminating manual busywork.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Selection: Matching Approach */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 my-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xs font-bold">4</span>
            </div>
            <span className="font-semibold text-slate-700">Your Selection</span>
          </div>
          <p className="text-slate-800 font-medium mb-4">
            How do you want to handle mentor-mentee matching?
          </p>
          <div className="grid md:grid-cols-2 gap-3" role="group" aria-label="Matching approach">
            <SelectionCard
              field="matchingApproach"
              value="Algorithm-led"
              label="Algorithm-led"
              description="System matches based on goals, skills, preferences"
              selected={selections.matchingApproach === "Algorithm-led"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="matchingApproach"
              value="Admin-curated"
              label="Admin-curated"
              description="Administrators make final pairing decisions"
              selected={selections.matchingApproach === "Admin-curated"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="matchingApproach"
              value="Hybrid"
              label="Hybrid"
              description="Algorithm suggests, admin approves"
              selected={selections.matchingApproach === "Hybrid"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="matchingApproach"
              value="Self-service"
              label="Self-service"
              description="Participants browse and select their own matches"
              selected={selections.matchingApproach === "Self-service"}
              onSelect={handleSelect}
            />
          </div>
        </div>

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

        {/* Interactive Selection: Measurement Focus */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 my-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xs font-bold">5</span>
            </div>
            <span className="font-semibold text-slate-700">Your Selection</span>
          </div>
          <p className="text-slate-800 font-medium mb-4">
            What&apos;s your primary measurement focus?
          </p>
          <div className="grid md:grid-cols-2 gap-3" role="group" aria-label="Measurement focus">
            <SelectionCard
              field="measurementFocus"
              value="Retention & Turnover"
              label="Retention & Turnover"
              description="Track participant retention vs. non-participants"
              selected={selections.measurementFocus === "Retention & Turnover"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="measurementFocus"
              value="Career Progression"
              label="Career Progression"
              description="Monitor promotions, role changes, skill growth"
              selected={selections.measurementFocus === "Career Progression"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="measurementFocus"
              value="Engagement & Satisfaction"
              label="Engagement & Satisfaction"
              description="Survey-based feedback and engagement scores"
              selected={selections.measurementFocus === "Engagement & Satisfaction"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="measurementFocus"
              value="Time to Productivity"
              label="Time to Productivity"
              description="New hire ramp time and performance milestones"
              selected={selections.measurementFocus === "Time to Productivity"}
              onSelect={handleSelect}
            />
          </div>
        </div>

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

        {/* Interactive Selection: Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 my-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xs font-bold">6</span>
            </div>
            <span className="font-semibold text-slate-700">Your Selection</span>
          </div>
          <p className="text-slate-800 font-medium mb-4">
            When are you hoping to launch your program?
          </p>
          <div className="grid md:grid-cols-2 gap-3" role="group" aria-label="Timeline">
            <SelectionCard
              field="timeline"
              value="This quarter"
              label="This quarter"
              description="Ready to move quickly"
              selected={selections.timeline === "This quarter"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="timeline"
              value="Next quarter"
              label="Next quarter"
              description="Building the case now"
              selected={selections.timeline === "Next quarter"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="timeline"
              value="6+ months"
              label="6+ months"
              description="Planning for future budget cycle"
              selected={selections.timeline === "6+ months"}
              onSelect={handleSelect}
            />
            <SelectionCard
              field="timeline"
              value="Exploring options"
              label="Exploring options"
              description="Just researching for now"
              selected={selections.timeline === "Exploring options"}
              onSelect={handleSelect}
            />
          </div>
        </div>

        {/* Case Study Highlight */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 my-12 text-white">
          <div className="text-emerald-400 text-sm font-semibold uppercase tracking-wide mb-3">
            Case Study
          </div>
          <h3 className="text-2xl font-bold mb-4">
            CDM Smith: From Manual to $3.2M in Savings
          </h3>
          <p className="text-slate-300 mb-6">
            CDM Smith, a 5,000+ employee engineering firm, transformed their
            Career Compass mentorship program from a manually-coordinated,
            single-business-unit initiative to an enterprise-wide platform.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-400">3,400</div>
              <div className="text-sm text-slate-400">Registered mentees</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-400">34%</div>
              <div className="text-sm text-slate-400">
                Mentee promotion rate
              </div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-400">5%</div>
              <div className="text-sm text-slate-400">Retention improvement</div>
            </div>
          </div>

          <p className="text-slate-400 text-sm italic">
            &quot;By integrating Together&apos;s smart matching and analytics into our
            Career Compass program, we transformed mentorship from a manual,
            limited initiative into a scalable, data-driven experience.&quot;
          </p>
          <p className="text-slate-500 text-sm mt-2">
            — Jason Beck, Manager of Learning Systems, CDM Smith
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl border-2 border-emerald-200 p-8 my-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Get Your Personalized Summary
          </h3>
          <p className="text-slate-600 mb-6">
            Based on your selections, we&apos;ll send you a customized proposal
            outline and ROI projection. No sales pitch—just practical resources
            to help you build your business case.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your work email"
              value={selections.email}
              onChange={handleEmailChange}
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              aria-label="Work email address"
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selections.email || !selections.email.includes('@')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selections.email && selections.email.includes('@')
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              Get My Summary
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-slate-200">
            <div className="text-sm text-slate-500">Or:</div>
            <a
              href="https://www.togetherplatform.com/calculate-the-roi-of-mentorship"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Calculate your ROI now →
            </a>
            <a
              href="https://www.togetherplatform.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Book a 15-min consultation →
            </a>
          </div>
        </div>
      </main>

      {/* Progress Tracker */}
      <ProgressTracker selections={selections} />

      {/* Footer */}
      <footer className="bg-slate-100 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
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
        </div>
      </footer>
    </div>
  );
}

export default App;
