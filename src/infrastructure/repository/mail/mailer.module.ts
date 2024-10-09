import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                auth: {
                    user: 'your-email@gmail.com',
                    pass: 'your-password',
                }
            }
        })
    ],
    exports: [MongooseModule],
})
export class MyMailerModule {}