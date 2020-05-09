

import { UserRepository, NotesRepository } from './repositories';
import { NotesController } from './controllers/NotesController';
import AuthService from '@app/services/AuthService';
import NotesService from '@app/services/NotesService'

class Wiring {
//     /**
//      * Repositories
//      */
       public userRepository = new UserRepository();
       public notesRepository = new NotesRepository();

//     /**
//      * Services
//      */

       public authService = new AuthService(this.userRepository)
       public notesService = new NotesService(this.notesRepository)


//     /**
//      * Controllers
//      */
public notesController = new NotesController(this.notesService);

}

export default new Wiring();
