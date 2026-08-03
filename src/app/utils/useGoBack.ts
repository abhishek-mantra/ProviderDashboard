import { useNavigate, useLocation } from "react-router";

export function useGoBack(fallback: string) {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };
}
