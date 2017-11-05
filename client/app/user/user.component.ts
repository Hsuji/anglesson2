import { Component, OnInit } from '@angular/core';
import { UserDataServiceService } from "./user-data-service.service";
import { User } from "./user";

@Component({
  selector: 'app-user',
  template: require('./user.component.html')
})
export class UserComponent implements OnInit {

  userName:string = "";
  userAge:number = 0;
  userNameList:Array<Object> = [
    {name: "홍길동", userNo: 6, userId: "tt2", userPwd: "1", age: 30}
  ];
  // userNameList:Array<Object> = [
  //   {name: "홍길동", age: 30},
  //   {name: "이길동", age: 25},
  //   {name: "테스트", age: 20}
  // ];
  userNum:number = 0;

  constructor() { }

  ngOnInit() {
  }

  addUser():void {
    this.userNameList.push({name:this.userName, age:this.userAge});
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
}
