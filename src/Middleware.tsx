import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

function Middleware({
  component,
  access,
}: {
  component: JSX.Element;
  access: boolean;
}) {
  const { auth } = useAuth();
  if (access) {
    // public && auth
    if (auth) {
      return <Navigate to="/todo" />;
    }
    return component;
  }
  if (!auth) {
    return <Navigate to="/signin" />;
  }
  return component;
}

export default Middleware;
