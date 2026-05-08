import { motion } from 'framer-motion';
import { DashboardProvider } from '../contexts/DashboardContext';
import WelcomeHeader from './DashboardComponents/WelcomeHeader';
import StatsGrid from './DashboardComponents/StatsGrid';
import QuickTodoWidget from './DashboardComponents/QuickTodoWidget';
import ContinueStudyingWidget from './DashboardComponents/ContinueStudyingWidget';
import ProductivityHeatmapWidget from './DashboardComponents/ProductivityHeatmapWidget';
import ActiveStudyRoomsWidget from './DashboardComponents/ActiveStudyRoomsWidget';
import UpcomingSessionsWidget from './DashboardComponents/UpcomingSessionsWidget';
import ActivityFeedWidget from './DashboardComponents/ActivityFeedWidget';
import SmartAIAssistantWidget from './DashboardComponents/SmartAIAssistantWidget';
import SmartNotificationsWidget from './DashboardComponents/SmartNotificationsWidget';
import LeaderboardMiniWidget from './DashboardComponents/LeaderboardMiniWidget';
import FocusWidget from './DashboardComponents/FocusWidget';

function DashboardContent() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <WelcomeHeader />
      <StatsGrid />

      {/* Focus & AI Top Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <FocusWidget />
        <div className="flex-1">
          <SmartAIAssistantWidget />
        </div>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Left Column (The Doing Zone) - 4/12 */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <QuickTodoWidget />
          <ContinueStudyingWidget />
        </div>

        {/* Middle Column (The People Zone) - 5/12 */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ActiveStudyRoomsWidget />
          <UpcomingSessionsWidget />
          <ProductivityHeatmapWidget />
        </div>

        {/* Right Column (The Smart Zone) - 3/12 */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <SmartNotificationsWidget />
          <ActivityFeedWidget />
          <LeaderboardMiniWidget />
        </div>
      </motion.div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}