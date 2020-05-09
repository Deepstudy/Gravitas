import wiring from '@app/wiring';


export class Routes {

    public routes(app: any): void {


        app.get('/api/status', (req, res) => {
            res.send({status:"OK",version:"1.1.1"});
        });
        app.post('/api/notes' , wiring.authService.required , wiring.notesController.createNote);
        app.get('/api/notes/:noteId',wiring.authService.required,wiring.notesController.getNote)
        app.get('/api/notes', wiring.authService.required, wiring.notesController.getAllNotesOfUser);
        app.put('/api/notes/:noteId' ,wiring.authService.required, wiring.notesController.editNote);
        app.delete('/api/notes/:noteId', wiring.authService.required,wiring.notesController.deleteNote);
        

    }
}
