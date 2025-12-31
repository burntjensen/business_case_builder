import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../styles';

const caseStudies = [
  {
    company: 'CDM Smith',
    industry: 'Engineering & Construction',
    size: '5,000+ employees',
    headline: '$3.2M in savings within one year',
    stats: [
      { label: 'Promotion Rate (Mentees)', value: '34%' },
      { label: 'Promotion Rate (Non-mentees)', value: '13%' },
      { label: 'Confidence & Leadership Gains', value: '96%' },
    ],
    quote: 'The mentorship program has become a cornerstone of our talent development strategy.',
  },
  {
    company: 'Randstad',
    industry: 'Staffing & HR Services',
    size: '38,000+ employees',
    headline: '2x increase in program participation',
    stats: [
      { label: 'Participation Growth', value: '200%' },
      { label: 'Employee Engagement Lift', value: '+18%' },
      { label: 'Time to Match', value: '<24 hours' },
    ],
    quote: 'Together Platform transformed how we approach mentorship at scale.',
  },
  {
    company: 'AAA',
    industry: 'Insurance & Services',
    size: '20,000+ employees',
    headline: 'Standardized mentorship across 30+ clubs',
    stats: [
      { label: 'Clubs Using Platform', value: '30+' },
      { label: 'Active Mentorships', value: '2,500+' },
      { label: 'Admin Time Reduction', value: '75%' },
    ],
    quote: 'We finally have consistency and visibility into mentorship outcomes.',
  },
];

const CaseStudiesSection = ({ selections }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Success Stories & Proof Points</Text>
      
      <Text style={styles.paragraph}>
        Organizations across industries have achieved measurable results with 
        structured mentorship programs. Here are real outcomes from Together Platform customers:
      </Text>

      {caseStudies.map((study, index) => (
        <View key={study.company} style={[styles.card, { marginBottom: 12 }]}>
          {/* Company Header */}
          <View style={[styles.row, styles.spaceBetween, { marginBottom: 8 }]}>
            <View>
              <Text style={[styles.label, { fontSize: 11, marginBottom: 2 }]}>{study.company}</Text>
              <Text style={styles.smallText}>{study.industry} • {study.size}</Text>
            </View>
          </View>

          {/* Headline */}
          <Text style={[styles.paragraph, { fontWeight: 700, color: BRAND_COLORS.indigo, marginBottom: 8 }]}>
            {study.headline}
          </Text>

          {/* Stats Row */}
          <View style={[styles.row, { gap: 10, marginBottom: 8 }]}>
            {study.stats.map((stat) => (
              <View key={stat.label} style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[styles.statValue, { fontSize: 14 }]}>{stat.value}</Text>
                <Text style={[styles.smallText, { textAlign: 'center' }]}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Quote */}
          <Text style={[styles.smallText, { fontStyle: 'italic', marginTop: 4 }]}>
            "{study.quote}"
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CaseStudiesSection;

