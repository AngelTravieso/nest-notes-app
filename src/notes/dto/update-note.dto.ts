import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {

    @IsString()
    @IsUUID()
    @IsOptional()
    id?: string;

}
