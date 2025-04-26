import { readFileSync } from "fs";
import handlebars from "handlebars";
import { EmailType } from "../models/emailtype";
import path from "path";

export const getHtmlForEmailType = (emailType: EmailType, templateData: any) => {
  const html = readFileSync(
    path.join("public/html/", `${emailType}-mail.html`)
  );
  const com = handlebars.compile(html.toString());
  return com(templateData);
};

export const getSubjectForEmailType = (emailType: EmailType) => {
  switch (emailType) {
    case "registration":
      return "Gym: Registration";
    case "payment-failure":
      return "Gym: Payment Failed";
    case "payment-success":
      return "Gym: Payment Success";
  }
};
