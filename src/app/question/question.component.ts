import { Component, OnInit } from '@angular/core';
import { faChevronRight, faChevronLeft, faSync } from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faRedo = faSync;
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$: any;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe(res => {
      this.questionList = res.questions;
      console.log(this.questionList);
    })
  }

  nextQuestion() {
    this.currentQuestion++;
    console.log("question numéro : " + this.currentQuestion);
  }
  previousQuestion() {
    this.currentQuestion--;
    console.log("question numéro : " + this.currentQuestion);
  }
  answer(currentQuestion: number, option: any) {
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      this.currentQuestion++;
    } else {
      this.points -= 10;
      this.incorrectAnswer++;
      this.currentQuestion++;

    }
    this.resetCounter();
  }
  startCounter() {
    this.interval$ = interval(1000).subscribe(
      val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      }
    );
    setTimeout(() => {this.interval$.unsubscribe()}, 600000)
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }
  resetQuiz(){
    this.resetCounter()
    this.getAllQuestions();
    this.points=0;
    this.currentQuestion=0

  }
}
