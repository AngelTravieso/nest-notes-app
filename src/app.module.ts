import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [NotesModule, CommonModule],
})
export class AppModule {}
