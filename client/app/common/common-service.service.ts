import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonServiceService {
  private headers = new Headers();
  private myParams = new URLSearchParams();
  private options:any;

  constructor(protected _http:Http) { 
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    this.headers.append('Accept', 'application/json; charset=utf-8');
  }

  protected setInitHeaders(headers:Map<string,string>){
    headers.forEach((element, key) => {
      this.headers.append(key, element);
    });
  }

  protected getJson(url:string):Observable<any>{
    return this._http.get(url).map(this.extractJson) .catch(this.handleError);
  }

  protected postJson(url:string, paramObj:Object):Observable<any>{
    return this._http.post(url, paramObj, {headers: this.headers})
          .map(this.extractJson)
          .catch(this.handleError);
  }

  private extractJson(res: Response) {
    let result = res.json();
    if(result.error){
      let err = result.error;
      throw ("[" + err.no + ":" + err.code + "] " + err.msg);
    }
    return result || { };
  }  
 
  private handleError (error: Response | any) {
    let errMsg: string = error;
    return Promise.reject(errMsg);
  }

}
