import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import BusinessCasePDF from './BusinessCasePDF';

/**
 * Generate and download a PDF business case based on user selections
 * @param {Object} selections - User's program selections
 * @param {string} filename - Output filename (default: 'mentorship-business-case.pdf')
 */
export const generatePDF = async (selections, filename = 'mentorship-business-case.pdf') => {
  try {
    // Generate PDF blob
    const blob = await pdf(<BusinessCasePDF selections={selections} />).toBlob();
    
    // Trigger download
    saveAs(blob, filename);
    
    // GTM tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pdf_download',
        pdf_name: 'mentorship-business-case',
        employee_size: selections.employeeSize,
        primary_goal: selections.primaryGoal,
        program_type: selections.programType,
        audience_size: selections.audienceSize,
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export default generatePDF;

