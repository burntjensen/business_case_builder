import { StyleSheet } from '@react-pdf/renderer';

// Use built-in Helvetica font family (guaranteed to work in react-pdf)
// Custom fonts like DM Sans require reliable CDN URLs which can be unreliable
// Helvetica provides regular, bold, italic, and bold-italic variants built-in

// Brand Colors
export const BRAND_COLORS = {
  indigo: '#0C1B54',
  yellow: '#FFA440',
  blue: '#00AEEF',
  green: '#398081',
  cream: '#F2F0ED',
  yellowSoft: '#FFDFB0',
  white: '#FFFFFF',
  grayText: '#475582',
  grayLight: '#94A3B8',
};

// Shared styles
export const styles = StyleSheet.create({
  // Page styles
  page: {
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 35,
    backgroundColor: BRAND_COLORS.cream,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: BRAND_COLORS.grayText,
  },
  
  // Header banner
  headerBanner: {
    backgroundColor: BRAND_COLORS.indigo,
    marginHorizontal: -35,
    marginTop: -30,
    paddingVertical: 25,
    paddingHorizontal: 35,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: BRAND_COLORS.white,
    textAlign: 'center',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 11,
    color: BRAND_COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  
  // Section styles
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: BRAND_COLORS.indigo,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: BRAND_COLORS.yellow,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: 700,
    color: BRAND_COLORS.indigo,
    marginBottom: 6,
    marginTop: 10,
  },
  
  // Typography
  paragraph: {
    fontSize: 10,
    lineHeight: 1.5,
    color: BRAND_COLORS.grayText,
    marginBottom: 8,
  },
  label: {
    fontSize: 9,
    fontWeight: 700,
    color: BRAND_COLORS.indigo,
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    color: BRAND_COLORS.grayText,
  },
  smallText: {
    fontSize: 8,
    color: BRAND_COLORS.grayLight,
    lineHeight: 1.4,
  },
  
  // Company info
  companyInfo: {
    marginBottom: 15,
  },
  companyLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: BRAND_COLORS.indigo,
    marginBottom: 4,
  },
  companyDetail: {
    fontSize: 10,
    color: BRAND_COLORS.grayText,
    marginBottom: 2,
  },
  
  // Tables
  table: {
    marginTop: 8,
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: BRAND_COLORS.indigo,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: 700,
    color: BRAND_COLORS.white,
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableRowAlt: {
    backgroundColor: BRAND_COLORS.white,
  },
  tableCell: {
    fontSize: 9,
    color: BRAND_COLORS.grayText,
    flex: 1,
  },
  tableCellBold: {
    fontSize: 9,
    fontWeight: 700,
    color: BRAND_COLORS.indigo,
    flex: 1,
  },
  tableCellRight: {
    fontSize: 9,
    color: BRAND_COLORS.grayText,
    textAlign: 'right',
    flex: 1,
  },
  
  // Cards & Boxes
  card: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  callout: {
    backgroundColor: BRAND_COLORS.yellowSoft,
    borderRadius: 6,
    padding: 12,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: BRAND_COLORS.yellow,
  },
  calloutTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: BRAND_COLORS.indigo,
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 9,
    color: BRAND_COLORS.grayText,
    lineHeight: 1.4,
  },
  assumptionBox: {
    backgroundColor: BRAND_COLORS.cream,
    borderRadius: 4,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  
  // Stats
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 700,
    color: BRAND_COLORS.indigo,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 8,
    color: BRAND_COLORS.grayText,
    textAlign: 'center',
  },
  
  // Bullets
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 5,
  },
  bulletPoint: {
    fontSize: 10,
    color: BRAND_COLORS.yellow,
    marginRight: 6,
    width: 8,
  },
  bulletText: {
    fontSize: 9,
    color: BRAND_COLORS.grayText,
    flex: 1,
    lineHeight: 1.4,
  },
  
  // CTAs & Buttons
  ctaContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 15,
  },
  buttonPrimary: {
    backgroundColor: BRAND_COLORS.indigo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonPrimaryText: {
    fontSize: 10,
    fontWeight: 700,
    color: BRAND_COLORS.white,
  },
  buttonSecondary: {
    backgroundColor: BRAND_COLORS.yellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonSecondaryText: {
    fontSize: 10,
    fontWeight: 700,
    color: BRAND_COLORS.indigo,
  },
  
  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 35,
    right: 35,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 8,
    color: BRAND_COLORS.grayLight,
    textAlign: 'center',
  },
  
  // Flex helpers
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexHalf: {
    flex: 1,
  },
});

export default styles;

