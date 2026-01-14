import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles';

/**
 * Two-column summary table showing user selections
 */
const SummaryTable = ({ selections, displayMappings }) => {
  const rows = [
    { label: 'Primary Goal', value: selections.programGoal },
    { label: 'Target Population', value: (selections.employeePopulations || []).join(', ') || 'Not selected' },
    { label: 'Program Format', value: selections.programFormat },
    { label: 'Mentoring Style', value: selections.mentoringStyle },
    { label: 'Matching Approach', value: selections.matchingProcess },
  ];

  return (
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 1 }]}>Selection</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Your Choice</Text>
      </View>

      {/* Table Rows */}
      {rows.map((row, index) => (
        <View
          key={row.label}
          style={[
            styles.tableRow,
            index % 2 === 0 && styles.tableRowAlt,
          ]}
        >
          <Text style={[styles.tableCellBold, { flex: 1 }]}>{row.label}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{row.value || 'Not selected'}</Text>
        </View>
      ))}
    </View>
  );
};

export default SummaryTable;

