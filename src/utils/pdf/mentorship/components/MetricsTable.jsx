import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles';

/**
 * Metrics table component for displaying metrics with descriptions
 * Can optionally include a target column
 */
const MetricsTable = ({ title, metrics, showTarget = false }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      {title && <Text style={styles.sectionSubtitle}>{title}</Text>}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Metric</Text>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>What It Measures</Text>
          {showTarget && (
            <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Target</Text>
          )}
        </View>

        {/* Table Rows */}
        {metrics.map((row, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 0 && styles.tableRowAlt,
            ]}
          >
            <Text style={[styles.tableCellBold, { flex: 1 }]}>{row.metric}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{row.description}</Text>
            {showTarget && (
              <Text style={[styles.tableCellRight, { flex: 1 }]}>{row.target || '—'}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MetricsTable;

