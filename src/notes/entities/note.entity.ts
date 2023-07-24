import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {

    @Prop({
        required: true,
        unique: true,
    })
    title:      string;

    @Prop({
        required: true,
    })
    body:       string;

    @Prop()
    status?:    string;

    @Prop()
    urgency?:   string;

}

export const NoteSchema = SchemaFactory.createForClass( Note );