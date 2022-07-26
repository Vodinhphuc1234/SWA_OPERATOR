import Link from "next/link";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ role, children, ...rest }) => {
  const user = useSelector((state) => state.user);

  if (user.role === role) return <Link {...rest}>{children}</Link>;
  return (
    <Link {...rest} href="/no-permisson">
      {children}
    </Link>
  );
};

export default ProtectedRoute;
