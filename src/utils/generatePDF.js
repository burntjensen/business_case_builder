import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// ============================================================================
// CONSTANTS & DEFAULTS
// ============================================================================

const DEFAULTS = {
  avgSalary: 70000,
  annualTurnoverRate: 0.20,
  replacementCostMultiplier: 0.75,
  retentionLiftPct: 0.25,
  participantsPct: 0.50,
  productivityLiftPct: 0.012, // 1.2% productivity lift
  programLength: 'Cohort', // TODO: Wire from UI
  feedbackCollection: 'Milestone-based', // TODO: Wire from UI
};

// Brand Colors (RGB values)
const COLORS = {
  brandIndigo: [12, 27, 84],
  brandYellow: [255, 164, 64],
  brandBlue: [0, 174, 239],
  brandGreen: [57, 128, 129],
  brandCream: [242, 240, 237],
  brandYellowSoft: [255, 223, 176],
  grayText: [71, 85, 130],
  white: [255, 255, 255],
};

// Goal summaries mapping
const GOAL_SUMMARIES = {
  'Retention & Turnover': 'Your program focuses on reducing costly employee attrition and building stronger career paths. Research shows mentorship programs reduce turnover by 25-50% among participants, directly impacting your bottom line through decreased recruiting and training costs.',
  'Leadership Pipeline': 'Your program focuses on developing future leaders and accelerating succession planning. Studies show mentees are promoted 5x more frequently than non-participants, creating a robust pipeline of ready-now leaders for critical roles.',
  'DEI & Belonging': 'Your program focuses on supporting underrepresented groups and building an inclusive culture. Mentorship is particularly effective for diverse talent, with participants reporting significant gains in confidence, sponsorship, and leadership capabilities.',
  'Onboarding & Ramp': 'Your program focuses on shortening time-to-productivity for new hires and improving manager support. New employees with mentors reach full productivity 25% faster, significantly reducing onboarding costs and improving early retention.',
};

// Program outline descriptions
const PROGRAM_TYPE_DESCRIPTIONS = {
  'Traditional 1:1': 'One-on-one mentoring pairs a more experienced mentor with a developing mentee for ongoing developmental conversations. This model is ideal for deep skill transfer, career guidance, and building lasting professional relationships.',
  'Group Mentoring': 'One mentor works with multiple mentees simultaneously, creating peer learning opportunities alongside mentor guidance. This model efficiently scales mentorship while fostering community.',
  'Peer Mentoring': 'Colleagues at similar career levels support each other\'s growth through mutual exchange. This model builds cross-functional networks and is especially effective for remote or distributed teams.',
  'Reverse Mentoring': 'Junior employees mentor senior leaders on emerging topics like technology, generational perspectives, or market trends. This model breaks down hierarchical barriers and promotes inclusion.',
};

