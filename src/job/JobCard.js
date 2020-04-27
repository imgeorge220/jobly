import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import addCommas from '../helpers/addCommas';
import JoblyApi from '../helpers/JoblyApi';
import './JobCard.css';

const JobCard = ({ job }) => {
  const [hasApplied, setHasApplied] = useState(false);
  const _token = localStorage.getItem('_token');

  useEffect(() => {
    if (job.state === 'applied') setHasApplied(true);
  }, [job])


  const handleApply = async evt => {
    evt.preventDefault();
    await JoblyApi.apply(job.id, _token);
    setHasApplied(true);
  }

  return (
    <Card className="JobCard mb-3">
      <Container>
        <Card.Body>
          <Row>
            <Col>
              <h4 >{job.title}</h4>
              <i >{job.company_name}</i>
            </Col>
          </Row>
          <Row>
            <Col xs={8} md={10}>
              <div >Salary: {`$${addCommas(job.salary)}`}</div>
              <div >Equity: {`${(job.equity * 100).toFixed(1)}%`}</div>
            </Col>
            <Col className='JobCard-btn-container' xs={4} md={2}>
              {
                hasApplied ?
                  <Button variant="info" size='md' disabled>APPLIED</Button> :
                  <Button variant="success" size='md' onClick={handleApply}>APPLY</Button>
              }
            </Col>
          </Row>
        </Card.Body>
      </Container>
    </Card>
  );
}

export default JobCard;