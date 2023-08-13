import { object, string, TypeOf } from 'zod';

export const loginSchema = object({
  email: string()
    .min(1, 'メールアドレスを入力してください')
    .email('メールアドレスの形式が正しくありません'),
  password: string()
    .min(1, 'パスワードを入力してください')
    .min(8, 'パスワードは8文字以上でなければなりません')
    .max(32, 'パスワードは32文字以下でなければなりません'),
});

export type LoginInput = TypeOf<typeof loginSchema>;
