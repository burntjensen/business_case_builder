import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles';
import { footerText } from '../content/staticContent';

/**
 * Reusable footer component for all PDF pages
 */
const Footer = () => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerText}>{footerText}</Text>
  </View>
);

export default Footer;

