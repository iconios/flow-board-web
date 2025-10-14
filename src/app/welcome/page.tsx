import WelcomePageSkeleton from "@/components/skeletons/welcomePageSkeleton";
import LoginRegisterTabs from "@/components/welcome/welcome.tabs.component";
import { Suspense } from "react";

const WelcomePage = () => {
  return (
    <Suspense fallback={<WelcomePageSkeleton />}>
      <LoginRegisterTabs />;
    </Suspense>
  );
};

export default WelcomePage;
