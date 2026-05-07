# 📋 EduWrap — AI-Optimized Implementation Plan

This implementation plan is specifically structured for AI agents and human developers collaborating on the EduWrap project. Each phase outlines the exact components, state structures, UI requirements, and dependencies so any developer or AI model can pick up a phase and build it perfectly without breaking the rest of the application.

---

## 🏗️ Current Status & Tech Stack

**Tech Stack:**
- **Framework**: React 19 (Vite 8)
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS 4 (using CSS variables and `(--var)` syntax)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: React Context API + `localStorage`
- **Fonts**: Inter (UI), Sora (Headings), JetBrains Mono (Code)

**Completed Phases:**
- **Phase 0:** Foundation Reset (Tailwind 4, Vite, Fonts)
- **Phase 1:** Design System & Theming (Light/Dark mode, Dynamic Accent colors)
- **Phase 2:** Reusable UI Component Library (Buttons, Inputs, Cards, Modals, Dropdowns)
- **Phase 3:** App Shell & Navigation (Sidebar, Topbar, Cmd+K Palette, Responsive Layout)
- **Phase 4:** Landing Page (Glassmorphic Hero, Bento-grid Features, Animations)

---

## 🚀 UPCOMING PHASES FOR AI DELEGATION

The following phases are designed to be built in parallel by different teams/AI agents. Please strictly adhere to the defined component names, context structures, and Tailwind utility classes (using `bg-(--bg-elevated)` instead of `bg-[var(...)]`).

---

### 🟢 PHASE 5 — Authentication Pages (Mock Auth)
> **Goal:** Premium glassmorphic auth flow and onboarding process. No real backend auth — purely UI and localStorage.

- **Core Components to Build:**
  - `Login.jsx` & `Signup.jsx`: Auth forms with animated backgrounds.
  - `OnboardingWizard.jsx`: Multi-step framer-motion stepper.
- **State Management (`UserContext`):**
  - **Structure**: `{ id, name, email, avatarInitials, themePreference, accentPreference, isOnboarded: boolean }`
  - **Process**: On Signup, save to `localStorage('ew_user')`. Onboarding wizard sets `isOnboarded: true`. If `!isOnboarded`, redirect to onboarding.
- **UI/UX Requirements:**
  - Use `Card` component with `depth="glass"` for auth forms.
  - Floating 3D shapes in the background using `motion.div`.

---

### 🟢 PHASE 6 — Dashboard (Home Base)
> **Goal:** Data-rich but minimal command center greeting the user.

- **Core Components to Build:**
  - `WelcomeHeader.jsx`: Shows greeting, current streak, and level.
  - `StatsGrid.jsx`: 4 glass cards showing XP, groups joined, notes created, quizzes taken.
  - `RecentActivityFeed.jsx`: A vertical timeline of actions.
  - `AIRecommendationCard.jsx`: Glowing card suggesting what to study next.
- **State Management:**
  - **Structure**: Use a new `DashboardContext` (or mock data file) to feed recent items.
  - Mock arrays for `recentRooms`, `upcomingSessions`, `recentNotes`.
- **UI/UX Requirements:**
  - Hover interactions on all cards (`hover:-translate-y-1 hover:shadow-(--shadow-glow)`).
  - Use Recharts or simple CSS animated bars for analytics cards.

---

### 🟢 PHASE 7 — Study Room System (CORE ARCHITECTURE)
> **Goal:** The heart of EduWrap. Discord + Notion + Google Classroom architecture.

- **Core Components to Build:**
  - `StudyRoomBrowser.jsx`: Grid of available public rooms with search/filters.
  - `StudyRoomLayout.jsx`: Sub-layout. Left sidebar (channels/classrooms), Center (workspace), Right sidebar (members/chat).
  - `RoomSidebar.jsx`: List of text, voice, and notes channels.
- **State Management (`RoomContext`):**
  - **Structure**: `[{ roomId, name, category, members: [], channels: [{ channelId, type, name }] }]`
  - **Active State**: Track `activeRoomId` and `activeChannelId`.
