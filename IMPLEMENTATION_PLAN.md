# 📋 EduWrap — Implementation Plan

## Current Status

**What exists today:**
- React 19 + Vite 8 project (working)
- React Router DOM 7 routing (working)
- CSS Modules styling replaced entirely with Tailwind CSS v4
- Lucide React icons (keep)
- 4 pages built: Landing, Dashboard, Rooms, StudyRoom (will be rebuilt)
- UserContext with localStorage persistence (keep pattern, expand)
- Theme system and Accent system active
- Completed Phases 0 through 4 (Foundation, Design System, UI Components, App Shell, Landing)

**Important Architecture Notes for AI Agents:**
1. **Tailwind v4 Variables:** We strictly use Tailwind v4 arbitrary syntax. DO NOT use `bg-[var(--bg-elevated)]`. YOU MUST USE `bg-(--bg-elevated)`. All CSS variables map natively in v4 using parentheses.
2. **Global Specificity:** A `@layer base` wrapper is used in `index.css` to prevent `* { margin: 0 }` from overriding Tailwind utilities. If you write custom CSS, always put it in a `@layer`.
3. **Animations:** We heavily use `framer-motion`. For any blurred or heavy animation, always attach `will-change-transform transform-gpu` to the `className`.
4. **Data Persistence:** Because there is no backend, every single interactive phase MUST use React Context combined with `localStorage` so data persists across reloads.
5. **UI Aesthetic:** Premium SaaS. Use glassmorphism (`bg-(--bg-glass) backdrop-blur-md`), deep shadows, and subtle gradients. Avoid flat, boring designs.

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

**State Management (`UserContext`):**
- **Structure:** `{ isLoggedIn: boolean, user: { name, email, avatar, subjects: [], studyPreferences: {} } }`
- Save to `localStorage('ew_user_session')`.

**UI/UX Requirements:**
- Soft blur behind the form.
- Smooth input focus rings using `focus:ring-(--accent-glow)`.
- Fake loading states on buttons (spinner) for 1-2 seconds before logging in.

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

### ⏳ PHASE 6 — Dashboard
> **Goal:** Data-rich but minimal. Should feel like a premium command center.

**Understanding & Instructions:**
The Dashboard is the home page of the logged-in experience. It aggregates data from the other modules (Study Rooms, Notes, Quizzes) and displays it beautifully using Bento-grid layouts and interactive charts.

**Core Components to Build:**
- `WelcomeHeader.jsx`: Personalized greeting based on time of day, displaying the user's current streak.
- `StatCard.jsx`: Glassmorphic cards for displaying high-level metrics (XP, level).
- `ActivityFeed.jsx`: A vertical timeline of simulated past actions.
- `LeaderboardMini.jsx`: A small tabular view of top students.

**State Management (`DashboardContext` or Mock Data):**
- Create mock arrays for `recentActivities`, `upcomingSessions`, and `analyticsData`.
- Use `UserContext` for XP and streak.

**UI/UX Requirements:**
- Animated number count-ups for stats (e.g., jumping from 0 to 500 XP smoothly).
- Hover interactions on cards that slightly lift them `hover:-translate-y-1` and increase shadow `hover:shadow-(--shadow-glow)`.

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

### ⏳ PHASE 7 — Study Room System (CORE — Largest Phase)
> **Goal:** The heart of EduWrap. Discord + Notion + Google Classroom architecture.

**Understanding & Instructions:**
This is the most complex phase. A "Room" contains multiple "Classrooms" (like Discord servers containing channels). You need to build a discovery page to find rooms, a creation modal to make new ones, and the actual Room Layout which includes a dedicated left sidebar for navigation and a right sidebar for members/chat.

**Core Components to Build:**
- `RoomDiscovery.jsx`: A grid of available rooms with a search bar.
- `RoomLayout.jsx`: A 3-pane layout specific to a study room (Sub-sidebar, Main Content, Right Panel).
- `ClassroomList.jsx`: The navigation panel inside a room to switch between chats, notes, and video calls.

