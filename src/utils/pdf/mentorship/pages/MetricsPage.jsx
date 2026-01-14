import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles';
import MetricsTable from '../components/MetricsTable';
import Footer from '../components/Footer';
import { getGoalKey } from '../content/mappings';
import { engagementMetrics, getOutcomeMetrics, feedbackFramework } from '../content/metricsContent';

/**
 * Page 4: Measuring Success
 * - Header "Success Metrics & Feedback Framework"
 * - Engagement metrics table (static)
 * - Outcome metrics table (dynamic based on goal)
 * - Feedback collection framework
 */
const MetricsPage = ({ selections }) => {
  const goalKey = getGoalKey(selections.programGoal);
  const outcomeMetricsData = getOutcomeMetrics(goalKey);

  return (
    <Page size="A4" style={styles.page}>
      {/* Page Header */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Success Metrics & Feedback Framework</Text>
        <Text style={styles.paragraph}>
          Measure what matters. Track both engagement (are people participating?) and outcomes (is the program delivering results?).
        </Text>
      </View>

      {/* Engagement Metrics */}
      <MetricsTable
        title="Engagement Metrics (Track Monthly)"
        metrics={engagementMetrics}
        showTarget={true}
      />

      {/* Outcome Metrics */}
      <MetricsTable
        title="Outcome Metrics (Track Quarterly/Annually)"
        metrics={outcomeMetricsData}
        showTarget={false}
      />

      {/* Feedback Collection Framework */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feedback Collection Framework</Text>
        
        {/* Session-Level Pulse */}
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.sectionSubtitle}>{feedbackFramework.sessionLevel.title}</Text>
          <View style={{ marginLeft: 4 }}>
            {feedbackFramework.sessionLevel.questions.map((question, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{question}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Mid-Program Check-In */}
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.sectionSubtitle}>{feedbackFramework.midProgram.title}</Text>
          <View style={{ marginLeft: 4 }}>
            {feedbackFramework.midProgram.questions.map((question, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{question}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Program Completion Survey */}
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.sectionSubtitle}>{feedbackFramework.completion.title}</Text>
          <View style={{ marginLeft: 4 }}>
            {feedbackFramework.completion.questions.map((question, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{question}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <Footer />
    </Page>
  );
};

export default MetricsPage;

