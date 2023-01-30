const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transport = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: "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"
    }
}));