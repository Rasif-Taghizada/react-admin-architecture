import {type ReactNode } from 'react';

 interface AuthContextType {
    token: string | null;
  }
  
 interface ProtectedRouteProps {
  children: ReactNode;
  }

  export type { AuthContextType, ProtectedRouteProps };