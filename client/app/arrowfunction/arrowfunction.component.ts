import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrowfunction',
  template: require('./arrowfunction.component.html')
})
export class ArrowfunctionComponent implements OnInit {
  title:string = "화살표 함수 테스트";
  text:string = "테스트";

  constructor() { }
  ngOnInit() { }

  arrFunTest1() {
    alert(this.text);
    let test = function():void {
      alert(this.text);
    }
    try {
      test();
    } catch (e) {
      alert(e);
    }
  }

  arrFunTest2() {
    let test = function(obj:any):void {
      alert(obj.text);
    }
    try {
      test(this);
    } catch (e) {
      alert(e);
    }
  }
  
  // arrFunTest3() {
  //   let test = function(obj:any):void {
  //     alert(obj.text);
  //   }
  //   try {
  //     let tt = this
  //     test(tt);
  //   } catch (e) {
  //     alert(e);
  //   }
  // }

  arrFunTest4() {
    let test = function():void {
      alert(this.text);
    }
    // test.bind(this)();
    test.call(this);
  }

  arrFunTest5() {
    let test = ():void => {
      alert(this.text);
    }
    test();
  }
}
