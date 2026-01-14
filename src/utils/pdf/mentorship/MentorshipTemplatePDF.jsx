import React from 'react';
import { Document } from '@react-pdf/renderer';

// Page Components
import ProgramSummaryPage from './pages/ProgramSummaryPage';
import TimelinePage from './pages/TimelinePage';
import PromotionPage from './pages/PromotionPage';
import MetricsPage from './pages/MetricsPage';
import NextStepsPage from './pages/NextStepsPage';

/**
 * MentorshipTemplatePDF - Main PDF document component
 * Generates a 5-page personalized mentorship program template
 * 
 * @param {Object} selections - User's program selections from the guide
 * @param {string} generatedDate - Formatted date string for the PDF
 */
const MentorshipTemplatePDF = ({ selections, generatedDate }) => {
  return (
    <Document
      title="Mentorship Program Template"
      author="Together Platform"
      subject="Personalized Mentorship Program Template"
      keywords="mentorship, program template, HR, Together Platform"
    >
      {/* Page 1: Program Summary */}
      <ProgramSummaryPage 
        selections={selections} 
        generatedDate={generatedDate} 
      />

      {/* Page 2: Implementation Timeline */}
      <TimelinePage selections={selections} />

      {/* Page 3: Promotion & Engagement */}
      <PromotionPage />

      {/* Page 4: Measuring Success */}
      <MetricsPage selections={selections} />

      {/* Page 5: Next Steps & CTA */}
      <NextStepsPage />
    </Document>
  );
};

export default MentorshipTemplatePDF;

