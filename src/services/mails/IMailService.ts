import { ResendMailService } from "./ResendMailService";

export interface Maillable {
    email: string;
    identity: string;
}

export interface IMailService {
    sendWelcomeVerificationEmail(to: Maillable, verificationToken: string): Promise<void>;
    send2FaCodeMail(to: Maillable, code: string): Promise<void>;
}

export const MailServiceProvider = {
    provide: "IMailService",
    useClass: ResendMailService
}