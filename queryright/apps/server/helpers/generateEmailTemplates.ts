import { APPNAME } from "@/constants.js";
import { type EmailReason } from "@repo/schema";

// --- Design Constants ---
// You can change these colors to match your exact brand
const COLORS = {
  background: "#f4f4f7", // Light gray background
  card: "#ffffff", // White card
  textMain: "#333333", // Dark gray text
  textLight: "#6b7280", // Muted text for footers
  primary: "#2563EB", // Professional Tech Blue (Tailwind Blue-600)
  primaryHover: "#1d4ed8",
  border: "#e5e7eb", // Subtle border
};

/**
 * A helper to wrap content in a consistent, professional "Tech/SaaS" email shell.
 */
const wrapInTemplate = (title: string, content: string) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>${title}</title>
  <style>
    /* Client-specific resets */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    
    /* General styles */
    body { margin: 0; padding: 0; width: 100% !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; line-height: 1.6; background-color: ${COLORS.background}; color: ${COLORS.textMain}; }
    
    /* Mobile responsive */
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .content-cell { padding: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${COLORS.background};">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 40px 0;">
        
        <table class="email-container" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: ${COLORS.card}; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid ${COLORS.border}; overflow: hidden;">
          
          <tr>
            <td align="center" style="padding: 30px 40px; background-color: #ffffff; border-bottom: 1px solid ${COLORS.border};">
               <h1 style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 24px; font-weight: 700; color: ${COLORS.textMain}; letter-spacing: -1px;">
                 &lt;${APPNAME} /&gt;
               </h1>
            </td>
          </tr>

          <tr>
            <td class="content-cell" style="padding: 40px;">
              ${content}
            </td>
          </tr>

          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid ${COLORS.border};">
              <p style="margin: 0; font-size: 12px; color: ${COLORS.textLight};">
                &copy; ${new Date().getFullYear()} ${APPNAME}. All rights reserved.
              </p>
              <p style="margin: 5px 0 0; font-size: 12px; color: ${COLORS.textLight};">
                Automated security notification. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

/**
 * Helper to generate a consistent "Action Button"
 */
const button = (url: string, text: string) => {
  return `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 30px auto;">
      <tr>
        <td align="center" bgcolor="${COLORS.primary}" style="border-radius: 6px;">
          <a href="${url}" target="_blank" style="font-size: 16px; font-family: sans-serif; font-weight: bold; color: #ffffff; text-decoration: none; padding: 12px 24px; display: inline-block; border: 1px solid ${COLORS.primary}; border-radius: 6px;">
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `;
};

/**
 * Helper to generate the "Copy Link" fallback section
 * Uses monospace font to feel like a "code snippet"
 */
const copyLinkSection = (url: string) => {
  return `
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid ${COLORS.border};">
      <p style="font-size: 13px; color: ${COLORS.textLight}; margin-bottom: 10px;">
        Button not working? Copy and paste this link into your browser:
      </p>
      <div style="background-color: #f3f4f6; padding: 10px; border-radius: 4px; overflow-wrap: break-word; word-break: break-all;">
        <a href="${url}" style="font-family: 'Courier New', Courier, monospace; font-size: 12px; color: ${COLORS.primary}; text-decoration: none;">
          ${url}
        </a>
      </div>
    </div>
  `;
};

export const generateEmailTemplates = (
  username: string,
  url: string,
  email: string,
  reason: EmailReason,
): string | null => {
  let content = "";
  let title = "";

  const greeting = `<h2 style="margin: 0 0 20px; font-size: 20px; font-weight: 600; color: ${COLORS.textMain};">Hello ${username},</h2>`;

  switch (reason) {
    case "verify":
      title = `Verify your ${APPNAME} account`;
      content = `
        ${greeting}
        <p style="margin: 0 0 10px; font-size: 16px; color: #555;">
          Welcome to the platform! To get started with the competition and database tools, we just need to verify your email address.
        </p>
        ${button(url, "Verify Email Address")}
        <p style="margin: 0; font-size: 14px; color: ${COLORS.textLight};">
          This link will expire in 24 hours. If you didn't sign up for ${APPNAME}, you can safely ignore this email.
        </p>
        ${copyLinkSection(url)}
      `;
      break;

    case "forgotPassword":
      title = "Reset your password";
      content = `
        ${greeting}
        <p style="margin: 0 0 10px; font-size: 16px; color: #555;">
          We received a request to reset the password for your account. No changes have been made yet.
        </p>
        ${button(url, "Reset Password")}
        <p style="margin: 0; font-size: 14px; color: ${COLORS.textLight};">
          If you did not request a password reset, please ignore this email or contact support if you have concerns.
        </p>
        ${copyLinkSection(url)}
      `;
      break;

    case "updatePassword":
      title = "Update your password";
      content = `
          ${greeting}
          <p style="margin: 0 0 10px; font-size: 16px; color: #555;">
            You requested to update your password. Click the button below to proceed with setting a new password.
          </p>
          ${button(url, "Update Password")}
          <p style="margin: 0; font-size: 14px; color: ${COLORS.textLight};">
            If you did not initiate this request, your account remains secure and no action is needed.
          </p>
          ${copyLinkSection(url)}
        `;
      break;

    case "emailChange":
      title = "Security Alert: Email Changed";
      content = `
        ${greeting}
        <div style="background-color: #fff8f1; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>Notice:</strong> Your sign-in email address has been successfully changed.
          </p>
        </div>
        <p style="margin: 0 0 10px; font-size: 16px; color: #555;">
          Your account is now associated with <strong>${email}</strong>.
        </p>
        <p style="margin: 0; font-size: 14px; color: ${COLORS.textLight};">
          If you did not authorize this change, please contact our support team immediately to secure your account.
        </p>
      `;
      break;

    case "emailChangeVerification":
      title = "Confirm Email Change";
      content = `
        ${greeting}
        <p style="margin: 0 0 10px; font-size: 16px; color: #555;">
          We received a request to update your account email to <strong>${email}</strong>.
        </p>
        <p style="margin: 0 0 20px; font-size: 16px; color: #555;">
          Please confirm this change by clicking the button below.
        </p>
        ${button(url, "Confirm Change")}
        <p style="margin: 0; font-size: 14px; color: ${COLORS.textLight};">
          If you did not request this change, please ignore this email. Your current email will remain active.
        </p>
        ${copyLinkSection(url)}
      `;
      break;

    default:
      return null;
  }

  return wrapInTemplate(title, content);
};
