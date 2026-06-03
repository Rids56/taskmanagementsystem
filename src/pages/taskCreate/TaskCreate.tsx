import { Box, Breadcrumbs, Link, Typography, Paper } from '@mui/material';

import TestTypeTabs from '../../components/TestTypeTabs';
import TaskCreateForm from './TaskCreateForm';
import { TaskCreateFormValues, taskCreateSchema } from './model/create.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TaskCreate() {
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state?.rowData;
  const isEditMode = location.state?.mode === 'edit';

  const methods = useForm<TaskCreateFormValues>({
    resolver: zodResolver(taskCreateSchema),
    mode: 'onSubmit',
    defaultValues: {
      test_name: '',
      subject: '',
      test_type: 'chapter-wise',
      topics: [] as string[],
      sub_topics: [] as string[],
      difficulty_level: 'Easy',
      correct_marks: 5,
      wrong_marks: -1,
      unattempt_marks: 0,
      total_time: 60,
      total_marks: 100,
      total_questions: 20,
    },
  });

  const {
    formState,
    formState: { errors },
  } = methods;

  console.log('page error 1', errors, formState.errors);

  const onSubmit = async (data: TaskCreateFormValues) => {
    console.log('FORM DATA', data);

    // add test type to data
    // data = { ...data, test_type: 'chapter-wise' };

    navigate('/add-question', {
      state: {
        testData: data,
      },
    });

    // API CALL HERE
  };

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit">
          Test Creation
        </Link>

        <Link underline="hover" color="inherit">
          Create Test
        </Link>

        <Typography color="text.primary">Chapter Wise</Typography>
      </Breadcrumbs>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <TestTypeTabs methods={methods} />

        <Box sx={{ mt: 4 }}>
          <TaskCreateForm
            row={editData}
            isEditMode={isEditMode}
            methods={methods}
            onSubmit={onSubmit}
          />
        </Box>
      </Paper>
    </Box>
  );
}
