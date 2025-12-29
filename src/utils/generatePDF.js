import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Parse employee size range and return midpoint for calculations
 * @param {string} sizeRange - Employee size range (e.g., "500-999")
 * @returns {number} - Midpoint of the range
 */
const parseEmployeeSize = (sizeRange) => {
  if (!sizeRange) return 1000; // Default fallback
  
  if (sizeRange === '5000+') return 6000;
  
  const match = sizeRange.match(/(\d+)-(\d+)/);
  if (match) {
    const min = parseInt(match[1]);
    const max = parseInt(match[2]);
    return Math.round((min + max) / 2);
  }
  
  return 1000; // Fallback
};

/**
 * Calculate ROI metrics based on employee size
 * @param {string} employeeSize - Employee size range
 * @returns {Object} - ROI metrics
 */
const calculateROI = (employeeSize) => {
  const employees = parseEmployeeSize(employeeSize);
  const turnoverRate = 0.20; // 20% annual turnover
  const avgSalary = 50000;
  const replacementCostMultiplier = 0.75;
  const mentorshipReduction = 0.25; // 25% reduction in turnover
  
  const annualTurnover = Math.round(employees * turnoverRate);
  const replacementCost = avgSalary * replacementCostMultiplier;
  const annualTurnoverCost = annualTurnover * replacementCost;
  
  // Assume mentorship program reaches 50% of workforce
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
  };
};

/**
 * Get insights based on user selections
 * @param {Object} selections - User's program selections
 * @returns {Array} - Array of insight objects
 */
const getInsights = (selections) => {
  const insights = [];
  
  // Goal-based insights
  if (selections.primaryGoal === 'Retention & Turnover') {
    insights.push({
      title: 'Retention Focus',
      content: 'Research shows mentorship programs reduce turnover by 25-50% among participants. Your focus on retention aligns with the most measurable ROI impact.',
    });
  } else if (selections.primaryGoal === 'Leadership Pipeline') {
    insights.push({
      title: 'Leadership Development',
      content: 'Studies show mentees are promoted 5x more frequently than non-participants. Building your leadership pipeline through mentorship accelerates succession planning.',
    });
  } else if (selections.primaryGoal === 'DEI & Belonging') {
    insights.push({
      title: 'Inclusion Impact',
      content: 'Mentorship is particularly effective for underrepresented groups, with mentored employees reporting 96% gains in confidence and leadership capabilities.',
    });
  } else if (selections.primaryGoal === 'Onboarding & Ramp') {
    insights.push({
      title: 'Faster Time-to-Productivity',
      content: 'New hires with mentors reach full productivity 25% faster than those without, significantly reducing onboarding costs.',
    });
  }
  
  // Matching approach insights
  if (selections.matchingApproach === 'Algorithm-led') {
    insights.push({
      title: 'Smart Matching',
      content: 'Algorithm-based matching achieves 95%+ satisfaction rates by considering 30+ variables simultaneously, far exceeding manual or self-service approaches.',
    });
  } else if (selections.matchingApproach === 'Hybrid') {
    insights.push({
      title: 'Best of Both Worlds',
      content: 'Hybrid matching combines algorithmic efficiency with human oversight, ensuring quality while maintaining the "people connection".',
    });
  }
  
  // Program type insights
  if (selections.programType === 'Traditional 1:1') {
    insights.push({
      title: '1:1 Mentorship',
      content: 'Traditional mentoring relationships typically run 6-12 months and are ideal for career development and retention objectives.',
    });
  } else if (selections.programType === 'Reverse Mentoring') {
    insights.push({
      title: 'Breaking Barriers',
      content: 'Reverse mentoring builds inclusion and gives senior leaders valuable insights into emerging trends and generational perspectives.',
    });
  }
  
  return insights;
};

/**
 * Format currency
 * @param {number} amount
 * @returns {string}
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
 * Generate comprehensive PDF business case
 * @param {Object} selections - User's selections from the guide
 * @param {string} filename - Optional filename (defaults to "business-case-summary.pdf")
 */
