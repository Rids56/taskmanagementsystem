import { Box, Breadcrumbs, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AddQuestionForm from './AddQuestionForm';
import QuestionList from './QuestionList';

import {
  addQuestionSchema,
  AddQuestionFormValues,
} from './model/addQuestion.schema';
import { useLocation } from 'react-router-dom';

export default function AddQuestion() {
  const [questions, setQuestions] = useState<any[]>([]);
  const location = useLocation();

  const testData = location.state?.testData;
  console.log('TEST DATA', testData);

  const methods = useForm<AddQuestionFormValues>({
    resolver: zodResolver(addQuestionSchema),
  });

  const onSubmit = (data: AddQuestionFormValues) => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
      },
    ]);

    methods.reset();
  };

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Typography>Test Creation</Typography>
        <Typography>Create Test</Typography>
        <Typography color="primary">Add Questions</Typography>
      </Breadcrumbs>

      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        {/* Test Details */}
        <Box
          sx={{
            p: 3,
            mb: 4,
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Physics Chapter 1 Test</Typography>

          <Typography color="text.secondary">Subject: Physics</Typography>

          <Typography color="text.secondary">Type: Chapter Wise</Typography>
        </Box>

        <AddQuestionForm methods={methods} onSubmit={onSubmit} />

        <QuestionList questions={questions} setQuestions={setQuestions} />
      </Paper>
    </Box>
  );
}
