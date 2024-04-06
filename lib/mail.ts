import { transporter } from '@/lib/sender-transporter';

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`;
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"🪆Matryoshka studio🪆" <sender@matryoshka-studio.ru>', // sender address
    to: email, // list of receivers
    subject: 'Подтверждение email ✔', // Subject line
    html: `<p>Для подтверждения нажми <a href="${confirmLink}">тут</a></p>`, // html body
  });
  if (info?.messageId) return { success: 'Сообщение отправлено', status: 200 };

  return { error: 'Ошибка отправки' };
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-password?token=${token}`;
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"🪆Matryoshka studio🪆" <sender@matryoshka-studio.ru>', // sender address
    to: email, // list of receivers
    subject: 'Сброс пароля ✔', // Subject line
    html: `<p>Для сброса пароля нажми <a href="${resetLink}">тут</a></p>`, // html body
  });
  if (info?.messageId) return { success: 'Сообщение отправлено', status: 200 };

  return { error: 'Ошибка отправки' };
};
