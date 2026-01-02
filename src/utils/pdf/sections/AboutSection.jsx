import React from 'react';
import { View, Text, Link } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../styles';

const AboutSection = ({ selections }) => {
  const nextSteps = [
    'Share this summary with key stakeholders (CFO, CHRO, department heads)',
    <Text>
      <Link src="https://www.togetherplatform.com/calculate-the-roi-of-mentorship" style={{ color: BRAND_COLORS.indigo, textDecoration: 'underline' }}>
        Calculate your specific ROI using actual salary and turnover data
      </Link>
    </Text>,
    'Identify a pilot group or launch strategy based on your timeline',
    'Schedule stakeholder meetings to build consensus',
    'Request a demo to see platform capabilities in action',
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About Together Platform</Text>
      
      <Text style={styles.paragraph}>
        Together is the leading mentorship platform trusted by enterprises worldwide 
        to run successful mentoring, coaching, and employee connection programs at scale. 
        Our platform has powered over 1 million mentorship connections across Fortune 500 
        companies, government agencies, and fast-growing startups.
      </Text>

      <View style={[styles.row, { gap: 15, marginTop: 10, marginBottom: 15 }]}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>1M+</Text>
          <Text style={styles.statLabel}>Participant Programs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>95%</Text>
          <Text style={styles.statLabel}>Match Satisfaction</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4.9/5</Text>
          <Text style={styles.statLabel}>G2 Rating</Text>
        </View>
      </View>

      {/* Recommended Next Steps */}
      <Text style={styles.sectionSubtitle}>Recommended Next Steps</Text>
      {nextSteps.map((step, index) => (
        <View key={index} style={styles.bulletItem}>
          <Text style={[styles.bulletPoint, { color: BRAND_COLORS.indigo }]}>{index + 1}.</Text>
          <Text style={styles.bulletText}>{step}</Text>
        </View>
      ))}

      {/* CTAs */}
      <View style={styles.ctaContainer}>
        <Link src="https://www.togetherplatform.com/book-a-demo" style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>Request a Demo</Text>
        </Link>
        <Link src="https://www.togetherplatform.com/pricing" style={styles.buttonSecondary}>
          <Text style={styles.buttonSecondaryText}>View Pricing</Text>
        </Link>
      </View>

      {/* Contact Info */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.smallText}>
          Questions? Email us at hello@togetherplatform.com
        </Text>
        <Text style={styles.smallText}>
          Visit: www.togetherplatform.com
        </Text>
      </View>
    </View>
  );
};

export default AboutSection;

