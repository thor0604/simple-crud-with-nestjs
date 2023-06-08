import { Body, Controller, Get, Put, Delete, Post, Param, Res, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from 'src/dto/create-notification.dto';
import { UpdateNotificationDto } from 'src/dto/update-notification.dto';
import { INotification } from 'src/interface/notification.interface';


@Controller('notification')
export class NotificationController {
    constructor (private readonly notifService: NotificationService){}

    @Post()
    async createNotif(@Res() response, @Body() createNotificationDto: CreateNotificationDto) {
        try {
            const newNotif = await this.notifService.createNotif(createNotificationDto);
            console.log(createNotificationDto);
            return response.status(HttpStatus.CREATED).json({
                message: "Notification created successfully!",
                newNotif,
            })
        } catch (error){
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: "Error: Notification not created!",
                error: "Bad request"
            })
        }
    }

    @Put('/:id')
    async updateNotif(@Res() response,@Param('id') notifId: string, @Body() updateNotificationDto: UpdateNotificationDto) {
        try {
            const existingNotif = await this.notifService.updateNotif(notifId, updateNotificationDto);
            return response.status(HttpStatus.OK).json({
                message: 'Notification has been successfully updated',
                existingNotif,
            });
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }

    @Get()
    async getNotifs(@Res() response) {
        try {
            const notifData = await this.notifService.getAllNotifs();
            return response.status(HttpStatus.OK).json({
                message: 'All notification data found successfully',notifData,
            });
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }

    @Get('/:id')
    async getNotif(@Res() response, @Param('id') notifId: string) {
        try {
            const existingNotif = await this.notifService.getNotif(notifId);
            return response.status(HttpStatus.OK).json({
            message: 'Notification found successfully',existingNotif,});
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }
    @Delete('/:id')
    async deleteNotif(@Res() response, @Param('id') notifId: string){
        try {
            const deletedNotif = await this.notifService.deleteNotif(notifId);
            return response.status(HttpStatus.OK).json({
            message: 'Notification deleted successfully',
            deletedNotif,});
        }catch (error) {
            return response.status(error.status).json(error.response);
        }
    }
}
