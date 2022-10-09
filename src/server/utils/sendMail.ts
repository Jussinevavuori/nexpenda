import Mailgun from "mailgun.js";
import formData from "form-data";
import { env } from "@/env/env.server.mjs";
import { MailTemplate } from "./mailTemplates";

/**
 * Gets the default sender for the mail.
 */
export function getDefaultSender() {
  if (env.NODE_ENV !== "production") {
    return `Nexpenda (${env.NODE_ENV}) <${env.MAIL_DEFAULT_SENDER}>`;
  }
  return `Nexpenda <${env.MAIL_DEFAULT_SENDER}>`;
}

/**
 * Instantiates a mailgun client with the correct credentials.
 */
export function getMailClient() {
  const mg = new Mailgun(formData);
  return mg.client({
    username: "api",
    key: env.MAILGUN_APIKEY,
    url: "https://api.eu.mailgun.net",
  });
}

export function sendMail(to: string, template: MailTemplate) {
  return getMailClient().messages.create(env.MAILGUN_DOMAIN, {
    to,
    from: getDefaultSender(),
    subject: template.subject,
    template: template.templateName,
    "h:X-Mailgun-Variables": JSON.stringify(template.vars),
  });
}
