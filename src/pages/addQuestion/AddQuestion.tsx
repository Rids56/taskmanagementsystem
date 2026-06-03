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
import TestInfoCard from './TestInfoCard';

export default function AddQuestion() {
  const [questions, setQuestions] = useState<any[]>([]);
  const location = useLocation();

  const rowData = location.state?.rowData;

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
        <TestInfoCard rowData={rowData} />

        <AddQuestionForm methods={methods} onSubmit={onSubmit} />

        <QuestionList questions={questions} setQuestions={setQuestions} />
      </Paper>
    </Box>
  );
}
