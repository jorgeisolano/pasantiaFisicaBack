const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');
const lab = 'jorgeivan@unicauca.edu.co'
router.post('/anomaly', async (req, res) => {
    const { students, report, date, practice, subject } = req.body;
    console.log("Datos de form",req.body);
    contentHTML = `
        <h1>Servicio de notificaciones - LabRemotos</h1>
        <ul>
            <li>
            Fecha de reporte: ${date}
            </li>
            <li>
            Grupo de trabajo: ${students}
            </li>
            <li>
            Detalles del reportee: ${report}
            </li>
            <li>
            Práctica: ${practice}
            </li>
            <li>
            Materia: ${subject}
            </li>
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
        to: lab,
        subject: 'Reporte de anomalía - Laboratorios remotos',
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