**State Management (`RoomContext`):**
- **Structure:** `rooms: [{ id, name, category, members, classrooms: [{ id, type, name }] }]`
- **Active State:** `activeRoomId`, `activeClassroomId`.

**UI/UX Requirements:**
- The transitions between classrooms should be seamless and use `AnimatePresence`.
- Active users in voice/video channels should have a subtle pulsing green ring.

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

### ⏳ PHASE 8 — Chat System
> **Goal:** Modern Discord-quality chat UI.

**Understanding & Instructions:**
This is the messaging interface. It must handle scrolling correctly (staying at the bottom when new messages arrive). 

**Core Components to Build:**
- `MessageList.jsx`: The scrollable area containing messages.
- `MessageBubble.jsx`: Differentiates between 'me' and 'others'.
- `ChatInput.jsx`: A growing textarea with an emoji picker button and attachment clip.

**State Management (`ChatContext`):**
- **Structure:** `messages: [{ id, senderId, text, timestamp, reactions: {} }]`
- Save to localStorage so chats persist.

**UI/UX Requirements:**
- Messages must smoothly slide up and fade in when they appear.
- Hovering over a message should reveal a small quick-reaction bar.

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

### ⏳ PHASE 9 — Notes Editor
> **Goal:** Notion-inspired, distraction-free writing experience.

**Understanding & Instructions:**
A rich text editor clone. Rather than building a full slate/prosemirror editor from scratch, you can implement a block-like UI using multiple contenteditable divs, or a very polished single textarea with markdown parsing.

**Core Components to Build:**
- `NotesEditor.jsx`: The main typing interface.
- `SlashMenu.jsx`: A floating popup that appears when `/` is typed.
- `Toolbar.jsx`: Formatting options (bold, italic, H1, H2).

**State Management (`NotesContext`):**
- **Structure:** `notes: [{ id, title, content, tags, lastEdited }]`
- Auto-save logic utilizing `useEffect` and `setTimeout`.

**UI/UX Requirements:**
- Must look incredibly clean—almost entirely blank page until you start typing.
- Typography is critical here: use `prose` classes or strict typography rules for readability.

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

### ⏳ PHASE 10 — Flashcard System
> **Goal:** Polished Quizlet-like experience.

**Understanding & Instructions:**
Users create decks of cards and study them. The core interaction is the 3D card flip animation.

**Core Components to Build:**
- `DeckGrid.jsx`: Shows available decks with progress rings.
- `FlashcardStudy.jsx`: The active study interface.
- `Card3D.jsx`: Uses Framer Motion `rotateY` for a smooth 3D flip effect.

**State Management (`FlashcardContext`):**
- **Structure:** `decks: [{ id, title, cards: [{ front, back, status: 'new'|'learning'|'known' }] }]`

**UI/UX Requirements:**
- The 3D flip must preserve depth (use `preserve-3d` and `backface-hidden` CSS properties).
- Swipe gestures (or arrow keys) to move to the next card.

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

### ⏳ PHASE 11 — Quiz System
> **Goal:** Focus-mode quiz experience.

**Understanding & Instructions:**
A gamified multiple-choice quiz environment. Needs to handle timers and scoring.

**Core Components to Build:**
- `QuizPlayer.jsx`: The active quiz view showing one question at a time.
- `OptionButton.jsx`: Selectable answers.
- `QuizResults.jsx`: The final screen showing charts of performance.

**State Management (`QuizContext`):**
- **Structure:** `activeQuiz: { currentQuestionIndex, selectedAnswers: {}, score, timeRemaining }`

**UI/UX Requirements:**
- When an answer is selected, briefly flash green/red before proceeding to the next question.
- Confetti on high scores.

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

### ⏳ PHASE 12 — Video Call UI
> **Goal:** Futuristic collaboration call. UI only, no WebRTC.

**Understanding & Instructions:**
This is purely a visual interface mocking a Zoom/Discord call.

