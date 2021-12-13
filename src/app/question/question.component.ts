import { Component, OnInit } from '@angular/core';
import { faChevronRight , faChevronLeft, faSync} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
faChevronRight = faChevronRight;
faChevronLeft = faChevronLeft;
faRedo = faSync;
  constructor() { }

  ngOnInit(): void {
  }

}