- **UI/UX Requirements:**
  - Deep integration with Framer Motion for transitioning between channels.
  - Active member indicators (green dot avatars).
  - Collapsible sidebars within the room layout.

---

### 🟢 PHASE 8 — Live Chat System
> **Goal:** Modern Discord-quality chat UI for communication within study rooms.

- **Core Components to Build:**
  - `ChatContainer.jsx`: Scrollable message list.
  - `ChatMessage.jsx`: Individual bubble. Differentiate `isSelf={true}` vs others.
  - `ChatInput.jsx`: Textarea with emoji picker, file attach button.
- **State Management (`ChatContext` or Component State):**
  - **Structure**: `{ messages: [{ id, sender, text, timestamp, reactions: {} }] }`
  - **Process**: When sending a message, append to array. Simulate incoming messages via `setTimeout` for testing.
- **UI/UX Requirements:**
  - `AnimatePresence` for new messages sliding up from the bottom.
  - Auto-scroll to bottom using a `useRef`.

---

### 🟢 PHASE 9 — Notes Editor
> **Goal:** Notion-inspired, distraction-free collaborative writing experience.

- **Core Components to Build:**
  - `NoteEditor.jsx`: The main block-based editor.
  - `NoteToolbar.jsx`: Floating formatting menu (Bold, Italic, Code, Link).
  - `NoteSidebar.jsx`: Outline/Table of Contents generator.
- **State Management (`NotesContext`):**
  - **Structure**: `[{ noteId, roomId, title, content (markdown or blocks), lastEdited }]`
  - **Process**: Auto-save to `localStorage` every 2 seconds.
- **UI/UX Requirements:**
  - Clean typography using `var(--font-serif)` or `var(--font-sans)`.
  - Slash command menu (`/`) that pops up an absolutely positioned dropdown.

---

### 🟢 PHASE 10 — Flashcard System
> **Goal:** Polished Quizlet-like experience with spaced repetition mechanics.

- **Core Components to Build:**
  - `DeckBrowser.jsx`: List of available flashcard decks.
  - `FlashcardCreator.jsx`: Form to add Front/Back texts.
  - `FlashcardViewer.jsx`: The actual interactive study mode interface.
- **State Management (`FlashcardContext`):**
  - **Structure**: `[{ deckId, title, cards: [{ cardId, front, back, status: 'new' | 'learning' | 'mastered' }] }]`
  - **Process**: Upon answering, update the card's status and advance to the next card.
- **UI/UX Requirements:**
  - 3D Card Flip Animation using Framer Motion (`rotateY: 180`, `backface-visibility: hidden`).
  - Swiping gestures for mobile using `framer-motion` drag attributes (`drag="x"`).

---

### 🟢 PHASE 11 — Quiz & Assessment System
> **Goal:** Gamified, focus-mode quiz experience.

- **Core Components to Build:**
  - `QuizInterface.jsx`: Shows one question at a time.
  - `TimerBar.jsx`: Animated shrinking progress bar.
  - `QuizResults.jsx`: Final score, correct/incorrect review list, and XP earned.
- **State Management (`QuizContext`):**
  - **Structure**: `[{ quizId, questions: [{ q, options, correctAnswer }], timeLimit }]`
  - **Active State**: `currentQuestionIndex`, `selectedAnswers: {}`, `score`.
- **UI/UX Requirements:**
  - Answer feedback animations (green flash for correct, red shake for incorrect).
  - Animated number counting up on the results screen.

---

### 🟢 PHASE 12 — Video Call / Live Session UI
> **Goal:** Futuristic collaboration call interface. (UI only, fake video feeds).

- **Core Components to Build:**
  - `VideoGrid.jsx`: Dynamic CSS grid that changes based on participant count.
  - `VideoTile.jsx`: Shows user avatar or fake camera feed. Speaking indicator border.
  - `CallControls.jsx`: Floating pill with Mute, Video, Screen Share, End Call.
