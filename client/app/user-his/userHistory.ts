export class UserHistory {
    userNo: number;
    userData: string;

    constructor(value: Object = {}) {
        Object.assign(this, value);
    }
}