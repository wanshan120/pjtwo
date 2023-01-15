import { object, string, TypeOf } from 'zod';

export const loginSchema = object({
  email: string()
    .min(1, 'メールアドレスは入力必須です')
    .email('メールアドレスの形式が正しくありません'),
  password: string()
    .min(1, 'パスワードは入力必須です')
    .min(8, 'パスワードは8文字以上でなければなりません')
    .max(32, 'パスワードは32文字以下でなければなりません'),
});

export type LoginInput = TypeOf<typeof loginSchema>;