- **State Management:**
  - **Structure**: `[{ participantId, name, isMuted, isSpeaking, isVideoOn }]`
- **UI/UX Requirements:**
  - Pulsing glow around `VideoTile` when `isSpeaking` is true (`shadow-(--shadow-glow)`).
  - Draggable, resizable components so users can overlay Notes while on the call.

---

### 🟢 PHASE 13 — Doubt Board (Q&A Forum)
> **Goal:** Academic Q&A feed similar to StackOverflow / Piazza.

- **Core Components to Build:**
  - `DoubtFeed.jsx`: List of question cards.
  - `QuestionCard.jsx`: Title, tags, upvotes, "Resolved" badge.
  - `DoubtDetail.jsx`: The full question thread with replies.
- **State Management (`DoubtContext`):**
  - **Structure**: `[{ doubtId, title, body, author, upvotes, replies: [], isResolved }]`
- **UI/UX Requirements:**
  - Upvote animation (pop effect on the arrow icon).
  - Filtering tabs (Newest, Unanswered, Resolved) using the `Tabs` UI component.

---

### 🟢 PHASE 14 — File Manager & Resource Hub
> **Goal:** Drag-and-drop file management for study materials.

- **Core Components to Build:**
  - `FileManager.jsx`: Table or Grid view of files.
  - `UploadZone.jsx`: Drag-and-drop dotted border area.
- **State Management (`FileContext`):**
  - **Structure**: `[{ fileId, name, size, type (pdf/image/doc), uploadDate }]`
- **UI/UX Requirements:**
  - Use the existing `FileCard` component.
  - Smooth upload progress bar animation.

---

### 🟢 PHASE 15 — Profile & Gamification
> **Goal:** Rewarding, motivating profile showcasing achievements.

- **Core Components to Build:**
  - `UserProfile.jsx`: Layout showing avatar, bio, and stats.
  - `ContributionGrid.jsx`: GitHub-style green square heatmap for study streaks.
  - `BadgeWall.jsx`: Grid of unlocked achievements.
- **State Management (`GamificationContext`):**
  - **Structure**: `{ currentXP, level, streakDays, badges: [] }`
- **UI/UX Requirements:**
  - Confetti explosion (using a library like `canvas-confetti`) when leveling up.

---

### 🟢 PHASE 16 — Settings
> **Goal:** Clean, organized preferences interface.

- **Core Components to Build:**
  - `SettingsLayout.jsx`: Vertical tabs on the left, forms on the right.
  - `AppearanceSettings.jsx`: Theme toggles, accent color picker.
- **State Management:**
  - Connects to existing `ThemeContext` and `UserContext`.
- **UI/UX Requirements:**
  - Live preview of colors when clicking accent color swatches.

---

### 🟢 PHASE 17 — Final Polish & Performance
> **Goal:** Animation pass, edge cases, responsive audit.

- **Checklist:**
  - Ensure all routes are wrapped in `<AnimatePresence>` with `will-change-transform transform-gpu` applied to `motion.div`.
  - Validate mobile responsiveness (Hamburger menus, stacked grids).
  - Implement `LoadingSkeleton` during any simulated data fetching.

---

## 🤖 Instructions for AI Agents Working on this Project

When assigned a Phase from above, you must:
1. **Analyze Dependencies:** Ensure the components you need from Phase 2 (`Button`, `Card`, `Input`, etc.) are imported from `src/components/ui/`. DO NOT build custom UI components if a global one exists.
2. **Follow Tailwind v4 Syntax:** We use CSS variables. NEVER use `bg-[var(--bg-elevated)]`. ALWAYS use `bg-(--bg-elevated)`.
3. **Persist State:** Use React Context + `localStorage` for all mock data so the app feels real when refreshing.
4. **Wow the User:** Ensure the UI feels premium. Add subtle `framer-motion` entry animations to lists and modals. Use glassmorphism (`bg-(--bg-glass) backdrop-blur-md`) wherever layers overlap.
