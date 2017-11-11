import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-function-test',
  template: require('./function-test.component.html')
})
export class FunctionTestComponent implements OnInit {
  title:string = "함수테스트";

  constructor() { }

  ngOnInit() { }

  funTest1() {
    test();
    //로컬 영역 메모리에 할당됨
    function test():void {
      alert(1);
    }
  }

  funTest2() {
    let test;
    try {
      // test();
      test = function() {
        alert(2);
      }
       test();
    } catch (error) {
      alert(error);
      // test = function() {
      //   alert(2);
      // }
    }
    test();
  }

  funTest3() {
    let test;
    try {
      // test();
      test = function t1() {
        alert(3);
      }
      test();
    } catch (error) {
      alert(error);
    }
    test();
  }


}
