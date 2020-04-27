import React, { useState, useEffect } from 'react';
import SearchBar from '../helpers/SearchBar';
import JoblyApi from '../helpers/JoblyApi';
import JobCard from './JobCard';
import {Container, Row, Col} from 'react-bootstrap';

const JobList = () => {

  const [jobs, setJobs] = useState([]);

  //opportunity to refactor getCompanies() outside of useEffect & searchCompanies
  useEffect(() => {
    const getJobs = async () => {
      const jobsResp = await JoblyApi.getJobs();
      setJobs(jobsResp)
    }
    getJobs();
  }, []);

  const searchJobs = searchTerm => {
    const getJobs = async searchTerm => {
      const jobsResp = await JoblyApi.getJobs(searchTerm);
      setJobs(jobsResp);
    }
    getJobs(searchTerm);
  }

  const jobsJSX = jobs.length
    ? jobs.map(job => <JobCard key={job.id} job={job} />)
    : <h3>No companies match that search. Please try again</h3>


  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <SearchBar handleSearch={searchJobs} />
          {jobsJSX}
        </Col>
      </Row>
    </Container>
  );
}

export default JobList;