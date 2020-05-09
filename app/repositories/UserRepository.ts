import db from '@app/models';


export class UserRepository {
    public findOneByToken = (deviceToken: string) => {
        return db.UserSession.findOne({
            where: {
                deviceToken,
            },
            attributes: ['userId'],
        });
    }
   
}
