import { createContext, useContext, useState, ReactNode } from "react";

interface TrialContextType {
  isTrialActive: boolean;
  activateTrial: () => void;
  deactivateTrial: () => void;
}

const TrialContext = createContext<TrialContextType | undefined>(undefined);

export function TrialProvider({ children }: { children: ReactNode }) {
  // Default to State A (Pre-Trial) as permanent default
  const [isTrialActive, setIsTrialActive] = useState(false);

  const activateTrial = () => setIsTrialActive(true);
  const deactivateTrial = () => setIsTrialActive(false);

  return (
    <TrialContext.Provider value={{ isTrialActive, activateTrial, deactivateTrial }}>
      {children}
    </TrialContext.Provider>
  );
}

export function useTrial() {
  const context = useContext(TrialContext);
  if (context === undefined) {
    throw new Error("useTrial must be used within a TrialProvider");
  }
  return context;
}
