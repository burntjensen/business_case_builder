import React from 'react';
import { View, Text, Link } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../../styles';

/**
 * CTA buttons component with primary and secondary actions
 */
const CTAButtons = ({ primary, secondary }) => {
  return (
    <View style={styles.ctaContainer}>
      {primary && (
        <Link src={primary.url} style={{ textDecoration: 'none' }}>
          <View style={styles.buttonPrimary}>
            <Text style={styles.buttonPrimaryText}>{primary.text}</Text>
          </View>
        </Link>
      )}
      {secondary && (
        <Link src={secondary.url} style={{ textDecoration: 'none' }}>
          <View style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryText}>{secondary.text}</Text>
          </View>
        </Link>
      )}
    </View>
  );
};

export default CTAButtons;

