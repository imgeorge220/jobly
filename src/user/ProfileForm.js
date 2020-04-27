import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import JoblyApi from "../helpers/JoblyApi";
import UserContext from './UserContext';
import './ProfileForm.css'
import defaultUserImg from "../assets/default-user-img.png";
import { createErrorMsg } from '../helpers/ApiHelpers';

const ProfileForm = () => {

  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
    password: ""
  });
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const userResp = await JoblyApi.getUser(user.username);
      let { first_name, last_name, email, photo_url } = userResp;

      if (photo_url === defaultUserImg) photo_url = "";

      setFormData({
        firstName: first_name,
        lastName: last_name,
        email,
        photoURL: photo_url,
        password: ""
      })
    }
    getUser();
  }, [])

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async evt => {
    evt.preventDefault();
    const resp = await JoblyApi.patchUser(user.username, formData);

    if (resp.error) {
      setSuccessMsg(false);
      setErrMsg(resp.error);
    } else {
      setErrMsg(false);
      setSuccessMsg(true);
    }
    
    setFormData(oldFormData => ({
      ...oldFormData,
      password: ''
    }));
  }

  return (
    <Container >
      <Row>
        <Col md={{ span: 8, offset: 2 }} >
          <h2>Edit Profile</h2>
          <Form className='ProfileForm' onSubmit={handleSubmit}>

            <div className='ProfileForm-label pb-2'>Username</div>
            <p className='d-flex justify-content-start'>{user.username}</p>

            <Form.Group>
              <Form.Label className='ProfileForm-label'>First Name</Form.Label>
              <Form.Control onChange={handleChange} value={formData.firstName} name="firstName" />
            </Form.Group>

            <Form.Group>
              <Form.Label className='ProfileForm-label'>Last Name</Form.Label>
              <Form.Control onChange={handleChange} value={formData.lastName} name="lastName" />
            </Form.Group>

            <Form.Group>
              <Form.Label className='ProfileForm-label'>Email</Form.Label>
              <Form.Control onChange={handleChange} value={formData.email} name="email" />
            </Form.Group>

            <Form.Group>
              <Form.Label className='ProfileForm-label'>Photo URL</Form.Label>
              <Form.Control onChange={handleChange} value={formData.photoURL} name="photoURL" />
            </Form.Group>

            <Form.Group>
              <Form.Label className='ProfileForm-label'>Re-enter Password</Form.Label>
              <Form.Control type="password" onChange={handleChange} value={formData.password} name="password" />
            </Form.Group>
            {
              errMsg ?
                errMsg.map(msg => <Alert variant="danger">{createErrorMsg(msg)}</Alert>) :
                null
            }
            {
              successMsg ?
                <Alert variant="success">Successfully updated!</Alert> :
                null
            }
            <Button variant="primary" type="submit">
              Save Changes
        </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileForm;