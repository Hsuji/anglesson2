import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserDataServiceService {
  userList:Array<User> = [];

  constructor() { 
    //방법 1
    let testUser: User = new User({
      userId: "test2",
      userName: "테스트2",
      userNo: 2,
      complete: true,
      userPwd: "test2"
    });
    this.userList.push(testUser);
    
    //방법 2
    this.userList.push({
      userId: "test3",
      userName: "테스트3",
      userNo: 3,
      complete: true,
      userPwd: "test3"
    });
  }

  getUserList():Array<User> {
    return this.userList;
  }

  

}
