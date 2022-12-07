import * as z from 'zod';
import { site } from './site';

export const planning = z
  .object({
    site,
    url: z.string().url(),
    isFree: z.boolean().optional(),
    isRental: z.boolean().optional(),
    isSubscription: z.boolean().optional(),
    isBuy: z.boolean().optional(),
    price: z.number(),
    desc: z.string().optional().nullable(),
    icon: z.string().url().optional().nullable(),
    updatedAt: z.date().optional(),
  })
  .strict();

export type Planning = z.infer<typeof planning>;
