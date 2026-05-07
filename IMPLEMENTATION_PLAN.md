# 📋 EduWrap — Implementation Plan

## Current Status

**What exists today:**
- React 19 + Vite 8 project (working)
- React Router DOM 7 routing (working)
- CSS Modules styling (will be replaced with Tailwind)
- Lucide React icons (keep)
- 4 pages built: Landing, Dashboard, Rooms, StudyRoom (will be rebuilt)
- UserContext with localStorage persistence (keep pattern, expand)
- 3 unused UI components: Button, LoadingSkeleton, Toast (will be rebuilt)

**What needs to change:**
- Replace CSS Modules → Tailwind CSS
- Add Framer Motion for animations
- Add fonts: Inter, Sora, JetBrains Mono
- Rebuild all existing pages to match premium SaaS spec
- Build all missing features

---

## Tech Stack (React-Only Phase)

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (Vite 8) |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| State | React Context API + localStorage |
| Fonts | Inter, Sora, JetBrains Mono |

**NOT using (deferred):** Next.js, TypeScript, backend, databases, real APIs

---

## Phase Breakdown

---

### ✅ PHASE 0 — Foundation Reset (DONE)
> Install dependencies, configure Tailwind, set up fonts, clean old CSS Modules.

- [x] Install Tailwind CSS 4 + configure with Vite
- [x] Install Framer Motion
- [x] Add Google Fonts: Inter (UI), Sora (hero headings), JetBrains Mono (code)
- [x] Remove all `.module.css` files
- [x] Remove `App.css`
- [x] Rewrite `index.css` as Tailwind base with CSS variable design tokens
- [x] Verify project builds and runs clean

---

### ✅ PHASE 1 — Design System & Theming (DONE)
> Build the global theme system, accent color system, and CSS variable architecture.

- [x] **Theme system** — light / dark / system toggle
  - CSS variables for all color tokens (bg, surface, text, border, accent)
  - Light theme: soft whites, glass cards, clean shadows
  - Dark theme: deep navy-black, glowing accents, glass overlays
  - `ThemeContext` provider with localStorage persistence
  - Smooth instant theme transitions
- [x] **Accent color system** — dynamic user-selectable accent
  - Support: violet, purple, blue, cyan, green, emerald, orange, red, pink
  - CSS variables: `--accent`, `--accent-hover`, `--accent-dim`, `--accent-glow`
  - `AccentContext` or merge into ThemeContext
  - Auto-updates: buttons, active states, focus rings, progress bars, sidebar highlights
- [x] **Tailwind config** — extend with custom tokens
  - Colors, fonts, spacing, border-radius, shadows, backdrop-blur
  - Glassmorphism utility classes
- [x] **Typography scale** — headings, body, captions, code
- [x] **Spacing & layout tokens** — sidebar width, topbar height, panel gaps

---

### ✅ PHASE 2 — Reusable UI Component Library (DONE)
> Build all shared components before any pages. Every component supports dark/light + accent colors.

- [x] **Button** — primary, secondary, ghost, danger, outline; sizes sm/md/lg; loading state
- [x] **Input** — text, search, textarea; focus ring with accent
- [x] **Card** — glass card with hover elevation, depth variants
- [x] **Modal** — animated overlay + backdrop blur + Framer Motion
- [x] **Tooltip** — hover tooltips with smooth fade
- [x] **Toast / Notification** — portal-based, animated slide-in, auto-dismiss
- [x] **Dropdown** — animated, keyboard-navigable
- [x] **Tabs** — animated underline/pill indicator
- [x] **Avatar** — image, initials, status dot, size variants
- [x] **Progress Ring** — SVG circular progress with animation
- [x] **Badge** — status badges, count badges
- [x] **Skeleton Loader** — shimmer loading placeholders
- [x] **Empty State** — illustrated empty states with CTA
- [x] **File Card** — PDF, image, video, doc, link variants
- [x] **Floating Panel** — draggable/resizable overlay panels
- [ ] **AI Widget** — glowing AI interaction card

---

### ✅ PHASE 3 — App Shell & Navigation (DONE)
> Build the persistent layout structure: sidebar, topbar, workspace area, command palette.

- [x] **AppLayout** — sidebar + topbar + main content + optional right panel
- [x] **Sidebar** — collapsible (full → icon-only), smooth animation
  - Nav items: Dashboard, Study Rooms, Notes, Flashcards, Quiz, Doubts, Files, Profile, Settings
  - Active state with accent glow
  - Hover tooltips in collapsed mode
  - Unread count badges
  - Animated collapse/expand
- [x] **Topbar** — global search, notifications dropdown, streak indicator, user avatar menu, quick actions
- [x] **Command Palette** — `Cmd+K` / `Ctrl+K`
  - Animated overlay with blur background
  - Global search, quick navigation, recent items, quick actions
- [x] **Responsive behavior**
  - Desktop: persistent sidebar
  - Tablet: collapsible sidebar
  - Mobile: bottom nav or hamburger drawer
- [x] **Page transition animations** — Framer Motion `AnimatePresence`

