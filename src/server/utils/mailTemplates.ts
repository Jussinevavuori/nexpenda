export type MailTemplate<Vars extends Record<string, any> = any> = {
  vars: Vars;
  templateName: string;
  subject: string;
};

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
    (vars) => "Nexpenda | Confirm your email address"
  ),
  feedbackReceived: createMailTemplate<{
    message: string;
    displayName: string;
    email: string;
  }>(
    "template.nexpenda.feedback-received",
    (vars) => "Nexpenda | Feedback Received"
  ),
  passwordChanged: createMailTemplate<{ email: string }>(
    "template.nexpenda.password-changed",
    (vars) => "Nexpenda | Your password has been changed"
  ),
  resetPassword: createMailTemplate<{ url: string; email: string }>(
    "template.nexpenda.forgot-password",
    (vars) => "Nexpenda | Password reset request"
  ),
};
