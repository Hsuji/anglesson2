import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from "../user/user";

@Component({
  selector: 'app-user-list',
  template: require('./user-list.component.html'),
  inputs: ["userList"]
})
export class UserListComponent implements OnInit {
  userList:Array<User>;
  
  constructor() { }

  ngOnInit() {}

  isTest: boolean = false;
  @Output() outputTest = new EventEmitter<boolean>();

  //이벤트 구현은 자식 컴포넌트이고 실현은 부모 컴포넌트에서 한다고 이해해보자
  passValueToParent() {
    this.isTest = !this.isTest;
    this.outputTest.emit(this.isTest);
  }

}
