import { Module } from '@nestjs/common';
import { StreamModule } from './stream/stream.module';
import { PatchController } from './controllers/patch.controller';

@Module({
  imports: [
    StreamModule,
  ],
  controllers: [
    PatchController,
  ],
})
export class AppModule {
}
