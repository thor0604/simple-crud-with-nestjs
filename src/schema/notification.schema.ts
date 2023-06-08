import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";
import { INotification } from "src/interface/notification.interface";

@Schema()
export class Notification extends Document implements INotification {
    @Prop()
    title: string;

    @Prop()
    message: string;

    @Prop()
    date: string;

    @Prop()
    time: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);