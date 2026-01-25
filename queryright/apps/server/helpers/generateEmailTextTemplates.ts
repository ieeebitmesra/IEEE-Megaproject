import { APPNAME } from "../constants.js";

export type EmailReason =
  | "verify"
  | "forgotPassword"
  | "emailChange"
  | "emailChangeVerification"
  | "updatePassword";

/**
 * Helper to wrap content in a consistent "Terminal/Log" style layout.
 */
const wrapInPlainTextTemplate = (title: string, content: string) => {
  const separator = "=".repeat(40);
  const thinSeparator = "-".repeat(40);

  return `
${separator}
${APPNAME.toUpperCase()} // ${title.toUpperCase()}
${separator}

${content}

${thinSeparator}
(c) ${new Date().getFullYear()} ${APPNAME}. All rights reserved.
Automated security notification.
${separator}
`;
};

export const generatePlainTextEmailTemplates = (
  username: string,
  url: string,
  email: string,
  reason: EmailReason,
): string | null => {
  let content = "";
  let title = "";

  const greeting = `Hello ${username},`;

  switch (reason) {
    case "verify":
      title = "Account Verification";
      content = `
${greeting}

Welcome to the platform. To initialize your account and access the competition tools, please verify your email address.

[ ACTION REQUIRED ]
Open the following link in your browser:

${url}

Link expires in 24 hours. If you did not create an account, please ignore this message.
`;
      break;

    case "forgotPassword":
      title = "Password Reset";
      content = `
${greeting}

We received a request to reset your account password. No changes have been made yet.

[ ACTION REQUIRED ]
To reset your password, visit:

${url}

If you did not request this, you can safely ignore this email.
`;
      break;

    case "updatePassword":
      title = "Password Update";
      content = `
${greeting}

You requested to update your password.

[ ACTION REQUIRED ]
Click the link below to proceed with setting a new password:

${url}

If you did not initiate this request, your account remains secure and no action is needed.
`;
      break;

    case "emailChange":
      title = "Security Alert";
      content = `
${greeting}

NOTICE: Your sign-in email address has been successfully changed.

Your account is now associated with: ${email}

If you did not authorize this change, please contact support immediately to secure your account.
`;
      break;

    case "emailChangeVerification":
      title = "Confirm Email Change";
      content = `
${greeting}

We received a request to update your account email to: ${email}

[ ACTION REQUIRED ]
Please confirm this change by visiting:

${url}

If you did not request this change, please ignore this message. Your current credentials remain active.
`;
      break;

    default:
      return null;
  }

  return wrapInPlainTextTemplate(title, content.trim());
};
