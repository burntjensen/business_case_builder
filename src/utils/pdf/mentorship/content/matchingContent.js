/**
 * Dynamic content for each matching process type
 * Content based on mentorship-template-pdf-content-spec.md
 */

export const matchingContent = {
  algorithm_led: {
    title: 'Algorithm-Led',
    description: 'Algorithm-led matching uses registration data—skills, goals, experience, preferences—to automatically generate optimal pairings. This approach is best for large programs, reduces bias, and saves significant admin time.',
    implementationNotes: [
      'Define clear matching criteria aligned to program goals',
      'Weight factors based on what matters most (skills, location, experience, etc.)',
      'Build in preference collection during registration',
      'Plan for exception handling and manual overrides',
    ],
  },

  admin_selected: {
    title: 'Admin-Selected',
    description: 'Admin-selected matching puts program administrators in control, manually pairing participants based on organizational knowledge and strategic considerations. This approach offers maximum control but requires significant time investment.',
    implementationNotes: [
      'Allocate 1-2 hours per 25 participants for matching',
      'Document matching rationale for future reference',
      'Consider strategic pairings (cross-functional, high-visibility, etc.)',
      'Build in participant review before finalizing',
    ],
  },

  hybrid: {
    title: 'Hybrid',
    description: 'Hybrid matching combines algorithmic efficiency with human oversight. The algorithm generates recommended pairings, then administrators review, adjust, and approve matches before notification.',
    implementationNotes: [
      'Configure algorithm with your priority matching criteria',
      'Review top recommendations (typically 2-3 options per participant)',
      'Apply organizational context the algorithm can\'t see',
      'Document adjustments for continuous improvement',
    ],
  },

  self_directed: {
    title: 'Self-Directed',
    description: 'Self-directed matching empowers participants to browse mentor profiles and select their own matches. This approach increases participant buy-in but requires careful design to prevent bottlenecks.',
    implementationNotes: [
      'Create rich, searchable mentor profiles',
      'Set mentor capacity limits to distribute demand',
      'Consider "marketplace" periods with waitlists',
      'Provide guidance on what makes a good match',
    ],
  },
};

export const getMatchingContent = (matchingKey) => {
  return matchingContent[matchingKey] || matchingContent.algorithm_led;
};

export default matchingContent;

