import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from "../user/user";

@Component({
  selector: 'app-user-insert',
  template: require('./user-insert.component.html')
})
export class UserInsertComponent implements OnInit {

  user: User = new User;
  @Output() outputUser = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {}

  addUser2() {
    //부모 컴포넌트로 정보를 보냄
    this.outputUser.emit(this.user);
  }
}
