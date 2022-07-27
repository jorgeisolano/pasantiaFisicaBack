const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
    const { planta, email, email2 } = req.body;
    console.log("Datos de form",req.body);
    contentHTML = `
        <h1>Servicio de notificaciones - LabRemotos</h1>
        <ul>
            <li>Planta que está fallando: ${planta}</li>
            <li>Laboratorista: ${email}</li>
            <li>Profesor de turno: ${email2}</li>
        </ul>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'jorgeivan@unicauca.edu.co',
            pass: 'ifhixturpgkakaof'
        }
    });
    transporter.verify().then(()=>{
        console.log("Listo para enviar");
    })
    let info = await transporter.sendMail({
        from: '"NotificacionesLab" <jorgeivan@unicauca.edu.co>', // sender address,
        to: email + "," + email2,
        subject: 'Falla de Planta en Laboratorio Remoto',
        // text: 'Hello World'
        html: contentHTML
    })
    res.redirect('/success.html');
   /*  console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou... */
});

module.exports = router;