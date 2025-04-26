import zod from "zod";
import { emailtypes } from "../models/emailtype";

export const emailRequestDtoSchema = zod.object({
  user: zod
    .object({
      name: zod.string({
        required_error: "user:name is required",
        invalid_type_error: "user:name is invalid",
      }),
      email: zod
        .string({
          required_error: "user:email is required",
          invalid_type_error: "user:email is invalid",
        })
        .email(),
    })
    .required(),
  templateData: zod.any(),
  emailType: zod.enum(emailtypes),
});
