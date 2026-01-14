/**
 * Timeline content for cohort and evergreen program formats
 * Content based on mentorship-template-pdf-content-spec.md
 */

export const timelineContent = {
  cohort: {
    title: 'Recommended Timeline: Cohort Program (12-Week Launch)',
    phases: [
      {
        phase: 'Program Design',
        weeks: '1-2',
        activities: 'Finalize goals, participant criteria, and matching parameters. Secure executive sponsorship and identify program champions.',
      },
      {
        phase: 'Platform Setup & Comms Prep',
        weeks: '3-4',
        activities: 'Configure mentoring tools and templates. Draft promotional content, registration materials, and participant resources.',
      },
      {
        phase: 'Registration Period',
        weeks: '5-7',
        activities: 'Launch promotional campaign across multiple channels. Host information sessions. Send targeted invitations to eligible employees.',
      },
      {
        phase: 'Matching Period',
        weeks: '8-9',
        activities: 'Run matching algorithm or complete manual pairings. Allow participant review window. Resolve any matching conflicts.',
      },
      {
        phase: 'Program Kickoff',
        weeks: '10-11',
        activities: 'Send pairing notifications. Distribute onboarding resources. Host kickoff event (virtual or in-person).',
      },
      {
        phase: 'Active Mentoring',
        weeks: '12+',
        activities: 'Monitor session completion. Send reminders and resources. Collect early feedback.',
      },
    ],
    callout: {
      title: 'Cohort Duration',
      text: 'We recommend 3-6 month cohorts for most programs. Shorter cohorts (3 months) work well for onboarding and skills-focused programs. Longer cohorts (6 months) suit leadership development and deep relationship building.',
    },
  },

  evergreen: {
    title: 'Recommended Timeline: Evergreen Program (8-Week Launch + Ongoing)',
    phases: [
      {
        phase: 'Program Design',
        weeks: '1-2',
        activities: 'Finalize goals, participant criteria, and matching parameters. Secure executive sponsorship and identify program champions.',
      },
      {
        phase: 'Platform Setup & Comms Prep',
        weeks: '3-4',
        activities: 'Configure mentoring tools and templates. Create evergreen promotional materials and self-service registration flows.',
      },
      {
        phase: 'Soft Launch',
        weeks: '5-6',
        activities: 'Invite initial cohort of mentors. Test registration and matching workflows. Gather early feedback and iterate.',
      },
      {
        phase: 'General Availability',
        weeks: '7-8',
        activities: 'Open registration to full target population. Launch ongoing promotional campaign. Enable self-service matching.',
      },
      {
        phase: 'Ongoing Management',
        weeks: '8+',
        activities: 'Monitor enrollment and matching rates. Refresh mentor pool periodically. Send engagement nudges and celebrate milestones.',
      },
    ],
    callout: {
      title: 'Evergreen Cadence',
      text: 'Plan quarterly "refreshes" to recruit new mentors, re-engage dormant participants, and promote the program to new employees. Set automated reminders for mentors to update their availability.',
    },
  },
};

export const getTimelineContent = (formatKey) => {
  return timelineContent[formatKey] || timelineContent.cohort;
};

export default timelineContent;