---

### PHASE 4 — Landing Page
> World-class SaaS marketing page. First impression = everything.

- [ ] **Floating Navbar** — logo, Features, Pricing, About, Login, Sign Up CTA; blur-on-scroll
- [ ] **Hero Section**
  - Giant headline (Sora font), animated gradient background
  - Floating UI mockup previews
  - CTA buttons (Get Started, Watch Demo)
  - Animated particles / light effects
  - Stats bar (students, groups, satisfaction)
- [ ] **Features Section** — 8 glassmorphic animated cards
  - Study Rooms, AI Assistant, Flashcards, Live Collaboration, Quizzes, Notes, Gamification, File Sharing
- [ ] **Interactive Demo Section** — fake live previews (chat, dashboard, AI, notes)
- [ ] **Social Proof** — testimonials, usage counters, university logos
- [ ] **CTA Footer** — glowing call-to-action section
- [ ] **Footer** — links, copyright, branding
- [ ] All sections: scroll-triggered animations (Framer Motion `whileInView`)

---

### PHASE 5 — Authentication Pages
> Premium glassmorphic auth flow. No real auth — just UI + localStorage.

- [ ] **Login Page** — email/password form, social login buttons (Google, GitHub), animated background, floating shapes
- [ ] **Signup Page** — similar to login with name field
- [ ] **Onboarding Flow** — multi-step stepper after "signup"
  - Step 1: Name + avatar selection
  - Step 2: Select subjects/interests
  - Step 3: Study preferences
  - Step 4: Welcome screen → navigate to dashboard
- [ ] Store user data in UserContext + localStorage
- [ ] Animated transitions between steps

---

### PHASE 6 — Dashboard
> Data-rich but minimal. Should feel like a premium command center.

- [ ] **Welcome header** — personalized greeting, streak indicator
- [ ] **Stats grid** — XP, streak, level, study groups (animated counters)
- [ ] **Level progress bar** — animated fill with XP count-up
- [ ] **Quick action buttons** — New Room, Create Notes, Join Group, Take Quiz
- [ ] **Recent study rooms** — card list with activity indicators
- [ ] **Upcoming sessions** — schedule cards with time/members
- [ ] **AI study suggestions** — glowing AI card with recommendations
- [ ] **Activity feed** — recent actions timeline
- [ ] **Recent notes** — compact note preview cards
- [ ] **Leaderboard preview** — top 5 users mini-table
- [ ] **Analytics cards** — study time, quizzes completed, notes created charts
- [ ] All cards: glassmorphic, hover interactions, animated graphs

---

### PHASE 7 — Study Room System (CORE — Largest Phase)
> The heart of EduWrap. Discord + Notion + Google Classroom architecture.

#### 7A — Study Room Discovery Page
- [ ] Search bar with filters
- [ ] Category grid: Engineering, Medical, Business, Programming, Competitive Exams, etc.
- [ ] Trending rooms, recently active, recommended, featured
- [ ] Room cards: banner, member count, active users, tags, category, join button
- [ ] Private room join: paste invite code / room ID modal

#### 7B — Study Room Creation
- [ ] Create room modal/page
  - Room name, icon/banner, description, category, tags
  - Privacy: public / private
  - Initial classroom setup
- [ ] Generated invite code/link

#### 7C — Study Room Layout (Main UI)
- [ ] **Left sidebar**: room nav, classroom list (collapsible), unread indicators, live session glow, admin controls
- [ ] **Center area**: active classroom workspace
- [ ] **Right sidebar**: persistent chat, online members, pinned messages, AI assistant, activity feed
- [ ] **Bottom toolbar**: voice controls, upload, quick actions, AI actions
- [ ] Animated room/classroom switching

#### 7D — Classroom System
- [ ] Create/manage classrooms inside a room
- [ ] Classroom types with adapted UI:
  - Discussion (chat-focused)
  - Notes (editor-focused)
  - Live Session (video/audio)
  - Quiz (quiz interface)
  - Resources (file manager)
  - Project (collaboration)
- [ ] Per-classroom: separate chat, files, notes, activity
- [ ] Access control UI: public, private, read-only, admin-only

#### 7E — Admin & Role Management UI
- [ ] Roles: Owner, Admin, Moderator, Member
- [ ] Permission panel: manage members, lock classrooms, create invite links
- [ ] Role-based UI visibility
- [ ] Member management: mute, remove, assign roles

#### 7F — Live Activity
- [ ] Active member indicators
- [ ] Typing indicators
- [ ] Join/leave animations
- [ ] Activity feed per room
- [ ] Unread counts per classroom
- [ ] Active classroom glow effect

---

### PHASE 8 — Chat System
> Modern Discord-quality chat UI.

- [ ] Message list with smooth enter animations
- [ ] Chat bubbles: self vs others styling
- [ ] Reactions, threaded replies, mentions, timestamps
- [ ] Typing indicator with animated dots
- [ ] Emoji picker
- [ ] File attachment UI
- [ ] Read receipts
- [ ] Pinned messages panel
- [ ] Smooth scroll, auto-scroll to bottom
- [ ] Mock data with simulated responses

