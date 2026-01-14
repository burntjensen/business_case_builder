import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles';

/**
 * Timeline table component for implementation phases
 */
const Timeline = ({ title, phases }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      {title && <Text style={styles.sectionSubtitle}>{title}</Text>}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Phase</Text>
          <Text style={[styles.tableHeaderText, { flex: 0.6, textAlign: 'center' }]}>Weeks</Text>
          <Text style={[styles.tableHeaderText, { flex: 3 }]}>Activities</Text>
        </View>

        {/* Table Rows */}
        {phases.map((row, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              index % 2 === 0 && styles.tableRowAlt,
            ]}
          >
            <Text style={[styles.tableCellBold, { flex: 1.2 }]}>{row.phase}</Text>
            <Text style={[styles.tableCell, { flex: 0.6, textAlign: 'center' }]}>{row.weeks}</Text>
            <Text style={[styles.tableCell, { flex: 3 }]}>{row.activities}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Timeline;

