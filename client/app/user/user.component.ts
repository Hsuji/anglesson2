import { Component, OnInit } from '@angular/core';
import { UserDataServiceService } from "./user-data-service.service";
import { User } from "./user";
import { UserCss } from "../common/user.css";
import { UserHistory } from "../user-his/userHistory";

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
  showDialog:boolean = false;
  userHisList:Array<UserHistory>=[];
  validate:boolean = true;

  constructor(private uds: UserDataServiceService) {
    this.getUsers();
   }

  ngOnInit() { }

  showHideAddUserDiv():void {
    this.addUserBtnStr = 'Show Add User Div';
    this.addUserShow = !this.addUserShow;
    if(this.addUserShow) this.addUserBtnStr = 'Hide Add User Div';
  }

  addUser(user:User):void {
    //insert
    this.uds.addUser(user).subscribe(datas => {
      console.log("adduser => ", datas);
      //구조체 형태로 키값을 기준로 잡아 자동으로 값 할당 
      if(datas["error"]){
        alert(datas["error"]);
        return;
      }
      if(datas["msg"]){
        alert(datas["msg"]);
      }
      this.userList = datas["list"];
    }, error => {
      this.errorMsg = <any>error;
      alert(this.errorMsg);
    });
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

  showUserHis(userNo:number){
    //uds 호출한적없음
    this.uds.getUserHis(userNo).subscribe(datas => {
      console.log(datas);
      this.userHisList = datas["list"];

      //this.showDialog = !this.showDialog;
      //user-his 컴포넌트의 close에서 visible의 값을 보내기 때문에 true로 해도 무관
      this.showDialog = true;
    }, error => {
      this.errorMsg = <any>error;
      alert(this.errorMsg);
    });
  }

}
