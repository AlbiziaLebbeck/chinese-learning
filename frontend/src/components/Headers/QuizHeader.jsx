import React from "react";
import PropTypes from 'prop-types';

// reactstrap components
import { Card, CardBody, Container, Row, Col, Progress } from "reactstrap";

function Header(props) {
  const numQuestions = props.numQuestions;

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
          <Row>
            <Col>
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  {/* Progess */}
                  <div className="text-center">{props.score}/{numQuestions}</div>
                  <Progress value={props.score/numQuestions*100}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
  numQuestions: PropTypes.number.isRequired,
};

export default Header;
