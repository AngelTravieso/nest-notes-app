import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    title:      string;

    @Prop({
        type: String,
        required: true,
    })
    body:       string;

    @Prop({
        type: String,
        enum: ['completed', 'not-completed'],
    })
    status?:    string;

    @Prop({
        type: String,
        enum: ['low', 'medium', 'high'],
    })
    urgency?:   string;

}

export const NoteSchema = SchemaFactory.createForClass( Note );