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
        host:'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'olanda188@gmail.com',
            pass: 'lzkqaiixpqcpryaj'
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

    console.log(info);
    
}


