import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../../styles';

/**
 * Styled callout box for important information
 */
const CalloutBox = ({ title, text, type = 'default' }) => {
  // Different styles based on type
  const boxStyles = {
    default: {
      backgroundColor: BRAND_COLORS.yellowSoft,
      borderLeftColor: BRAND_COLORS.yellow,
    },
    info: {
      backgroundColor: '#E8F4FD',
      borderLeftColor: BRAND_COLORS.blue,
    },
    tip: {
      backgroundColor: '#E8F5E9',
      borderLeftColor: BRAND_COLORS.green,
    },
  };

  const currentStyle = boxStyles[type] || boxStyles.default;

  return (
    <View
      style={[
        styles.callout,
        {
          backgroundColor: currentStyle.backgroundColor,
          borderLeftColor: currentStyle.borderLeftColor,
        },
      ]}
    >
      {title && <Text style={styles.calloutTitle}>{title}</Text>}
      <Text style={styles.calloutText}>{text}</Text>
    </View>
  );
};

export default CalloutBox;

