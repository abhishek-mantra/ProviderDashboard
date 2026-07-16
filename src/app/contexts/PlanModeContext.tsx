import { createContext, useContext, useState, ReactNode } from "react";

type PlanMode = "full-ehr" | "transcriber-only" | "provider";

interface PlanModeContextType {
  planMode: PlanMode;
  setPlanMode: (mode: PlanMode) => void;
}

const PlanModeContext = createContext<PlanModeContextType | undefined>(undefined);

export function PlanModeProvider({ children }: { children: ReactNode }) {
  const [planMode, setPlanMode] = useState<PlanMode>("full-ehr");

  return (
    <PlanModeContext.Provider value={{ planMode, setPlanMode }}>
      {children}
    </PlanModeContext.Provider>
  );
}

export function usePlanMode() {
  const context = useContext(PlanModeContext);
  if (!context) {
    throw new Error("usePlanMode must be used within PlanModeProvider");
  }
  return context;
}
