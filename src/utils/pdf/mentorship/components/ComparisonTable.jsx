import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles';

/**
 * Comparison table for manual vs software approaches
 */
const ComparisonTable = ({ title, rows }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      {title && <Text style={styles.sectionSubtitle}>{title}</Text>}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Task</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Manual Approach</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>With Together Platform</Text>
        </View>

        {/* Table Rows */}
        {rows.map((row, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 0 && styles.tableRowAlt,
            ]}
          >
            <Text style={[styles.tableCellBold, { flex: 1.2 }]}>{row.task}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{row.manual}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{row.software}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ComparisonTable;

