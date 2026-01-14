import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles';
import Checklist from '../components/Checklist';
import CalloutBox from '../components/CalloutBox';
import Footer from '../components/Footer';
import {
  preLaunchChecklist,
  registrationChecklist,
  postLaunchChecklist,
  keyMessagingCallout,
} from '../content/staticContent';

/**
 * Page 3: Promotion & Engagement
 * - Header "Promoting Your Mentorship Program"
 * - Pre-launch checklist
 * - During registration checklist
 * - Post-launch engagement checklist
 * - Key messaging callout
 */
const PromotionPage = () => {
  return (
    <Page size="A4" style={styles.page}>
      {/* Page Header */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Promoting Your Mentorship Program</Text>
        <Text style={styles.paragraph}>
          Successful programs require intentional promotion at every stage. Use these checklists to ensure comprehensive communication and sustained engagement.
        </Text>
      </View>

      {/* Pre-Launch Checklist */}
      <Checklist
        title="Pre-Launch Promotion (2-3 weeks before registration)"
        items={preLaunchChecklist}
      />

      {/* During Registration Checklist */}
      <Checklist
        title="During Registration"
        items={registrationChecklist}
      />

      {/* Post-Launch Engagement Checklist */}
      <Checklist
        title="Post-Launch Engagement"
        items={postLaunchChecklist}
      />

      {/* Key Messaging Callout */}
      <CalloutBox
        title={keyMessagingCallout.title}
        text={keyMessagingCallout.text}
        type="tip"
      />

      {/* Additional Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>Communication Best Practices</Text>
        <View style={{ marginLeft: 4 }}>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 700 }}>Use multiple channels:</Text> Email alone won't reach everyone. Combine Slack/Teams, manager meetings, town halls, and intranet posts.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 700 }}>Feature success stories:</Text> Nothing sells mentorship like hearing from peers who've benefited. Collect testimonials from early participants.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontWeight: 700 }}>Make it easy to say yes:</Text> Remove friction from registration. A 5-minute sign-up converts better than a 20-minute form.
            </Text>
          </View>
        </View>
      </View>

      <Footer />
    </Page>
  );
};

export default PromotionPage;

