import React from "react";

// reactstrap components
import { Card, CardBody, Container, Row, Col, Progress } from "reactstrap";

class Header extends React.Component {
  render() {
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
                    <div className="text-center">2/10</div>
                    <Progress value={2/10*100}/>
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
}

export default Header;
