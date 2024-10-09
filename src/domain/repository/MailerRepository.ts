import { Mail } from "../entity/Mail";

export abstract class MailerRepository {
    abstract sendEmail(mail: Mail): Promise<void>
}