import React, { lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import LoadingSpinner from '../components/LoadingSpinner';

const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));

const Routes: React.FC = () => (
  <Switch>
    <Suspense fallback={<LoadingSpinner />}>
      <Route exact path="/" component={SignIn} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route component={NotFound} />
    </Suspense>
  </Switch>
);

export default Routes;
