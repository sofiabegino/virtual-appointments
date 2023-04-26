import nodemailer from "nodemailer";

export async function sendMail(){
    let transporter=nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            secure:true,
            port: 465,
            auth:{
                user: 'sofia.begino@lightit.io',
                pass: 'fqxzzpaqlphkdvbd'
            }
        });
        let info=await transporter.sendMail({
            from:'sofia.begino@lightit.io',
            to:"sofibegino@hotmail.com",
            subject:"Este es un nuevo correo",
            text:"Hola santi",html:"<b>Hola santi</b>",
        });
        console.log("Message sent: %s",info.messageId);
        console.log("Preview URL: %s",nodemailer.getTestMessageUrl(info));
}
