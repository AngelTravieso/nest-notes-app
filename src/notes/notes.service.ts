import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Note } from './interfaces/note.interface';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class NotesService {

  private notes: Note[] = [];

  create(createNoteDto: CreateNoteDto) {

    const note: Note = {
      id: uuid(),
      ...createNoteDto,
    }

    this.notes = [ ...this.notes, note ];

    return note;

  }

  findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;
    
    return this.notes;

  }

  findOne(id: string) {

    const note = this.notes.find(item => item.id === id);

    if( !note ) {
      throw new NotFoundException(`Note with ID ${ id } not found`)
    }

    return note;
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {

    let noteDB = this.findOne( id );

    if( updateNoteDto.id && updateNoteDto.id !== id ) throw new BadRequestException('Note ID is not valid')

    this.notes = this.notes.map( note => {
      if(note.id === id) {
        noteDB = {
            ...noteDB,
            ...updateNoteDto,
            id,
          }

          return noteDB;
      }

      return note;

    });

    return noteDB;

  }

  remove(id: string) {

    this.findOne( id );

    this.notes = this.notes.filter(note => note.id !== id );
    
    return

  }
}
