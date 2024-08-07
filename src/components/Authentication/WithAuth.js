// components/Authentication/WithAuth.js
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Preloader from '../Preloader'; // Assuming you have a Preloader component
import TripAssignedModal from '../widgets/TripAssignedModal';
import SidebarDriver from '../SidebarDriver';

export default function withAuth(ComponentInside) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        redirect: false,
        userData: {
          id: '',
          email: '',
          username: '',
          role: '',  // 'admin' or 'driver'
        },
        tripAssigned: false, // Track if a trip has been assigned,
        newTasks:[]
      }
    }

    componentDidMount() {
      this.verifyToken();
    }

    showTripAssignedModal = () => {
      this.setState({ tripAssigned: true });
    };

    verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        this.setState({ loading: false, redirect: true });
        return;
      }

      try {
        const response = await axios.post('http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/token', { token });
        if (response.status === 200) {
          const { email, userRole } = response.data;
          this.fetchUserData(email, userRole);
        } else {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        console.error('Token verification error:', error);
        this.setState({ loading: false, redirect: true });
      }
    };

    fetchUserData = async (email, userRole) => {
      try {
        const userDataResponse = await axios.get(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/loginDetails?email=${email}&userRole=${userRole}`);
        const { driverId, firstName, lastName, email: emailAddress } = userDataResponse.data;
        this.setState({
          loading: false,
          userData: {
            id: driverId,
            email: emailAddress,
            username: `${firstName} ${lastName}`,
            role: userRole,  // Assume role is 'admin' or 'driver'
          }
        });
        this.fetchNewTasks(driverId);
      } catch (error) {
        console.error('Fetch user data error:', error);
        this.setState({ loading: false, redirect: true });
      }
    };

    fetchNewTasks = async (driverId) => {
      try {
        const userDataResponse = await axios.get(`http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/fetchActionsOnAssignedTours?driverId=${driverId}`);
        this.setState({newTasks: userDataResponse.data})
        if(userDataResponse.data.length > 0){
          this.showTripAssignedModal();
        }
      } catch (error) {
        console.error('Fetch user data error:', error);
        this.setState({ loading: false, redirect: true });
      }
    };

    render() {
      const { loading, redirect, userData,tripAssigned, newTasks  } = this.state;

      if (loading) {
        return <Preloader show={true} />; // Show Preloader while loading
      }

      if (redirect) {
        return <Redirect to="/sign-in" />;
      }
      return (
          <>
            <SidebarDriver data={userData}/>
            <Navbar data={userData} isAdmin={userData.role === 'driver'} />
            {tripAssigned && <TripAssignedModal data={{...newTasks[0], driverId: userData.id}} />}
            <main className="content">
               <ComponentInside {...this.props} data={userData} isAdmin={false} />
            </main>
          </>
        );
    }
  };
}
