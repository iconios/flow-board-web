import LoginRegisterTabs from "@/components/welcome/welcome.tabs.component";
import { Suspense } from "react";

const WelcomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginRegisterTabs />;
    </Suspense>
  );
};

export default WelcomePage;
