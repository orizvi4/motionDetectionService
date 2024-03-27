import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailServerModule } from './components/emailServer/emailServer.module';


@Module({
  imports: [EmailServerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
