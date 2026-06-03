import { Box, Breadcrumbs, Link, Typography, Paper } from '@mui/material';

import TestTypeTabs from '../../components/TestTypeTabs';
import TaskCreateForm from './TaskCreateForm';
import { TaskCreateFormValues, taskCreateSchema } from './model/create.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TaskCreate() {
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state?.rowData;
  const isEditMode = location.state?.mode === 'edit';
  const returnTo = location.state?.returnTo;

  const methods = useForm({
    resolver: zodResolver(taskCreateSchema),
    mode: 'onSubmit',
    defaultValues: { test_type: 'chapter-wise' },
  });

  const {
    formState,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: TaskCreateFormValues) => {
    if (Object.keys(errors).length === 0) {
      // API CALL HERE
      console.log('FORM DATA', data);

      if (isEditMode && returnTo) {
        navigate(returnTo, {
          state: {
            rowData: data,
          },
        });
        return;
      } else {
        navigate('/add-question', {
          state: {
            rowData: data,
          },
        });
      }
    } else {
      console.log('Form Errors', errors, formState.errors, !errors);
    }
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
          <FormProvider {...methods}>
            <TaskCreateForm
              row={editData}
              isEditMode={isEditMode}
              // methods={methods}
              onSubmit={onSubmit}
            />
          </FormProvider>
        </Box>
      </Paper>
    </Box>
  );
}
