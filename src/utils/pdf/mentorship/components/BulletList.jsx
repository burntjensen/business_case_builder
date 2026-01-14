import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../../styles';

/**
 * Bullet list component with customizable bullet style
 */
const BulletList = ({ items, numbered = false, title }) => {
  return (
    <View style={{ marginBottom: 12 }}>
      {title && <Text style={styles.sectionSubtitle}>{title}</Text>}
      <View style={{ marginLeft: 4 }}>
        {items.map((item, index) => (
          <View key={index} style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>
              {numbered ? `${index + 1}.` : '•'}
            </Text>
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BulletList;

