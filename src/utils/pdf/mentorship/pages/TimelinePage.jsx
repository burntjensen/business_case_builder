import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles';
import Timeline from '../components/Timeline';
import CalloutBox from '../components/CalloutBox';
import Footer from '../components/Footer';
import { getFormatKey } from '../content/mappings';
import { getTimelineContent } from '../content/timelineContent';

/**
 * Page 2: Implementation Timeline
 * - Header "Your Implementation Timeline"
 * - Timeline table based on format (cohort or evergreen)
 * - Key milestone callout box
 */
const TimelinePage = ({ selections }) => {
  const formatKey = getFormatKey(selections.programFormat);
  const timelineData = getTimelineContent(formatKey);

  return (
    <Page size="A4" style={styles.page}>
      {/* Page Header */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Implementation Timeline</Text>
        <Text style={styles.paragraph}>
          A structured approach to launching your mentorship program, with clear phases and milestones.
        </Text>
      </View>

      {/* Timeline Table */}
      <Timeline 
        title={timelineData.title}
        phases={timelineData.phases}
      />

      {/* Milestone Callout */}
      <CalloutBox
        title={timelineData.callout.title}
        text={timelineData.callout.text}
        type="default"
      />

      {/* Additional guidance based on format */}
      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>Planning Tips</Text>
        {formatKey === 'cohort' ? (
          <View style={{ marginLeft: 4 }}>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>
                Schedule your kickoff date first, then work backward to set registration and matching deadlines.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>
                Build in buffer time—programs consistently need 1-2 extra weeks for each phase.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>
                Plan your mid-program check-in and graduation celebration early.
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ marginLeft: 4 }}>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>
                Set calendar reminders for quarterly mentor pool refreshes and promotional pushes.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>
                Build automated triggers for re-engagement when mentor availability drops.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>
                Create onboarding flows for new employees joining the program mid-year.
              </Text>
            </View>
          </View>
        )}
      </View>

      <Footer />
    </Page>
  );
};

export default TimelinePage;

