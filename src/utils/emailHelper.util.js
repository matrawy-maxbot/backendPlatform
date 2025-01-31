import { createTransport } from 'nodemailer';
import { EMAIL_USER, EMAIL_PASSWORD } from '../config/notifications.config.js';

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({ from: EMAIL_USER, to, subject, text });
        return true;
    } catch (error) {
        throw error;
    }
};

export default { sendEmail };
