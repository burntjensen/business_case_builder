import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../../styles';

/**
 * Checklist component with checkbox-style bullets
 */
const Checklist = ({ title, items }) => {
  return (
    <View style={{ marginBottom: 12 }}>
      {title && <Text style={styles.sectionSubtitle}>{title}</Text>}
      <View style={{ marginLeft: 4 }}>
        {items.map((item, index) => (
          <View key={index} style={styles.bulletItem}>
            <Text style={[styles.bulletPoint, { color: BRAND_COLORS.indigo }]}>☐</Text>
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Checklist;

