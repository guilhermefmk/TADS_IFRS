import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   // google app email
    pass: process.env.EMAIL_PASS,   // google app password
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.APP_URL}/api/auth/verify/${token}`;

  console.log(`Enviando email de verificação para ${email}`);

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verifique seu email ✔",
      html: `
        <h1>Bem-vindo ao nosso TODO App!</h1>
        <p>Por favor, clique no link abaixo para verificar seu endereço de email:</p>
        <a href="${verificationUrl}">Verificar Email</a>
      `,
    });

    console.log("Mensagem enviada: %s", info.messageId);
  } catch (error) {
    console.error('Erro ao enviar email de verificação:', error);
    throw new Error('Falha ao enviar email de verificação');
  }
};

