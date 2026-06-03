import { Grid, TextField, Typography } from '@mui/material';

interface MarkingSchemeFieldsProps {
  register: any;
  errors?: any;
}

export default function MarkingSchemeFields({
  register,
  errors,
}: MarkingSchemeFieldsProps) {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Marking Scheme
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            fullWidth
            label="Wrong Answer"
            type="number"
            {...register('wrong_marks', { valueAsNumber: true })}
            error={!!errors?.wrong_marks}
            helperText={errors?.wrong_marks?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            fullWidth
            label="Unattempted"
            type="number"
            {...register('unattempt_marks', { valueAsNumber: true })}
            error={!!errors?.unattempt_marks}
            helperText={errors?.unattempt_marks?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            fullWidth
            label="Correct Answer"
            type="number"
            {...register('correct_marks', { valueAsNumber: true })}
            error={!!errors?.correct_marks}
            helperText={errors?.correct_marks?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            label="No Of Questions"
            type="number"
            {...register('total_questions', { valueAsNumber: true })}
            error={!!errors?.total_questions}
            helperText={errors?.total_questions?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            label="Total Marks"
            type="number"
            {...register('total_marks', { valueAsNumber: true })}
            error={!!errors?.total_marks}
            helperText={errors?.total_marks?.message}
          />
        </Grid>
      </Grid>
    </>
  );
}
