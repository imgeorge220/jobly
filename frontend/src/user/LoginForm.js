import React, { useState, useContext, useEffect } from 'react';
import { Form, Container, Row, Col, ButtonGroup, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import JoblyApi from "../helpers/JoblyApi";
import UserContext from './UserContext';
import { createErrorMsg } from '../helpers/ApiHelpers';
import './LoginForm.css';


const LoginForm = () => {
  const { user, login } = useContext(UserContext);

  const history = useHistory();
  if (user.loggedIn) history.push('/');

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const [existingUser, setExistingUser] = useState(true);
  const [errMsg, setErrMsg] = useState(false);

  useEffect(() => {
    setErrMsg(false);
  }, [existingUser])

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async evt => {
    evt.preventDefault();
    const endpoint = existingUser ? "users/login" : "users";
    const resp = await JoblyApi.getToken(formData, endpoint);
    resp.error ? setErrMsg(resp.error) : login();
    setFormData(oldFormData => ({
      ...oldFormData,
      password: ""
    }));
  }

  return (
    <Container>
      <Row>
        <Col md={{span: 8, offset: 2}}>
          <div className='LoginForm-btn'>
            <ButtonGroup>
              <Button active={existingUser} onClick={() => setExistingUser(true)} variant='primary'>Login</Button>
              <Button active={!existingUser} onClick={() => setExistingUser(false)} variant='primary'>Sign up</Button>
            </ButtonGroup>
          </div>

          <Form className='LoginForm' onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='LoginForm-label'>Username</Form.Label>
              <Form.Control onChange={handleChange} value={formData.username} name="username" />
            </Form.Group>

            <Form.Group>
              <Form.Label className='LoginForm-label'>Password</Form.Label>
              <Form.Control type="password" onChange={handleChange} value={formData.password} name="password" />
            </Form.Group>
            {
              existingUser ? null :
                <div>
                  <Form.Group>
                    <Form.Label className='LoginForm-label'>First Name</Form.Label>
                    <Form.Control onChange={handleChange} value={formData.firstName} name="firstName" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className='LoginForm-label'>Last Name</Form.Label>
                    <Form.Control onChange={handleChange} value={formData.lastName} name="lastName" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className='LoginForm-label'>Email</Form.Label>
                    <Form.Control onChange={handleChange} value={formData.email} name="email" />
                  </Form.Group>
                </div>
            }
            {
              errMsg ?
                errMsg.map(msg => <Alert variant="danger">{createErrorMsg(msg)}</Alert>) :
                null
            }
            <div className='LoginForm-btn'>
              <Button variant="primary" type="submit">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;