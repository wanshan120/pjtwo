import { object, string, TypeOf } from 'zod';

export const registerSchema = object({
  name: string().min(1, '名前を入力してください').max(100),
  email: string()
    .min(1, 'メールアドレスを入力してください')
    .email('メールアドレスの形式が正しくありません'),
  password: string()
    .min(1, 'パスワードを入力してください')
    .min(8, 'パスワードは8文字以上でなければなりません')
    .max(32, 'パスワードは32文字以内でなければなりません'),
  passwordConfirm: string().min(1, '確認用にもう一度パスワードを入力してください'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'パスワードが一致しません',
});

export type RegisterInput = TypeOf<typeof registerSchema>;
