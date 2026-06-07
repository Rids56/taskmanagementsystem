import { z } from 'zod';

export const publishSchema = z
  .object({
    publishMode: z.enum(['now', 'schedule']),

    publishDate: z.string().optional(),
    publishTime: z.string().optional(),

    liveUntil: z.enum([
      'always',
      '1week',
      '2weeks',
      '3weeks',
      '1month',
      'custom',
    ]),

    endDate: z.string().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data) => data.publishMode !== 'schedule' || !!data.publishDate?.trim(),
    {
      path: ['publishDate'],
      message: 'Publish date is required',
    }
  )
  .refine(
    (data) => data.publishMode !== 'schedule' || !!data.publishTime?.trim(),
    {
      path: ['publishTime'],
      message: 'Publish time is required',
    }
  )
  .refine((data) => data.liveUntil !== 'custom' || !!data.endDate?.trim(), {
    path: ['endDate'],
    message: 'End date is required',
  })
  .refine((data) => data.liveUntil !== 'custom' || !!data.endTime?.trim(), {
    path: ['endTime'],
    message: 'End time is required',
  });

export type PublishFormValues = z.infer<typeof publishSchema>;
