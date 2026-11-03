/**
 * Mock Notifications Dataset for Suchana Patt
 * Illustrative real-time alerts for recruitment notices, admit cards, and deadlines.
 */
export const initialMockNotifications = [
  {
    id: "notif-1",
    type: "Correction Window",
    category: "SSC",
    title: "SSC CGL 2026 Tier-I Window Active",
    message: "Correction window for online application form is now active until 17 Dec 2026.",
    time: "10 mins ago",
    read: false,
    link: "/jobs/ssc-cgl-2026"
  },
  {
    id: "notif-2",
    type: "Deadline Approaching",
    category: "Railway",
    title: "RRB NTPC CEN 05/2026 Last Date",
    message: "Registration closing in 3 days. Complete fee payment before server cutoff.",
    time: "45 mins ago",
    read: false,
    link: "/jobs/rrb-ntpc-2026"
  },
  {
    id: "notif-3",
    type: "Admit Card Released",
    category: "SSC",
    title: "SSC MTS & Havaldar 2026 Admit Card Out",
    message: "Download Tier-1 CBT hall tickets for upcoming November examination shifts.",
    time: "2 hours ago",
    read: false,
    link: "/admit-cards"
  },
  {
    id: "notif-4",
    type: "New Recruitment",
    category: "Police",
    title: "UP Police 32,600 Constable Vacancies Live",
    message: "Online applications commenced for Civil Police and Armed Constabulary (PAC).",
    time: "5 hours ago",
    read: true,
    link: "/jobs/up-police-constable-2026"
  },
  {
    id: "notif-5",
    type: "Result Declared",
    category: "State Govt",
    title: "UPPSC PCS Prelims 2025 Scorecard Declared",
    message: "Official cut-off marks and qualified candidate roll numbers released.",
    time: "Yesterday",
    read: true,
    link: "/results"
  }
];

