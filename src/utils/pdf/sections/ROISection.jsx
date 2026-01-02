import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles, BRAND_COLORS } from '../styles';

/**
 * Parse employee size range and return midpoint for calculations
 */
const parseEmployeeSize = (sizeRange) => {
  if (!sizeRange) return 1000;
  if (sizeRange === '5000+') return 6000;
  
  const match = sizeRange.match(/(\d+)-(\d+)/);
  if (match) {
    const min = parseInt(match[1]);
    const max = parseInt(match[2]);
    return Math.round((min + max) / 2);
  }
  return 1000;
};

/**
 * Format currency
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate ROI metrics based on employee size
 */
const calculateROI = (employeeSize) => {
  const employees = parseEmployeeSize(employeeSize);
  const turnoverRate = 0.20;
  const avgSalary = 70000;
  const replacementCostMultiplier = 0.75;
  const mentorshipReduction = 0.25;
  
  const annualTurnover = Math.round(employees * turnoverRate);
  const replacementCost = avgSalary * replacementCostMultiplier;
  const annualTurnoverCost = annualTurnover * replacementCost;
  
  const programParticipants = Math.round(employees * 0.5);
  const participantTurnover = Math.round(programParticipants * turnoverRate);
  const reducedTurnover = Math.round(participantTurnover * mentorshipReduction);
  const annualSavings = reducedTurnover * replacementCost;
  
  return {
    employees,
    annualTurnover,
    annualTurnoverCost,
    programParticipants,
    reducedTurnover,
    annualSavings,
    avgSalary,
    turnoverRate,
    replacementCost,
  };
};

const ROISection = ({ selections }) => {
  const roi = calculateROI(selections.employeeSize);

  const retentionMetrics = [
    { label: 'Total Employees', value: roi.employees.toLocaleString() },
    { label: 'Annual Turnover (20%)', value: `${roi.annualTurnover.toLocaleString()} employees` },
    { label: 'Current Turnover Cost', value: formatCurrency(roi.annualTurnoverCost) },
  ];

  const savingsMetrics = [
    { label: 'Program Participants (50%)', value: `${roi.programParticipants.toLocaleString()} employees` },
    { label: 'Reduced Turnover (25%)', value: `${roi.reducedTurnover.toLocaleString()} employees` },
    { label: 'Annual Savings', value: formatCurrency(roi.annualSavings), highlight: true },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personalized ROI Analysis</Text>
      
      <Text style={styles.paragraph}>
        Based on your company size of {selections.employeeSize || '1,000-2,499'} employees 
        and industry benchmarks, here's your projected mentorship program ROI:
      </Text>

      {/* Stats Cards */}
      <View style={styles.statRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatCurrency(roi.annualSavings)}</Text>
          <Text style={styles.statLabel}>Projected Annual Savings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{roi.reducedTurnover}</Text>
          <Text style={styles.statLabel}>Employees Retained</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>25%</Text>
          <Text style={styles.statLabel}>Turnover Reduction</Text>
        </View>
      </View>

      {/* Retention Breakdown Table */}
      <Text style={styles.sectionSubtitle}>Current State Analysis</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Metric</Text>
          <Text style={[styles.tableHeaderText, { textAlign: 'right' }]}>Value</Text>
        </View>
        {retentionMetrics.map((row, index) => (
          <View key={row.label} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt]}>
            <Text style={styles.tableCellBold}>{row.label}</Text>
            <Text style={styles.tableCellRight}>{row.value}</Text>
          </View>
        ))}
      </View>

      {/* Savings Projection Table */}
      <Text style={styles.sectionSubtitle}>With Mentorship Program</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Metric</Text>
          <Text style={[styles.tableHeaderText, { textAlign: 'right' }]}>Value</Text>
        </View>
        {savingsMetrics.map((row, index) => (
          <View key={row.label} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt]}>
            <Text style={row.highlight ? styles.tableCellBold : styles.tableCell}>{row.label}</Text>
            <Text style={[styles.tableCellRight, row.highlight && { fontWeight: 700, color: BRAND_COLORS.green }]}>
              {row.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Assumptions Box */}
      <View style={styles.assumptionBox}>
        <Text style={[styles.label, { marginBottom: 4 }]}>Assumptions</Text>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>20% annual turnover rate (US average)</Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>$70,000 average salary</Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>75% replacement cost multiplier</Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>50% workforce participation in program</Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>25% reduction in turnover among participants</Text>
        </View>
      </View>
    </View>
  );
};

export default ROISection;

