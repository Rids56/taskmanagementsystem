
import { z } from 'zod';

export const taskSchema = z.object({
    testType: z.string(),

    subject: z.string().min(1),

    topic: z.string().min(1),

    subTopic: z.string().min(1),

    testName: z.string().min(1),

    duration: z.coerce.number().min(1),

    difficulty: z.enum([
        'easy',
        'medium',
        'difficult',
    ]),

    wrongAnswer: z.coerce.number(),

    unattempted: z.coerce.number(),

    correctAnswer: z.coerce.number(),

    noOfQuestions: z.coerce.number(),

    totalMarks: z.coerce.number(),
});

export type TaskFormValues =
    z.infer<typeof taskSchema>;