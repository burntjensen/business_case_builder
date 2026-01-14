import React from 'react';
import { Page, View, Text, Link } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../../styles';
import ComparisonTable from '../components/ComparisonTable';
import BulletList from '../components/BulletList';
import CalloutBox from '../components/CalloutBox';
import CTAButtons from '../components/CTAButtons';
import Footer from '../components/Footer';
import {
  softwareComparison,
  softwareBenefits,
  ruleOfThumbCallout,
  nextSteps,
  ctaButtons,
  contactInfo,
} from '../content/staticContent';

/**
 * Page 5: Next Steps & CTA
 * - Header "Taking Action on Your Mentorship Program"
 * - Manual vs software comparison table
 * - Benefits bullet list
 * - Rule of thumb callout
 * - Numbered next steps
 * - CTA buttons
 * - Contact information
 */
const NextStepsPage = () => {
  return (
    <Page size="A4" style={styles.page}>
      {/* Page Header */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Taking Action on Your Mentorship Program</Text>
        <Text style={styles.paragraph}>
          You have a plan. Now it's time to execute. Here's how to move from template to launch.
        </Text>
      </View>

      {/* Manual vs Software Comparison */}
      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>Why Leading Organizations Choose Mentorship Software</Text>
        <ComparisonTable rows={softwareComparison} />
      </View>

      {/* Benefits Beyond Time Savings */}
      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>Beyond Time Savings</Text>
        <View style={{ marginLeft: 4 }}>
          {softwareBenefits.map((benefit, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>{benefit}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Rule of Thumb Callout */}
      <CalloutBox
        title={ruleOfThumbCallout.title}
        text={ruleOfThumbCallout.text}
        type="info"
      />

      {/* Numbered Next Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>Your Recommended Next Steps</Text>
        <View style={{ marginLeft: 4 }}>
          {nextSteps.map((step, index) => (
            <View key={index} style={styles.bulletItem}>
              <Text style={[styles.bulletPoint, { fontWeight: 700, color: BRAND_COLORS.indigo }]}>
                {index + 1}.
              </Text>
              <Text style={styles.bulletText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Buttons */}
      <CTAButtons 
        primary={ctaButtons.primary}
        secondary={ctaButtons.secondary}
      />

      {/* Contact Information */}
      <View style={{ marginTop: 20, textAlign: 'center' }}>
        <Text style={[styles.paragraph, { textAlign: 'center' }]}>
          Questions? Email us at{' '}
          <Link src={`mailto:${contactInfo.email}`} style={{ color: BRAND_COLORS.blue }}>
            {contactInfo.email}
          </Link>
        </Text>
        <Text style={[styles.smallText, { textAlign: 'center', marginTop: 4 }]}>
          Visit:{' '}
          <Link src={`https://${contactInfo.website}`} style={{ color: BRAND_COLORS.blue }}>
            {contactInfo.website}
          </Link>
        </Text>
      </View>

      <Footer />
    </Page>
  );
};

export default NextStepsPage;

