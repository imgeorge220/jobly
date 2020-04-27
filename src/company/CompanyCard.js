import React from 'react';
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import companyImg from "../assets/default-company-img.png"
import "./CompanyCard.css"

const CompanyCard = ({ company }) => {

  return (
    <Link className="CompanyCard"  style={{textDecoration: 'none'}} to={`/companies/${company.handle}`}>
      <Card className="mb-3">
        <Container>
          <Card.Body className='pb-1'>
            <Row>
              <Col xs={8} md={10}>
                <h3 >{company.name}</h3>
              </Col>
              <Col className="CompanyCard-image-container" xs={4} md={2}>
                <img className="CompanyCard-image" src={companyImg} alt={company.name} />
              </Col>
            </Row>
            <Row className='pt-3'>
              <Col md={12}>
                <p >{company.description}</p>
              </Col>
            </Row>
          </Card.Body>
        </Container>
      </Card>
    </Link>
  );
}

export default CompanyCard;