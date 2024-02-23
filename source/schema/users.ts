import { z } from 'zod';

const Roles = ['user', 'moderator', 'admin'] as const;

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .refine(
      password =>
        /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password),
      {
        message:
          'A senha deve conter pelo menos um caractere especial, uma letra minúscula, uma letra maiúscula e um número'
      }
    ),
  // ! Create ENUM files respecting design system
  role: z.enum(Roles)
});
