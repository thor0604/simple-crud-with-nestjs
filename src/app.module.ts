import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schema/notification.schema';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://netninja:test1234@cluster0.ippr9eh.mongodb.net/?retryWrites=true&w=majority', {dbName: 'briohr_crud'}),
    MongooseModule.forFeature([{name: Notification.name, schema: NotificationSchema}])
  ],
  controllers: [AppController, NotificationController],
  providers: [AppService, NotificationService],
})
export class AppModule {}
