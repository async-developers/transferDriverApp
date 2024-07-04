// RoutesConfig.js
import React from 'react';
import { Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// Pages
import Signin from "./examples/Signin";
import Signup from './examples/Signup';

import Profile from './Profile';

import DriverDetailsPage from './examples/DriversDetailsPage';
import BootstrapTables from '../pages/tables/BootstrapTables'

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


const RoutesConfig = () => (
  <>
    <Switch>
      <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
      <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
      <RouteWithSidebar exact path="/trip-details/:bookingId/:id" component={TripDetails} />
      <RouteWithSidebar exact path="/trip-end-details/:bookingId/:id" component={PostTripDetails} />
      <RouteWithSidebar exact path="/tours-history" component={WithAuth(TourHistory)} role="driver" />

      {/* Driver routes */}
      <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={WithAuth(DashboardOverview)} />
      <RouteWithSidebar exact path={Routes.Profile.path} component={WithAuth(Profile)} role="driver" />
      <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={WithAuth(BootstrapTables)} role="driver" />
      <RouteWithSidebar exact path={Routes.UpcomingTours.path} component={WithAuth(CabDriverUpcomingTours)} role="driver" />
      <RouteWithSidebar exact path={Routes.DriverDetails.path} component={WithAuth(DriverDetailsPage)} role="driver" />
      <RouteWithSidebar exact path={Routes.ToursHistory.path} component={WithAuth(TourHistory)} role="driver" />
      <RouteWithSidebar exact path={Routes.Expenses.path} component={WithAuth(TourExpenses)} role="driver" />

      <Redirect to={Routes.NotFound.path} />
    </Switch>
  </>
);

export default RoutesConfig;