---

### PHASE 9 — Notes Editor
> Notion-inspired, distraction-free writing experience.

- [ ] Block-based editor (headings, paragraphs, lists, code, dividers)
- [ ] Markdown shortcuts
- [ ] Slash command menu (/)
- [ ] Floating formatting toolbar
- [ ] AI summarize button (mock)
- [ ] Tags system
- [ ] Auto-save indicator
- [ ] Note linking
- [ ] Word/character count
- [ ] localStorage persistence
- [ ] Notes library/listing page

---

### PHASE 10 — Flashcard System
> Polished Quizlet-like experience.

- [ ] Deck library page with progress rings
- [ ] Create/edit deck
- [ ] Study mode — animated 3D card flip
- [ ] Progress tracking (known/learning/new)
- [ ] Spaced repetition indicators
- [ ] Study analytics
- [ ] AI deck generation UI (mock)

---

### PHASE 11 — Quiz System
> Focus-mode quiz experience.

- [ ] Quiz selector/browser
- [ ] Quiz interface — questions, options, timer
- [ ] Answer feedback animations
- [ ] Animated score reveal
- [ ] Results analytics — weak topics, time per question
- [ ] Focus mode — minimal distraction UI
- [ ] Quiz history

---

### PHASE 12 — Video Call UI
> Futuristic collaboration call. UI only, no WebRTC.

- [ ] Participant video grid (mock placeholders)
- [ ] Self-view preview
- [ ] Floating control bar: mute, camera, screen share, reactions, leave
- [ ] Speaking indicators (border glow)
- [ ] Screen share preview
- [ ] Draggable notes overlay
- [ ] Chat accessible alongside call
- [ ] Emoji reactions

---

### PHASE 13 — Doubt Board
> Academic Q&A feed.

- [ ] Post cards: title, description, tags, author, timestamp
- [ ] Upvote/downvote
- [ ] Answer threads
- [ ] AI answer panel (mock)
- [ ] Resolved badge
- [ ] Filtering: newest, popular, unanswered, resolved
- [ ] Tag browsing
- [ ] Create question form

---

### PHASE 14 — File Manager
> Drag-and-drop file management.

- [ ] Upload zone (drag-and-drop)
- [ ] File grid/list view toggle
- [ ] Type-specific file cards (PDF, image, video, doc, link)
- [ ] Search and filter
- [ ] File preview modal
- [ ] Storage usage indicator

---

### PHASE 15 — Profile & Gamification
> Rewarding, motivating profile.

- [ ] Profile page — avatar, name, bio, stats
- [ ] XP system — animated counter, level progress
- [ ] Streak calendar — GitHub-style contribution grid
- [ ] Badge wall — earned achievements
- [ ] Study analytics — charts
- [ ] Full leaderboard
- [ ] Celebratory animations

---

### PHASE 16 — Settings
> Clean, organized preferences.

- [ ] Theme switcher — light / dark / system
- [ ] Accent color picker — visual grid
- [ ] Notification preferences
- [ ] Font size controls
- [ ] Keyboard shortcuts reference
- [ ] Account preferences
- [ ] Danger zone — logout, reset

---

### PHASE 17 — Final Polish
> Animation pass, edge cases, responsive audit.

- [ ] Page transition animations
- [ ] All loading skeletons
- [ ] All empty states
- [ ] Responsive audit: desktop, tablet, mobile
- [ ] Keyboard navigation
- [ ] Accessibility (ARIA labels, focus management)
- [ ] Performance (lazy loading, code splitting)
- [ ] Cross-browser testing

---

## Phase Dependencies

```
Phase 0 (Foundation)
  → Phase 1 (Design System)
    → Phase 2 (UI Components)
      → Phase 3 (App Shell)
        → Phase 4 (Landing)
        → Phase 5 (Auth)
        → Phase 6 (Dashboard)
        → Phase 7 (Study Rooms) ← CORE, largest
          → Phase 8 (Chat)
          → Phase 9 (Notes)
          → Phase 10 (Flashcards)
          → Phase 11 (Quiz)
          → Phase 12 (Video Call)
          → Phase 13 (Doubts)
          → Phase 14 (Files)
        → Phase 15 (Profile)
        → Phase 16 (Settings)
      → Phase 17 (Polish) ← after everything
```

Phases 4–16 can be done in any order after Phase 3, but Phase 7 (Study Rooms) should come before 8–14 since those features live inside rooms.

---

## Summary

| Phases | Count | Description |
|--------|-------|-------------|
| 0–1 | 2 | Foundation + Design System |
| 2–3 | 2 | Components + App Shell |
| 4–5 | 2 | Landing + Auth |
| 6 | 1 | Dashboard |
| 7 | 1 (6 sub-phases) | Study Room System (CORE) |
| 8–14 | 7 | Feature Pages |
| 15–16 | 2 | Profile + Settings |
| 17 | 1 | Final Polish |
| **Total** | **18 phases** | |
