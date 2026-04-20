import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

type RootState = {
  config: {
    roles: { code: string }[];
  };
};

interface RoleGuardProps {
  code: "services" | "users" ;
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ code, children }) => {
  const location = useLocation();
  const roles = useSelector((s: RootState) => s.config.roles || []);
  const hasRole = roles.some((r) => r.code === code);

  if (!hasRole) {
    return <Navigate to="/403" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default RoleGuard;
