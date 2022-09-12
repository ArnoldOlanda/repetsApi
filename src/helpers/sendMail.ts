import nodemailer from 'nodemailer'

interface Config{
    host: string;
    port: number;
    auth: {
        user:string;
        pass:string
    }
}

interface Mensaje{
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string 
}

export const sendMail = async ( mailTo: string, verifyCode: number ) => {

    const config:Config = {
        host:`${process.env.GMAIL_SENDER_HOST}`,
        port: Number(process.env.GMAIL_SENDER_PORT),
        auth: {
            user: `${ process.env.GMAIL_SENDER }`,
            pass: `${ process.env.GMAIL_SENDER_PASSWORD }`
        }
    }

    const mensaje:Mensaje = {
        from:'olanda188@gmail.com',
        to: mailTo,
        subject:'Codigo de verificacion',
        text: `Este es tu codigo de verificacion para verificar tu cuenta: ${ verifyCode }`
    }

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail( mensaje )

    console.log( info.response );
    
}


