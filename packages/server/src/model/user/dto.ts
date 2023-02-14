import { z } from 'zod';
import { DormTypePreferEnum, SexEnum, ZoneEnum } from '../enum';

function requiredMsg(obj: string) {
  return `${obj} is required`;
}

const timerange = z
  .number({ required_error: requiredMsg('Time range') })
  .max(23, 'Time range should less than 24')
  .min(0, 'Time range should more than or equal to 0');
const cuid = z.string({ required_error: requiredMsg('ID') }).cuid();
const email = z
  .string({ required_error: requiredMsg('Email') })
  .email('Invalid Email');
const password = z
  .string({ required_error: requiredMsg('Password') })
  .max(18, 'Password must be less than 18 characters')
  .min(8, 'Password must be more than 8 characters');
const personal_id = z
  .string({ required_error: requiredMsg('Personal ID') })
  .max(13, 'Personal ID must be exactly 13')
  .min(13, 'Personal ID must be exactly 13');

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

export const createStudentDto = z
  .object({
    first_name: z.string({ required_error: requiredMsg('First name') }),
    last_name: z.string({ required_error: requiredMsg('Last name') }),
    email,
    password,
    confirm_password: password,
    personal_id,
    sex: SexEnum,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password don't match",
    path: ['confirm_password'],
  });

export const createDormPrefDto = z.object({
  residents_limit: z.number().int().min(2).max(4),
  dorm_type: DormTypePreferEnum,
  room_pref: z.object({
    zone: ZoneEnum,
    floor_number: z.number().int().min(1),
  }),
});

export const addPrefDto = z.object({
  messiness: z.number(),
  loudness: z.number(),
  do_not_disturb: z.array(
    z.object({
      start: timerange,
      stop: timerange,
    })
  ),
});
export const addProfileDto = addPrefDto;

export const bookRoomDto = z.object({
  roomId: cuid,
});

export const findByIdDto = cuid;
