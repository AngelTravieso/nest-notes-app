import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    NotesModule,
    CommonModule,
    MongooseModule.forRoot('mongodb://localhost:27017/notes-app'),
  ],
})
export class AppModule {}
