import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {

   }

   getQuestionJson(id: number){
    // return this.http.get<any>("assets/questions.json");
    return this.http.get<any>("http://localhost:8000/api/evaluations/"+id+".json");
  }
}