export const generatePDF = (selections, filename = 'business-case-summary.pdf') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;
  
  // Colors
  const primaryColor = [16, 185, 129]; // emerald-500
  const darkColor = [15, 23, 42]; // slate-900
  const grayColor = [100, 116, 139]; // slate-500
  
  // Helper function to check if we need a new page
  const checkPageBreak = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };
  
  // COVER PAGE
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Business Case for Mentorship', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Personalized Program Summary', pageWidth / 2, 45, { align: 'center' });
  
  yPosition = 80;
  
  // Company info
  doc.setTextColor(...darkColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Organization', margin, yPosition);
  yPosition += 10;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  if (selections.employeeSize) {
    doc.text(`Company Size: ${selections.employeeSize} employees`, margin, yPosition);
    yPosition += 8;
  }
  
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(`Generated: ${date}`, margin, yPosition);
  yPosition += 20;
  
  // SELECTIONS SUMMARY
  checkPageBreak(40);
  doc.setTextColor(...primaryColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Program Selections', margin, yPosition);
  yPosition += 10;
  
  const selectionData = [
    ['Primary Goal', selections.primaryGoal || 'Not selected'],
    ['Company Size', selections.employeeSize ? `${selections.employeeSize} employees` : 'Not selected'],
    ['Program Type', selections.programType || 'Not selected'],
    ['Audience Size', selections.audienceSize || 'Not selected'],
    ['Matching Approach', selections.matchingApproach || 'Not selected'],
    ['Measurement Focus', selections.measurementFocus || 'Not selected'],
    ['Timeline', selections.timeline || 'Not selected'],
  ];
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Selection', 'Your Choice']],
    body: selectionData,
    theme: 'striped',
    headStyles: { fillColor: primaryColor, fontSize: 11, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: darkColor },
      1: { textColor: grayColor },
    },
    margin: { left: margin, right: margin },
  });
  
  yPosition = doc.lastAutoTable.finalY + 20;
  
  // ROI ANALYSIS
  checkPageBreak(60);
  doc.setTextColor(...primaryColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Personalized ROI Analysis', margin, yPosition);
  yPosition += 10;
  
  const roi = calculateROI(selections.employeeSize);
  
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Based on your company size and industry benchmarks:', margin, yPosition);
  yPosition += 15;
  
  // ROI Metrics Table
  const roiData = [
    ['Total Employees', roi.employees.toLocaleString()],
    ['Annual Turnover (20%)', roi.annualTurnover.toLocaleString() + ' employees'],
    ['Current Turnover Cost', formatCurrency(roi.annualTurnoverCost)],
    ['', ''],
    ['Program Participants (50%)', roi.programParticipants.toLocaleString() + ' employees'],
    ['Reduced Turnover (25%)', roi.reducedTurnover.toLocaleString() + ' employees'],
    ['Annual Savings', formatCurrency(roi.annualSavings)],
  ];
  
  autoTable(doc, {
    startY: yPosition,
    body: roiData,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 4 },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: darkColor, cellWidth: 80 },
      1: { textColor: darkColor, halign: 'right', fontStyle: 'bold' },
    },
    margin: { left: margin, right: margin },
  });
  
  yPosition = doc.lastAutoTable.finalY + 15;
  
  // ROI Assumptions box
  checkPageBreak(35);
  doc.setDrawColor(...grayColor);
  doc.setFillColor(248, 250, 252); // slate-50
  doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 30, 3, 3, 'FD');
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Assumptions:', margin + 5, yPosition + 8);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  doc.text('• 20% annual turnover rate (US average)', margin + 5, yPosition + 14);
  doc.text('• $50,000 average salary', margin + 5, yPosition + 19);
  doc.text('• 75% replacement cost multiplier', margin + 5, yPosition + 24);
  
  yPosition += 40;
  
  // KEY INSIGHTS
  const insights = getInsights(selections);
  
  if (insights.length > 0) {
    checkPageBreak(30);
    doc.setTextColor(...primaryColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Insights for Your Program', margin, yPosition);
    yPosition += 12;
    
    insights.forEach((insight) => {
      checkPageBreak(25);
      
      doc.setTextColor(...darkColor);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(insight.title, margin, yPosition);
      yPosition += 7;
      
      doc.setTextColor(...grayColor);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(insight.content, pageWidth - 2 * margin);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 5 + 8;
    });
  }
  
  // NEXT STEPS
  checkPageBreak(50);
  doc.setTextColor(...primaryColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommended Next Steps', margin, yPosition);
  yPosition += 12;
  
  const nextSteps = [
    'Share this summary with key stakeholders (CFO, CHRO, department heads)',
    'Calculate your specific ROI using actual salary and turnover data',
    'Identify a pilot group or launch strategy based on your timeline',
    'Schedule stakeholder meetings to build consensus',
    'Request a demo or consultation to see platform capabilities',
  ];
  
  doc.setTextColor(...grayColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  nextSteps.forEach((step, index) => {
    checkPageBreak(10);
    const stepText = `${index + 1}. ${step}`;
    const lines = doc.splitTextToSize(stepText, pageWidth - 2 * margin - 5);
    doc.text(lines, margin + 5, yPosition);
    yPosition += lines.length * 5 + 3;
  });
  
  yPosition += 10;
  
  // SUCCESS STORY
  checkPageBreak(45);
  doc.setFillColor(240, 253, 244); // emerald-50
  doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 40, 3, 3, 'F');
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Real Results: CDM Smith Case Study', margin + 5, yPosition + 8);
  
  doc.setTextColor(...darkColor);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const caseStudyText = 'CDM Smith, a 5,000+ employee engineering firm, achieved $3.2M in savings within one year by implementing a structured mentorship program. Their mentees saw a 34% promotion rate compared to 13% for non-participants, with 96% reporting gains in confidence and leadership capabilities.';
  const caseStudyLines = doc.splitTextToSize(caseStudyText, pageWidth - 2 * margin - 10);
  doc.text(caseStudyLines, margin + 5, yPosition + 16);
  
  yPosition += 50;
  
  // FOOTER on last page
  const footerY = pageHeight - 20;
  doc.setTextColor(...grayColor);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Generated by Together Platform Business Case Builder', pageWidth / 2, footerY, { align: 'center' });
  doc.text('www.togetherplatform.com', pageWidth / 2, footerY + 5, { align: 'center' });
  
  // Save the PDF
  doc.save(filename);
};

export default generatePDF;

