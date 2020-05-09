const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'dionpinto000@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.` //backticks to inject the name in template strings

    })
}
//you could also add html to make it fancy

const sendCancelationEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'dionpinto000@gmail.com',
        subject: 'Hate to see you leave',
        text: `Thanks for using the app, ${name}. Let me know why did you leave.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}