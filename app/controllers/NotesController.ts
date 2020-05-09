import AppConstants from '@app/constants/AppConstants';
import BaseController from '@app/controllers/BaseController';

import {Request, Response} from 'express';
import  NotesService  from '@app/services/NotesService';


export class NotesController extends BaseController {
    private notesService:NotesService

    public constructor(notesService:NotesService) {
        super();
        this.notesService = notesService;
    }


public createNote = async(req:Request, res:Response, next) =>{
    try{
        if(req.body.data.title === undefined || req.body.title === ""){
            return this.appResponse.badRequest(res,
                AppConstants.ERROR_CODES.ERR_INVALID_NOTE,
                AppConstants.ERROR_MESSAGES.ERR_INVALID_NOTE)
        }
        req.body.data.createdBy = req.user.id;
        let newNote = await this.notesService.createNote(req.body.data);
        return this.appResponse.success(res,{newNote} );
    }catch(error){
        next(error);
    }
}

public getNote = async(req:Request, res:Response, next) =>{
    try{
       let isOwner = await this.notesService.isOwner(req.params.noteId, req.user.id);
       if(isOwner){
           let note = await this.notesService.getNote(req.params.noteId);
           return this.appResponse.success(res,{note});
       }else{
           return this.appResponse.unauthorized(res,
                AppConstants.ERROR_CODES.ERR_INVALID_ACCESS,
                AppConstants.ERROR_MESSAGES.ERR_INVALID_ACCESS)
       } 
    }catch(error){
        next(error);
    }
}

public editNote = async(req:Request,res:Response,next) =>{
    try{
        let isOwner = await this.notesService.isOwner(req.params.noteId, req.user.id);
        if(isOwner){
            let updatedNote = await this.notesService.updateNote(req.params.noteId,req.body.data);
            if(updatedNote){
                return this.appResponse.success(res,{});
            }    
        }else{
            return this.appResponse.unauthorized(res,
                 AppConstants.ERROR_CODES.ERR_INVALID_ACCESS,
                 AppConstants.ERROR_MESSAGES.ERR_INVALID_ACCESS)
        } 
     }catch(error){
         next(error);
     }
}

public getAllNotesOfUser = async(req:Request, res:Response,next) =>{
    try{
        let notes = await this.notesService.getAllNotesOfUser(req.user.id);
        return this.appResponse.success(res,{notes});
    }catch(error){
        next(error);
    }
}

public deleteNote = async(req:Request,res:Response,next) =>{
    try{
        let isOwner = await this.notesService.isOwner(req.params.noteId, req.user.id);
        if(isOwner){
            let deleteNote = await this.notesService.softDeleteNote(req.params.noteId);
            if(deleteNote){
                return this.appResponse.success(res,{});
            }    
        }else{
            return this.appResponse.unauthorized(res,
                 AppConstants.ERROR_CODES.ERR_INVALID_ACCESS,
                 AppConstants.ERROR_MESSAGES.ERR_INVALID_ACCESS)
        } 
     }catch(error){
         next(error);
     }
}













}
