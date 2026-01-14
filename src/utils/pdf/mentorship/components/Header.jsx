import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../../styles';

/**
 * Reusable header component for PDF pages
 * Renders a banner with title, subtitle, and optional generated date
 */
const Header = ({ title, subtitle, generatedDate, showBanner = true }) => {
  if (showBanner) {
    return (
      <View style={styles.headerBanner}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
        {generatedDate && (
          <Text style={[styles.headerSubtitle, { marginTop: 4, fontSize: 9 }]}>
            Generated: {generatedDate}
          </Text>
        )}
      </View>
    );
  }

  // Simple section header without banner
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.paragraph}>{subtitle}</Text>}
    </View>
  );
};

export default Header;