const MATCHING_DESCRIPTIONS = {
  'Algorithm-led': 'Automated matching uses data-driven algorithms considering 30+ variables (goals, skills, availability, preferences) to create optimal pairings. This approach achieves 95%+ satisfaction rates and eliminates administrative burden.',
  'Admin-curated': 'Program administrators manually review participant profiles and make pairing decisions. This approach works well for small programs where administrators have deep organizational knowledge.',
  'Hybrid': 'Algorithm suggests matches while administrators make final approval decisions. This combines algorithmic efficiency with human oversight and organizational context.',
  'Self-service': 'Participants browse available mentors/mentees and request their own matches. This approach gives participants autonomy but may result in less optimal pairings.',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format currency with commas, no decimals
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
 * Format percentage
 */
const formatPercent = (decimal, decimals = 0) => {
  return (decimal * 100).toFixed(decimals) + '%';
};

/**
 * Parse employee size range and return midpoint
 */
const parseEmployeeSize = (sizeRange) => {
  if (!sizeRange) return 1000;
  if (sizeRange === '5000+') return 6000;
  const match = sizeRange.match(/(\d+)-(\d+)/);
  if (match) {
    return Math.round((parseInt(match[1]) + parseInt(match[2])) / 2);
  }
  return 1000;
};

/**
 * Calculate comprehensive ROI metrics
 */
const calculateROI = (selections) => {
  const employees = parseEmployeeSize(selections.employeeSize);
  const avgSalary = selections.avgSalary ?? DEFAULTS.avgSalary;
  const turnoverRate = selections.annualTurnoverRate ?? DEFAULTS.annualTurnoverRate;
  const replacementMultiplier = selections.replacementCostMultiplier ?? DEFAULTS.replacementCostMultiplier;
  const retentionLift = selections.retentionLiftPct ?? DEFAULTS.retentionLiftPct;
  const participantsPct = selections.participantsPct ?? DEFAULTS.participantsPct;
  
  // Participants calculation
  const participants = selections.participantsCount ?? Math.round(employees * participantsPct);
  const actualParticipantsPct = participants / employees;
  
  // Current turnover cost
  const currentTurnoverCost = employees * turnoverRate * avgSalary * replacementMultiplier;
  
  // Retention savings for program participants
  const participantLeavers = participants * turnoverRate;
  const avoidedLeavers = Math.round(participantLeavers * retentionLift);
  const retentionSavings = avoidedLeavers * avgSalary * replacementMultiplier;
  
  // Savings if all employees participated
  const allEmployeeLeavers = employees * turnoverRate;
  const allAvoidedLeavers = Math.round(allEmployeeLeavers * retentionLift);
  const allEmployeeSavings = allAvoidedLeavers * avgSalary * replacementMultiplier;
  
  // Productivity ROI (if revenue provided)
  const totalRevenue = selections.totalRevenue;
  let productivityData = null;
  if (totalRevenue) {
    const incrementalRevenue = totalRevenue * actualParticipantsPct * DEFAULTS.productivityLiftPct;
    productivityData = {
      totalRevenue,
      participantsPct: actualParticipantsPct,
      incrementalRevenue,
      projectedRevenue: totalRevenue + incrementalRevenue,
    };
  }
  
  return {
    employees,
    avgSalary,
    turnoverRate,
    replacementMultiplier,
    retentionLift,
    participants,
    participantsPct: actualParticipantsPct,
    currentTurnoverCost,
    avoidedLeavers,
    retentionSavings,
    allEmployeeSavings,
    productivityData,
  };
};

/**
 * Estimate effort hours for manual vs software approach
 */
const estimateEffortHours = (participants, matchingApproach) => {
  // Base hours + per-participant scaling
  const matchingMultiplier = {
    'Admin-curated': 1.5,
    'Hybrid': 1.0,
    'Algorithm-led': 0.3,
    'Self-service': 0.5,
  }[matchingApproach] ?? 1.0;
  
  const tasks = {
    'Program setup (tooling)': {
      manual: 12 + Math.round(participants * 0.02),
      software: 4 + Math.round(participants * 0.005),
    },
    'Promotion & registration': {
      manual: 8 + Math.round(participants * 0.03),
      software: 4 + Math.round(participants * 0.01),
    },
    'Matching participants': {
      manual: Math.round((10 + participants * 0.15) * matchingMultiplier),
      software: Math.round((2 + participants * 0.01) * (matchingMultiplier * 0.3)),
    },
    'Ongoing management': {
      manual: 8 + Math.round(participants * 0.08),
      software: 4 + Math.round(participants * 0.02),
    },
    'Feedback collection': {
      manual: 6 + Math.round(participants * 0.05),
      software: 2 + Math.round(participants * 0.005),
    },
    'Reporting & analytics': {
      manual: 8 + Math.round(participants * 0.04),
      software: 1 + Math.round(participants * 0.002),
    },
  };
  
  let manualTotal = 0;
  let softwareTotal = 0;
  Object.values(tasks).forEach(t => {
    manualTotal += t.manual;
    softwareTotal += t.software;
  });
  
  return { tasks, manualTotal, softwareTotal };
};

// ============================================================================
// PDF SECTION RENDERERS
// ============================================================================

/**
 * Add section header with consistent styling
 */
const addSectionHeader = (doc, title, yPos, pageWidth, margin) => {
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title, margin, yPos);
  return yPos + 12;
};

