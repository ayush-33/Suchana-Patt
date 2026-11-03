/**
 * Mock Job Notifications Dataset for Suchana Patt
 * Note: These records are illustrative demo recruitment data designed for frontend testing.
 */

export const mockJobs = [
  {
    id: "ssc-cgl-2026",
    slug: "ssc-cgl-recruitment-2026",
    title: "SSC Combined Graduate Level (CGL) Examination 2026",
    organization: "Staff Selection Commission (SSC)",
    jobType: "government",
    category: "SSC",
    department: "Department of Personnel and Training (DoPT)",
    qualification: ["Graduate"],
    minAge: 18,
    maxAge: 32,
    ageText: "18–32 Years",
    experience: "Not Required",
    experienceRange: "Not Required",
    ageRange: "26-35 Years",
    vacancies: 14582,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-15",
    applicationStartDate: "2026-10-20",
    lastDate: "2026-12-10",
    feeLastDate: "2026-12-11",
    correctionStartDate: "2026-12-15",
    correctionEndDate: "2026-12-17",
    examDate: "Feb / March 2027",
    admitCardDate: "10 Days before Exam",
    resultDate: "May 2027",
    shortDescription: "Staff Selection Commission has invited online applications from eligible Indian citizens for recruitment to various Group 'B' and Group 'C' posts across Ministries and Departments of the Government of India.",
    eligibility: {
      education: "Bachelor's Degree in any discipline from a recognized University or Institute.",
      experience: "No prior work experience is required. Fresh graduates are welcome.",
      skills: "Basic Computer Proficiency (Data Entry Speed Test) required for designated posts.",
      nationality: "Citizen of India, subject of Nepal/Bhutan, or Tibetan refugee as per rules.",
      notes: "Candidates appearing in final year of graduation can also apply subject to acquiring qualification before cutoff date."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 32,
      cutoffDate: "01-08-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years, PwD: 10 Years, Ex-Servicemen: 3 Years after deduction of military service."
    },
    importantDates: [
      { label: "Notification Issued", date: "15 Oct 2026" },
      { label: "Online Application Begin", date: "20 Oct 2026" },
      { label: "Last Date for Registration", date: "10 Dec 2026 (11:00 PM)" },
      { label: "Online Fee Payment Last Date", date: "11 Dec 2026" },
      { label: "Correction Window Period", date: "15–17 Dec 2026" },
      { label: "Tier-I Computer Based Exam", date: "Feb / March 2027" },
      { label: "Admit Card Available", date: "10 Days Before Exam" }
    ],
    applicationFees: [
      { category: "General / OBC / EWS", fee: "₹100" },
      { category: "SC / ST / PwD", fee: "₹0 (Exempted)" },
      { category: "All Female Candidates", fee: "₹0 (Exempted)" },
      { category: "First Time Correction Charge", fee: "₹200" },
      { category: "Second Time Correction Charge", fee: "₹500" }
    ],
    vacancyDetails: [
      { postName: "Assistant Audit Officer / Accounts Officer", category: "Group B Gazetted", vacancies: 450, eligibility: "Bachelor Degree with CA/CS/MBA Finance preferred" },
      { postName: "Assistant Section Officer (CSS, IB, MEA)", category: "Group B Non-Gazetted", vacancies: 2890, eligibility: "Bachelor Degree in any stream with Computer Typing" },
      { postName: "Inspector of Income Tax & Central Excise", category: "Group B Non-Gazetted", vacancies: 3410, eligibility: "Bachelor Degree in any stream" },
      { postName: "Sub-Inspector (CBI, NIA)", category: "Group B", vacancies: 820, eligibility: "Bachelor Degree with physical fitness criteria" },
      { postName: "Tax Assistant & Auditor", category: "Group C", vacancies: 7012, eligibility: "Bachelor Degree with 8000 key depressions per hour" }
    ],
    applicationSteps: [
      "Visit the official SSC website (ssc.gov.in) and complete the One Time Registration (OTR) if not already done.",
      "Log in with your Registration Number and Password created during OTR.",
      "Navigate to the 'Apply' section and click on 'Combined Graduate Level Examination 2026'.",
      "Fill in preference of posts, examination centers, and upload live web-cam photo and digital signature.",
      "Pay the application fee of ₹100 online (if applicable) through UPI, Net Banking, or Debit Card.",
      "Review the application preview carefully and submit. Download and print the confirmation page for future reference."
    ],
    links: {
      notification: "https://ssc.gov.in/notifications/demo-cgl-2026.pdf",
      apply: "https://ssc.gov.in/apply-cgl-2026",
      officialWebsite: "https://ssc.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://ssc.gov.in/syllabus/cgl-2026"
    },
    relatedJobIds: ["ssc-chsl-2026", "rrb-ntpc-2026", "ibps-po-2026"]
  },
  {
    id: "rrb-ntpc-2026",
    slug: "rrb-ntpc-recruitment-2026",
    title: "RRB NTPC Graduate & Undergraduate Recruitment 2026",
    organization: "Railway Recruitment Boards (RRB)",
    jobType: "government",
    category: "Railway",
    department: "Ministry of Railways",
    qualification: ["12th Pass", "Graduate"],
    minAge: 18,
    maxAge: 33,
    ageText: "18–33 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 11558,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-22",
    applicationStartDate: "2026-10-25",
    lastDate: "2026-12-05",
    feeLastDate: "2026-12-06",
    examDate: "Jan / Feb 2027",
    shortDescription: "Railway Recruitment Boards (RRB) have published notification CEN 05/2026 for Non-Technical Popular Categories (NTPC) for Station Master, Goods Guard, Senior Clerk, and Junior Accounts Assistant.",
    eligibility: {
      education: "Graduate level posts require Degree from recognized university; Undergraduate posts require 10+2 with minimum 50% marks.",
      experience: "No experience needed. Open to freshers.",
      skills: "Typing skill test for clerk positions (30 WPM English / 25 WPM Hindi).",
      nationality: "Indian National.",
      notes: "Candidates can apply to only one RRB zone."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 33,
      cutoffDate: "01-07-2026",
      relaxation: "SC/ST: 5 Years, OBC: 3 Years."
    },
    importantDates: [
      { label: "CEN Notification Release", date: "22 Oct 2026" },
      { label: "Application Start Date", date: "25 Oct 2026" },
      { label: "Closing Date for Submission", date: "05 Dec 2026" },
      { label: "Fee Payment Window Ends", date: "06 Dec 2026" },
      { label: "CBT-1 Exam Date", date: "Jan / Feb 2027" }
    ],
    applicationFees: [
      { category: "General / OBC", fee: "₹500 (₹400 refunded after appearing in CBT-1)" },
      { category: "SC / ST / Ex-Servicemen / Female / EWS", fee: "₹250 (Full refund after CBT-1)" }
    ],
    vacancyDetails: [
      { postName: "Station Master", category: "Graduate Post", vacancies: 4200, eligibility: "Bachelor Degree in any stream with CBAT" },
      { postName: "Goods Train Manager (Goods Guard)", category: "Graduate Post", vacancies: 3140, eligibility: "Bachelor Degree in any stream" },
      { postName: "Senior Commercial cum Ticket Clerk", category: "Graduate Post", vacancies: 2218, eligibility: "Bachelor Degree in any stream" },
      { postName: "Junior Clerk cum Typist", category: "Undergraduate (12th)", vacancies: 2000, eligibility: "12th Pass with 50% Marks + Typing" }
    ],
    applicationSteps: [
      "Access the regional RRB portal of your choice (e.g., rrbcdg.gov.in, rrbpatna.gov.in).",
      "Read CEN 05/2026 thoroughly and click 'Apply Online'.",
      "Enter personal identification, matriculation roll number, and communication details.",
      "Select your zone preference and qualification details.",
      "Upload passport photograph conforming to RRB white-background specifications.",
      "Pay registration fee and submit."
    ],
    links: {
      notification: "https://indianrailways.gov.in/rrb/ntpc-2026.pdf",
      apply: "https://rrbapply.gov.in/#/auth/home",
      officialWebsite: "https://indianrailways.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://indianrailways.gov.in/syllabus/ntpc"
    },
    relatedJobIds: ["ssc-cgl-2026", "rrb-alp-2026", "rpf-si-2026"]
  },
  {
    id: "ibps-po-2026",
    slug: "ibps-probationary-officer-po-2026",
    title: "IBPS Probationary Officers (PO / MT-XVI) 2026",
    organization: "Institute of Banking Personnel Selection (IBPS)",
    jobType: "government",
    category: "Banking",
    department: "Public Sector Banks in India",
    qualification: ["Graduate"],
    minAge: 20,
    maxAge: 30,
    ageText: "20–30 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 4455,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-18",
    applicationStartDate: "2026-10-21",
    lastDate: "2026-11-28",
    examDate: "Dec 2026",
    shortDescription: "Recruitment of Probationary Officers / Management Trainees in 11 participating public sector banks through the Common Recruitment Process (CRP PO/MT-XVI).",
    eligibility: {
      education: "A Degree (Graduation) in any discipline from a recognized University.",
      experience: "No prior experience required.",
      skills: "Operating and working knowledge in computer systems is mandatory.",
      nationality: "Indian citizen."
    },
    ageLimit: {
      minAge: 20,
      maxAge: 30,
      cutoffDate: "01-10-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years, PwD: 10 Years."
    },
    importantDates: [
      { label: "Notification Released", date: "18 Oct 2026" },
      { label: "Online Registration Start", date: "21 Oct 2026" },
      { label: "Last Date to Apply & Pay", date: "28 Nov 2026" },
      { label: "Preliminary Online Exam", date: "21 & 22 Dec 2026" },
      { label: "Main Examination", date: "Feb 2027" }
    ],
    applicationFees: [
      { category: "General / OBC / EWS", fee: "₹850" },
      { category: "SC / ST / PwD", fee: "₹175" }
    ],
    vacancyDetails: [
      { postName: "Probationary Officer (Bank of Baroda)", category: "Scale I", vacancies: 1200, eligibility: "Graduation with minimum 55%" },
      { postName: "Probationary Officer (Canara Bank)", category: "Scale I", vacancies: 950, eligibility: "Graduation in any stream" },
      { postName: "Probationary Officer (PNB)", category: "Scale I", vacancies: 1100, eligibility: "Graduation in any stream" },
      { postName: "Probationary Officer (Other Banks)", category: "Scale I", vacancies: 1205, eligibility: "Graduation in any stream" }
    ],
    applicationSteps: [
      "Open IBPS portal ibps.in and click CRP PO/MT.",
      "Register new user with name, mobile number, and email ID.",
      "Upload left thumb impression, handwritten declaration, and photograph.",
      "Pay examination fee online.",
      "Take a printout of the submitted form."
    ],
    links: {
      notification: "https://www.ibps.in/notifications/crp-po-16.pdf",
      apply: "https://ibpsonline.ibps.in/crppo16",
      officialWebsite: "https://www.ibps.in",
      admitCard: null,
      result: null,
      syllabus: "https://www.ibps.in/syllabus/crp-po"
    },
    relatedJobIds: ["sbi-po-2026", "ssc-cgl-2026", "rbi-grade-b-2026"]
  },
  {
    id: "upsc-nda-2026",
    slug: "upsc-nda-na-1-2026",
    title: "UPSC National Defence Academy (NDA & NA I) 2026",
    organization: "Union Public Service Commission (UPSC)",
    jobType: "government",
    category: "Defence",
    department: "Ministry of Defence",
    qualification: ["12th Pass"],
    minAge: 16.5,
    maxAge: 19.5,
    ageText: "16.5–19.5 Years",
    experience: "Not Required",
    experienceRange: "Not Required",
    ageRange: "18-25 Years",
    vacancies: 400,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-25",
    applicationStartDate: "2026-10-28",
    lastDate: "2026-12-18",
    examDate: "18 April 2027",
    shortDescription: "Union Public Service Commission invites unmarried male and female candidates for admission to the Army, Navy, and Air Force wings of NDA 156th Course and Indian Naval Academy (118th INAC).",
    eligibility: {
      education: "For Army Wing: 12th Class pass. For Air Force and Naval Wings: 12th Class pass with Physics, Chemistry, and Mathematics.",
      experience: "No experience. School passouts / appearing eligible.",
      skills: "Strict medical and physical fitness standards as per Service Board norms.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 16.5,
      maxAge: 19.5,
      cutoffDate: "02-01-2008 to 01-01-2011",
      relaxation: "No age relaxation is permissible for NDA candidates under any quota."
    },
    importantDates: [
      { label: "UPSC Notification Date", date: "25 Oct 2026" },
      { label: "Application Window Opens", date: "28 Oct 2026" },
      { label: "Application Window Closes", date: "18 Dec 2026 (6:00 PM)" },
      { label: "Written Examination Date", date: "18 April 2027" },
      { label: "SSB Interview Window", date: "Aug – Oct 2027" }
    ],
    applicationFees: [
      { category: "General / OBC Male", fee: "₹100" },
      { category: "SC / ST / All Female Candidates", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "National Defence Academy (Army)", category: "Defence Wing", vacancies: 208, eligibility: "12th Pass (Any stream)" },
      { postName: "National Defence Academy (Navy)", category: "Defence Wing", vacancies: 42, eligibility: "12th Pass with Physics & Maths" },
      { postName: "National Defence Academy (Air Force)", category: "Defence Wing", vacancies: 120, eligibility: "12th Pass with Physics & Maths" },
      { postName: "Naval Academy (10+2 Cadet Entry Scheme)", category: "Naval Wing", vacancies: 30, eligibility: "12th Pass with PCM (min 70% in aggregate)" }
    ],
    applicationSteps: [
      "Register via One Time Registration (OTR) on upsc.gov.in.",
      "Complete Part-I registration by providing academic preferences and contact details.",
      "Pay ₹100 fee via SBI Netbanking or debit/credit card.",
      "Complete Part-II: upload photo, signature, and government ID card.",
      "Select examination center and click 'I Agree' to final submit."
    ],
    links: {
      notification: "https://upsc.gov.in/notifications/nda-na-1-2026.pdf",
      apply: "https://upsconline.nic.in/upsc/OTRP",
      officialWebsite: "https://upsc.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://upsc.gov.in/syllabus/nda"
    },
    relatedJobIds: ["cds-2026", "afcat-2026", "ssc-cgl-2026"]
  },
  {
    id: "up-police-constable-2026",
    slug: "up-police-constable-civil-police-2026",
    title: "UP Police Constable (Civil Police & PAC) Bharti 2026",
    organization: "Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)",
    jobType: "government",
    category: "Police",
    department: "Home Police Department, Uttar Pradesh",
    qualification: ["12th Pass"],
    minAge: 18,
    maxAge: 25,
    ageText: "18–25 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 32600,
    location: "Uttar Pradesh",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-10",
    applicationStartDate: "2026-10-14",
    lastDate: "2026-11-30",
    feeLastDate: "2026-12-02",
    examDate: "Jan 2027",
    shortDescription: "Direct recruitment for 32,600 Constable posts in Uttar Pradesh Civil Police, Armed Constabulary (PAC), and Special Security Force. High-volume state government opportunity.",
    eligibility: {
      education: "Passed 10+2 (Intermediate) examination or equivalent from recognized board.",
      experience: "No prior experience required.",
      skills: "Physical fitness: Male 4.8 km run in 25 min; Female 2.4 km run in 14 min.",
      nationality: "Indian citizen (domicile benefit for UP residents)."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 25,
      cutoffDate: "01-07-2026",
      relaxation: "UP SC/ST/OBC: 5 Years."
    },
    importantDates: [
      { label: "Notification Date", date: "10 Oct 2026" },
      { label: "Online Application Starts", date: "14 Oct 2026" },
      { label: "Registration Last Date", date: "30 Nov 2026" },
      { label: "Fee Adjustment Window", date: "02 Dec 2026" },
      { label: "Written Exam Date", date: "17 & 18 Jan 2027" }
    ],
    applicationFees: [
      { category: "All Candidates (All Categories)", fee: "₹400" }
    ],
    vacancyDetails: [
      { postName: "Constable Civil Police (Male/Female)", category: "Civil", vacancies: 24500, eligibility: "12th Pass with Physical Standard" },
      { postName: "Constable PAC (Male)", category: "PAC", vacancies: 6100, eligibility: "12th Pass (Male only)" },
      { postName: "Uttar Pradesh Special Security Force (UPSSF)", category: "Special", vacancies: 2000, eligibility: "12th Pass" }
    ],
    applicationSteps: [
      "Visit uppbpb.gov.in and click on Constable Recruitment 2026 portal.",
      "Register with Aadhaar verification and educational certificates.",
      "Upload DigiLocker verified marksheets and passport size photograph.",
      "Submit application fee of ₹400 via online banking or UPI.",
      "Print final application receipt."
    ],
    links: {
      notification: "https://uppbpb.gov.in/recruitment/constable-2026.pdf",
      apply: "https://ccp123.uppbpb.gov.in",
      officialWebsite: "https://uppbpb.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://uppbpb.gov.in/syllabus/constable"
    },
    relatedJobIds: ["delhi-police-constable-2026", "bihar-police-si-2026", "ssc-gd-2026"]
  },
  {
    id: "ctet-dec-2026",
    slug: "ctet-december-2026-exam",
    title: "Central Teacher Eligibility Test (CTET Dec 2026)",
    organization: "Central Board of Secondary Education (CBSE)",
    jobType: "government",
    category: "Teaching",
    department: "Ministry of Education",
    qualification: ["Diploma", "Graduate", "Postgraduate"],
    minAge: 18,
    maxAge: 45,
    ageText: "18+ Years (No Upper Limit)",
    experience: "Not Required",
    experienceRange: "Not Required",
    ageRange: "18-25 Years",
    vacancies: null,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-12",
    applicationStartDate: "2026-10-15",
    lastDate: "2026-12-01",
    examDate: "14 Feb 2027",
    shortDescription: "CBSE will conduct the 20th edition of CTET across 136 cities for candidates aspiring to teach Classes I to VIII in KVS, NVS, Central Tibetan Schools, and UT schools.",
    eligibility: {
      education: "Paper I (Class I-V): Senior Secondary with at least 50% marks and 2-year D.El.Ed / B.El.Ed. Paper II (Class VI-VIII): Graduation with 2-year D.El.Ed or 1-year/2-year B.Ed.",
      experience: "Not required. B.Ed / D.El.Ed pursuing students can also appear.",
      skills: "Proficiency in Hindi and English languages.",
      nationality: "Indian citizen."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 60,
      cutoffDate: "No upper age limit for CTET eligibility certificate.",
      relaxation: "N/A"
    },
    importantDates: [
      { label: "CTET Bulletin Released", date: "12 Oct 2026" },
      { label: "Online Application Begins", date: "15 Oct 2026" },
      { label: "Submission Deadline", date: "01 Dec 2026 (11:59 PM)" },
      { label: "Final Fee Verification", date: "02 Dec 2026" },
      { label: "CTET Examination Date", date: "14 Feb 2027 (Sunday)" }
    ],
    applicationFees: [
      { category: "General / OBC (Only Paper I or II)", fee: "₹1,000" },
      { category: "General / OBC (Both Paper I & II)", fee: "₹1,200" },
      { category: "SC / ST / PwD (Only Paper I or II)", fee: "₹500" },
      { category: "SC / ST / PwD (Both Papers)", fee: "₹600" }
    ],
    vacancyDetails: [
      { postName: "CTET Paper I (Primary Teacher)", category: "Classes I to V", vacancies: "Eligibility Test", eligibility: "12th Pass + D.El.Ed / B.El.Ed" },
      { postName: "CTET Paper II (Upper Primary)", category: "Classes VI to VIII", vacancies: "Eligibility Test", eligibility: "Graduation + B.Ed" }
    ],
    applicationSteps: [
      "Log on to ctet.nic.in and click 'Apply for CTET Dec 2026'.",
      "Fill online application form and note Down Registration Number.",
      "Upload scanned images of latest Photograph and Signature.",
      "Pay examination fee through Debit Card / Credit Card / Net Banking.",
      "Print confirmation page."
    ],
    links: {
      notification: "https://ctet.nic.in/bulletin-dec-2026.pdf",
      apply: "https://examinationservices.nic.in/ctet",
      officialWebsite: "https://ctet.nic.in",
      admitCard: null,
      result: null,
      syllabus: "https://ctet.nic.in/syllabus"
    },
    relatedJobIds: ["kvs-teacher-2026", "nvs-teacher-2026", "uptet-2026"]
  },
  {
    id: "tcs-ninja-digital-2026",
    slug: "tcs-national-qualifier-test-nqt-2026",
    title: "TCS NQT National Qualifier Test (Ninja & Digital Roles)",
    organization: "Tata Consultancy Services (TCS)",
    jobType: "private",
    category: "IT / Private Sector",
    department: "Software Engineering & Technology",
    qualification: ["Graduate", "Postgraduate"],
    minAge: 20,
    maxAge: 28,
    ageText: "20–28 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 18000,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-08",
    applicationStartDate: "2026-10-10",
    lastDate: "2026-11-25",
    examDate: "12 & 13 Dec 2026",
    shortDescription: "TCS off-campus and on-campus national hiring drive for fresh engineers and graduates through TCS NQT. Roles offered in Ninja (3.6 LPA), Digital (7.2 LPA), and Prime (9 LPA).",
    eligibility: {
      education: "B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc with minimum 60% or 6 CGPA across 10th, 12th, and college.",
      experience: "0 to 1 year (Freshers of 2025/2026 batch).",
      skills: "Data Structures, Algorithms, Programming in C/C++/Java/Python, DBMS, and Aptitude.",
      nationality: "Open to Indian and global applicants."
    },
    ageLimit: {
      minAge: 20,
      maxAge: 28,
      cutoffDate: "31-12-2026",
      relaxation: "N/A (Corporate Policy)"
    },
    importantDates: [
      { label: "Drive Announced", date: "08 Oct 2026" },
      { label: "Registration Closes", date: "25 Nov 2026" },
      { label: "Test Date", date: "12 & 13 Dec 2026" },
      { label: "Interview Window", date: "Jan 2027" }
    ],
    applicationFees: [
      { category: "All Applicants", fee: "₹0 (Free via TCS NextStep Portal)" }
    ],
    vacancyDetails: [
      { postName: "System Engineer (Ninja)", category: "Software Development", vacancies: 12000, eligibility: "B.Tech/MCA 60% with NQT Score > 65%" },
      { postName: "Digital Specialist Engineer", category: "Cloud & AI", vacancies: 4500, eligibility: "High coding test score in NQT Advanced" },
      { postName: "Prime Software Engineer", category: "Core R&D", vacancies: 1500, eligibility: "Exceptional coding in algorithmic challenges" }
    ],
    applicationSteps: [
      "Visit TCS NextStep portal (nextstep.tcs.com).",
      "Register under 'IT' category using your collegiate credentials.",
      "Complete the application form and note your CT/DT reference number.",
      "Click 'Apply For Drive' and select test center preference.",
      "Track your application status on the portal dashboard."
    ],
    links: {
      notification: "https://www.tcs.com/careers/india/tcs-nqt-2026",
      apply: "https://nextstep.tcs.com/campus/#/",
      officialWebsite: "https://www.tcs.com",
      admitCard: null,
      result: null,
      syllabus: "https://www.tcs.com/careers/nqt-syllabus"
    },
    relatedJobIds: ["infosys-specialist-2026", "wipro-elite-2026", "cognizant-genc-2026"]
  },
  {
    id: "infosys-specialist-2026",
    slug: "infosys-specialist-programmer-2026",
    title: "Infosys Specialist Programmer & Digital Specialist",
    organization: "Infosys Limited",
    jobType: "private",
    category: "IT / Private Sector",
    department: "Enterprise Technology & AI",
    qualification: ["Graduate", "Postgraduate"],
    minAge: 20,
    maxAge: 27,
    ageText: "20–27 Years",
    experience: "0–1 Years",
    experienceRange: "0–1 Years",
    ageRange: "18-25 Years",
    vacancies: 6000,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-19",
    applicationStartDate: "2026-10-20",
    lastDate: "2026-12-08",
    examDate: "20 Dec 2026",
    shortDescription: "Infosys is hiring high-potential software engineers for roles offering up to 9.5 LPA through the InfyTQ and HackWithInfy national qualification round.",
    eligibility: {
      education: "B.Tech/B.E/M.Tech/M.E/MCA/M.Sc (Computer Science / IT / Circuit branches).",
      experience: "0 to 1 year experience or fresh passouts.",
      skills: "Advanced algorithms, Java, Python, REST APIs, Microservices.",
      nationality: "Indian National."
    },
    ageLimit: {
      minAge: 20,
      maxAge: 27,
      cutoffDate: "31-12-2026",
      relaxation: "N/A"
    },
    importantDates: [
      { label: "Registration Opens", date: "20 Oct 2026" },
      { label: "Last Date to Register", date: "08 Dec 2026" },
      { label: "Round 1 Coding Assessment", date: "20 Dec 2026" },
      { label: "Technical Interviews", date: "Jan 2027" }
    ],
    applicationFees: [
      { category: "Registration Fee", fee: "₹0 (Free)" }
    ],
    vacancyDetails: [
      { postName: "Specialist Programmer (SP)", category: "High Impact Coding", vacancies: 2500, eligibility: "B.Tech / MCA (CTC ₹9.5 LPA)" },
      { postName: "Digital Specialist Engineer (DSE)", category: "Fullstack / Cloud", vacancies: 3500, eligibility: "B.Tech / MCA (CTC ₹6.5 LPA)" }
    ],
    applicationSteps: [
      "Open career.infosys.com or infytq.onwingspan.com.",
      "Create profile and upload resume.",
      "Complete the system readiness check for proctored coding test.",
      "Attend the online assessment on scheduled date."
    ],
    links: {
      notification: "https://www.infosys.com/careers/specialist-hiring.html",
      apply: "https://career.infosys.com",
      officialWebsite: "https://www.infosys.com",
      admitCard: null,
      result: null,
      syllabus: null
    },
    relatedJobIds: ["tcs-ninja-digital-2026", "wipro-elite-2026", "hcl-tech-developer-2026"]
  },
  {
    id: "rbi-grade-b-2026",
    slug: "rbi-grade-b-officers-recruitment-2026",
    title: "RBI Grade 'B' (General / DEPR / DSIM) Officers 2026",
    organization: "Reserve Bank of India (RBI)",
    jobType: "government",
    category: "Banking",
    department: "Reserve Bank of India Services Board",
    qualification: ["Graduate", "Postgraduate"],
    minAge: 21,
    maxAge: 30,
    ageText: "21–30 Years",
    experience: "Not Required",
    experienceRange: "Not Required",
    ageRange: "26-35 Years",
    vacancies: 290,
    location: "All India",
    applicationMode: "Online",
    status: "upcoming",
    publishedAt: "2026-11-01",
    applicationStartDate: "2026-12-01",
    lastDate: "2026-12-28",
    examDate: "March 2027",
    shortDescription: "Reserve Bank of India Services Board has issued advance notice for recruitment of Officers in Grade 'B' (DR) - General, DEPR, and DSIM for premier central banking careers.",
    eligibility: {
      education: "Graduation in any discipline with minimum 60% marks (50% for SC/ST/PwBD) or Master's degree with 55% marks.",
      experience: "No prior banking experience mandatory for General stream.",
      skills: "Quantitative aptitude, reasoning, economic and social issues understanding.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 21,
      maxAge: 30,
      cutoffDate: "01-01-2027",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years, M.Phil/Ph.D candidates: Up to 32/34 years."
    },
    importantDates: [
      { label: "Short Notification", date: "01 Nov 2026" },
      { label: "Application Start Date", date: "01 Dec 2026" },
      { label: "Last Date to Apply", date: "28 Dec 2026" },
      { label: "Phase-I Online Exam", date: "March 2027" },
      { label: "Phase-II Examination", date: "April 2027" }
    ],
    applicationFees: [
      { category: "GEN / OBC / EWS", fee: "₹850" },
      { category: "SC / ST / PwBD", fee: "₹100 (Intimation charges only)" },
      { category: "RBI Staff", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Officers in Grade 'B' (DR) - General", category: "General", vacancies: 220, eligibility: "Graduation 60% or Postgraduation 55%" },
      { postName: "Officers in Grade 'B' (DR) - DEPR", category: "Economics", vacancies: 40, eligibility: "Master's Degree in Economics / Econometrics" },
      { postName: "Officers in Grade 'B' (DR) - DSIM", category: "Statistics", vacancies: 30, eligibility: "Master's Degree in Statistics / Mathematical Statistics" }
    ],
    applicationSteps: [
      "Access rbi.org.in and proceed to Opportunities@RBI.",
      "Register via IBPS online portal for RBI recruitment.",
      "Enter personal and educational qualifications.",
      "Pay application fees online.",
      "Download registered application form."
    ],
    links: {
      notification: "https://opportunities.rbi.org.in/demo-grade-b-2026.pdf",
      apply: null,
      officialWebsite: "https://www.rbi.org.in",
      admitCard: null,
      result: null,
      syllabus: "https://opportunities.rbi.org.in/syllabus/grade-b"
    },
    relatedJobIds: ["ibps-po-2026", "nabard-grade-a-2026", "sebi-grade-a-2026"]
  },
  {
    id: "ssc-chsl-2026",
    slug: "ssc-chsl-10-plus-2-recruitment-2026",
    title: "SSC Combined Higher Secondary Level (CHSL 10+2) 2026",
    organization: "Staff Selection Commission (SSC)",
    jobType: "government",
    category: "SSC",
    department: "Central Ministries and Subordinate Offices",
    qualification: ["12th Pass"],
    minAge: 18,
    maxAge: 27,
    ageText: "18–27 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 6200,
    location: "All India",
    applicationMode: "Online",
    status: "upcoming",
    publishedAt: "2026-11-01",
    applicationStartDate: "2026-12-10",
    lastDate: "2027-01-15",
    examDate: "April 2027",
    shortDescription: "Staff Selection Commission will conduct CHSL Examination for recruitment to Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO).",
    eligibility: {
      education: "Must have passed 12th Standard or equivalent examination from a recognized Board.",
      experience: "Not required.",
      skills: "Computer typing speed of 35 w.p.m. in English or 30 w.p.m. in Hindi on computer.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 27,
      cutoffDate: "01-08-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years, PwD: 10 Years."
    },
    importantDates: [
      { label: "Notification Release", date: "10 Dec 2026" },
      { label: "Online Application Starts", date: "10 Dec 2026" },
      { label: "Last Date for Online Application", date: "15 Jan 2027" },
      { label: "Tier 1 Computer Based Exam", date: "April 2027" }
    ],
    applicationFees: [
      { category: "General / OBC / EWS", fee: "₹100" },
      { category: "Women / SC / ST / PwD", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Lower Division Clerk (LDC) / JSA", category: "Group C", vacancies: 4800, eligibility: "12th Pass with Typing skill" },
      { postName: "Data Entry Operator (DEO)", category: "Group C", vacancies: 1400, eligibility: "12th Pass in Science stream with Mathematics" }
    ],
    applicationSteps: [
      "Visit ssc.gov.in and log in with your OTR credentials.",
      "Click 'Apply' under CHSL 2026 exam banner.",
      "Upload live camera photograph conforming to official guidelines.",
      "Submit application and pay ₹100 fee online."
    ],
    links: {
      notification: null,
      apply: null,
      officialWebsite: "https://ssc.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://ssc.gov.in/syllabus/chsl"
    },
    relatedJobIds: ["ssc-cgl-2026", "ssc-mts-2026", "rrb-ntpc-2026"]
  },
  {
    id: "ssc-mts-2026",
    slug: "ssc-multitasking-staff-havaldar-2026",
    title: "SSC Multi-Tasking Staff (MTS) & Havaldar (CBIC/CBN) 2026",
    organization: "Staff Selection Commission (SSC)",
    jobType: "government",
    category: "SSC",
    department: "Ministry of Finance & Government Departments",
    qualification: ["10th Pass"],
    minAge: 18,
    maxAge: 25,
    ageText: "18–25 Years (MTS) / 18–27 Years (Havaldar)",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 9800,
    location: "All India",
    applicationMode: "Online",
    status: "closed",
    publishedAt: "2026-08-10",
    applicationStartDate: "2026-08-12",
    lastDate: "2026-09-30",
    examDate: "Nov 2026",
    shortDescription: "Recruitment of Multi Tasking (Non-Technical) Staff in Pay Level-1 and Havaldar in Central Board of Indirect Taxes and Customs (CBIC) and Central Bureau of Narcotics (CBN).",
    eligibility: {
      education: "Must have passed Matriculation (10th Class) Examination from a recognized Board.",
      experience: "No experience needed.",
      skills: "Havaldar posts require Physical Efficiency Test (Walking: 1600m in 15 min for males).",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 25,
      cutoffDate: "01-08-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years."
    },
    importantDates: [
      { label: "Notification Released", date: "10 Aug 2026" },
      { label: "Application Closed", date: "30 Sept 2026" },
      { label: "Computer Based Exam", date: "18 Nov 2026" },
      { label: "Result Declaration", date: "Jan 2027" }
    ],
    applicationFees: [
      { category: "General / OBC Male", fee: "₹100" },
      { category: "SC / ST / Women / PwD", fee: "₹0" }
    ],
    vacancyDetails: [
      { postName: "MTS (Non-Technical)", category: "General Central Service", vacancies: 7200, eligibility: "10th Pass" },
      { postName: "Havaldar in CBIC & CBN", category: "Uniformed", vacancies: 2600, eligibility: "10th Pass + Physical Standard" }
    ],
    applicationSteps: [
      "Applications for this cycle are now closed.",
      "Check admit card section for exam status.",
      "Prepare for the upcoming Computer-Based Test."
    ],
    links: {
      notification: "https://ssc.gov.in/notifications/mts-havaldar-2026.pdf",
      apply: null,
      officialWebsite: "https://ssc.gov.in",
      admitCard: "https://ssc.gov.in/admit-card/mts-2026",
      result: null,
      syllabus: "https://ssc.gov.in/syllabus/mts"
    },
    relatedJobIds: ["ssc-cgl-2026", "ssc-chsl-2026", "rrb-group-d-2026"]
  },
  {
    id: "rrb-alp-2026",
    slug: "rrb-assistant-loco-pilot-alp-2026",
    title: "RRB Assistant Loco Pilot (ALP) CEN 01/2026",
    organization: "Railway Recruitment Boards (RRB)",
    jobType: "government",
    category: "Railway",
    department: "Ministry of Railways",
    qualification: ["10th Pass", "Diploma"],
    minAge: 18,
    maxAge: 30,
    ageText: "18–30 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 18799,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-05",
    applicationStartDate: "2026-10-10",
    lastDate: "2026-12-12",
    examDate: "Jan 2027",
    shortDescription: "Mega recruitment for Assistant Loco Pilot across all 21 Railway Recruitment Boards. Essential technical role in train operations and railway safety.",
    eligibility: {
      education: "Matriculation / 10th Pass PLUS ITI in designated trades (Fitter, Electrician, Machinist, Diesel Mechanic) OR 3 Years Diploma in Mechanical / Electrical / Electronics / Automobile Engineering.",
      experience: "No prior experience required.",
      skills: "A-1 Medical Standard (Distant Vision: 6/6, 6/6 without glasses mandatory).",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 30,
      cutoffDate: "01-07-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years."
    },
    importantDates: [
      { label: "Notification CEN 01/2026", date: "05 Oct 2026" },
      { label: "Online Application Began", date: "10 Oct 2026" },
      { label: "Application Last Date", date: "12 Dec 2026" },
      { label: "CBT 1 Exam Schedule", date: "Jan 2027" }
    ],
    applicationFees: [
      { category: "General / OBC", fee: "₹500 (₹400 refundable after CBT-1)" },
      { category: "SC / ST / Ex-Servicemen / Female / EWS", fee: "₹250 (Full refund after CBT-1)" }
    ],
    vacancyDetails: [
      { postName: "Assistant Loco Pilot (Electrical)", category: "Loco Operations", vacancies: 10500, eligibility: "10th + ITI / Diploma / Degree in Electrical/Mech" },
      { postName: "Assistant Loco Pilot (Mechanical)", category: "Loco Operations", vacancies: 8299, eligibility: "10th + ITI / Diploma / Degree in Mech/Auto" }
    ],
    applicationSteps: [
      "Visit rrbapply.gov.in and create an account.",
      "Fill online application selecting the RRB zone and preferred post.",
      "Upload digital photo and signature as per prescribed specifications.",
      "Pay examination fee and submit."
    ],
    links: {
      notification: "https://indianrailways.gov.in/alp-cen-01-2026.pdf",
      apply: "https://rrbapply.gov.in",
      officialWebsite: "https://indianrailways.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://indianrailways.gov.in/syllabus/alp"
    },
    relatedJobIds: ["rrb-ntpc-2026", "rrb-technician-2026", "rrb-group-d-2026"]
  },
  {
    id: "drdo-ceptam-2026",
    slug: "drdo-ceptam-11-recruitment-2026",
    title: "DRDO CEPTAM-11 Senior Technical Assistant (STA-B)",
    organization: "Defence Research and Development Organisation (DRDO)",
    jobType: "government",
    category: "Defence",
    department: "Ministry of Defence",
    qualification: ["Diploma", "Graduate"],
    minAge: 18,
    maxAge: 28,
    ageText: "18–28 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 1901,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-14",
    applicationStartDate: "2026-10-18",
    lastDate: "2026-12-07",
    examDate: "Feb 2027",
    shortDescription: "DRDO invites applications for Senior Technical Assistant-B (STA-B) and Technician-A (Tech-A) in various research laboratories across India.",
    eligibility: {
      education: "STA-B: 3 Years Diploma in Engineering or B.Sc in relevant subject. Tech-A: 10th pass + ITI certificate in relevant trade.",
      experience: "No prior experience required.",
      skills: "Subject knowledge in electronics, mechanical, computer science, or chemistry.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 28,
      cutoffDate: "07-12-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years."
    },
    importantDates: [
      { label: "CEPTAM-11 Release", date: "14 Oct 2026" },
      { label: "Online Application Opens", date: "18 Oct 2026" },
      { label: "Application Closes", date: "07 Dec 2026" },
      { label: "Tier-I Exam Date", date: "Feb 2027" }
    ],
    applicationFees: [
      { category: "General / OBC / EWS", fee: "₹100" },
      { category: "Women / SC / ST / PwBD / ESM", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Senior Technical Assistant-B (Computer Science)", category: "R&D", vacancies: 420, eligibility: "B.Sc / Diploma in Computer Science / IT" },
      { postName: "Senior Technical Assistant-B (Electronics)", category: "R&D", vacancies: 550, eligibility: "Diploma / B.Sc in Electronics / Comm" },
      { postName: "Senior Technical Assistant-B (Mechanical)", category: "R&D", vacancies: 430, eligibility: "Diploma in Mechanical Engineering" },
      { postName: "Technician-A (Various ITI Trades)", category: "Technical Support", vacancies: 501, eligibility: "10th Pass + ITI" }
    ],
    applicationSteps: [
      "Access drdo.gov.in CEPTAM notice board.",
      "Register with valid email ID and mobile number.",
      "Fill educational details and upload required certificates.",
      "Pay application fee of ₹100 online and submit."
    ],
    links: {
      notification: "https://www.drdo.gov.in/ceptam-11-advt.pdf",
      apply: "https://www.drdo.gov.in/apply-ceptam-11",
      officialWebsite: "https://www.drdo.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://www.drdo.gov.in/syllabus/ceptam-11"
    },
    relatedJobIds: ["isro-scientist-2026", "barc-scientific-asst-2026", "bel-engineer-2026"]
  },
  {
    id: "bihar-police-si-2026",
    slug: "bihar-police-sub-inspector-daroga-2026",
    title: "Bihar Police Sub Inspector (Daroga) Bharti 2026",
    organization: "Bihar Police Subordinate Services Commission (BPSSC)",
    jobType: "government",
    category: "Police",
    department: "Home (Police) Dept, Govt of Bihar",
    qualification: ["Graduate"],
    minAge: 20,
    maxAge: 37,
    ageText: "20–37 Years (Male) / 20–40 Years (Female)",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 2650,
    location: "Bihar",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-15",
    applicationStartDate: "2026-10-20",
    lastDate: "2026-12-04",
    examDate: "Jan 2027",
    shortDescription: "BPSSC invites online applications for appointment to 2,650 posts of Sub Inspector in Bihar Police. Preliminary examination scheduled for January 2027.",
    eligibility: {
      education: "Graduation degree in any subject from a recognized University or equivalent.",
      experience: "No experience needed.",
      skills: "Physical fitness: Male 1.6 km run in 6.5 min; High jump 4 feet; Long jump 12 feet; Shot put.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 20,
      maxAge: 37,
      cutoffDate: "01-08-2026",
      relaxation: "BC/EBC Male & Female: Up to 40 Years; SC/ST: Up to 42 Years."
    },
    importantDates: [
      { label: "Notification Advt 03/2026", date: "15 Oct 2026" },
      { label: "Online Application Starts", date: "20 Oct 2026" },
      { label: "Last Date for Application", date: "04 Dec 2026" },
      { label: "Preliminary Written Exam", date: "Jan 2027" }
    ],
    applicationFees: [
      { category: "General / EWS / EBC / BC (All Outside State)", fee: "₹700" },
      { category: "SC / ST / Female of Bihar", fee: "₹400" }
    ],
    vacancyDetails: [
      { postName: "Police Sub-Inspector (Daroga)", category: "Executive Police", vacancies: 2650, eligibility: "Bachelor Degree + Physical Standard" }
    ],
    applicationSteps: [
      "Visit bpssc.bih.nic.in.",
      "Register with Mobile and Email and complete fee payment.",
      "Fill application details and upload scanned photo and signature in Hindi & English.",
      "Submit and save registration slip."
    ],
    links: {
      notification: "https://bpssc.bih.nic.in/advt-03-2026.pdf",
      apply: "https://bpssc.bih.nic.in/apply-si-2026",
      officialWebsite: "https://bpssc.bih.nic.in",
      admitCard: null,
      result: null,
      syllabus: "https://bpssc.bih.nic.in/syllabus"
    },
    relatedJobIds: ["up-police-constable-2026", "delhi-police-si-2026", "ssc-cgl-2026"]
  },
  {
    id: "delhi-police-constable-2026",
    slug: "delhi-police-constable-executive-2026",
    title: "Delhi Police Constable (Executive) Male & Female 2026",
    organization: "Staff Selection Commission & Delhi Police",
    jobType: "government",
    category: "Police",
    department: "Delhi Police / Ministry of Home Affairs",
    qualification: ["12th Pass"],
    minAge: 18,
    maxAge: 25,
    ageText: "18–25 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 7547,
    location: "Delhi",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-18",
    applicationStartDate: "2026-10-22",
    lastDate: "2026-11-29",
    examDate: "15 Dec 2026",
    shortDescription: "Recruitment of Constable (Executive) Male and Female in Delhi Police Examination 2026 conducted centrally by SSC.",
    eligibility: {
      education: "10+2 (Senior Secondary) pass from a recognized Board.",
      experience: "No experience needed.",
      skills: "Male candidates must possess a valid driving license for LMV (Motorcycle or Car) as on date of PE&MT.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 25,
      cutoffDate: "01-07-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years."
    },
    importantDates: [
      { label: "Notification Date", date: "18 Oct 2026" },
      { label: "Registration Opens", date: "22 Oct 2026" },
      { label: "Registration Deadline", date: "29 Nov 2026" },
      { label: "CBT Exam Start Date", date: "15 Dec 2026" }
    ],
    applicationFees: [
      { category: "General / OBC Male", fee: "₹100" },
      { category: "Women / SC / ST / ESM", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Constable (Exe.) - Male", category: "General Policing", vacancies: 4453, eligibility: "12th Pass + LMV Driving License" },
      { postName: "Constable (Exe.) - Female", category: "General Policing", vacancies: 2491, eligibility: "12th Pass" },
      { postName: "Constable (Exe.) - Male (ESM)", category: "Ex-Servicemen", vacancies: 603, eligibility: "12th Pass / Army Special Certificate" }
    ],
    applicationSteps: [
      "Apply through ssc.gov.in under Delhi Police Constable portal.",
      "Upload live camera photo and required documents.",
      "Pay application fee of ₹100.",
      "Retain confirmation page."
    ],
    links: {
      notification: "https://ssc.gov.in/notifications/delhi-police-2026.pdf",
      apply: "https://ssc.gov.in",
      officialWebsite: "https://delhipolice.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://ssc.gov.in/syllabus/delhi-police"
    },
    relatedJobIds: ["up-police-constable-2026", "ssc-gd-2026", "ssc-cgl-2026"]
  },
  {
    id: "sbi-po-2026",
    slug: "state-bank-of-india-po-recruitment-2026",
    title: "SBI Probationary Officer (PO) Recruitment 2026",
    organization: "State Bank of India (SBI)",
    jobType: "government",
    category: "Banking",
    department: "Central Recruitment & Promotion Department (CRPD)",
    qualification: ["Graduate"],
    minAge: 21,
    maxAge: 30,
    ageText: "21–30 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 2000,
    location: "All India",
    applicationMode: "Online",
    status: "upcoming",
    publishedAt: "2026-11-01",
    applicationStartDate: "2026-12-05",
    lastDate: "2026-12-30",
    examDate: "Jan / Feb 2027",
    shortDescription: "State Bank of India will recruit 2,000 Probationary Officers for branches across India. Premier public sector banking leadership career.",
    eligibility: {
      education: "Graduation in any discipline from a recognized University or equivalent.",
      experience: "No experience needed.",
      skills: "Data analysis, verbal ability, and computer proficiency.",
      nationality: "Indian citizen."
    },
    ageLimit: {
      minAge: 21,
      maxAge: 30,
      cutoffDate: "01-04-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years."
    },
    importantDates: [
      { label: "Notification Expected", date: "05 Dec 2026" },
      { label: "Online Registration Window", date: "05–30 Dec 2026" },
      { label: "Preliminary Exam", date: "Jan / Feb 2027" },
      { label: "Main Examination", date: "March 2027" }
    ],
    applicationFees: [
      { category: "General / EWS / OBC", fee: "₹750" },
      { category: "SC / ST / PwD", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Probationary Officer (Regular)", category: "Officer Cadre", vacancies: 1950, eligibility: "Bachelor Degree in any discipline" },
      { postName: "Probationary Officer (Backlog)", category: "Officer Cadre", vacancies: 50, eligibility: "Bachelor Degree in any discipline" }
    ],
    applicationSteps: [
      "Visit sbi.co.in/careers and click on 'Current Openings'.",
      "Click 'Recruitment of Probationary Officers (2026)' and register.",
      "Complete application form and pay fee through SBI Payment Gateway.",
      "Save registration confirmation."
    ],
    links: {
      notification: null,
      apply: null,
      officialWebsite: "https://sbi.co.in/careers",
      admitCard: null,
      result: null,
      syllabus: "https://sbi.co.in/careers/po-syllabus"
    },
    relatedJobIds: ["ibps-po-2026", "rbi-grade-b-2026", "ssc-cgl-2026"]
  },
  {
    id: "hcl-tech-developer-2026",
    slug: "hcl-tech-graduate-engineer-trainee-2026",
    title: "HCLTech Graduate Engineer Trainee (GET) & Software Engineer",
    organization: "HCL Technologies",
    jobType: "private",
    category: "IT / Private Sector",
    department: "Engineering and R&D Services (ERS)",
    qualification: ["Graduate"],
    minAge: 21,
    maxAge: 26,
    ageText: "21–26 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 5000,
    location: "Noida / Bangalore / Chennai",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-20",
    applicationStartDate: "2026-10-22",
    lastDate: "2026-12-15",
    examDate: "Dec 2026",
    shortDescription: "HCLTech is inviting fresh engineering graduates for the position of Graduate Engineer Trainee across Cloud, Embedded Systems, Cybersecurity, and Enterprise Apps.",
    eligibility: {
      education: "B.Tech / B.E in CS / IT / ECE / EEE / Mechanical with minimum 65% aggregate.",
      experience: "Freshers of 2025/2026 batch.",
      skills: "Knowledge of C++, Java, or Python, object-oriented concepts, and problem solving.",
      nationality: "Indian National."
    },
    ageLimit: {
      minAge: 21,
      maxAge: 26,
      cutoffDate: "31-12-2026",
      relaxation: "N/A"
    },
    importantDates: [
      { label: "Application Start", date: "22 Oct 2026" },
      { label: "Application Deadline", date: "15 Dec 2026" },
      { label: "Online Assessment", date: "22 Dec 2026" }
    ],
    applicationFees: [
      { category: "Registration Fee", fee: "₹0 (Free)" }
    ],
    vacancyDetails: [
      { postName: "Graduate Engineer Trainee (Software)", category: "Product Dev", vacancies: 3200, eligibility: "B.Tech CS/IT/ECE (CTC 4.25 LPA)" },
      { postName: "GET (Infrastructure Services)", category: "Cloud & Ops", vacancies: 1800, eligibility: "B.Tech all streams (CTC 3.75 LPA)" }
    ],
    applicationSteps: [
      "Visit hcltech.com/careers/early-careers.",
      "Select Graduate Engineer Trainee 2026 opening.",
      "Upload resume, academic credentials, and fill personal details.",
      "Submit application."
    ],
    links: {
      notification: "https://www.hcltech.com/careers/get-2026",
      apply: "https://hcltech.com/careers/apply-get",
      officialWebsite: "https://www.hcltech.com",
      admitCard: null,
      result: null,
      syllabus: null
    },
    relatedJobIds: ["tcs-ninja-digital-2026", "infosys-specialist-2026", "wipro-elite-2026"]
  },
  {
    id: "wipro-elite-2026",
    slug: "wipro-elite-national-talent-hunt-2026",
    title: "Wipro Elite National Talent Hunt (Project Engineer)",
    organization: "Wipro Limited",
    jobType: "private",
    category: "IT / Private Sector",
    department: "Enterprise Technology",
    qualification: ["Graduate"],
    minAge: 20,
    maxAge: 25,
    ageText: "20–25 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 7500,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-16",
    applicationStartDate: "2026-10-20",
    lastDate: "2026-11-26",
    examDate: "10 Dec 2026",
    shortDescription: "Wipro Elite National Talent Hunt (NTH) is our premier engineering hiring initiative to identify ambitious talent for Project Engineer roles across India.",
    eligibility: {
      education: "B.E./B.Tech/M.E./M.Tech (5-year integrated-M.Tech) in any engineering discipline with 60% or 6.0 CGPA.",
      experience: "Freshers (0 years).",
      skills: "Aptitude, English communication, and coding in Java / C / C++ / Python.",
      nationality: "Indian citizen."
    },
    ageLimit: {
      minAge: 20,
      maxAge: 25,
      cutoffDate: "31-12-2026",
      relaxation: "N/A"
    },
    importantDates: [
      { label: "NTH Registration Start", date: "20 Oct 2026" },
      { label: "Registration Closes", date: "26 Nov 2026" },
      { label: "Online Assessment Window", date: "10–14 Dec 2026" }
    ],
    applicationFees: [
      { category: "Registration Fee", fee: "₹0 (Free)" }
    ],
    vacancyDetails: [
      { postName: "Project Engineer", category: "Core IT", vacancies: 7500, eligibility: "B.Tech with 60% (CTC 3.5 LPA – 6.5 LPA Turbo track)" }
    ],
    applicationSteps: [
      "Access careers.wipro.com/elite-nth.",
      "Register with Superset or candidate portal.",
      "Fill educational history and upload college ID/marksheet.",
      "Appear for test on allocated slot."
    ],
    links: {
      notification: "https://careers.wipro.com/elite-nth-2026",
      apply: "https://careers.wipro.com/apply",
      officialWebsite: "https://www.wipro.com",
      admitCard: null,
      result: null,
      syllabus: null
    },
    relatedJobIds: ["tcs-ninja-digital-2026", "infosys-specialist-2026", "hcl-tech-developer-2026"]
  },
  {
    id: "kvs-teacher-2026",
    slug: "kvs-pgt-tgt-prt-recruitment-2026",
    title: "KVS PGT, TGT, PRT & Non-Teaching Recruitment 2026",
    organization: "Kendriya Vidyalaya Sangathan (KVS)",
    jobType: "government",
    category: "Teaching",
    department: "Ministry of Education",
    qualification: ["Graduate", "Postgraduate", "Diploma"],
    minAge: 18,
    maxAge: 40,
    ageText: "18–40 Years",
    experience: "Not Required",
    experienceRange: "Not Required",
    ageRange: "36+ Years",
    vacancies: 8420,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-24",
    applicationStartDate: "2026-10-27",
    lastDate: "2026-12-16",
    examDate: "Feb 2027",
    shortDescription: "Kendriya Vidyalaya Sangathan invites online applications for Post Graduate Teachers (PGT), Trained Graduate Teachers (TGT), Primary Teachers (PRT), and Assistant Section Officers.",
    eligibility: {
      education: "PGT: Master's Degree with B.Ed. TGT: Bachelor's Degree with B.Ed and CTET Paper II pass. PRT: 12th with D.El.Ed / B.El.Ed and CTET Paper I pass.",
      experience: "Not required.",
      skills: "Competence to teach through Hindi & English media.",
      nationality: "Indian citizen."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 40,
      cutoffDate: "16-12-2026",
      relaxation: "Women (All categories) for Teaching posts: 10 Years; SC/ST: 5 Years; OBC: 3 Years."
    },
    importantDates: [
      { label: "Notification Released", date: "24 Oct 2026" },
      { label: "Online Application Begins", date: "27 Oct 2026" },
      { label: "Last Date to Submit Online", date: "16 Dec 2026" },
      { label: "Written Examination", date: "Feb 2027" }
    ],
    applicationFees: [
      { category: "Teaching Posts (PGT/TGT/PRT)", fee: "₹1,500" },
      { category: "SC / ST / PwD / Ex-Servicemen", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Primary Teacher (PRT)", category: "Primary", vacancies: 4100, eligibility: "12th Pass + D.El.Ed + CTET Paper 1" },
      { postName: "Trained Graduate Teacher (TGT)", category: "Secondary", vacancies: 2800, eligibility: "Graduation + B.Ed + CTET Paper 2" },
      { postName: "Post Graduate Teacher (PGT)", category: "Sr Secondary", vacancies: 1520, eligibility: "Postgraduation + B.Ed" }
    ],
    applicationSteps: [
      "Go to kvsangathan.nic.in and click Employment Notice.",
      "Register via CBSE recruitment portal for KVS.",
      "Upload photo, signature, and educational marksheets.",
      "Pay application fee online and save confirmation page."
    ],
    links: {
      notification: "https://kvsangathan.nic.in/recruitment/kvs-2026.pdf",
      apply: "https://kvsangathan.nic.in/apply",
      officialWebsite: "https://kvsangathan.nic.in",
      admitCard: null,
      result: null,
      syllabus: "https://kvsangathan.nic.in/syllabus/kvs-teaching"
    },
    relatedJobIds: ["ctet-dec-2026", "nvs-teacher-2026", "dsssb-teacher-2026"]
  },
  {
    id: "nvs-teacher-2026",
    slug: "navodaya-vidyalaya-samiti-teacher-2026",
    title: "Navodaya Vidyalaya Samiti (NVS) TGT & PGT Recruitment 2026",
    organization: "Navodaya Vidyalaya Samiti (NVS)",
    jobType: "government",
    category: "Teaching",
    department: "Department of School Education & Literacy",
    qualification: ["Graduate", "Postgraduate"],
    minAge: 21,
    maxAge: 40,
    ageText: "21–40 Years",
    experience: "Not Required",
    experienceRange: "Not Required",
    ageRange: "36+ Years",
    vacancies: 3100,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-18",
    applicationStartDate: "2026-10-22",
    lastDate: "2026-12-05",
    examDate: "Jan 2027",
    shortDescription: "NVS recruitment for Principals, Post Graduate Teachers (PGTs), Trained Graduate Teachers (TGTs), and Miscellaneous Category of Teachers in JNVs.",
    eligibility: {
      education: "PGT: Master's degree with 50% + B.Ed. TGT: 4-year integrated degree or Bachelor's with 50% + B.Ed + CTET Paper II.",
      experience: "Not required.",
      skills: "Bilingual instruction capability.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 21,
      maxAge: 40,
      cutoffDate: "05-12-2026",
      relaxation: "SC/ST: 5 Years, OBC: 3 Years, Women: 10 Years."
    },
    importantDates: [
      { label: "Notification Released", date: "18 Oct 2026" },
      { label: "Application Start Date", date: "22 Oct 2026" },
      { label: "Closing Date", date: "05 Dec 2026" },
      { label: "CBT Exam Date", date: "Jan 2027" }
    ],
    applicationFees: [
      { category: "PGT / TGT Posts", fee: "₹1,500" },
      { category: "SC / ST / PwD", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Trained Graduate Teacher (TGT)", category: "Secondary", vacancies: 1900, eligibility: "Graduation + B.Ed + CTET" },
      { postName: "Post Graduate Teacher (PGT)", category: "Sr Secondary", vacancies: 1200, eligibility: "Post Graduation + B.Ed" }
    ],
    applicationSteps: [
      "Access navodaya.gov.in.",
      "Fill online recruitment application form.",
      "Upload signature and photo.",
      "Pay application fee via payment gateway."
    ],
    links: {
      notification: "https://navodaya.gov.in/recruitment/nvs-2026.pdf",
      apply: "https://navodaya.gov.in/apply",
      officialWebsite: "https://navodaya.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://navodaya.gov.in/syllabus"
    },
    relatedJobIds: ["kvs-teacher-2026", "ctet-dec-2026", "dsssb-teacher-2026"]
  },
  {
    id: "uppsc-pcs-2026",
    slug: "uppsc-combined-state-upper-subordinate-pcs-2026",
    title: "UPPSC Combined State / Upper Subordinate Services (PCS) 2026",
    organization: "Uttar Pradesh Public Service Commission (UPPSC)",
    jobType: "government",
    category: "State Government",
    department: "General Administration Dept, Uttar Pradesh",
    qualification: ["Graduate"],
    minAge: 21,
    maxAge: 40,
    ageText: "21–40 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "36+ Years",
    vacancies: 480,
    location: "Uttar Pradesh",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-12",
    applicationStartDate: "2026-10-15",
    lastDate: "2026-11-28",
    feeLastDate: "2026-11-28",
    examDate: "March 2027",
    shortDescription: "UPPSC invites applications for prestigious administrative executive posts including Deputy Collector (SDM), Deputy Superintendent of Police (DSP), and Block Development Officer (BDO).",
    eligibility: {
      education: "Bachelor's Degree of any recognized University or equivalent qualification.",
      experience: "No experience needed.",
      skills: "General studies, Uttar Pradesh special paper, Hindi proficiency.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 21,
      maxAge: 40,
      cutoffDate: "01-07-2026",
      relaxation: "UP SC/ST/OBC: 5 Years (Max 45 years), PwD: 15 Years."
    },
    importantDates: [
      { label: "Notification Issued", date: "12 Oct 2026" },
      { label: "Application Start", date: "15 Oct 2026" },
      { label: "Fee Payment Last Date", date: "28 Nov 2026" },
      { label: "Final Form Submit Last Date", date: "02 Dec 2026" },
      { label: "Preliminary Examination", date: "March 2027" }
    ],
    applicationFees: [
      { category: "Unreserved / EWS / OBC", fee: "₹125" },
      { category: "SC / ST of UP", fee: "₹65" },
      { category: "Physically Handicapped (PwD)", fee: "₹25" }
    ],
    vacancyDetails: [
      { postName: "Deputy Collector (SDM)", category: "State Civil Service", vacancies: 75, eligibility: "Bachelor Degree in any discipline" },
      { postName: "Deputy Superintendent of Police (DSP)", category: "State Police Service", vacancies: 68, eligibility: "Bachelor Degree + Physical Standard" },
      { postName: "Block Development Officer (BDO)", category: "Rural Development", vacancies: 92, eligibility: "Bachelor Degree in any discipline" },
      { postName: "ARTO & Sub Registrar", category: "Transport / Revenue", vacancies: 245, eligibility: "Bachelor Degree (Law degree for Sub-Registrar)" }
    ],
    applicationSteps: [
      "Ensure valid UPPSC OTR (One Time Registration) on uppsc.up.nic.in.",
      "Select 'Apply' under Combined State / Upper Subordinate Exam 2026.",
      "Verify OTR details and select exam center preferences.",
      "Pay application fee of ₹125 through State Bank MOPS.",
      "Submit and save copy of submitted application."
    ],
    links: {
      notification: "https://uppsc.up.nic.in/notifications/pcs-2026.pdf",
      apply: "https://uppsc.up.nic.in/apply-pcs",
      officialWebsite: "https://uppsc.up.nic.in",
      admitCard: null,
      result: null,
      syllabus: "https://uppsc.up.nic.in/syllabus/pcs"
    },
    relatedJobIds: ["bpsc-cce-2026", "ras-rts-2026", "mppsc-state-service-2026"]
  },
  {
    id: "bpsc-cce-2026",
    slug: "bpsc-71st-combined-competitive-exam-2026",
    title: "BPSC 71st Combined Competitive Examination (CCE) 2026",
    organization: "Bihar Public Service Commission (BPSC)",
    jobType: "government",
    category: "State Government",
    department: "General Administration Department, Bihar",
    qualification: ["Graduate"],
    minAge: 20,
    maxAge: 37,
    ageText: "20–37 Years (Male) / 20–40 Years (Female)",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 620,
    location: "Bihar",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-17",
    applicationStartDate: "2026-10-21",
    lastDate: "2026-12-10",
    examDate: "Feb 2027",
    shortDescription: "Bihar Public Service Commission has issued recruitment notification for 71st Combined (Preliminary) Competitive Examination for high administrative posts.",
    eligibility: {
      education: "Graduate or equivalent examination passed from recognized University.",
      experience: "Not required.",
      skills: "General knowledge and analytical ability.",
      nationality: "Indian citizen."
    },
    ageLimit: {
      minAge: 20,
      maxAge: 37,
      cutoffDate: "01-08-2026",
      relaxation: "BC / EBC / Unreserved Female: 40 Years; SC/ST: 42 Years."
    },
    importantDates: [
      { label: "Notification 71st CCE", date: "17 Oct 2026" },
      { label: "Registration Opens", date: "21 Oct 2026" },
      { label: "Registration Closes", date: "10 Dec 2026" },
      { label: "Prelims Exam Date", date: "Feb 2027" }
    ],
    applicationFees: [
      { category: "General / Other Candidates", fee: "₹600" },
      { category: "SC / ST / Female of Bihar", fee: "₹150" }
    ],
    vacancyDetails: [
      { postName: "Sub Divisional Officer / Senior Deputy Collector", category: "Administrative Service", vacancies: 110, eligibility: "Bachelor Degree" },
      { postName: "Deputy Superintendent of Police (DSP)", category: "Police Service", vacancies: 85, eligibility: "Bachelor Degree + Physical Standard" },
      { postName: "Revenue Officer / Circle Officer", category: "Revenue Service", vacancies: 425, eligibility: "Bachelor Degree" }
    ],
    applicationSteps: [
      "Access onlinebpsc.bihar.gov.in.",
      "Register via One Time Registration (BPSC OTR).",
      "Upload biometric verification, photo, and signature.",
      "Pay examination fee and submit application."
    ],
    links: {
      notification: "https://bpsc.bih.nic.in/71st-cce-notice.pdf",
      apply: "https://onlinebpsc.bihar.gov.in",
      officialWebsite: "https://bpsc.bih.nic.in",
      admitCard: null,
      result: null,
      syllabus: "https://bpsc.bih.nic.in/syllabus"
    },
    relatedJobIds: ["uppsc-pcs-2026", "bihar-police-si-2026", "mppsc-state-service-2026"]
  },
  {
    id: "ras-rts-2026",
    slug: "rpsc-ras-rts-comb-comp-exam-2026",
    title: "RPSC Rajasthan Administrative Service (RAS/RTS) 2026",
    organization: "Rajasthan Public Service Commission (RPSC)",
    jobType: "government",
    category: "State Government",
    department: "Department of Personnel, Rajasthan",
    qualification: ["Graduate"],
    minAge: 21,
    maxAge: 40,
    ageText: "21–40 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "36+ Years",
    vacancies: 733,
    location: "Rajasthan",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-10",
    applicationStartDate: "2026-10-14",
    lastDate: "2026-11-27",
    examDate: "Jan 2027",
    shortDescription: "RPSC Combined Competitive Examination for recruitment to Rajasthan Administrative Service (RAS), Rajasthan Police Service (RPS), and Subordinate Services.",
    eligibility: {
      education: "Degree of recognized university. Final year appearing students can apply.",
      experience: "No prior experience required.",
      skills: "Knowledge of Rajasthani culture and Hindi in Devanagari script.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 21,
      maxAge: 40,
      cutoffDate: "01-01-2027",
      relaxation: "Rajasthan SC/ST/OBC/EWS Male: 5 Years, Female: 10 Years."
    },
    importantDates: [
      { label: "Advt Release", date: "10 Oct 2026" },
      { label: "Application Start", date: "14 Oct 2026" },
      { label: "Application Last Date", date: "27 Nov 2026" },
      { label: "Preliminary Exam", date: "Jan 2027" }
    ],
    applicationFees: [
      { category: "One Time Registration (OTR) General/Creamy", fee: "₹600" },
      { category: "Rajasthan SC / ST / OBC / EWS", fee: "₹400" }
    ],
    vacancyDetails: [
      { postName: "Rajasthan Administrative Service (RAS)", category: "State Service", vacancies: 180, eligibility: "Bachelor Degree" },
      { postName: "Rajasthan Police Service (RPS)", category: "State Service", vacancies: 95, eligibility: "Bachelor Degree" },
      { postName: "Subordinate Services (Tehsildar / Cooperative)", category: "Subordinate", vacancies: 458, eligibility: "Bachelor Degree" }
    ],
    applicationSteps: [
      "Log into SSO Rajasthan portal (sso.rajasthan.gov.in).",
      "Open Citizen Apps and navigate to Recruitment Portal.",
      "Complete One Time Registration (OTR) and fill RAS 2026 form.",
      "Submit and take printout."
    ],
    links: {
      notification: "https://rpsc.rajasthan.gov.in/ras-2026.pdf",
      apply: "https://sso.rajasthan.gov.in",
      officialWebsite: "https://rpsc.rajasthan.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://rpsc.rajasthan.gov.in/syllabus/ras"
    },
    relatedJobIds: ["uppsc-pcs-2026", "bpsc-cce-2026", "ssc-cgl-2026"]
  },
  {
    id: "rpf-si-2026",
    slug: "railway-protection-force-rpf-sub-inspector-2026",
    title: "RPF Sub-Inspector (Executive) Recruitment CEN 02/2026",
    organization: "Ministry of Railways / Railway Protection Force",
    jobType: "government",
    category: "Railway",
    department: "Railway Board",
    qualification: ["Graduate"],
    minAge: 20,
    maxAge: 28,
    ageText: "20–28 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 452,
    location: "All India",
    applicationMode: "Online",
    status: "closed",
    publishedAt: "2026-08-15",
    applicationStartDate: "2026-08-20",
    lastDate: "2026-10-02",
    examDate: "Dec 2026",
    shortDescription: "Recruitment of Sub-Inspector (Executive) in Railway Protection Force (RPF) and Railway Protection Special Force (RPSF).",
    eligibility: {
      education: "Graduation from a recognized University.",
      experience: "No experience required.",
      skills: "Physical fitness: 1600 meters run in 6 min 30 sec for male.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 20,
      maxAge: 28,
      cutoffDate: "01-07-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years."
    },
    importantDates: [
      { label: "Notification CEN 02/2026", date: "15 Aug 2026" },
      { label: "Application Began", date: "20 Aug 2026" },
      { label: "Registration Closed", date: "02 Oct 2026" },
      { label: "Computer Based Test", date: "02–12 Dec 2026" }
    ],
    applicationFees: [
      { category: "General / OBC", fee: "₹500 (₹400 refundable)" },
      { category: "SC / ST / Female / ESM", fee: "₹250 (Full refund)" }
    ],
    vacancyDetails: [
      { postName: "Sub Inspector (Executive) - Male", category: "Uniformed", vacancies: 384, eligibility: "Graduation in any discipline" },
      { postName: "Sub Inspector (Executive) - Female", category: "Uniformed", vacancies: 68, eligibility: "Graduation in any discipline" }
    ],
    applicationSteps: [
      "Applications are closed for this session.",
      "Candidates should download admit card when issued."
    ],
    links: {
      notification: "https://indianrailways.gov.in/rpf-si-2026.pdf",
      apply: null,
      officialWebsite: "https://rrbapply.gov.in",
      admitCard: "https://rrbapply.gov.in/admit-card/rpf-si",
      result: null,
      syllabus: "https://indianrailways.gov.in/syllabus/rpf-si"
    },
    relatedJobIds: ["rrb-ntpc-2026", "rrb-alp-2026", "bihar-police-si-2026"]
  },
  {
    id: "isro-scientist-2026",
    slug: "isro-scientist-engineer-sc-recruitment-2026",
    title: "ISRO Scientist / Engineer 'SC' (Electronics / Mech / CS)",
    organization: "Indian Space Research Organisation (ISRO)",
    jobType: "government",
    category: "Defence",
    department: "Department of Space, Government of India",
    qualification: ["Graduate", "Postgraduate"],
    minAge: 21,
    maxAge: 28,
    ageText: "21–28 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 325,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-22",
    applicationStartDate: "2026-10-26",
    lastDate: "2026-12-14",
    examDate: "Feb 2027",
    shortDescription: "ISRO Centralised Recruitment Board (ICRB) invites applications for Scientist/Engineer 'SC' in Level 10 of Pay Matrix in space research centers.",
    eligibility: {
      education: "B.E / B.Tech or equivalent in first class with aggregate minimum 65% marks or 6.84/10 CGPA.",
      experience: "No experience needed.",
      skills: "In-depth engineering fundamentals and problem solving.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 21,
      maxAge: 28,
      cutoffDate: "14-12-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years."
    },
    importantDates: [
      { label: "Notification Release", date: "22 Oct 2026" },
      { label: "Online Application Opens", date: "26 Oct 2026" },
      { label: "Application Closes", date: "14 Dec 2026" },
      { label: "Written Test Date", date: "Feb 2027" }
    ],
    applicationFees: [
      { category: "All Candidates", fee: "₹250 (Processing fee) + ₹750 Exam fee" },
      { category: "Women / SC / ST / PwD", fee: "₹0 (Exam fee exempted; refund of ₹250 upon appearing)" }
    ],
    vacancyDetails: [
      { postName: "Scientist/Engineer 'SC' (Electronics)", category: "Space Electronics", vacancies: 120, eligibility: "B.Tech in Electronics & Comm min 65%" },
      { postName: "Scientist/Engineer 'SC' (Mechanical)", category: "Propulsion & Structures", vacancies: 135, eligibility: "B.Tech in Mechanical Engineering min 65%" },
      { postName: "Scientist/Engineer 'SC' (Computer Science)", category: "Space Software", vacancies: 70, eligibility: "B.Tech in Computer Science min 65%" }
    ],
    applicationSteps: [
      "Access isro.gov.in/careers.",
      "Submit registration and verify email.",
      "Upload degree certificates and photo.",
      "Pay examination fee through SBI e-Pay."
    ],
    links: {
      notification: "https://www.isro.gov.in/icrb-scientist-sc-2026.pdf",
      apply: "https://apps.isac.gov.in/icrb",
      officialWebsite: "https://www.isro.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://www.isro.gov.in/syllabus/icrb"
    },
    relatedJobIds: ["drdo-ceptam-2026", "barc-scientific-asst-2026", "bel-engineer-2026"]
  },
  {
    id: "accenture-associate-2026",
    slug: "accenture-associate-software-engineer-2026",
    title: "Accenture Associate Software Engineer (ASE) & Advanced ASE",
    organization: "Accenture India",
    jobType: "private",
    category: "IT / Private Sector",
    department: "Technology Delivery",
    qualification: ["Graduate"],
    minAge: 20,
    maxAge: 26,
    ageText: "20–26 Years",
    experience: "0–1 Years",
    experienceRange: "0–1 Years",
    ageRange: "18-25 Years",
    vacancies: 8000,
    location: "Bangalore / Hyderabad / Pune / Gurugram",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-17",
    applicationStartDate: "2026-10-18",
    lastDate: "2026-12-05",
    examDate: "Dec 2026",
    shortDescription: "Accenture is hiring for entry-level Associate Software Engineer (4.5 LPA) and Advanced Associate Software Engineer (6.5 LPA) for enterprise cloud platforms.",
    eligibility: {
      education: "All engineering streams (B.E/B.Tech/MCA/M.Sc) with minimum 65% aggregate.",
      experience: "0 to 1 year experience.",
      skills: "Coding in any language, cognitive assessment, communication skills.",
      nationality: "Eligible to work in India."
    },
    ageLimit: {
      minAge: 20,
      maxAge: 26,
      cutoffDate: "31-12-2026",
      relaxation: "N/A"
    },
    importantDates: [
      { label: "Application Start", date: "18 Oct 2026" },
      { label: "Application Deadline", date: "05 Dec 2026" },
      { label: "Virtual Assessment", date: "Dec 2026" }
    ],
    applicationFees: [
      { category: "Registration Fee", fee: "₹0 (Free)" }
    ],
    vacancyDetails: [
      { postName: "Associate Software Engineer", category: "Delivery", vacancies: 6000, eligibility: "B.Tech/MCA all streams" },
      { postName: "Advanced Associate Software Engineer", category: "Core Coding", vacancies: 2000, eligibility: "High coding test qualifiers" }
    ],
    applicationSteps: [
      "Register on india.accenture.com/careers.",
      "Complete mock test and system compatibility check.",
      "Attend the multi-stage assessment.",
      "Clear technical and HR discussion."
    ],
    links: {
      notification: "https://www.accenture.com/in-en/careers/entry-level",
      apply: "https://indiacampus.accenture.com",
      officialWebsite: "https://www.accenture.com",
      admitCard: null,
      result: null,
      syllabus: null
    },
    relatedJobIds: ["tcs-ninja-digital-2026", "infosys-specialist-2026", "wipro-elite-2026"]
  },
  {
    id: "mppsc-state-service-2026",
    slug: "mppsc-state-service-examination-2026",
    title: "MPPSC State Service Examination (SSE) 2026",
    organization: "Madhya Pradesh Public Service Commission (MPPSC)",
    jobType: "government",
    category: "State Government",
    department: "General Administration, Madhya Pradesh",
    qualification: ["Graduate"],
    minAge: 21,
    maxAge: 40,
    ageText: "21–40 Years (45 for MP Domicile reserved)",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "36+ Years",
    vacancies: 340,
    location: "Madhya Pradesh",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-21",
    applicationStartDate: "2026-10-25",
    lastDate: "2026-12-08",
    examDate: "Feb 2027",
    shortDescription: "MPPSC SSE 2026 for recruitment to Deputy Collector, Deputy Superintendent of Police, Chief Municipal Officer, and Commercial Tax Officer.",
    eligibility: {
      education: "Bachelor's Degree from a recognized University.",
      experience: "No experience needed.",
      skills: "Madhya Pradesh general knowledge, Indian polity, history.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 21,
      maxAge: 40,
      cutoffDate: "01-01-2027",
      relaxation: "MP Reserved / Women: 5 Years relaxation (Up to 45 years)."
    },
    importantDates: [
      { label: "Notification Date", date: "21 Oct 2026" },
      { label: "Application Start", date: "25 Oct 2026" },
      { label: "Application Deadline", date: "08 Dec 2026" },
      { label: "Prelims Exam Date", date: "Feb 2027" }
    ],
    applicationFees: [
      { category: "General & Outside MP Residents", fee: "₹500" },
      { category: "SC / ST / OBC / PwD of MP", fee: "₹250" },
      { category: "Portal Fee", fee: "₹40" }
    ],
    vacancyDetails: [
      { postName: "Deputy Collector", category: "Class II", vacancies: 45, eligibility: "Bachelor Degree" },
      { postName: "Deputy Superintendent of Police (DSP)", category: "Uniformed Class II", vacancies: 38, eligibility: "Bachelor Degree + Height 168cm" },
      { postName: "Commercial Tax Officer & Naib Tehsildar", category: "Class III", vacancies: 257, eligibility: "Bachelor Degree" }
    ],
    applicationSteps: [
      "Visit mppsc.mp.gov.in.",
      "Fill online application form on MP Online portal.",
      "Pay examination fee and print receipt."
    ],
    links: {
      notification: "https://mppsc.mp.gov.in/sse-2026.pdf",
      apply: "https://www.mponline.gov.in/portal/mppsc",
      officialWebsite: "https://mppsc.mp.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://mppsc.mp.gov.in/syllabus/sse"
    },
    relatedJobIds: ["uppsc-pcs-2026", "bpsc-cce-2026", "ras-rts-2026"]
  },
  {
    id: "barc-scientific-asst-2026",
    slug: "barc-scientific-assistant-and-technician-2026",
    title: "BARC Scientific Assistant 'B' & Technician 'B' 2026",
    organization: "Bhabha Atomic Research Centre (BARC)",
    jobType: "government",
    category: "Defence",
    department: "Department of Atomic Energy (DAE)",
    qualification: ["Diploma", "Graduate", "10th Pass"],
    minAge: 18,
    maxAge: 30,
    ageText: "18–30 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 870,
    location: "Maharashtra",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-11",
    applicationStartDate: "2026-10-15",
    lastDate: "2026-11-28",
    examDate: "Jan 2027",
    shortDescription: "BARC invites online applications from eligible candidates for appointment in various units of Department of Atomic Energy across India.",
    eligibility: {
      education: "Scientific Assistant: B.Sc or 3-year Diploma in Engineering with 60% marks. Technician: 10th pass with 60% + ITI in relevant trade.",
      experience: "Not required.",
      skills: "Atomic physics, chemical analysis, instrumentation.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 30,
      cutoffDate: "28-11-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years."
    },
    importantDates: [
      { label: "Notification Released", date: "11 Oct 2026" },
      { label: "Application Start", date: "15 Oct 2026" },
      { label: "Application Last Date", date: "28 Nov 2026" },
      { label: "CBT Date", date: "Jan 2027" }
    ],
    applicationFees: [
      { category: "Scientific Assistant", fee: "₹150" },
      { category: "Technician", fee: "₹100" },
      { category: "SC/ST/PwD/Women", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Scientific Assistant 'B' (Physics/Chemistry)", category: "Scientific", vacancies: 320, eligibility: "B.Sc with 60% marks" },
      { postName: "Scientific Assistant 'B' (Mechanical/Electrical)", category: "Engineering", vacancies: 250, eligibility: "Diploma with 60% marks" },
      { postName: "Technician 'B' (Various Trades)", category: "Technical", vacancies: 300, eligibility: "10th + ITI" }
    ],
    applicationSteps: [
      "Access barconlineexam.com.",
      "Register and fill profile.",
      "Upload photo and signature.",
      "Pay application fee online."
    ],
    links: {
      notification: "https://www.barc.gov.in/careers/advt-2026.pdf",
      apply: "https://barconlineexam.com",
      officialWebsite: "https://www.barc.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://www.barc.gov.in/syllabus"
    },
    relatedJobIds: ["drdo-ceptam-2026", "isro-scientist-2026", "bel-engineer-2026"]
  },
  {
    id: "bel-engineer-2026",
    slug: "bharat-electronics-limited-probationary-engineer-2026",
    title: "BEL Probationary Engineer (PE) Recruitment 2026",
    organization: "Bharat Electronics Limited (BEL)",
    jobType: "government",
    category: "Defence",
    department: "Navratna Defence PSU",
    qualification: ["Graduate"],
    minAge: 21,
    maxAge: 27,
    ageText: "21–27 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 512,
    location: "Karnataka",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-23",
    applicationStartDate: "2026-10-26",
    lastDate: "2026-12-09",
    examDate: "Jan 2027",
    shortDescription: "Bharat Electronics Limited, a premier Navratna Defence PSU, requires young, dynamic Engineers for its various manufacturing units and project sites.",
    eligibility: {
      education: "B.E. / B.Tech / B.Sc Engg in Electronics / Mechanical / Computer Science / Electrical with 60% marks (Pass class for SC/ST/PwBD).",
      experience: "Fresher.",
      skills: "Radar systems, communications, avionics, embedded C.",
      nationality: "Indian citizen."
    },
    ageLimit: {
      minAge: 21,
      maxAge: 27,
      cutoffDate: "01-11-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years, PwD: 10 Years."
    },
    importantDates: [
      { label: "Notification Date", date: "23 Oct 2026" },
      { label: "Online Application Opens", date: "26 Oct 2026" },
      { label: "Closing Date", date: "09 Dec 2026" },
      { label: "Written Test", date: "Jan 2027" }
    ],
    applicationFees: [
      { category: "GEN / OBC / EWS", fee: "₹472 (Fee + 18% GST)" },
      { category: "SC / ST / PwBD", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Probationary Engineer (Electronics)", category: "Engineering", vacancies: 240, eligibility: "B.Tech Electronics min 60%" },
      { postName: "Probationary Engineer (Mechanical)", category: "Engineering", vacancies: 180, eligibility: "B.Tech Mechanical min 60%" },
      { postName: "Probationary Engineer (Computer Science)", category: "Engineering", vacancies: 92, eligibility: "B.Tech CS min 60%" }
    ],
    applicationSteps: [
      "Visit bel-india.in and click on Careers / Recruitment.",
      "Complete registration and select preferred unit.",
      "Submit application and pay fee online."
    ],
    links: {
      notification: "https://www.bel-india.in/careers/pe-2026.pdf",
      apply: "https://jobapply.in/bel2026",
      officialWebsite: "https://www.bel-india.in",
      admitCard: null,
      result: null,
      syllabus: "https://www.bel-india.in/syllabus"
    },
    relatedJobIds: ["drdo-ceptam-2026", "isro-scientist-2026", "barc-scientific-asst-2026"]
  },
  {
    id: "rrb-group-d-2026",
    slug: "rrb-level-1-group-d-recruitment-2026",
    title: "Railway Level 1 (Group D) Track Maintainer & Pointsman 2026",
    organization: "Railway Recruitment Boards (RRB)",
    jobType: "government",
    category: "Railway",
    department: "Ministry of Railways",
    qualification: ["10th Pass"],
    minAge: 18,
    maxAge: 33,
    ageText: "18–33 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "26-35 Years",
    vacancies: 38200,
    location: "All India",
    applicationMode: "Online",
    status: "upcoming",
    publishedAt: "2026-11-01",
    applicationStartDate: "2026-12-15",
    lastDate: "2027-01-20",
    examDate: "April 2027",
    shortDescription: "Upcoming mega notification for Level 1 posts (Track Maintainer Grade IV, Helper/Assistant in Electrical, Mechanical, Signal & Telecom departments).",
    eligibility: {
      education: "10th pass from recognized board OR NCVT/SCVT recognized ITI certificate.",
      experience: "No experience needed.",
      skills: "Physical standard test: 35 kg weight lifting for 100 meters + 1000m run in 4 min 15 sec.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 18,
      maxAge: 33,
      cutoffDate: "01-07-2026",
      relaxation: "OBC: 3 Years, SC/ST: 5 Years."
    },
    importantDates: [
      { label: "Notification Expected", date: "15 Dec 2026" },
      { label: "Application Window", date: "15 Dec 2026 – 20 Jan 2027" },
      { label: "CBT Exam Start", date: "April 2027" }
    ],
    applicationFees: [
      { category: "General / OBC", fee: "₹500 (₹400 refunded after CBT)" },
      { category: "SC / ST / Female / ESM", fee: "₹250 (Full refund after CBT)" }
    ],
    vacancyDetails: [
      { postName: "Track Maintainer Grade IV", category: "Civil Engineering", vacancies: 22000, eligibility: "10th Pass / ITI" },
      { postName: "Assistant Pointsman", category: "Traffic", vacancies: 8200, eligibility: "10th Pass" },
      { postName: "Hospital Attendant & Workshop Helper", category: "Medical / Mechanical", vacancies: 8000, eligibility: "10th Pass / ITI" }
    ],
    applicationSteps: [
      "Will open on rrbapply.gov.in in December 2026.",
      "Check back for official notification launch."
    ],
    links: {
      notification: null,
      apply: null,
      officialWebsite: "https://indianrailways.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://indianrailways.gov.in/syllabus/level-1"
    },
    relatedJobIds: ["rrb-ntpc-2026", "rrb-alp-2026", "ssc-mts-2026"]
  },
  {
    id: "air-force-agniveervayu-2026",
    slug: "indian-air-force-agniveervayu-01-2026",
    title: "Indian Air Force Agniveervayu Intake 01/2026",
    organization: "Indian Air Force (IAF)",
    jobType: "government",
    category: "Defence",
    department: "Ministry of Defence",
    qualification: ["12th Pass", "Diploma"],
    minAge: 17.5,
    maxAge: 21,
    ageText: "17.5–21 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 3500,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-18",
    applicationStartDate: "2026-10-22",
    lastDate: "2026-11-29",
    examDate: "15 Jan 2027",
    shortDescription: "Indian Air Force invites online applications from unmarried Indian male and female candidates for selection test for Agniveervayu intake 01/2026.",
    eligibility: {
      education: "Science Subjects: 10+2 with Maths, Physics, English (min 50% aggregate & 50% English) OR 3-year Diploma in Engineering. Other Subjects: 10+2 with 50% marks.",
      experience: "No experience.",
      skills: "Medical & fitness criteria (1.6 km run in 7 minutes for males).",
      nationality: "Unmarried Indian citizens."
    },
    ageLimit: {
      minAge: 17.5,
      maxAge: 21,
      cutoffDate: "Born between 02 Jan 2005 and 02 July 2008",
      relaxation: "Upper age limit as on date of enrolment is 21 years."
    },
    importantDates: [
      { label: "Notification Date", date: "18 Oct 2026" },
      { label: "Application Start", date: "22 Oct 2026" },
      { label: "Last Date to Register", date: "29 Nov 2026" },
      { label: "Online Exam Date", date: "15 Jan 2027 onwards" }
    ],
    applicationFees: [
      { category: "Examination Fee (All Candidates)", fee: "₹550 + GST" }
    ],
    vacancyDetails: [
      { postName: "Agniveervayu (Science Subjects)", category: "Combat Technical", vacancies: 2200, eligibility: "12th with PCM or 3-yr Engg Diploma" },
      { postName: "Agniveervayu (Other than Science)", category: "Non-Technical", vacancies: 1300, eligibility: "12th in any stream with 50% marks" }
    ],
    applicationSteps: [
      "Visit agnipathvayu.cdac.in.",
      "Register with Aadhaar and educational certificates.",
      "Upload live web camera photo conforming to IAF guidelines.",
      "Pay examination fee via payment gateway."
    ],
    links: {
      notification: "https://agnipathvayu.cdac.in/advt-01-2026.pdf",
      apply: "https://agnipathvayu.cdac.in/avReg",
      officialWebsite: "https://agnipathvayu.cdac.in",
      admitCard: null,
      result: null,
      syllabus: "https://agnipathvayu.cdac.in/syllabus"
    },
    relatedJobIds: ["upsc-nda-2026", "cds-2026", "navy-agniveer-2026"]
  },
  {
    id: "navy-agniveer-2026",
    slug: "indian-navy-agniveer-ssr-mr-2026",
    title: "Indian Navy Agniveer (SSR & MR) 01/2026 Batch",
    organization: "Indian Navy",
    jobType: "government",
    category: "Defence",
    department: "Ministry of Defence",
    qualification: ["12th Pass", "10th Pass"],
    minAge: 17.5,
    maxAge: 21,
    ageText: "17.5–21 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 4000,
    location: "All India",
    applicationMode: "Online",
    status: "open",
    publishedAt: "2026-10-15",
    applicationStartDate: "2026-10-19",
    lastDate: "2026-11-30",
    examDate: "Jan 2027",
    shortDescription: "Online applications invited from unmarried male and female candidates for Agniveer (Senior Secondary Recruit - SSR) and Agniveer (Matric Recruit - MR).",
    eligibility: {
      education: "Agniveer SSR: 10+2 with Maths & Physics with one of Chemistry/Biology/Computer. Agniveer MR: 10th Pass.",
      experience: "No experience.",
      skills: "Physical fitness: 1.6 km run in 6.5 min (Male) / 8 min (Female).",
      nationality: "Unmarried Indian citizens."
    },
    ageLimit: {
      minAge: 17.5,
      maxAge: 21,
      cutoffDate: "01-11-2005 to 30-04-2008",
      relaxation: "N/A"
    },
    importantDates: [
      { label: "Notification Date", date: "15 Oct 2026" },
      { label: "Registration Opens", date: "19 Oct 2026" },
      { label: "Registration Closes", date: "30 Nov 2026" },
      { label: "INET Computer Based Test", date: "Jan 2027" }
    ],
    applicationFees: [
      { category: "Examination Fee (All Candidates)", fee: "₹550 + 18% GST" }
    ],
    vacancyDetails: [
      { postName: "Agniveer (SSR)", category: "Sailor Technical", vacancies: 3600, eligibility: "10+2 with PCM" },
      { postName: "Agniveer (MR - Chef, Steward, Hygienist)", category: "Support", vacancies: 400, eligibility: "10th Pass" }
    ],
    applicationSteps: [
      "Visit joinindiannavy.gov.in.",
      "Register or login with email.",
      "Fill online application under Current Opportunities.",
      "Pay examination fee."
    ],
    links: {
      notification: "https://www.joinindiannavy.gov.in/ssr-mr-2026.pdf",
      apply: "https://www.joinindiannavy.gov.in/en/account/login",
      officialWebsite: "https://www.joinindiannavy.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://www.joinindiannavy.gov.in/syllabus"
    },
    relatedJobIds: ["air-force-agniveervayu-2026", "upsc-nda-2026", "cds-2026"]
  },
  {
    id: "cds-2026",
    slug: "upsc-combined-defence-services-cds-1-2026",
    title: "UPSC Combined Defence Services (CDS I) 2026",
    organization: "Union Public Service Commission (UPSC)",
    jobType: "government",
    category: "Defence",
    department: "Ministry of Defence",
    qualification: ["Graduate"],
    minAge: 19,
    maxAge: 24,
    ageText: "19–24 Years",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 457,
    location: "All India",
    applicationMode: "Online",
    status: "upcoming",
    publishedAt: "2026-11-01",
    applicationStartDate: "2026-12-20",
    lastDate: "2027-01-10",
    examDate: "April 2027",
    shortDescription: "UPSC CDS I 2026 for admission into Indian Military Academy (IMA), Indian Naval Academy (INA), Air Force Academy (AFA), and Officers Training Academy (OTA).",
    eligibility: {
      education: "IMA/OTA: Degree of recognized University. INA: Degree in Engineering. AFA: Degree with Physics & Maths at 10+2 or Bachelor of Engineering.",
      experience: "No experience.",
      skills: "SSB Interview & strict defence medical clearance.",
      nationality: "Citizen of India."
    },
    ageLimit: {
      minAge: 19,
      maxAge: 24,
      cutoffDate: "02-01-2003 to 01-01-2008",
      relaxation: "N/A"
    },
    importantDates: [
      { label: "Notification Expected", date: "20 Dec 2026" },
      { label: "Application Window", date: "20 Dec 2026 – 10 Jan 2027" },
      { label: "CDS I Written Exam", date: "April 2027" }
    ],
    applicationFees: [
      { category: "General / OBC Male", fee: "₹200" },
      { category: "Female / SC / ST", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Indian Military Academy (IMA)", category: "Army Officer", vacancies: 100, eligibility: "Graduation in any stream" },
      { postName: "Indian Naval Academy (INA)", category: "Navy Officer", vacancies: 32, eligibility: "B.E. / B.Tech" },
      { postName: "Air Force Academy (AFA)", category: "Air Force Officer", vacancies: 32, eligibility: "Graduation + 10+2 PCM or B.Tech" },
      { postName: "Officers Training Academy (OTA Chennai)", category: "Short Service", vacancies: 293, eligibility: "Graduation in any stream (Men & Women)" }
    ],
    applicationSteps: [
      "Access upsconline.nic.in via OTR.",
      "Complete Part I and Part II registration.",
      "Submit fee and download acknowledgment."
    ],
    links: {
      notification: null,
      apply: null,
      officialWebsite: "https://upsc.gov.in",
      admitCard: null,
      result: null,
      syllabus: "https://upsc.gov.in/syllabus/cds"
    },
    relatedJobIds: ["upsc-nda-2026", "afcat-2026", "ssc-cgl-2026"]
  },
  {
    id: "afcat-2026",
    slug: "air-force-common-admission-test-afcat-1-2026",
    title: "Air Force Common Admission Test (AFCAT 01/2026)",
    organization: "Indian Air Force (IAF)",
    jobType: "government",
    category: "Defence",
    department: "Ministry of Defence",
    qualification: ["Graduate", "Postgraduate"],
    minAge: 20,
    maxAge: 26,
    ageText: "20–24 Years (Flying) / 20–26 Years (Ground Duty)",
    experience: "Fresher",
    experienceRange: "Fresher",
    ageRange: "18-25 Years",
    vacancies: 317,
    location: "All India",
    applicationMode: "Online",
    status: "upcoming",
    publishedAt: "2026-11-01",
    applicationStartDate: "2026-12-01",
    lastDate: "2026-12-30",
    examDate: "Feb 2027",
    shortDescription: "AFCAT 01/2026 for grant of Short Service Commission (SSC) in Flying Branch and Permanent / Short Service Commission in Ground Duty (Technical and Non-Technical) branches.",
    eligibility: {
      education: "Flying Branch: Min 50% in Maths & Physics at 10+2 + Graduation with 60% or B.Tech with 60%. Ground Duty Tech: 4-year engineering degree min 60%.",
      experience: "No experience.",
      skills: "Computerised Pilot Selection System (CPSS) test for flying branch.",
      nationality: "Indian citizen."
    },
    ageLimit: {
      minAge: 20,
      maxAge: 26,
      cutoffDate: "01-01-2027",
      relaxation: "Commercial Pilot License holders: Up to 26 years for flying."
    },
    importantDates: [
      { label: "Short Notification", date: "01 Nov 2026" },
      { label: "Application Start Date", date: "01 Dec 2026" },
      { label: "Application End Date", date: "30 Dec 2026" },
      { label: "AFCAT 01/2026 Online Exam", date: "Feb 2027" }
    ],
    applicationFees: [
      { category: "AFCAT Entry (All Candidates)", fee: "₹550 + GST" },
      { category: "NCC Special Entry", fee: "₹0 (Exempted)" }
    ],
    vacancyDetails: [
      { postName: "Flying Branch (Men & Women)", category: "Flying", vacancies: 42, eligibility: "Graduation with 60% + 10+2 PCM" },
      { postName: "Ground Duty (Technical) - Aeronautical Engg", category: "Technical", vacancies: 165, eligibility: "B.Tech in Mech / Aero / Electronics" },
      { postName: "Ground Duty (Non-Technical) - Admin & Logistics", category: "Ground Ops", vacancies: 110, eligibility: "Graduation with 60% marks" }
    ],
    applicationSteps: [
      "Visit careerindianairforce.cdac.in or afcat.cdac.in.",
      "Register with candidate credentials.",
      "Complete application and book exam slot.",
      "Pay application fee."
    ],
    links: {
      notification: null,
      apply: null,
      officialWebsite: "https://afcat.cdac.in",
      admitCard: null,
      result: null,
      syllabus: "https://afcat.cdac.in/syllabus"
    },
    relatedJobIds: ["cds-2026", "upsc-nda-2026", "isro-scientist-2026"]
  }
];

