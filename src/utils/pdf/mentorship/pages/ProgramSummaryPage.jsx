import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../../styles';
import Header from '../components/Header';
import SummaryTable from '../components/SummaryTable';
import CalloutBox from '../components/CalloutBox';
import Footer from '../components/Footer';
import { getGoalKey, getStyleKey, getMatchingKey } from '../content/mappings';
import { getGoalContent } from '../content/goalContent';
import { getStyleContent } from '../content/styleContent';
import { getMatchingContent } from '../content/matchingContent';

/**
 * Page 1: Program Summary
 * - Header with title, subtitle, generated date
 * - Summary table of all selections
 * - Goal description and key elements
 * - Mentoring style description and best practices
 * - Matching approach description and implementation notes
 */
const ProgramSummaryPage = ({ selections, generatedDate }) => {
  // Get dynamic content based on selections
  const goalKey = getGoalKey(selections.programGoal);
  const styleKey = getStyleKey(selections.mentoringStyle);
  const matchingKey = getMatchingKey(selections.matchingProcess);

  const goalData = getGoalContent(goalKey);
  const styleData = getStyleContent(styleKey);
  const matchingData = getMatchingContent(matchingKey);

  return (
    <Page size="A4" style={styles.page}>
      {/* Header Banner */}
      <Header
        title="Mentorship Program Template"
        subtitle="Personalized Program Summary"
        generatedDate={generatedDate}
        showBanner={true}
      />

      {/* Summary Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Program Selections</Text>
        <SummaryTable selections={selections} />
      </View>

      {/* Goal Section */}
      {selections.programGoal && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Program Goal: {goalData.title}</Text>
          <Text style={styles.paragraph}>{goalData.description}</Text>
          <Text style={[styles.sectionSubtitle, { marginTop: 8 }]}>Key Program Elements:</Text>
          <View style={{ marginLeft: 4 }}>
            {goalData.keyElements.map((element, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{element}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Mentoring Style Section */}
      {selections.mentoringStyle && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mentoring Style: {styleData.title}</Text>
          <Text style={styles.paragraph}>{styleData.description}</Text>
          <Text style={[styles.sectionSubtitle, { marginTop: 8 }]}>Best Practices:</Text>
          <View style={{ marginLeft: 4 }}>
            {styleData.bestPractices.map((practice, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{practice}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Matching Approach Section */}
      {selections.matchingProcess && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Matching Approach: {matchingData.title}</Text>
          <Text style={styles.paragraph}>{matchingData.description}</Text>
          <Text style={[styles.sectionSubtitle, { marginTop: 8 }]}>Implementation Notes:</Text>
          <View style={{ marginLeft: 4 }}>
            {matchingData.implementationNotes.map((note, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{note}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <Footer />
    </Page>
  );
};

export default ProgramSummaryPage;