/**
 * Add paragraph with word wrapping
 */
const addParagraph = (doc, text, yPos, pageWidth, margin, fontSize = 10) => {
  doc.setTextColor(...COLORS.grayText);
  doc.setFontSize(fontSize);
  doc.setFont('helvetica', 'normal');
  const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
  doc.text(lines, margin, yPos);
  return yPos + lines.length * (fontSize * 0.5) + 8;
};

/**
 * Render cover page header
 */
const renderCoverHeader = (doc, selections, pageWidth, margin) => {
  let yPos = 20;
  
  // Header banner
  doc.setFillColor(...COLORS.brandIndigo);
  doc.rect(0, 0, pageWidth, 55, 'F');
  
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Business Case for Mentorship', pageWidth / 2, 28, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Personalized Program Summary', pageWidth / 2, 42, { align: 'center' });
  
  yPos = 70;
  
  // Company info
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Organization', margin, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.grayText);
  if (selections.employeeSize) {
    doc.text(`Company Size: ${selections.employeeSize} employees`, margin, yPos);
    yPos += 6;
  }
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generated: ${date}`, margin, yPos);
  
  return yPos + 15;
};

/**
 * Section 1: Summary table
 */
const renderSectionSummary = (doc, selections, yPos, pageWidth, margin) => {
  yPos = addSectionHeader(doc, 'Section 1: Your Program Selections', yPos, pageWidth, margin);
  
  const programLength = selections.programLength ?? DEFAULTS.programLength;
  const feedbackCollection = selections.feedbackCollection ?? DEFAULTS.feedbackCollection;
  
  const data = [
    ['Primary Goal', selections.primaryGoal || 'Not selected'],
    ['Company Size', selections.employeeSize ? `${selections.employeeSize} employees` : 'Not selected'],
    ['Program Type', selections.programType || 'Not selected'],
    ['Target Audience', selections.audienceSize || 'Not selected'],
    ['Matching Approach', selections.matchingApproach || 'Not selected'],
    ['Program Length', programLength], // TODO: Wire from UI
    ['Feedback Collection', feedbackCollection], // TODO: Wire from UI
    ['Measurement Focus', selections.measurementFocus || 'Not selected'],
    ['Timeline', selections.timeline || 'Not selected'],
  ];
  
  autoTable(doc, {
    startY: yPos,
    head: [['Selection', 'Your Choice']],
    body: data,
    theme: 'striped',
    headStyles: { fillColor: COLORS.brandIndigo, fontSize: 10, fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 4 },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: COLORS.brandIndigo, cellWidth: 55 },
      1: { textColor: COLORS.grayText },
    },
    margin: { left: margin, right: margin },
  });
  
  return doc.lastAutoTable.finalY + 15;
};

/**
 * Section 2: Program Goal + Outline
 */
const renderSectionProgramGoalOutline = (doc, selections, yPos, pageWidth, pageHeight, margin, checkPageBreak) => {
  if (checkPageBreak(80)) yPos = margin;
  
  yPos = addSectionHeader(doc, 'Section 2: Program Goal & Outline', yPos, pageWidth, margin);
  
  // Goal summary
  const goalSummary = GOAL_SUMMARIES[selections.primaryGoal] || 
    'Your mentorship program will drive meaningful business outcomes through structured developmental relationships.';
  
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Program Goal', margin, yPos);
  yPos += 7;
  
  yPos = addParagraph(doc, goalSummary, yPos, pageWidth, margin, 10);
  yPos += 5;
  
  // Program Outline
  if (checkPageBreak(60)) yPos = margin;
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Program Outline', margin, yPos);
  yPos += 10;
  
  const programType = selections.programType || 'Traditional 1:1';
  const matchingApproach = selections.matchingApproach || 'Algorithm-led';
  const programLength = selections.programLength ?? DEFAULTS.programLength;
  const feedbackCollection = selections.feedbackCollection ?? DEFAULTS.feedbackCollection;
  
  const outlineItems = [
    { label: 'Match Type', value: programType, desc: PROGRAM_TYPE_DESCRIPTIONS[programType] || '' },
    { label: 'Match Process', value: matchingApproach, desc: MATCHING_DESCRIPTIONS[matchingApproach] || '' },
    { label: 'Program Length', value: programLength, desc: programLength === 'Cohort' ? 
      'Fixed-duration cohorts with defined start and end dates create accountability and momentum.' :
      'Evergreen enrollment allows ongoing matching as participants join throughout the year.' },
    { label: 'Feedback Collection', value: feedbackCollection, desc: feedbackCollection === 'Milestone-based' ?
      'Feedback collected at key program milestones provides actionable insights at decision points.' :
      'Regular pulse surveys track engagement trends and enable early intervention.' },
  ];
  
  outlineItems.forEach(item => {
    if (checkPageBreak(25)) yPos = margin;
    
    doc.setTextColor(...COLORS.brandIndigo);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${item.label}: `, margin, yPos);
    
    doc.setTextColor(...COLORS.grayText);
    doc.setFont('helvetica', 'normal');
    doc.text(item.value, margin + doc.getTextWidth(`${item.label}: `), yPos);
    yPos += 6;
    
    const descLines = doc.splitTextToSize(item.desc, pageWidth - 2 * margin - 5);
    doc.setFontSize(9);
    doc.text(descLines, margin + 5, yPos);
    yPos += descLines.length * 4.5 + 6;
  });
  
  return yPos + 5;
};

