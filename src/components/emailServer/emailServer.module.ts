import { Module } from '@nestjs/common';
import { EmailServerService } from './emailServer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EmailServerService],
})
export class EmailServerModule {}