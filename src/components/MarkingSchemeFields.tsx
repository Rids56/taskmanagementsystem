import { Grid, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TaskCreateFormValues } from '../pages/taskCreate/model/create.schema';

export default function MarkingSchemeFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext<TaskCreateFormValues>();

  return (
    <>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Marking Scheme
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 2 }}>
          <Controller
            name="wrong_marks"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Wrong Answer"
                type="number"
                error={!!errors?.wrong_marks}
                helperText={errors?.wrong_marks?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Controller
            name="unattempt_marks"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Unattempted"
                type="number"
                error={!!errors?.unattempt_marks}
                helperText={errors?.unattempt_marks?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Controller
            name="correct_marks"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Correct Answer"
                type="number"
                error={!!errors?.correct_marks}
                helperText={errors?.correct_marks?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Controller
            name="total_questions"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="No Of Questions"
                type="number"
                error={!!errors?.total_questions}
                helperText={errors?.total_questions?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Controller
            name="total_marks"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Total Marks"
                type="number"
                error={!!errors?.total_marks}
                helperText={errors?.total_marks?.message}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}
