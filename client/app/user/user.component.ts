import { Component, OnInit } from '@angular/core';
import { UserDataServiceService } from "./user-data-service.service";
import { User } from "./user";

@Component({
  selector: 'app-user',
  template: require('./user.component.html'),
  providers: [UserDataServiceService]
})
export class UserComponent implements OnInit {

  userName:string = "";
  userAge:number = 0;
  userNameList:Array<Object> = [
    {userName: "홍길동", userNo: 6, userId: "tt2", userPwd: "1", age: 30}
  ];
  // userNameList:Array<Object> = [
  //   {name: "홍길동", age: 30},
  //   {name: "이길동", age: 25},
  //   {name: "테스트", age: 20}
  // ];
  userNum:number = 0;
  userList:Array<User> = [];
/*   userList:Array<User> = [{
      userId: "test",
      userName: "테스트",
      userNo: 1,
      complete: true,
      userPwd: "test" 
  }]; */
  errorMsg:string = "";

  constructor(private uds: UserDataServiceService) { }

  ngOnInit() {
  }

  addUser(user:User):void {
    let uds2:UserDataServiceService = this.uds.addUser(user);
    this.userList = uds2.userList;
  }

  updateUser():void {
    this.userNameList[this.userNum] = {name: this.userName, age: this.userAge};
    alert("수정 완료");
  }

  deleteUser():void {
    let deleteUser:Object = this.userNameList[this.userNum];
    alert(deleteUser["name"] + " 님을 삭제합니다.");
    this.userNameList.splice(this.userNum, 1);
    console.log(this.userNameList);
  }

  selectUserList():void {
    this.userList = this.uds.getUserList();
  }

  outputAlert(isTest:boolean) {
    alert(isTest);
  }

  getUserList():void {
    //DB에서 user테이블 정보 가져오기
    this.uds.getUsers().subscribe(users => {
      this.userList = users;
      console.log(users);
    }, error => this.errorMsg = <any>error);
  }
}
