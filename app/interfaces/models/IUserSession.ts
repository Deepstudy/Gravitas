export default  interface IUserSession {
    readonly id: number;
    userId: number;
    deviceId:string;
    deviceToken: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
}

