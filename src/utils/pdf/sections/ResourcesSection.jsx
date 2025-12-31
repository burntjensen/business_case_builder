import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../styles';

const ResourcesSection = ({ selections }) => {
  const participantCount = selections.audienceSize === 'Pilot (< 50)' ? 50
    : selections.audienceSize === 'Department (50-200)' ? 125
    : selections.audienceSize === 'Division (200-500)' ? 350
    : selections.audienceSize === 'Enterprise (500+)' ? 750
    : 200;

  const resourceComparison = [
    {
      task: 'Participant matching',
      manual: `${Math.round(participantCount * 0.5)} hours`,
      software: '< 1 hour',
    },
    {
      task: 'Program setup',
      manual: '40+ hours',
      software: '4 hours',
    },
    {
      task: 'Progress tracking',
      manual: `${Math.round(participantCount * 0.25)} hours/month`,
      software: 'Automated',
    },
    {
      task: 'Reporting',
      manual: '8+ hours/month',
      software: 'Real-time dashboards',
    },
    {
      task: 'Reminders & nudges',
      manual: `${Math.round(participantCount * 0.1)} hours/month`,
      software: 'Automated',
    },
  ];

  const qualitativeBenefits = [
    '95%+ match satisfaction with algorithm-based matching',
    'Built-in best practices and guided workflows',
    'Automatic engagement nudges and reminders',
    'Consistent experience across all participants',
    'Data-driven insights for continuous improvement',
    'Scalability without linear increase in admin burden',
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Resource Comparison: Manual vs. Software</Text>
      
      <Text style={styles.paragraph}>
        Based on your audience size of {selections.audienceSize || '200-500 participants'}, 
        here's how program administration compares:
      </Text>

      {/* Comparison Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Task</Text>
          <Text style={styles.tableHeaderText}>Manual Approach</Text>
          <Text style={styles.tableHeaderText}>With Software</Text>
        </View>
        {resourceComparison.map((row, index) => (
          <View key={row.task} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt]}>
            <Text style={[styles.tableCellBold, { flex: 2 }]}>{row.task}</Text>
            <Text style={styles.tableCell}>{row.manual}</Text>
            <Text style={[styles.tableCell, { color: BRAND_COLORS.green }]}>{row.software}</Text>
          </View>
        ))}
      </View>

      {/* Qualitative Benefits */}
      <Text style={styles.sectionSubtitle}>Beyond Time Savings</Text>
      {qualitativeBenefits.map((benefit, index) => (
        <View key={index} style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>✓</Text>
          <Text style={styles.bulletText}>{benefit}</Text>
        </View>
      ))}

      {/* Decision Heuristic */}
      <View style={styles.callout}>
        <Text style={styles.calloutTitle}>Rule of Thumb</Text>
        <Text style={styles.calloutText}>
          After ~50 participants, manual programs become complex to manage effectively. 
          At 100+ participants, dedicated software becomes essential for program success 
          and administrator sanity. With {participantCount}+ participants, software-enabled 
          management will save significant time while improving outcomes.
        </Text>
      </View>
    </View>
  );
};

export default ResourcesSection;