/**
 * Section 3: ROI Analysis (Retention + Productivity)
 */
const renderSectionROI = (doc, selections, yPos, pageWidth, pageHeight, margin, checkPageBreak) => {
  doc.addPage();
  yPos = margin;
  
  yPos = addSectionHeader(doc, 'Section 3: ROI Analysis', yPos, pageWidth, margin);
  
  const roi = calculateROI(selections);
  
  // Retention ROI subsection
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Retention Impact', margin, yPos);
  yPos += 8;
  
  yPos = addParagraph(doc, 'Based on your organization size and industry benchmarks, here\'s the projected impact on employee retention:', yPos, pageWidth, margin, 9);
  
  // Retention metrics table
  const retentionData = [
    ['Total Employees', roi.employees.toLocaleString()],
    ['Average Salary', formatCurrency(roi.avgSalary)],
    ['Annual Turnover Rate', formatPercent(roi.turnoverRate)],
    ['Current Turnover Cost', formatCurrency(roi.currentTurnoverCost)],
    ['', ''],
    ['Program Participants', `${roi.participants.toLocaleString()} (${formatPercent(roi.participantsPct)})`],
    ['Retention Improvement', formatPercent(roi.retentionLift)],
    ['Avoided Departures', `${roi.avoidedLeavers} employees`],
    ['Annual Retention Savings', formatCurrency(roi.retentionSavings)],
  ];
  
  autoTable(doc, {
    startY: yPos,
    body: retentionData,
    theme: 'plain',
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: COLORS.brandIndigo, cellWidth: 65 },
      1: { textColor: COLORS.grayText, halign: 'right' },
    },
    margin: { left: margin, right: margin },
  });
  
  yPos = doc.lastAutoTable.finalY + 10;
  
  // Scale comparison table
  if (checkPageBreak(40)) yPos = margin;
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Savings at Scale', margin, yPos);
  yPos += 8;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Participation Level', 'Annual Savings']],
    body: [
      [`Current scope (${roi.participants.toLocaleString()} participants)`, formatCurrency(roi.retentionSavings)],
      [`Full organization (${roi.employees.toLocaleString()} employees)`, formatCurrency(roi.allEmployeeSavings)],
    ],
    theme: 'striped',
    headStyles: { fillColor: COLORS.brandIndigo, fontSize: 9 },
    styles: { fontSize: 9, cellPadding: 4 },
    margin: { left: margin, right: margin },
  });
  
  yPos = doc.lastAutoTable.finalY + 10;
  
  // Assumptions box
  if (checkPageBreak(35)) yPos = margin;
  doc.setFillColor(...COLORS.brandCream);
  doc.setDrawColor(...COLORS.grayText);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 28, 2, 2, 'FD');
  
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Assumptions:', margin + 4, yPos + 7);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.grayText);
  doc.setFontSize(8);
  doc.text(`• ${formatPercent(roi.turnoverRate)} annual turnover rate (US average)`, margin + 4, yPos + 13);
  doc.text(`• ${formatCurrency(roi.avgSalary)} average salary`, margin + 4, yPos + 18);
  doc.text(`• ${formatPercent(roi.replacementMultiplier)} replacement cost multiplier  • ${formatPercent(roi.retentionLift)} retention improvement`, margin + 4, yPos + 23);
  
  yPos += 35;
  
  // Productivity ROI subsection
  if (checkPageBreak(50)) yPos = margin;
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Productivity Impact (Revenue)', margin, yPos);
  yPos += 8;
  
  if (roi.productivityData) {
    const prodData = roi.productivityData;
    autoTable(doc, {
      startY: yPos,
      body: [
        ['Total Revenue', formatCurrency(prodData.totalRevenue)],
        ['Participation Rate', formatPercent(prodData.participantsPct)],
        ['Productivity Lift', formatPercent(DEFAULTS.productivityLiftPct, 1)],
        ['Incremental Revenue', formatCurrency(prodData.incrementalRevenue)],
        ['Projected Revenue', formatCurrency(prodData.projectedRevenue)],
      ],
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: COLORS.brandIndigo, cellWidth: 65 },
        1: { textColor: COLORS.grayText, halign: 'right' },
      },
      margin: { left: margin, right: margin },
    });
    yPos = doc.lastAutoTable.finalY + 6;
  } else {
    doc.setTextColor(...COLORS.grayText);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('Revenue data not provided. Add your total revenue to calculate productivity impact.', margin, yPos);
    yPos += 10;
  }
  
  // Productivity assumption note
  yPos = addParagraph(doc, 'Assumes a 1.2% productivity lift applied to the portion of revenue attributable to participating employees (based on Sun Microsystems research on mentorship outcomes).', yPos, pageWidth, margin, 8);
  
  return yPos + 10;
};

