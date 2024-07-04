import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Container, InputGroup, Button, Spinner } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Routes } from '../../routes';
import BgImage from '../../assets/img/illustrations/signin.svg';

export class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      userRole: 'driver',
      loading: false,
      incorrectCredentials: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      incorrectCredentials: false // Reset incorrect credentials state on input change
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password, userRole } = this.state;

    this.setState({ loading: true });

    axios
      .post('http://ec2-54-208-162-205.compute-1.amazonaws.com:8082/login', { email, password, userRole })
      .then(res => {
        if (res.status === 200) {
          const { data: { token, userRole } } = res;
          localStorage.setItem('token', token);
          localStorage.setItem('userRole', userRole);

          if (userRole === 'admin') {
            this.props.history.push('/');
          } else if (userRole === 'driver') {
            this.props.history.push('/');
          } else {
            throw new Error('Unknown user role');
          }
        } else {
          throw new Error('Invalid status code');
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        this.setState({ incorrectCredentials: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { email, password, userRole, loading, incorrectCredentials } = this.state;

    return (
      <main>
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Sign in to our platform</h3>
                  </div>
                  <Form className="mt-4" onSubmit={this.onSubmit}>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Your Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          name="email"
                          autoFocus
                          required
                          type="email"
                          placeholder="example@company.com"
                          value={email}
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          name="password"
                          required
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                    {incorrectCredentials && (
                      <div className="mb-3 text-danger">
                        Incorrect email or password. Please try again.
                      </div>
                    )}
                    <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Loading...
                        </>
                      ) : (
                        'Sign in'
                      )}
                    </Button>
                  </Form>
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="fw-normal">
                      Don't have an account yet?{' '}
                      <Button variant="link" as={Link} to={Routes.Signup.path} className="fw-bold">
                        Create one here
                      </Button>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  }
}

export default Signin;
