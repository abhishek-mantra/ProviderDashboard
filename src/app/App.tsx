import { RouterProvider } from "react-router";
import { router } from "./routes";
import { TrialProvider } from "./contexts/TrialContext";
import { PlanModeProvider } from "./contexts/PlanModeContext";
import { PartnerDashboardProvider } from "./contexts/PartnerDashboardContext";
import { ClaimProvider } from "./contexts/ClaimContext";
import { UserModeProvider } from "./contexts/UserModeContext";
import { FirstTimeUserProvider } from "./contexts/FirstTimeUserContext";

export default function App() {
  return (
    <TrialProvider>
      <PlanModeProvider>
        <UserModeProvider>
          <PartnerDashboardProvider>
            <ClaimProvider>
              <FirstTimeUserProvider>
                <RouterProvider router={router} />
              </FirstTimeUserProvider>
            </ClaimProvider>
          </PartnerDashboardProvider>
        </UserModeProvider>
      </PlanModeProvider>
    </TrialProvider>
  );
}