/**
 * Section 4: Resources (Manual vs Software)
 */
const renderSectionResources = (doc, selections, yPos, pageWidth, pageHeight, margin, checkPageBreak) => {
  doc.addPage();
  yPos = margin;
  
  yPos = addSectionHeader(doc, 'Section 4: Resources & Effort', yPos, pageWidth, margin);
  
  const roi = calculateROI(selections);
  const effort = estimateEffortHours(roi.participants, selections.matchingApproach);
  
  yPos = addParagraph(doc, `Estimated administrative hours for a program with ${roi.participants.toLocaleString()} participants:`, yPos, pageWidth, margin, 10);
  
  // Hours comparison table
  const hoursData = Object.entries(effort.tasks).map(([task, hours]) => [
    task,
    `${hours.manual} hrs`,
    `${hours.software} hrs`,
  ]);
  hoursData.push(['Total', `${effort.manualTotal} hrs`, `${effort.softwareTotal} hrs`]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['Task', 'Manual', 'Software']],
    body: hoursData,
    theme: 'striped',
    headStyles: { fillColor: COLORS.brandIndigo, fontSize: 9 },
    styles: { fontSize: 9, cellPadding: 4 },
    columnStyles: {
      0: { textColor: COLORS.brandIndigo, cellWidth: 70 },
      1: { halign: 'center' },
      2: { halign: 'center' },
    },
    margin: { left: margin, right: margin },
  });
  
  yPos = doc.lastAutoTable.finalY + 12;
  
  // Qualitative comparison
  if (checkPageBreak(60)) yPos = margin;
  
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Manual approach works well when...', margin, yPos);
  yPos += 6;
  
  doc.setTextColor(...COLORS.grayText);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const manualBullets = [
    '• Running a small pilot (under 50 participants)',
    '• Administrators have deep personal knowledge of all participants',
    '• Program scope is limited to a single team or department',
  ];
  manualBullets.forEach(b => { doc.text(b, margin + 3, yPos); yPos += 5; });
  yPos += 6;
  
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Software-supported approach works well when...', margin, yPos);
  yPos += 6;
  
  doc.setTextColor(...COLORS.grayText);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const softwareBullets = [
    '• Scaling beyond 50 participants or multiple cohorts',
    '• Consistent matching quality and reporting are priorities',
    '• Program needs to demonstrate ROI to leadership',
  ];
  softwareBullets.forEach(b => { doc.text(b, margin + 3, yPos); yPos += 5; });
  yPos += 8;
  
  // Tradeoffs paragraph
  yPos = addParagraph(doc, 'Both approaches can succeed depending on organizational context. Manual programs offer flexibility for small pilots, while software-supported programs provide consistency, scalability, and measurable outcomes as programs grow.', yPos, pageWidth, margin, 9);
  yPos += 5;
  
  // Decision heuristic callout
  if (checkPageBreak(30)) yPos = margin;
  doc.setFillColor(...COLORS.brandYellowSoft);
  doc.setDrawColor(...COLORS.brandYellow);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 22, 3, 3, 'FD');
  
  doc.setTextColor(...COLORS.brandIndigo);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Rule of thumb:', margin + 5, yPos + 8);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('After ~50 participants, manual mentorship programs become increasingly', margin + 5, yPos + 14);
  doc.text('complex to manage consistently (matching, follow-up, and reporting).', margin + 5, yPos + 19);
  
  return yPos + 30;
};

