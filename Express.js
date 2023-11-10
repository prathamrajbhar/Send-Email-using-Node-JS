const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');



// Enter Your EmailID and Web app password
const emailID = 'your email id';    //example: 'abc@gmailcom'
const password = 'your password';   //example: 'abcd efgh ijkl mnop'




const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailID,
            pass: password,
        },
    });

    const mailOptions = {
        from: emailID,
        to: to,
        subject: subject,
        text: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email: ' + error.message);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
