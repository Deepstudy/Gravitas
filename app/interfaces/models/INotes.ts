import { json } from "sequelize";

export default interface IUser {
    readonly id?: number;
    createdBy:number;
    title:string;
    content?:json;
    label?:string;
    isDeleted?:boolean
    readonly createdAt?: string;
    readonly updatedAt?: string;
}


