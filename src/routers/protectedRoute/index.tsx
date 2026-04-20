import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProtectedRouteProps } from './type';
import type { AppDispatch, RootState } from '../../common/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../common/store/slices/authSlices';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.access_token);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!token) navigate(`/auth/signin`);
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [token, navigate]);

  return token ? <>{children}</> : null;
};

export default ProtectedRoute;
