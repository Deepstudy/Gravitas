export default interface IUser {
    readonly id: number;
    name:string;
    phoneNumber:string;
    email:string;
    otp:string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
}

