/**
 * Dynamic content for each mentoring style type
 * Content based on mentorship-template-pdf-content-spec.md
 */

export const styleContent = {
  traditional_1_1: {
    title: 'Traditional 1:1',
    description: 'Traditional 1:1 mentoring creates deep, sustained relationships between dedicated mentor-mentee pairs. This format excels at building trust, enabling candid conversations, and supporting long-term development goals.',
    bestPractices: [
      'Set clear expectations for meeting frequency (recommended: bi-weekly)',
      'Establish relationship duration upfront (typically 6-12 months)',
      'Provide conversation guides and development frameworks',
      'Check in at midpoint to assess match quality',
    ],
  },

  group_mentoring: {
    title: 'Group Mentoring',
    description: 'Group mentoring connects one mentor with multiple mentees who learn together. This format efficiently scales expertise, creates peer cohorts, and exposes mentees to diverse perspectives.',
    bestPractices: [
      'Limit groups to 4-6 mentees for meaningful engagement',
      'Structure sessions with clear agendas and discussion topics',
      'Rotate facilitation to build mentee capabilities',
      'Balance group sessions with occasional 1:1 check-ins',
    ],
  },

  peer_mentoring: {
    title: 'Peer Mentoring',
    description: 'Peer mentoring matches colleagues at similar career stages to learn from each other\'s experiences. This format is powerful for knowledge-sharing across functions and reduces hierarchy barriers.',
    bestPractices: [
      'Match peers from different functions or teams for diverse perspectives',
      'Set reciprocal expectations—both parties learn and teach',
      'Provide structured discussion prompts to guide conversations',
      'Track knowledge-sharing and cross-functional collaboration',
    ],
  },

  reverse_mentoring: {
    title: 'Reverse Mentoring',
    description: 'Reverse mentoring pairs junior employees as mentors to senior leaders—typically for technology adoption, generational insight, or DEI perspective-building.',
    bestPractices: [
      'Clearly define learning objectives for senior participants',
      'Train junior mentors on navigating senior relationships',
      'Create psychological safety for candid feedback',
      'Celebrate and recognize junior mentor contributions',
    ],
  },

  flash_mentoring: {
    title: 'Flash Mentoring / Coffee Chats',
    description: 'Flash mentoring facilitates one-time or short-term connections focused on specific questions, networking, or career exploration. This format offers low commitment and high flexibility.',
    bestPractices: [
      'Keep sessions to 30-45 minutes with focused agendas',
      'Provide conversation starters and suggested topics',
      'Enable easy re-matching for follow-up conversations',
      'Track connection volume and participant satisfaction',
    ],
  },
};

export const getStyleContent = (styleKey) => {
  return styleContent[styleKey] || styleContent.traditional_1_1;
};

export default styleContent;

