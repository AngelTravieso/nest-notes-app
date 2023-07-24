import { IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateNoteDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    body: string;

    @IsOptional()
    @IsIn(['completed', 'not-completed'])
    status?: string;

    @IsOptional()
    @IsIn(['low', 'medium', 'high'])
    urgency?: string;

}
