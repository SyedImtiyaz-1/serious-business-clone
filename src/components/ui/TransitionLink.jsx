import { usePageTransition } from "./PageTransition";
import { useLocation } from "react-router-dom";

export default function TransitionLink({ to, children, className, onClick, ...props }) {
  const { startTransition, isTransitioning } = usePageTransition();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    // Don't transition if already on this page or mid-transition
    if (location.pathname === to || isTransitioning) return;
    if (onClick) onClick(e);
    startTransition(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
