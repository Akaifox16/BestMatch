import { z } from 'zod';

// TODO: move requiredMsg to common utils
function requiredMsg(obj: string) {
  return `${obj} is required`;
}

// TODO: move email, password, cuid to common dto
const email = z
  .string({ required_error: requiredMsg('Email') })
  .email('Invalid Email');
const password = z
  .string({ required_error: requiredMsg('Password') })
  .max(18, 'Password must be less than 18 characters')
  .min(8, 'Password must be more than 8 characters');
const cuid = z.string({ required_error: requiredMsg('ID') }).cuid();

export const loginDto = z.object({
  email,
  password,
});

export const authResponseDto = z.object({
  email,
  id: cuid,
  name: z.string().refine((val) => val.split(' ').length === 2, {
    message: 'name shoud contains both `first name` and `last name`',
  }),
});