/**
 * Metrics content for success tracking
 * Content based on mentorship-template-pdf-content-spec.md
 */

// Engagement metrics (static - same for all programs)
export const engagementMetrics = [
  { metric: 'Registration Rate', description: '% of eligible employees enrolled', target: '40-60%' },
  { metric: 'Match Acceptance Rate', description: '% of proposed matches accepted', target: '>90%' },
  { metric: 'Session Completion Rate', description: '% of pairs meeting consistently', target: '>75%' },
  { metric: 'Session Frequency', description: 'Average meetings per month', target: '1-2' },
  { metric: 'Resource Utilization', description: '% accessing provided materials', target: '>50%' },
];

// Outcome metrics (dynamic based on goal)
export const outcomeMetrics = {
  leadership_development: [
    { metric: 'Promotion Rate', description: '% of participants promoted vs. non-participants' },
    { metric: 'Leadership Pipeline', description: '# of participants identified as succession candidates' },
    { metric: 'Competency Scores', description: 'Improvement in leadership assessment ratings' },
  ],

  new_manager_training: [
    { metric: 'Manager Effectiveness', description: 'Team satisfaction scores for new managers' },
    { metric: 'Time to Competency', description: 'Weeks until manager meets performance standards' },
    { metric: 'Manager Retention', description: '% of new managers retained at 12 months' },
  ],

  employee_onboarding: [
    { metric: 'Time to Productivity', description: 'Weeks until new hire reaches full productivity' },
    { metric: '90-Day Retention', description: '% of new hires retained at 90 days' },
    { metric: 'New Hire Satisfaction', description: 'Onboarding experience survey scores' },
  ],

  dei: [
    { metric: 'Promotion Equity', description: 'Promotion rates for underrepresented groups' },
    { metric: 'Pipeline Representation', description: '% representation in leadership pipeline' },
    { metric: 'Belonging Scores', description: 'Inclusion and belonging survey results' },
  ],

  employee_retention: [
    { metric: 'Retention Rate', description: 'Turnover among participants vs. non-participants' },
    { metric: 'Engagement Scores', description: 'Employee engagement survey results' },
    { metric: 'Intent to Stay', description: '% indicating plans to stay 12+ months' },
  ],

  skills_development: [
    { metric: 'Skill Assessment', description: 'Pre/post skill assessment score improvement' },
    { metric: 'Certification Rate', description: '% completing related certifications' },
    { metric: 'Skill Application', description: 'Manager ratings on skill demonstration' },
  ],

  general_career_development: [
    { metric: 'Internal Mobility', description: '% of participants making internal moves' },
    { metric: 'Career Clarity', description: 'Self-reported career path confidence' },
    { metric: 'Promotion Readiness', description: '% identified as ready for next level' },
  ],

  culture_connection: [
    { metric: 'Connection Expansion', description: 'New relationships formed outside immediate team' },
    { metric: 'Collaboration Metrics', description: 'Cross-functional project participation' },
    { metric: 'Engagement Scores', description: 'Overall employee engagement results' },
  ],
};

// Feedback collection framework (static)
export const feedbackFramework = {
  sessionLevel: {
    title: 'Session-Level Pulse (After each session)',
    questions: [
      'Did the session happen as scheduled?',
      'How valuable was this session? (1-5 scale)',
      'What topics did you discuss?',
    ],
  },
  midProgram: {
    title: 'Mid-Program Check-In (For cohort programs)',
    questions: [
      'How would you rate your match compatibility? (1-5 scale)',
      'Are you on track to achieve your development goals?',
      'What additional support would help?',
    ],
  },
  completion: {
    title: 'Program Completion Survey',
    questions: [
      'Net Promoter Score: Would you recommend this program?',
      'Skills/goals progress assessment',
      'Relationship quality rating',
      'Open feedback for improvement',
    ],
  },
};

export const getOutcomeMetrics = (goalKey) => {
  return outcomeMetrics[goalKey] || outcomeMetrics.general_career_development;
};

export default {
  engagementMetrics,
  outcomeMetrics,
  feedbackFramework,
  getOutcomeMetrics,
};

