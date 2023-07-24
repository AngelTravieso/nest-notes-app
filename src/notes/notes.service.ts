import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreateNoteDto, UpdateNoteDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Note } from './entities/note.entity';

/**
 * Class para interactuar con las Notas
 */
@Injectable()
export class NotesService {

  constructor(
    @InjectModel( Note.name )
    /**
     * @property {Model} noteModel - Modelo notas inyectado
     */
    private readonly noteModel = Model<Note>,
  ) {}


  /**
   * @property {Function} create - Crear una nueva nota
   * @param createNoteDto - Datos necesarios para crear la nota
   * @returns { Promise<Note> } - Nota creada
   */
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

  /**
   * @property {Function} findAll - Retornar todas las Notas
   * @param paginationDto - QueryParams para el paginado (limit y offset)
   * @returns {Promise<Note[]>} Array con todas las notas
   */
  findAll( paginationDto: PaginationDto ): Promise<Note[]> {

    const { limit = 5, offset = 0 } = paginationDto;

    return this.noteModel.find()
      .limit(limit)
      .skip(offset)
      .select('-__v');
  }

  /**
   * @property {Function} findOne - Buscar notas por su ID
   * @param {string} term - El término de búsqueda, puede ser el MongoID o el título de la nota
   * @returns {Note} - Retornar nota encontrada por el ID
   */
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

  /**
   * @property {Function} update - Actualizar nota
   * @param {string} id - MongoID de la nota a actualizar
   * @param {updateNoteDto} updateNoteDto - Datos del DTO para actualizar la nota 
   * @returns {Note} Nota con los datos actualizados
   */
  async update( id: string, updateNoteDto: UpdateNoteDto ) {

    const note = await this.findOne( id );

    try {
      await note.updateOne( updateNoteDto );
      return { ...note.toJSON(), ...updateNoteDto };
    } catch(err) {
      this.handleExceptions( err );
    }

  }

  async remove(id: string): Promise<void> {

    const { deletedCount } = await this.noteModel.deleteOne({
      _id: id,
    })

    // No ha eliminado ninguna nota, no hay nota con ese MongoID
    if(deletedCount === 0) {
      throw new NotFoundException(`Note with ID ${ id } not found`)
    }

    return;

  }

  /**
   * @property {Function} handleExceptions - Función para escuchar errores/excepciones interactuando con la BD
   * @param {any} err - Excepción lanzada por la interacción con la BD
   * @returns {void}
   */
  private handleExceptions( err: any ): void {
    // Si ya existe un documento en MongoDB con el mismo title (title=unique)
    if(err.code === 11000) {
      throw new BadRequestException(`Note con ID ${ JSON.stringify(err.keyValue) } already exist in the DB`)
    }

    console.log(err);
      
    throw new InternalServerErrorException('Something is wrong, check logs');

  }
}
