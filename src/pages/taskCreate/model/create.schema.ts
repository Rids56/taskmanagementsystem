import { z } from 'zod';

export const taskCreateSchema = z.object({
  test_name: z.string().trim().min(1, 'Test Name is required'),

  subject: z.string().trim().min(1, 'Subject is required'),

  test_type: z.string().trim().min(1, 'Test Type is required'),

  topics: z.array(z.string()).min(1, 'Select at least one topic'),

  sub_topics: z.array(z.string()).min(1, 'Select at least one sub topic'),

  difficulty_level: z.enum(['Easy', 'Medium', 'Difficult']),

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

  status: z.enum(['Draft', 'Published']).optional(),
});

export type TaskCreateFormValues = z.infer<typeof taskCreateSchema>;
