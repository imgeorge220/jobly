import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import JobCard from "../job/JobCard";
import JoblyApi from "../helpers/JoblyApi";
import { Container, Row, Col} from 'react-bootstrap';


const Company = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState({ jobs: [], name: "", description: "" });

  useEffect(() => {
    const getCompany = async () => {
      const companyResp = await JoblyApi.getCompany(handle);
      setCompany(companyResp);
    }
    getCompany();
  }, [handle]);



  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h3>{company.name}</h3>
          <p className='pb-2'>{company.description}</p>
            {
              company.jobs.map(job => <JobCard key={job.id} job={job} />)
            }
        </Col>
      </Row>
    </Container>
  );
}

export default Company;