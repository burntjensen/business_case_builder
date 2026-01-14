/**
 * Mappings between guide display names and spec keys
 * The mentorship guide uses display names as values, while the content
 * files use snake_case keys. These mappings enable bidirectional conversion.
 */

// Goal: Display name → spec key
export const goalToKey = {
  'Leadership Development': 'leadership_development',
  'New Manager Training': 'new_manager_training',
  'Employee Onboarding': 'employee_onboarding',
  'Diversity, Equity & Inclusion': 'dei',
  'Employee Retention': 'employee_retention',
  'Skills Development': 'skills_development',
  'General Career Development': 'general_career_development',
  'Culture & Connection': 'culture_connection',
};

// Goal: Spec key → display name
export const goalDisplayNames = {
  leadership_development: 'Leadership Development',
  new_manager_training: 'New Manager Training',
  employee_onboarding: 'Employee Onboarding',
  dei: 'Diversity, Equity & Inclusion',
  employee_retention: 'Employee Retention',
  skills_development: 'Skills Development',
  general_career_development: 'General Career Development',
  culture_connection: 'Culture & Connection',
};

// Format: Display name → spec key
export const formatToKey = {
  'Cohort-based': 'cohort',
  'Always-open': 'evergreen',
};

// Format: Spec key → display name
export const formatDisplayNames = {
  cohort: 'Cohort-based',
  evergreen: 'Always-open (Evergreen)',
};

// Mentoring Style: Display name → spec key
export const styleToKey = {
  'Traditional 1:1 Mentoring': 'traditional_1_1',
  'Group Mentoring': 'group_mentoring',
  'Peer Mentoring': 'peer_mentoring',
  'Reverse Mentoring': 'reverse_mentoring',
  'Flash Mentoring / Coffee Chats': 'flash_mentoring',
};

// Mentoring Style: Spec key → display name
export const styleDisplayNames = {
  traditional_1_1: 'Traditional 1:1',
  group_mentoring: 'Group Mentoring',
  peer_mentoring: 'Peer Mentoring',
  reverse_mentoring: 'Reverse Mentoring',
  flash_mentoring: 'Flash Mentoring / Coffee Chats',
};

// Matching Process: Display name → spec key
export const matchingToKey = {
  'Algorithm-led': 'algorithm_led',
  'Admin-selected': 'admin_selected',
  'Hybrid': 'hybrid',
  'Self-directed': 'self_directed',
};

// Matching Process: Spec key → display name
export const matchingDisplayNames = {
  algorithm_led: 'Algorithm-Led',
  admin_selected: 'Admin-Selected',
  hybrid: 'Hybrid',
  self_directed: 'Self-Directed',
};

// Population: Display name → spec key
export const populationToKey = {
  'New hires (first 90 days)': 'new_hires',
  'Individual contributors seeking promotion': 'individual_contributors',
  'First-time managers': 'first_time_managers',
  'High-potential employees': 'high_potential',
  'Women in leadership pipelines': 'women_leadership',
  'Underrepresented groups (ERG members)': 'underrepresented_groups',
  'Cross-functional movers': 'cross_functional',
  'Remote/distributed employees': 'remote_employees',
  'Technical specialists': 'technical_specialists',
  'All employees (open enrollment)': 'all_employees',
};

// Population: Spec key → display name
export const populationDisplayNames = {
  new_hires: 'New Hires',
  individual_contributors: 'Individual Contributors',
  first_time_managers: 'First-Time Managers',
  high_potential: 'High-Potential Employees',
  women_leadership: 'Women in Leadership',
  underrepresented_groups: 'Underrepresented Groups',
  cross_functional: 'Cross-Functional Movers',
  remote_employees: 'Remote/Distributed Employees',
  technical_specialists: 'Technical Specialists',
  all_employees: 'All Employees',
};

/**
 * Helper functions for conversions
 */

export const getGoalKey = (displayName) => goalToKey[displayName] || displayName;
export const getFormatKey = (displayName) => formatToKey[displayName] || displayName;
export const getStyleKey = (displayName) => styleToKey[displayName] || displayName;
export const getMatchingKey = (displayName) => matchingToKey[displayName] || displayName;
export const getPopulationKey = (displayName) => populationToKey[displayName] || displayName;

export const getGoalDisplayName = (key) => goalDisplayNames[key] || key;
export const getFormatDisplayName = (key) => formatDisplayNames[key] || key;
export const getStyleDisplayName = (key) => styleDisplayNames[key] || key;
export const getMatchingDisplayName = (key) => matchingDisplayNames[key] || key;
export const getPopulationDisplayName = (key) => populationDisplayNames[key] || key;

/**
 * Convert guide selections to spec format
 */
export const convertSelectionsToSpecFormat = (selections) => ({
  goal: getGoalKey(selections.programGoal),
  populations: (selections.employeePopulations || []).map(getPopulationKey),
  format: getFormatKey(selections.programFormat),
  mentoringStyle: getStyleKey(selections.mentoringStyle),
  matchingProcess: getMatchingKey(selections.matchingProcess),
});

