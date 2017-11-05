import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template:require('./test.component.html')
})

export class TestComponent implements OnInit {

  name:string;
  num1:string;
  num2:string;
  result:number;
  op:string;
  isReady: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  alertName():void {
    alert(this.name);
  }

  plus() {
    if(this.op == "+") {
      this.result = parseInt(this.num1) + parseInt(this.num2);
    } else if(this.op == "-") {
      this.result = parseInt(this.num1) - parseInt(this.num2);
    } else if(this.op == "*") {
      this.result = parseInt(this.num1) * parseInt(this.num2);
    } else if(this.op == "/") {
      this.result = parseInt(this.num1) / parseInt(this.num2);
    }
    this.isReady = false;
  }

}
