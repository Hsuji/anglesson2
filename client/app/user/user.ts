export class User {
    //변수 선언 및 초기화
    userNo: number = 0;
    userId: string = '';
    userName: string = '';
    userPwd: string = '';
    complete: boolean = false;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}
