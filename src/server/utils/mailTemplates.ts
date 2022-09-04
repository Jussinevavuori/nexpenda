// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MailTemplate<Vars extends Record<string, any> = any> = {
  vars: Vars;
  templateName: string;
  subject: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createMailTemplate<Vars extends Record<string, any>>(
  templateName: string,
  getSubject: (vars: Vars) => string
) {
  return (vars: Vars): MailTemplate<Vars> => {
    return {
      subject: getSubject(vars),
      vars,
      templateName,
    };
  };
}

export const mailTemplates = {
  confirmEmail: createMailTemplate<{ url: string; email: string }>(
    "template.nexpenda.confirm-email",
    () => "Nexpenda | Confirm your email address"
  ),
  feedbackReceived: createMailTemplate<{
    message: string;
    displayName: string;
    email: string;
  }>(
    "template.nexpenda.feedback-received",
    () => "Nexpenda | Feedback Received"
  ),
  passwordChanged: createMailTemplate<{ email: string }>(
    "template.nexpenda.password-changed",
    () => "Nexpenda | Your password has been changed"
  ),
  resetPassword: createMailTemplate<{ url: string; email: string }>(
    "template.nexpenda.forgot-password",
    () => "Nexpenda | Password reset request"
  ),
};
