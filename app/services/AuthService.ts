import { UserRepository } from '@app/repositories';

export  default class AuthMiddleware {

    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public required = async (req, res, next) => {
        console.log(req.headers.token)
        if (req.headers.token) {
            const userSession = await this.userRepository.findOneByToken(req.headers.token);
            if (userSession) {
                req.user = { id: userSession.userId };
                next();
            } else {
                res.status(401).send({
                    status:"FAILURE",
                    data:{
                        error:{
                         code:"UNAUTHORIZED",
                         message:"INVALID AUTH TOKEN"
                        }
                        
                    }
                });
            }
        } else {
            res.status(400).send({
                status:"FAILURE",
                data:{
                    error:{ 
                    code:"BAD REQUEST",
                    message:"AUTH TOKEN NOT FOUND"}
                   
                }
            }); 
        }
    }
    

}