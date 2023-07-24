import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { NotesService } from './notes.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe ) id: string) {
    return this.notesService.findOne( id );
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe ) id: string,
  @Body() updateNoteDto: UpdateNoteDto
  ) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.notesService.remove( id );
  }
}
