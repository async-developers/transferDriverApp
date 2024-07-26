// RoutesConfig.js
import React from 'react';
import { Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// Pages
import Signin from "./examples/Signin";
import Signup from './examples/Signup';

import Profile from './Profile';

import DriverDetailsPage from './examples/DriversDetailsPage';

// Components
import WithAuth from '../components/Authentication/WithAuth';
import RouteWithLoader from '../RoutesWithLoader';
import RouteWithSidebar from '../RoutesWithSidebar';
import CabDriverUpcomingTours from './examples/CabDriver/CabDriverUpcomingTours';
import TourHistory from './examples/CabDriver/TourHistory/TourHistory';
import DashboardOverview from './dashboard/DashboardOverview';
import TourExpenses from './examples/CabDriver/TourExpenses/TourExpenses';
import TripDetails from './components/TripDetails';
import PostTripDetails from './components/PostTripDetails';
import Wallet from './Wallet';


const RoutesConfig = () => (
  <>
    <Switch>
      <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
      <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
      <RouteWithSidebar exact path="/trip-details/:bookingId/:id" component={WithAuth(TripDetails)} />
      <RouteWithSidebar exact path="/trip-end-details/:bookingId/:id" component={WithAuth(PostTripDetails)} />
      <RouteWithSidebar exact path="/tours-history" component={WithAuth(TourHistory)} />

      {/* Driver routes */}
      <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={WithAuth(DashboardOverview)} />
      <RouteWithSidebar exact path={Routes.Profile.path} component={WithAuth(Profile)} />
      <RouteWithSidebar exact path={Routes.Wallet.path} component={WithAuth(Wallet)} />
      <RouteWithSidebar exact path={Routes.UpcomingTours.path} component={WithAuth(CabDriverUpcomingTours)} />
      <RouteWithSidebar exact path={Routes.DriverDetails.path} component={WithAuth(DriverDetailsPage)} />
      <RouteWithSidebar exact path={Routes.ToursHistory.path} component={WithAuth(TourHistory)} />
      <Redirect to={Routes.NotFound.path} />
    </Switch>
  </>
);

export default RoutesConfig;
