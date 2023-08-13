import { object, string, TypeOf } from 'zod';

export const verificationCodeSchema = object({
  verificationCode: string().min(1, '認証コードを入力してください'),
});

export type VerificationCodeInput = TypeOf<typeof verificationCodeSchema>;
