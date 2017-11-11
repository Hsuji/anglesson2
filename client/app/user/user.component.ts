import { Component, OnInit } from '@angular/core';
import { UserDataServiceService } from "./user-data-service.service";
import { User } from "./user";
import { UserCss } from "../common/user.css";

@Component({
  selector: 'app-user',
  template: require('./user.component.html'),
  providers: [UserDataServiceService],
  styles: UserCss
})
export class UserComponent implements OnInit {
  userList:Array<User>=[];
  searchUser:User = new User();
  errorMsg:string = '';
  addUserShow:boolean = false;
  addUserBtnStr:string='Show Add User Div';
  title:string = 'User List';

  constructor(private uds: UserDataServiceService) { }

  ngOnInit() { }

  showHideAddUserDiv():void {
    this.addUserBtnStr = 'Show Add User Div';
    this.addUserShow = !this.addUserShow;
    if(this.addUserShow) this.addUserBtnStr = 'Hide Add User Div';
  }

  addUser(user:User):void {
    console.log(user);
  }

  getUsers():void {
    this.uds.getUsers(this.searchUser).subscribe(datas => {
      console.log(datas);
      this.userList = datas["list"];
    }, error => {
      this.errorMsg = <any>error;
      alert(this.errorMsg);
    });
  }

}
