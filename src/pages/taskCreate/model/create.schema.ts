import { z } from 'zod';

export const taskCreateSchema = z.object({
  name: z
    .string({ error: 'Test Name is required' })
    .trim()
    .min(1, { message: 'Test Name is required' }),

  subject: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .refine((value) => value.id.trim() !== '' && value.name.trim() !== '', {
      message: 'Subject is required',
    }),

  type: z
    .string({ error: 'Test Type is required' })
    .trim()
    .min(1, { message: 'Test Type is required' }),

  topics: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        subject_id: z.string().optional(),
      })
    )
    .optional(),
  // .refine((value) => Array.isArray(value) && value.length > 0, {
  //   message: 'Please select at least one topic',
  // }),

  sub_topics: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        topic_id: z.string().optional(),
      })
    )
    .optional(),
  //   .refine((value) => Array.isArray(value) && value.length > 0, {
  //     message: 'Please select at least one sub-topic',
  //   }),

  difficulty: z.enum(['easy', 'medium', 'hard'], {
    error: 'Difficulty Level is required',
  }),

  correct_marks: z.coerce
    .number({
      error: 'Correct marks is required',
    })
    .min(0),

  wrong_marks: z.coerce.number({
    error: 'Wrong marks is required',
  }),

  unattempt_marks: z.coerce.number({
    error: 'Unattempt marks is required',
  }),

  total_time: z.coerce
    .number({
      error: 'Total time is required',
    })
    .min(1, 'Total time must be greater than 0'),

  total_marks: z.coerce
    .number({
      error: 'Total marks is required',
    })
    .min(1, 'Total marks must be greater than 0'),

  total_questions: z.coerce
    .number({
      error: 'Total questions is required',
    })
    .min(1, 'Total questions must be greater than 0'),

  status: z.enum(['draft', 'live']).optional(),
});

export type TaskCreateFormValues = z.infer<typeof taskCreateSchema>;
