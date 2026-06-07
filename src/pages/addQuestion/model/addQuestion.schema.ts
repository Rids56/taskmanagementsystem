import { z } from 'zod';

export const addQuestionSchema = z.object({
  test_id: z.string(),
  id: z.string().optional(),
  type: z.string(),
  subject: z.string(),
  question: z.string().min(1, 'Question is required'),

  option1: z.string().min(1, 'Option 1 is required'),
  option2: z.string().min(1, 'Option 2 is required'),
  option3: z.string().min(1, 'Option 3 is required'),
  option4: z.string().min(1, 'Option 4 is required'),

  correct_option: z.string().min(1, 'Select correct option'),

  explanation: z.string().nullable().optional(),

  difficulty: z.string().nullable().optional(),

  topic: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),

  sub_topic: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),

  // media_url: z.string().optional(),
});

export type AddQuestionFormValues = z.infer<typeof addQuestionSchema>;
