import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import MentorshipTemplatePDF from './MentorshipTemplatePDF';

/**
 * Generate and download a PDF mentorship program template based on user selections
 * @param {Object} selections - User's program selections from the guide
 * @param {string} filename - Output filename (default: 'mentorship-program-template.pdf')
 * @returns {Promise<boolean>} - True if successful
 */
export const generateMentorshipPDF = async (selections, filename = 'mentorship-program-template.pdf') => {
  try {
    // Format the generated date
    const generatedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Generate PDF blob
    const blob = await pdf(
      <MentorshipTemplatePDF 
        selections={selections} 
        generatedDate={generatedDate} 
      />
    ).toBlob();

    // Trigger download
    saveAs(blob, filename);

    // GTM tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pdf_download',
        pdf_name: 'mentorship-program-template',
        program_goal: selections.programGoal,
        program_format: selections.programFormat,
        mentoring_style: selections.mentoringStyle,
        matching_process: selections.matchingProcess,
        employee_populations: selections.employeePopulations?.join(', '),
      });
    }

    return true;
  } catch (error) {
    console.error('Error generating Mentorship Template PDF:', error);
    throw error;
  }
};

export default generateMentorshipPDF;

