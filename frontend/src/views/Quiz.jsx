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

import {FaRegThumbsUp,FaRegThumbsDown} from 'react-icons/fa';

import Header from "components/Headers/QuizHeader.jsx";

class Quiz extends React.Component {

  quizQuestions = [
    {
      question: '好',
      option: ['nǐ','hào','hěn'],
      answer: 'hào',
    },
    {
      question: '你',
      option: ['nǐ','jiàn','zài',],
      answer: 'nǐ',
    },
    {
      question: '再',
      option: ['hěn','jiàn','zài'],
      answer: 'zài',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      questionID: 0,
      question: '',
      questionType: 0,
      answerOption: [],
      selectedAnswers: {},
      checkAnswer: 0,
      score: 0,
    };

    this.shuffledAnswerOptions = this.quizQuestions.map(question =>
      this.shuffleArray(question.option)
    );

    this.onAnswerSelected = this.onAnswerSelected.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onNextQuestion = this.onNextQuestion.bind(this);
  }

  componentWillMount() {
    this.setState({
      question: this.quizQuestions[0].question,
      answerOptions : this.shuffledAnswerOptions[0],
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
    console.log("for selected question number " + (this.state.questionID + 1) +  " answer is " + index + "," + answer);
    obj[this.state.questionID] = index;
    this.setState({selectedAnswers: obj});
  }

  onCheck() {
    var obj = this.state.selectedAnswers[this.state.questionID];
    var answer = this.quizQuestions[this.state.questionID].answer;
    var score = this.state.score;
    if(obj !== undefined){
      if(this.state.answerOptions[obj] == answer){
        this.setState({checkAnswer: 1, score: score + 1});
      }
      else{
        this.setState({checkAnswer: 2, score: score});
      }
    }
  }

  onNextQuestion() {
    const id = (this.state.questionID + 1)%3;

    this.setState({
      questionID: id,
      question: this.quizQuestions[id].question,
      answerOptions : this.shuffledAnswerOptions[id],
      checkAnswer: 0,
    });
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
                  <Button outline block 
                    color={this.state.checkAnswer != 0 && this.quizQuestions[this.state.questionID].answer === answer? "success" : 
                    this.state.checkAnswer == 2 && this.state.selectedAnswers[this.state.questionID] === index ? "danger" :"primary"}  
                    onClick={() => this.state.checkAnswer == 0 ? this.onAnswerSelected(answer,index) : null}
                    active={this.state.selectedAnswers[this.state.questionID] === index || (this.state.checkAnswer == 2 && this.quizQuestions[this.state.questionID].answer === answer)}>
                    {answer}            
                  </Button>
              )}
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="text-muted">
          {/* Answer */}
          <div className="clearfix">
            {this.state.checkAnswer == 0 ?
              (<Button className="float-left" size="lg" onClick={() => this.onNextQuestion()}>ข้าม</Button>) : 
              this.state.checkAnswer == 1 ?
              (<FaRegThumbsUp color='#2ADF5F' size={50} />):(<FaRegThumbsDown color='#EF233C' size={50} />)}
            {this.state.checkAnswer == 0 ? 
              (<Button className="float-right" color="info" size="lg" onClick={() => this.onCheck()}>ตรวจสอบ</Button>) : 
              (<Button className="float-right" size="lg" onClick={() => this.onNextQuestion()}
                color={this.state.checkAnswer == 1 ? ("success") : ("danger")}>ข้อถัดไป
              </Button>)
            }
          </div>
        </CardFooter>
      </Card>
    );
  }

  render() {
    return (
      <>
        <Header score={this.state.score} />
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
