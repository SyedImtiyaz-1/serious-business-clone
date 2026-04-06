import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext();

const PANELS_IN_MS = 800; // matches ALL_IN_MS in Loader.jsx

export function NavigationProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false); // false on initial load/reload
  const navigate = useNavigate();

  // On initial load: just uncover after a short delay (no panels)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const navigateTo = useCallback((to) => {
    setIsNavigating(true); // mark as a real navigation — panels will show
    setIsLoading(true);
    setTimeout(() => {
      navigate(to);
      setTimeout(() => {
        setIsLoading(false);
        setIsNavigating(false);
      }, 150);
    }, PANELS_IN_MS);
  }, [navigate]);

  return (
    <NavigationContext.Provider value={{ isLoading, isNavigating, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
