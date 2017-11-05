export class User {
    //변수 선언 및 초기화
    userNo: number = 0;
    userId: string = '';
    userName: string = '';
    userPwd: string = '';
    complete: boolean = false;

    constructor(value: Object = {}) {
        //set할 필요 없이 키값만 같다면 setting해준다.
        Object.assign(this, value);
    }

    //userNO는 작성하지 않고 시스템에서 추가해주기 위해 
    setUserNo(userNo:number):void {
        this.userNo = userNo;
    }
}