/**
 * Section 5: Case Studies
 */
const renderSectionCaseStudies = (doc, yPos, pageWidth, pageHeight, margin, checkPageBreak) => {
  if (checkPageBreak(100)) {
    doc.addPage();
    yPos = margin;
  }
  
  yPos = addSectionHeader(doc, 'Section 5: Real Results', yPos, pageWidth, margin);
  
  yPos = addParagraph(doc, 'Organizations across industries have achieved measurable outcomes with structured mentorship programs:', yPos, pageWidth, margin, 10);
  yPos += 3;
  
  const caseStudies = [
    { org: 'Wellabe', stat: 'Employee engagement increased from 69% to 92%' },
    { org: 'CDM Smith', stat: '96% of respondents reported new gains in confidence, responsibilities, and leadership capabilities' },
    { org: 'CDM Smith', stat: '34% of mentees received promotions (vs. 13% of non-participants)' },
    { org: 'CDM Smith', stat: '$3.2 million in cost savings from retention impact' },
    { org: 'CDM Smith', stat: '5% higher retention rate for program participants' },
    { org: 'Together Programs', stat: 'Average mentor feedback score: 3.93/4' },
    { org: 'Together Programs', stat: 'Average mentee feedback score: 3.95/4' },
    { org: 'OPH', stat: '100% of participants reported measurable increases in skill-level across core competencies' },
  ];
  
  doc.setFontSize(9);
  caseStudies.forEach(cs => {
    if (checkPageBreak(8)) yPos = margin;
    
    doc.setTextColor(...COLORS.brandIndigo);
    doc.setFont('helvetica', 'bold');
    doc.text(`${cs.org}: `, margin, yPos);
    
    doc.setTextColor(...COLORS.grayText);
    doc.setFont('helvetica', 'normal');
    const statLines = doc.splitTextToSize(cs.stat, pageWidth - 2 * margin - doc.getTextWidth(`${cs.org}: `));
    doc.text(statLines, margin + doc.getTextWidth(`${cs.org}: `), yPos);
    yPos += statLines.length * 4.5 + 4;
  });
  
  return yPos + 10;
};

