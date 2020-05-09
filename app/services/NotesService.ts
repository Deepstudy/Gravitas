
import {NotesRepository} from '../repositories/NotesRepository';
import INote from '../interfaces/models/INotes'

export default class NotesService {
    private notesRepository: NotesRepository;
   

    public constructor(notesRepository: NotesRepository) {
        this.notesRepository = notesRepository;

    }

    public createNote = async (note:INote) => {
       let createdNote =  await this.notesRepository.createNote(note);
       return{title:createdNote.title,label:createdNote.label,content:createdNote.content,id:createdNote.id};

    }

    public getNote = async(noteId:number) =>{
        let note = await this.notesRepository.findByNoteId(noteId);
        if(note){
            return{title:note.title,label:note.label,content:note.content};
        }else{
            return {};
        }
        
    }

    public isOwner = async(noteId:number,userId:number) =>{
        let isOwner =  await this.notesRepository.isOwner(noteId,userId);
        if(isOwner === null){
            return false
        }else{
            return true
        }
    }

    public updateNote = async(noteId:number,note:any) =>{
        let updatedNote = await this.notesRepository.editNote(note,noteId);
        return updatedNote;
    }

    public getAllNotesOfUser = async(userId:number) =>{
        return await this.notesRepository.findNotesByUserID(userId)
    }

    public softDeleteNote = async(noteId:number) =>{
        return await this.notesRepository.editNote({isDeleted:1},noteId);
    }

    
  


}
