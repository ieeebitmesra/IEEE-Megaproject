import { z } from "zod";
import { required } from "zod/mini";

// Password validation regex
const passwordRegex = {
  minLength: 8,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

// Reusable password field
const passwordField = z
  .string()
  .min(passwordRegex.minLength, "Password must be at least 8 characters")
  .regex(passwordRegex.uppercase, "Must include at least one uppercase letter")
  .regex(passwordRegex.lowercase, "Must include at least one lowercase letter")
  .regex(passwordRegex.number, "Must include at least one number")
  .regex(passwordRegex.special, "Must include at least one special character");

export const SignupSchema = z
  .object({
    email: z.string().email(),
    password: passwordField,
    confirm_password: passwordField,
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must be at most 50 characters"),
    name: z
      .string()
      .min(1, "Name must be at least 1 character")
      .max(50, "Name must be at most 50 characters"),
    image: z.string().url().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const LoginSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must be at most 50 characters")
      .or(z.literal("")),

    email: z.string().email("Invalid email address").or(z.literal("")),

    password: z.string().min(1, "Password is required"),

    remember_me: z.boolean(),
  })
  .refine((data) => data.username || data.email, {
    message: "Either username or email must be provided",
    path: ["username"],
  });

// Reset password schema
export const ResetPasswordSchema = z
  .object({
    questionId: z.string().min(1, "Please select a security question"),
    answer: z.string().min(1, "Answer must be at least 1 character long"),
    password: passwordField,
    confirmPassword: passwordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Forgot password schema
export const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Change email schema
export const ChangeEmailSchema = z.object({
  newEmail: z.string().email(),
  token: z.string(),
});

// Email verification schemas
export const VerifySearchSchema = z.object({
  token: z.string().min(1, "Invalid verification token"),
});

export const MailSentStateSchema = z.object({
  fromApp: z.literal(true),
  email: z.string().email(),
});

// Email reason enum
export const emailReasonSchema = z.enum([
  "verify",
  "forgotPassword",
  "emailChange",
  "emailChangeVerification",
  "updatePassword",
]);

export type EmailReason = z.infer<typeof emailReasonSchema>;

// Send email schema
export const SendEmailSchema = z.object({
  to: z.string().email(),
  reason: emailReasonSchema,
  username: z.string().min(1),
  url: z.string().url(),
  email: z.string().email().optional(),
  html: z.string().optional(),
  toBeVerified: z.boolean().optional(),
});

export type SendEmailProps = z.infer<typeof SendEmailSchema>;

// Better Auth additional fields interface
export interface BetterAuthAdditionalFields {
  description: string;
  age: number;
  gender: "male" | "female" | "other";
  location: string;
  institution: string;
}

// Better Auth additional fields configuration for client
export const betterAuthAdditionalFieldsConfig = {
  user: {
    description: {
      type: "string" as const,
      required: false as const,
      input: false as const,
    },
    age: {
      type: "number" as const,
      required: false as const,
      input: false as const,
    },
    gender: {
      type: ["male" as const, "female" as const, "other" as const],
      required: false as const,
      input: false as const,
    },
    location: {
      type: "string" as const,
      required: false as const,
      input: false as const,
      defaultValue: "unknown" as const,
    },
    institution: {
      type: "string" as const,
      required: false as const,
      input: false as const,
      defaultValue: "unknown" as const,
    },
  },
  account: {
    providerName: {
      type: "string" as const,
      required: true as const,
      defaultValue: "user" as const,
      input: false as const,
    },
  },
};
