import React, { useState, useEffect } from 'react';
import SearchBar from '../helpers/SearchBar';
import JoblyApi from '../helpers/JoblyApi';
import CompanyCard from './CompanyCard';
import { Container, Row, Col } from 'react-bootstrap';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  //opportunity to refactor getCompanies() outside of useEffect & searchCompanies
  useEffect(() => {
    const getCompanies = async () => {
      const companiesResp = await JoblyApi.getCompanies();
      setCompanies(companiesResp);
    }
    getCompanies();
  }, [])

  const searchCompanies = searchTerm => {
    const getCompanies = async searchTerm => {
      const companiesResp = await JoblyApi.getCompanies(searchTerm);
      setCompanies(companiesResp);
    }
    getCompanies(searchTerm);
  }

  return (
    <Container>
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <SearchBar handleSearch={searchCompanies} />
            {companies.map(company => <CompanyCard key={company.handle} company={company} />)}
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyList;