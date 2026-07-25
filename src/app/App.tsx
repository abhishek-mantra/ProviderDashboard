import { RouterProvider } from "react-router";
import { router } from "./routes";
import { TrialProvider } from "./contexts/TrialContext";
import { PlanModeProvider } from "./contexts/PlanModeContext";
import { PartnerDashboardProvider } from "./contexts/PartnerDashboardContext";
import { ClaimProvider } from "./contexts/ClaimContext";

export default function App() {
  return (
    <TrialProvider>
      <PlanModeProvider>
        <PartnerDashboardProvider>
          <ClaimProvider>
            <RouterProvider router={router} />
          </ClaimProvider>
        </PartnerDashboardProvider>
      </PlanModeProvider>
    </TrialProvider>
  );
}