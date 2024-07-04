import React, { Component } from 'react';
import { Spinner} from '@themesberg/react-bootstrap'; // Import Spinner and Alert from react-bootstrap
import { DriverSignUpPage } from './DriverSignUpPage';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: '', // Initially no role selected
      loading: false, // State to control loading spinner
    };
    this.handleRoleSelect = this.handleRoleSelect.bind(this);
  }

  handleRoleSelect(role) {
    this.setState({ userRole: role });
  }

  render() {
    const { loading } = this.state;

    return (
      <main>
        {/* Conditionally render loading spinner */}
        {loading && (
          <div className="overlay">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

          <DriverSignUpPage setLoading={(status) => this.setState({ loading: status })} />
      </main>
    );
  }
}

export default Signup;
