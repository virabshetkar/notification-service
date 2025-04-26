import { Router } from "express";
import { getHtmlForEmailType, getSubjectForEmailType } from "../services";
import { emailRequestDtoSchema } from "../dtos/email-request.dto";
import zod from "zod";
import nodemailer from "nodemailer";

const router = Router();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT ?? "1025"),
  secure: process.env.MAIL_SECURE == "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    host: process.env.HOST,
    ciphers: "SSLv3",
  },
});

router.post("/send-email", async (req, res) => {
  try {
    const emailRequest = emailRequestDtoSchema.parse(req.body);

    const info = await transporter.sendMail({
      from: "Gym Notifier <notifier@gymapp.com>",
      to: emailRequest.user.email,
      subject: getSubjectForEmailType(emailRequest.emailType),
      html: getHtmlForEmailType(emailRequest.emailType, {
        name: emailRequest.user.name,
        ...emailRequest.templateData,
      }),
    });

    res.json({ message: "Email Sent", id: info.messageId });
  } catch (err: any) {
    if (err instanceof zod.ZodError) {
      res.json({
        errors: err.flatten(),
      });
      return;
    }
  }
});

export default router;
