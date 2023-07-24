import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreateNoteDto, UpdateNoteDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {

  constructor(
    @InjectModel(Note.name)
    private noteModel: Model<Note>
  ) {}


  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    // * 1.
    // const createdNote = new this.noteModel( createNoteDto )
    // return createdNote.save();

    try {
      // * 2.
      const note = await this.noteModel.create( createNoteDto );
      return note;
    } catch(err) {
      this.handleExceptions( err )
    }
  }

  findAll( paginationDto: PaginationDto ): Promise<Note[]> {

    const { limit = 5, offset = 0 } = paginationDto;

    return this.noteModel.find()
      .limit(limit)
      .skip(offset)
      .select('-__v');
  }

  async findOne(term: string) {

    let note: Note;

    note = await this.noteModel.findOne({
      title: term,
    });

    if( !note && isValidObjectId( term ) ) {
      note = await this.noteModel.findById( term );
    }

    if(!note) {
      throw new NotFoundException(`Note with ID ${ term } not found`);
    }

    return note;

  }

  update(id: string, updateNoteDto: UpdateNoteDto) {

    // let noteDB = this.findOne( id );

    // if( updateNoteDto.id && updateNoteDto.id !== id ) throw new BadRequestException('Note ID is not valid')

    // this.notes = this.notes.map( note => {
    //   if(note.id === id) {
    //     noteDB = {
    //         ...noteDB,
    //         ...updateNoteDto,
    //         id,
    //       }

    //       return noteDB;
    //   }

    //   return note;

    // });

    // return noteDB;

  }

  async remove(id: string) {

    const { deletedCount } = await this.noteModel.deleteOne({
      _id: id,
    })

    // No ha eliminado ninguna nota, no hay nota con ese MongoID
    if(deletedCount === 0) {
      throw new NotFoundException(`Note with ID ${ id } not found`)
    }

    return;

  }

  // Método personalizado para escuchar todas las excepciones
  private handleExceptions( err: any ) {
    // Si ya existe un documento en MongoDB con el mismo title (title=unique)
    if(err.code === 11000) {
      throw new BadRequestException(`Note con ID ${ JSON.stringify(err.keyValue) } already exist in the DB`)
    }

    console.log(err);
      
    throw new InternalServerErrorException('Something is wrong, check logs');

  }
}