/**
 * About Together + CTAs
 */
const renderSectionAboutTogether = (doc, yPos, pageWidth, pageHeight, margin, checkPageBreak) => {
  if (checkPageBreak(70)) {
    doc.addPage();
    yPos = margin;
  }
  
  yPos = addSectionHeader(doc, 'About Together', yPos, pageWidth, margin);
  
  const aboutText = 'Together provides hands-on support from program design through launch and beyond. Our team of mentorship experts works directly with you to define goals, configure matching, and build a program tailored to your organization\'s needs. With dedicated onboarding and ongoing success management, you\'re never navigating implementation alone.';
  yPos = addParagraph(doc, aboutText, yPos, pageWidth, margin, 10);
  yPos += 10;
  
  // CTAs
  doc.setFillColor(...COLORS.brandIndigo);
  doc.roundedRect(margin, yPos, 75, 18, 3, 3, 'F');
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.textWithLink('Get pricing →', margin + 10, yPos + 11, { url: 'https://www.togetherplatform.com/pricing' });
  
  doc.setFillColor(...COLORS.brandYellow);
  doc.roundedRect(margin + 85, yPos, 80, 18, 3, 3, 'F');
  doc.setTextColor(...COLORS.brandIndigo);
  doc.textWithLink('Book a demo call →', margin + 93, yPos + 11, { url: 'https://www.togetherplatform.com/request-a-demo' });
  
  yPos += 30;
  
  // Footer
  const footerY = pageHeight - 15;
  doc.setTextColor(...COLORS.grayText);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Generated by Together Platform Business Case Builder', pageWidth / 2, footerY, { align: 'center' });
  doc.textWithLink('www.togetherplatform.com', pageWidth / 2, footerY + 5, { url: 'https://www.togetherplatform.com', align: 'center' });
  
  return yPos;
};

// ============================================================================
// MAIN PDF GENERATOR
// ============================================================================

/**
 * Generate comprehensive PDF business case
 * @param {Object} selections - User's selections from the guide
 * @param {string} filename - Optional filename
 */
export const generatePDF = (selections, filename = 'business-case-summary.pdf') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  let yPosition = margin;
  
  // Page break helper
  const checkPageBreak = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };
  
  // PAGE 1: Cover + Summary + Program Goal/Outline
  yPosition = renderCoverHeader(doc, selections, pageWidth, margin);
  yPosition = renderSectionSummary(doc, selections, yPosition, pageWidth, margin);
  yPosition = renderSectionProgramGoalOutline(doc, selections, yPosition, pageWidth, pageHeight, margin, checkPageBreak);
  
  // PAGE 2: ROI Analysis
  yPosition = renderSectionROI(doc, selections, yPosition, pageWidth, pageHeight, margin, checkPageBreak);
  
  // PAGE 3: Resources comparison
  yPosition = renderSectionResources(doc, selections, yPosition, pageWidth, pageHeight, margin, checkPageBreak);
  
  // Remaining: Case Studies + About/CTAs
  yPosition = renderSectionCaseStudies(doc, yPosition, pageWidth, pageHeight, margin, checkPageBreak);
  yPosition = renderSectionAboutTogether(doc, yPosition, pageWidth, pageHeight, margin, checkPageBreak);
  
  // Save
  doc.save(filename);
};

export default generatePDF;
