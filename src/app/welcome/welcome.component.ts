import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('id') nameKey!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  startQuiz() {
    localStorage.setItem("id", this.nameKey.nativeElement.value)
  }

}