**Core Components to Build:**
- `VideoGrid.jsx`: Dynamically resizes based on participant count (1x1, 2x2, 3x3).
- `ParticipantTile.jsx`: Displays avatar and fake webcam stream placeholder.
- `CallControls.jsx`: Floating pill with Mute/Video/Leave buttons.

**State Management:**
- **Structure:** `participants: [{ id, name, isSpeaking, isMuted, hasVideo }]`

**UI/UX Requirements:**
- Speaking indicator: A glowing border `ring-2 ring-(--accent-glow)` around the active speaker.
- Hover menus to adjust volume per participant.

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

### ⏳ PHASE 13 — Doubt Board
> **Goal:** Academic Q&A feed.

**Understanding & Instructions:**
A forum-like feature within the app for asking and answering questions.

**Core Components to Build:**
- `QuestionFeed.jsx`: A list of questions.
- `QuestionDetail.jsx`: The thread view.
- `VoteControls.jsx`: Upvote/downvote arrows.

**State Management (`DoubtContext`):**
- **Structure:** `questions: [{ id, title, body, upvotes, isResolved, replies: [] }]`

**UI/UX Requirements:**
- Subtle pop animations on upvote.
- Clear "Resolved" badges (green pill).

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

### ⏳ PHASE 14 — File Manager
> **Goal:** Drag-and-drop file management.

**Understanding & Instructions:**
A Google Drive-style file explorer for study resources.

**Core Components to Build:**
- `DropZone.jsx`: An area that highlights when files are dragged over it.
- `FileGrid.jsx`: Uses the existing `FileCard` component.

**State Management (`FileContext`):**
- **Structure:** `files: [{ id, name, size, type, uploadDate }]`

**UI/UX Requirements:**
- Dotted border that animates when dragging a file over the screen.
- Icons specific to file types (PDF, Word, Image).

- **Core Components to Build:**
  - `FileManager.jsx`: Table or Grid view of files.
  - `UploadZone.jsx`: Drag-and-drop dotted border area.
- **State Management (`FileContext`):**
  - **Structure**: `[{ fileId, name, size, type (pdf/image/doc), uploadDate }]`
- **UI/UX Requirements:**
  - Use the existing `FileCard` component.
  - Smooth upload progress bar animation.

---

### ⏳ PHASE 15 — Profile & Gamification
> **Goal:** Rewarding, motivating profile.

**Understanding & Instructions:**
A place where the user's hard work is visually rewarded.

**Core Components to Build:**
- `ContributionHeatmap.jsx`: A grid of small squares representing daily activity (like GitHub).
- `BadgeWall.jsx`: A gallery of unlocked achievements.

**UI/UX Requirements:**
- Glowing effects on rare/high-level badges.
- Smooth tooltips when hovering over heatmap squares.

- **Core Components to Build:**
  - `UserProfile.jsx`: Layout showing avatar, bio, and stats.
  - `ContributionGrid.jsx`: GitHub-style green square heatmap for study streaks.
  - `BadgeWall.jsx`: Grid of unlocked achievements.
- **State Management (`GamificationContext`):**
  - **Structure**: `{ currentXP, level, streakDays, badges: [] }`
- **UI/UX Requirements:**
  - Confetti explosion (using a library like `canvas-confetti`) when leveling up.

---

### ⏳ PHASE 16 — Settings
> **Goal:** Clean, organized preferences.

**Understanding & Instructions:**
A unified interface for configuring the app. Ensure it connects properly to the `ThemeContext` already built.

**Core Components to Build:**
- `SettingsLayout.jsx`: A 2-column layout (nav on left, form on right).
- `ColorPicker.jsx`: A visual selector for the accent color system.

- **Core Components to Build:**
  - `SettingsLayout.jsx`: Vertical tabs on the left, forms on the right.
  - `AppearanceSettings.jsx`: Theme toggles, accent color picker.
- **State Management:**
  - Connects to existing `ThemeContext` and `UserContext`.
- **UI/UX Requirements:**
  - Live preview of colors when clicking accent color swatches.

---

### ⏳ PHASE 17 — Final Polish
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
