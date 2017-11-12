import { Injectable } from '@angular/core';
import {CommonServiceService} from '../common/common-service.service'
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
 
import { User } from'./user';
import { UserHistory } from "../user-his/userHistory";
@Injectable()
export class UserDataServiceService extends CommonServiceService{
  private usersUrl:string="api/users";
  private userHisUrl:string="/api/userhis/";
 
  constructor(protected _http:Http) {
    super(_http);
  }
  
  getUsers(searchUser:User,pUrl?:string): Observable<User[]> {
    let paramStr:string  = '?user=' + JSON.stringify(searchUser);
    let url : string = this.usersUrl;
    if(pUrl){
      url += pUrl;
    }
    return super.getJson(url+paramStr);
  }
  
  getUserHis(userNo:number): Observable<UserHistory> {
    alert(this.userHisUrl+userNo);
    return super.getJson(this.userHisUrl + userNo);
  }
  
  addUser(addUser:User): Observable<User[]> {
    return super.postJson(this.usersUrl, addUser);
  }
}