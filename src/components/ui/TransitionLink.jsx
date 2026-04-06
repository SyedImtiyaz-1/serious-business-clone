import { Link, useLocation } from "react-router-dom";
import { useNavigation } from "../../context/NavigationContext";

export default function TransitionLink({ to, children, className, onClick, ...props }) {
  const location = useLocation();
  const { navigateTo } = useNavigation();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    if (location.pathname === to) return;
    navigateTo(to);
  };

  return (
    <Link to={to} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
