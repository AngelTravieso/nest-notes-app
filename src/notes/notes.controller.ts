import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { NotesService } from './notes.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {    
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.notesService.findAll( paginationDto );
  }

  @Get(':term')
  findOne(@Param('term' ) term: string) {
    return this.notesService.findOne( term );
  }

  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe ) id: string,
  @Body() updateNoteDto: UpdateNoteDto
  ) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.notesService.remove( id );
  }
}
