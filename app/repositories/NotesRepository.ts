import db from '@app/models';
import INote from '@app/interfaces/models/INotes';

export class NotesRepository {

     public createNote = async (attr: INote) => {
        return await db.Notes.create(attr);
    }

    public findByNoteId = async(notesId:number) =>{
        return await db.Notes.findOne({
            where:{
                id:notesId,
                isDeleted:0
            }
        })
    }

    public findNotesByUserID = async(userId:number) =>{
        return await db.Notes.findAll({
            attributes:['title','content','label'],
            where:{
                createdBy:userId,
                isDeleted:0
            }
        })
    }

    public editNote = async(updatedNote:any, noteId:number)=>{
        return await db.Notes.update(updatedNote,{
            where:{
                id:noteId
            }
        })
    }

    public isOwner = async(noteId:number,userId:number) =>{
        return await db.Notes.findOne({
            where:{
                id:noteId,
                createdBy:userId
            }
        })
    }

    
}
