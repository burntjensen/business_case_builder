import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../styles';

const SummarySection = ({ selections }) => {
  const selectionData = [
    { label: 'Primary Goal', value: selections.primaryGoal },
    { label: 'Company Size', value: selections.employeeSize ? `${selections.employeeSize} employees` : null },
    { label: 'Program Type', value: selections.programType },
    { label: 'Audience Size', value: selections.audienceSize },
    { label: 'Matching Approach', value: selections.matchingApproach },
    { label: 'Measurement Focus', value: selections.measurementFocus },
    { label: 'Timeline', value: selections.timeline },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your Program Selections</Text>
      
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Selection</Text>
          <Text style={styles.tableHeaderText}>Your Choice</Text>
        </View>
        
        {/* Table Rows */}
        {selectionData.map((row, index) => (
          <View 
            key={row.label} 
            style={[
              styles.tableRow, 
              index % 2 === 0 && styles.tableRowAlt
            ]}
          >
            <Text style={styles.tableCellBold}>{row.label}</Text>
            <Text style={styles.tableCell}>{row.value || 'Not selected'}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SummarySection;

