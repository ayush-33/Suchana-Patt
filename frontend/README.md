# Suchana Patt — Sarkari Jankari, Ek Jagah

A complete, high-performance desktop frontend portal for Indian government and private recruitment notifications, admit cards, examination results, admissions, scholarships, syllabus, and answer keys.

---

## 🏛️ Project Architecture

```text
frontend/
├── package.json
├── index.html
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                       # Application entry point
    ├── app/
    │   ├── App.jsx                    # Root wrapper, Context Provider & Layout
    │   └── router.jsx                 # Client-side routing with React Router
    ├── components/
    │   ├── common/                    # Badges, EmptyStates, SectionHeadings, Toasts
    │   ├── layout/                    # Header, SecondaryNavigation, Footer, Breadcrumbs
    │   └── jobs/                      # JobCard, JobFilters, JobSort, ActiveFilterChips, Pagination
    ├── context/
    │   ├── bookmarkContextInstance.js # React Context definition
    │   └── BookmarkContext.jsx        # Persistent bookmark state provider
    ├── hooks/
    │   └── useBookmarks.js            # Custom hook for bookmark actions
    ├── data/
    │   ├── mockJobs.js                # Realistic multi-sector job datasets (35+ entries)
    │   ├── mockLiveUpdates.js         # Live notification strip updates
    │   ├── mockAdmitCards.js          # Hall ticket releases and examination dates
    │   ├── mockResults.js             # Examination cut-offs & merit lists
    │   ├── mockAdmissions.js          # University & entrance examinations (JEE, NEET, etc.)
    │   ├── mockScholarships.js        # UP Postmatric, Prematric & National scholarships
    │   ├── mockSyllabus.js            # Detailed syllabus modules & PDF documents
    │   ├── mockAnswerKeys.js          # Provisional keys & objection windows
    │   └── mockCurrentAffairs.js      # Monthly & daily current affairs digest
    ├── services/                      # Decoupled service layer for future backend integration
    │   ├── jobsService.js             # Filter, sort, paginate, and search jobs
    │   ├── admitCardsService.js       # Retrieve admit cards
    │   ├── resultsService.js          # Retrieve results
    │   ├── admissionsService.js       # Retrieve admission announcements
    │   ├── scholarshipService.js      # Retrieve scholarships
    │   ├── syllabusService.js         # Retrieve exam syllabi
    │   ├── answerKeysService.js       # Retrieve answer keys
    │   └── currentAffairsService.js   # Retrieve current affairs
    ├── utils/
    │   ├── formatters.js              # Indian currency, dates, vacancy formatting
    │   └── shareHelper.js             # Web Share API & clipboard fallback
    └── styles/
        ├── tokens.css                 # Design tokens (colors, typography, radii, shadows)
        ├── global.css                 # Reset, typography, scrollbars, base classes
        ├── layout.css                 # Header, secondary nav, footer, breadcrumbs
        └── components.css             # Job cards, filter sidebar, detail tables, modals
```

---

## 🎨 Visual Design & Layout Standards

- **Top Marketplace Header**: Compact royal blue bar (`#0755d9`), original document-seal branding, wide central search input with gold/yellow action button (`#ffd633`), notification badge, bookmarks counter, and candidate sign-in.
- **Secondary White Navigation**: Sticky row featuring Home, Latest Jobs, Admit Cards, Results, Admissions, UP Scholarship, Syllabus, Answer Keys, Current Affairs, and an expandable dropdown for specialized government & private sectors.
- **Part 8 Compliant JobCard**:
  - Top row: Government/Private badge & persistent bookmark toggle.
  - Middle: Job title and recruiting authority.
  - **Eligibility Preview**: 3 distinct aligned cells (Qualification, Age, Experience) with pale blue tint (`#f0f5fc`) visible immediately without opening details.
  - Bottom row: Last date deadline (with warning emphasis), total vacancies, and "Details →" CTA.
- **Recruitment Details Page (`/jobs/:jobId`)**:
  - Two-column desktop grid (69% content, 29% sidebar).
  - Structured data tables for **Important Dates**, **Application Fees**, **Age Limits**, **Vacancy Details**, and **Eligibility Criteria**.
  - Step-by-step application instructions and validated official links.
  - Sidebar with "At a Glance", "Quick Actions", "Related Notifications", and bookmark tracking.

---

## 🚀 Scripts

Run all commands from the `frontend/` directory:

```bash
# Install dependencies
npm install

# Run static analysis and linting (0 warnings, 0 errors)
npm run lint

# Compile production bundle
npm run build

# Start local development server
npm run dev

# Preview production build locally
npm run preview
```
