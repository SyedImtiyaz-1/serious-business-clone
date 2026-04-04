import { Link, useLocation, useNavigate } from "react-router-dom";

export default function TransitionLink({ to, children, className, onClick, ...props }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    // Prevent navigation if already on this page
    if (location.pathname === to) {
      e.preventDefault();
      return;
    }
    // Otherwise, let Link handle navigation
  };

  return (
    <Link to={to} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
