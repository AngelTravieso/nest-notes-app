import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note extends Document {

    @Prop({
        type: String,
        required: true,
        unique: true,
        index: true,
    })
    title:      string;

    @Prop({
        type: String,
        required: true,
    })
    content:       string;

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