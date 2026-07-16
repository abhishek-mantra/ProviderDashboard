import { RouterProvider } from "react-router";
import { router } from "./routes";
import { TrialProvider } from "./contexts/TrialContext";
import { PlanModeProvider } from "./contexts/PlanModeContext";
import { PartnerDashboardProvider } from "./contexts/PartnerDashboardContext";

export default function App() {
  return (
    <TrialProvider>
      <PlanModeProvider>
        <PartnerDashboardProvider>
          <RouterProvider router={router} />
        </PartnerDashboardProvider>
      </PlanModeProvider>
    </TrialProvider>
  );
}