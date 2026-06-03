import {
  Box,
  Button,
  // FormControl,
  // FormLabel,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';

export default function AddQuestionForm({ methods, onSubmit }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Question"
            {...register('question_text')}
            error={!!errors.question_text}
            helperText={errors.question_text?.message}
          />
        </Grid>

        {[1, 2, 3, 4].map((item) => (
          <Grid key={item} size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label={`Option ${item}`}
              {...register(`option${item}`)}
            />
          </Grid>
        ))}

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            label="Correct Option"
            {...register('correct_option')}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
            <MenuItem value="option4">Option 4</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            label="Difficulty"
            {...register('difficulty_level')}
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Difficult">Difficult</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label="Topic" {...register('topic')} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField fullWidth label="Sub Topic" {...register('sub_topic')} />
        </Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Explanation"
            {...register('explanation')}
          />
        </Grid>

        <Grid size={12}>
          <TextField fullWidth label="Media URL" {...register('media_url')} />
        </Grid>

        <Grid size={12}>
          <Button type="submit" variant="contained">
            Add Another Question
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
