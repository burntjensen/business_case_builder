/**
 * Dynamic content for each program goal type
 * Content based on mentorship-template-pdf-content-spec.md
 */

export const goalContent = {
  leadership_development: {
    title: 'Leadership Development',
    description: 'Your program aims to build a pipeline of future leaders by pairing high-potential employees with senior executives. Studies show mentees are promoted 5x more frequently than non-participants.',
    statistic: '5x more promotions',
    keyElements: [
      'Pair high-potential employees with senior leaders',
      'Create clear competency development paths',
      'Track promotion and leadership readiness metrics',
      'Integrate with succession planning processes',
    ],
  },

  new_manager_training: {
    title: 'New Manager Training',
    description: 'Your program equips first-time managers with the skills, confidence, and support network they need to lead effectively. Organizations with structured manager mentoring see 23% higher team engagement scores.',
    statistic: '23% higher engagement',
    keyElements: [
      'Connect new managers with experienced people leaders',
      'Focus on practical leadership challenges and scenarios',
      'Build peer support networks among manager cohorts',
      'Track manager effectiveness and team satisfaction metrics',
    ],
  },

  employee_onboarding: {
    title: 'Employee Onboarding',
    description: 'Your program accelerates time-to-productivity for new hires by connecting them with experienced colleagues who can share institutional knowledge and cultural context. Structured onboarding mentorship improves 90-day retention by up to 82%.',
    statistic: '82% better retention',
    keyElements: [
      'Match new hires with tenured employees in similar roles',
      'Provide structured conversation guides for first 90 days',
      'Focus on cultural integration and relationship building',
      'Track time-to-productivity and new hire satisfaction',
    ],
  },

  dei: {
    title: 'Diversity, Equity & Inclusion',
    description: 'Your program creates pathways for underrepresented employees to access sponsorship, visibility, and career advancement opportunities. DEI-focused mentoring programs show 24% higher promotion rates for participants.',
    statistic: '24% higher promotion rates',
    keyElements: [
      'Intentionally pair underrepresented talent with senior sponsors',
      'Create visibility opportunities and stretch assignments',
      'Track representation metrics in leadership pipeline',
      'Measure belonging and inclusion survey scores',
    ],
  },

  employee_retention: {
    title: 'Employee Retention',
    description: 'Your program strengthens engagement and reduces turnover by fostering meaningful workplace connections. Organizations with mentoring programs see 50% higher retention among participants.',
    statistic: '50% higher retention',
    keyElements: [
      'Build cross-functional relationships and networks',
      'Create career path visibility and growth opportunities',
      'Focus on engagement drivers and employee satisfaction',
      'Track retention rates and intent-to-stay metrics',
    ],
  },

  skills_development: {
    title: 'Skills Development',
    description: 'Your program enables targeted skill-building through structured knowledge transfer from experienced practitioners. Mentored employees report 25% faster skill acquisition than self-directed learners.',
    statistic: '25% faster skill acquisition',
    keyElements: [
      'Match based on specific skill gaps and expertise',
      'Create competency-based development milestones',
      'Integrate with formal training and certification programs',
      'Track skill assessment improvements and application',
    ],
  },

  general_career_development: {
    title: 'General Career Development',
    description: 'Your program supports employees at all levels in navigating their career paths and identifying growth opportunities. Career mentoring increases internal mobility by 30% and improves promotion readiness.',
    statistic: '30% more internal mobility',
    keyElements: [
      'Offer flexible, self-directed mentoring relationships',
      'Provide career exploration and path planning resources',
      'Enable cross-functional exposure and networking',
      'Track career progression and internal mobility rates',
    ],
  },

  culture_connection: {
    title: 'Culture & Connection',
    description: 'Your program combats isolation in hybrid and remote environments by facilitating meaningful cross-functional relationships. Connected employees are 3x more likely to report high engagement.',
    statistic: '3x higher engagement',
    keyElements: [
      'Facilitate connections across teams and locations',
      'Lower barriers to entry with casual conversation formats',
      'Build community through shared experiences',
      'Track collaboration metrics and connection scores',
    ],
  },
};

export const getGoalContent = (goalKey) => {
  return goalContent[goalKey] || goalContent.general_career_development;
};

export default goalContent;

