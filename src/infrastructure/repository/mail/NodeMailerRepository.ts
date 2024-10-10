import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "src/common/Injectable";
import { Mail } from "src/domain/entity/Mail";
import { MailerRepository } from "src/domain/repository/MailerRepository";

@Injectable()
export class NodeMailerRepository implements MailerRepository{
    
    constructor(private readonly mailService: MailerService){}
    
    async sendEmail(mail: Mail): Promise<void> {
        await this.mailService.sendMail({
            from: mail.from,
            to: mail.to,
            subject: mail.subject,
            text: mail.body
        })
    }
}