import * as z from 'zod';
import { site } from './site';

export const planning = z
  .object({
    site,
    url: z.string().optional().nullable(),
    isFree: z.boolean().optional().nullable(),
    isRental: z.boolean().optional().nullable(),
    isSubscription: z.boolean().optional(),
    isBuy: z.boolean().optional().nullable(),
    price: z.number(),
    desc: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    updatedAt: z.string().optional().nullable(),
  })
  .strict();

export type Planning = z.infer<typeof planning>;
