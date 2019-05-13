import React from "react";
// node.js library that concatenates classes (strings)

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

import Header from "components/Headers/QuizHeader.jsx";

class Quiz extends React.Component {

  quizQuestions = [
    {
      question: '好',
      answers: [
        {
          ans: 'nǐ',
          value: false
        },
        {
          ans: 'hào',
          value: true
        },
        {
          ans: 'hěn',
          value: false
        },
      ]
    },
    {
      question: '你',
      answers: [
        {
          ans: 'nǐ',
          value: true
        },
        {
          ans: 'jiàn',
          value: false
        },
        {
          ans: 'zài',
          value: false
        },
      ]
    },
    {
      question: '再',
      answers: [
        {
          ans: 'hěn',
          value: false
        },
        {
          ans: 'jiàn',
          value: false
        },
        {
          ans: 'zài',
          value: true
        },
      ]
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      questionID: 0,
      question: '',
      questionType: 0,
      answerOption: [],
      selectedAnswers : {},
      score: 0,
    };

    this.onAnswerSelected = this.onAnswerSelected.bind(this)
  }

  componentWillMount() {
    const shuffledAnswerOptions = this.quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );

    this.setState({
      question: this.quizQuestions[0].question,
      answerOptions : shuffledAnswerOptions[0],
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onAnswerSelected(answer,index) {
    var obj = this.state.selectedAnswers;
    console.log("for selected question number " + (this.state.questionID + 1) +  " answer is " + index + "," + answer.value);
    obj[this.state.questionID] = index;
    this.setState({selectedAnswers : obj})
    // var score = this.state.score;
    // if(value){
    //  score = score + 10;
    // }
    // this.setState({score : score});
  }

  renderQuiz() {
    return (
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            {/* Question */}
            <div className="col">
              <h2 className="mb-0">ตัวอักษรนี้ออกเสียงว่าอย่างไร</h2>
            </div>
          </Row>
        </CardHeader>
        <CardBody>
          {/* Answer */}
          <Row>
            <Col lg="6" xl={{size:4,offset:2}}>
              <Card>
                <CardBody>
                  <div class="text-center">
                  <h1 class="display-1">{this.state.question}</h1>
                </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="4">
              {this.state.answerOptions.map((answer,index) => 
                  <Button outline 
                    color="primary" 
                    onClick={() => this.onAnswerSelected(answer,index)} 
                    active={this.state.selectedAnswers[this.state.questionID] === index}
                    size="lg" 
                    block>{answer.ans}            
                  </Button>
              )}
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          {/* Answer */}
          <div className="clearfix">
            <Button className="float-left" size="lg">Skip</Button>
            <Button className="float-right" color="info" size="lg">Check</Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col>
              {this.renderQuiz()}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Quiz;
