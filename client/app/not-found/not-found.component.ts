import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: require('./not-found.component.html')
})
export class NotFoundComponent implements OnInit {
  title:string = "404에러";
  msg:string = "페이지를 찾을 수 없습니다.";
  
  constructor() { }

  ngOnInit() { }

}
