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
  public id: number = 0;
  public titre: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  hurgeTime: string = "";
  success: boolean = false;
  petitMot: string = "";

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.id = parseInt(localStorage.getItem("id")!);
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson(this.id).subscribe(res => {
      this.questionList = res.questions;
      this.titre = res.titre;
      console.log(this.questionList);
    })
  }

  nextQuestion() {
    this.currentQuestion++;
    console.log("question numéro : " + this.currentQuestion);
    this.getProgressPercent();
    if (this.currentQuestion >= (this.questionList.length)) {
      this.stopCounter();
      this.isQuizCompleted = true;
      this.validateQuiz();
    }
  }
  previousQuestion() {
    this.currentQuestion--;
    console.log("question numéro : " + this.currentQuestion);
  }
  answer(currentQuestion: number, reponse: any) {

      if (reponse.bonneReponse) {
        this.points += 10;
        this.correctAnswer++;
        setTimeout(() => {
          this.nextQuestion();
          this.resetCounter();
        }, 1000);
      } else {
        this.points -= 5;
        this.incorrectAnswer++;
        setTimeout(() => {
          this.nextQuestion();
          this.resetCounter();
        }, 1000);


    }


    console.log(this.isQuizCompleted);

  }
  startCounter() {
    this.interval$ = interval(1000).subscribe(
      val => {
        this.counter--;

        if (this.counter === 0) {
          //this.currentQuestion++;
          this.nextQuestion();
          this.counter = 60;
          // this.points -= 10;
        }
      }
    );
    setTimeout(() => { this.interval$.unsubscribe() }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter()
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString()
  }
  validateQuiz(){
    const okScore = 0.8;
    let scorePercent = (this.points)/(10*(this.questionList.length));
    if (scorePercent < okScore){
      console.log("pas bien !!!");
      this.success=false;
      this.petitMot="Dommage, ce sera pour une autre fois !"
    } else {
      console.log("bien");
      this.success=true;
      this.petitMot="Bravo, c'est un succès !!!"
    }
  }
}
