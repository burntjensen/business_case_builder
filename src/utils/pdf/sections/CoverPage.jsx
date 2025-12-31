import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../styles';

const CoverPage = ({ selections }) => {
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <View>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <Text style={styles.headerTitle}>Business Case for Mentorship</Text>
        <Text style={styles.headerSubtitle}>Personalized Program Summary</Text>
      </View>

      {/* Company Info */}
      <View style={styles.companyInfo}>
        <Text style={styles.companyLabel}>Your Organization</Text>
        {selections.employeeSize && (
          <Text style={styles.companyDetail}>
            Company Size: {selections.employeeSize} employees
          </Text>
        )}
        <Text style={styles.companyDetail}>Generated: {date}</Text>
      </View>
    </View>
  );
};

export default CoverPage;

