import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNotificationDto } from 'src/dto/create-notification.dto';
import { UpdateNotificationDto } from 'src/dto/update-notification.dto';
import { INotification } from 'src/interface/notification.interface';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService {
    constructor(@InjectModel('Notification') private notificationModel:Model<INotification>) {}

    async createNotif(createNotificationDto: CreateNotificationDto): Promise<INotification>{ //////////// QUESTIONNNNN
        const newNotif = await new this.notificationModel(createNotificationDto);
        return newNotif.save();
    }

    async getAllNotifs(): Promise<INotification[]> {
        const allNotif = await this.notificationModel.find();
        if (!allNotif || allNotif.length == 0) {
            throw new NotFoundException('No notification!')
        }
        return allNotif
    }

    async getNotif(notifId: string): Promise<INotification> {
        const existingNotif = await this.notificationModel.findById(notifId);
        if (!existingNotif) {
            throw new NotFoundException("Notification not found!");
        }
        return existingNotif;
    }

    async deleteNotif(notifId: string): Promise<INotification> {
        const deletedNotif = await this.notificationModel.findByIdAndDelete(notifId);
        if(!deletedNotif) {
            throw new NotFoundException("Notification not found!");
        }
        return deletedNotif;
    }

    async updateNotif(notifId: string, updateNotificationDto: UpdateNotificationDto): Promise<INotification> {
        const existingNotif = await this.notificationModel.findByIdAndUpdate(notifId, updateNotificationDto, {new: true});
        if(!existingNotif) {
            throw new NotFoundException("Notification not found!");
        }
        return existingNotif;
    }
}
