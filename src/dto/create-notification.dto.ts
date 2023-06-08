import { IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { INotification } from "src/interface/notification.interface";

export class CreateNotificationDto implements INotification{
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly message: string;
    
    @IsString()
    @IsDateString()
    @IsNotEmpty()
    readonly date: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly time: string;
}