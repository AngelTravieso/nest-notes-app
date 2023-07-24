import { IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateNoteDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    body: string;

    @IsOptional()
    @IsString()
    @IsIn(['completed', 'not-completed'])
    status?: string;

    @IsOptional()
    @IsString()
    @IsIn(['low', 'medium', 'high'])
    urgency?: string;

}
