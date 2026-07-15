import { Resend } from "resend";

export const sendEmail = async (to, subject, html) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html,
  });
};
