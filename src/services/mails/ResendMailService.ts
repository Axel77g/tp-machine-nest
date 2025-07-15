import { IMailService, Maillable } from "./IMailService";

import { Resend } from 'resend';

export class ResendMailService implements IMailService{
    private resendClient: Resend;

    constructor() {
        this.resendClient = new Resend(process.env.RESEND_API_KEY);
    }

    async sendWelcomeVerificationEmail(to: Maillable, verificationToken: string): Promise<void> {
        console.log("Sending welcome verification email to:", to.email, "with token:", verificationToken);
        await this.resendClient.emails.send({
            from: 'no-reply@yourdomain.com',
            to: to.email,
            subject: 'Welcome!',
            html: `<p>Bienvenue sur notre service, ${to.identity || ''} !</p>
               <p>Veuillez vérifier votre adresse email en cliquant sur le lien suivant :</p>
               <a href="http://localhost:3000/verify-email?t=${verificationToken}">Vérifier mon email</a>`
        });
        console.log("Welcome verification email sent to:", to.email);
    }

    async send2FaCodeMail(to: Maillable, code: string): Promise<void> {
        console.log("Sending 2FA code email to:", to.email);
        await this.resendClient.emails.send({
            from: 'no-reply@yourdomain.com',
            to: to.email,
            subject: 'Your 2FA Code',
            html: `<p>Voici votre code de vérification à deux facteurs, ${to.identity || ''} : ${code}</p>`
        });
        console.log("2FA code email sent to:", to.email);
    }
}