import { Response } from 'express';

export class AppResponse {
    protected readonly SUCCESS = 200;
    protected readonly BAD_REQUEST = 400;
    protected readonly UNAUTHORIZED = 401;
    protected readonly UNPROCESSABLE_ENTITY = 422;
    protected readonly INTERNAL_SERVER_ERROR = 500;
    protected readonly CONFLICT = 409;

    public success = (res: Response, data: any) => {
        res.status(this.SUCCESS).send({
            status: 'SUCCESS',
            data,
        });
    }

    public error = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.INTERNAL_SERVER_ERROR).send({
            status: 'ERROR',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        });
    }

    public unprocessableEntity = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.UNPROCESSABLE_ENTITY).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        });
    }

    public badRequest = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.BAD_REQUEST).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        });
    }

    public unauthorized = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.UNAUTHORIZED).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        });
    }

    public conflict = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.CONFLICT).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        });
    }
}
