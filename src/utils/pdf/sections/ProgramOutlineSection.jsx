import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';

const getGoalOutline = (primaryGoal) => {
  const outlines = {
    'Retention & Turnover': {
      summary: 'Your program is focused on reducing employee turnover through meaningful mentorship connections. Research shows mentorship programs reduce turnover by 25-50% among participants.',
      keyPoints: [
        'Target high-risk employee segments (early career, post-merger, etc.)',
        'Track retention rates for mentored vs. non-mentored employees',
        'Focus on career development and growth conversations',
        'Measure engagement scores alongside retention metrics',
      ],
    },
    'Leadership Pipeline': {
      summary: 'Your program aims to develop future leaders through structured mentorship. Studies show mentees are promoted 5x more frequently than non-participants.',
      keyPoints: [
        'Pair high-potential employees with senior leaders',
        'Create clear competency development paths',
        'Track promotion and readiness metrics',
        'Integrate with succession planning processes',
      ],
    },
    'DEI & Belonging': {
      summary: 'Your program focuses on building inclusion through mentorship. Mentored employees from underrepresented groups report 96% gains in confidence and leadership capabilities.',
      keyPoints: [
        'Prioritize cross-functional and diverse pairings',
        'Create safe spaces for authentic conversations',
        'Track belonging and inclusion survey scores',
        'Develop ERG leadership through mentorship',
      ],
    },
    'Onboarding & Ramp': {
      summary: 'Your program accelerates new hire productivity through structured support. New hires with mentors reach full productivity 25% faster.',
      keyPoints: [
        'Assign mentors before or during first week',
        'Create structured 30/60/90 day check-ins',
        'Focus on cultural integration and network building',
        'Track time-to-productivity metrics',
      ],
    },
    'Skills Development': {
      summary: 'Your program enables peer-to-peer skill sharing and continuous learning. Skill-based mentorship programs show 40% improvement in capability development.',
      keyPoints: [
        'Match based on specific skill gaps and expertise',
        'Set measurable learning objectives',
        'Enable peer mentoring and group sessions',
        'Track skill acquisition and application',
      ],
    },
  };

  return outlines[primaryGoal] || {
    summary: 'Your mentorship program will create meaningful connections that drive business outcomes.',
    keyPoints: [
      'Define clear program objectives',
      'Match mentors and mentees thoughtfully',
      'Provide structure and resources',
      'Measure outcomes and iterate',
    ],
  };
};

const ProgramOutlineSection = ({ selections }) => {
  const outline = getGoalOutline(selections.primaryGoal);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Program Goal & Outline</Text>
      
      <Text style={styles.paragraph}>{outline.summary}</Text>
      
      <Text style={styles.sectionSubtitle}>Key Program Elements</Text>
      
      {outline.keyPoints.map((point, index) => (
        <View key={index} style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>{point}</Text>
        </View>
      ))}
      
      {/* Additional context based on matching approach */}
      {selections.matchingApproach && (
        <View style={styles.callout}>
          <Text style={styles.calloutTitle}>
            Matching Strategy: {selections.matchingApproach}
          </Text>
          <Text style={styles.calloutText}>
            {selections.matchingApproach === 'Algorithm-led' 
              ? 'Algorithm-based matching achieves 95%+ satisfaction rates by considering 30+ variables simultaneously, far exceeding manual or self-service approaches.'
              : selections.matchingApproach === 'Hybrid'
              ? 'Hybrid matching combines algorithmic efficiency with human oversight, ensuring quality while maintaining the "people connection".'
              : 'Your chosen approach allows flexibility while maintaining program structure.'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProgramOutlineSection;

