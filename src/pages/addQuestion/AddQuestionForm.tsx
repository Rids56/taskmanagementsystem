import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  CancelOutlined,
  DeleteOutlineOutlined,
  Download,
} from '@mui/icons-material';

import { Controller, useFormContext, useFormState } from 'react-hook-form';
import type { AddQuestionFormValues as IFormInput } from './model/addQuestion.schema';
import { useLocation } from 'react-router-dom';

interface AddQuestionFormProps {
  onAddAnother: (values: IFormInput) => void;
  onNext: (values: IFormInput) => void;
  onClear?: () => void;
  onDelete: (values: IFormInput) => void;
  hasQuestions: boolean;
  questionNumber: number;
  totalQuestions: number;
}

const AddQuestionForm = ({
  onAddAnother,
  onNext,
  onClear,
  onDelete,
  hasQuestions,
  questionNumber,
  totalQuestions,
}: AddQuestionFormProps) => {
  const location = useLocation();
  const rowData = location.state?.rowData;

  const { control, register, handleSubmit } = useFormContext<IFormInput>();
  const { errors } = useFormState({
    control,
  });

  const topicOptions = rowData?.topics ?? [];
  const subTopicOptions = rowData?.sub_topics ?? [];

  return (
    <>
      <Grid container spacing={3} key={rowData?.id + Date.now()}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
            Question {questionNumber}/{totalQuestions}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
            <Button variant="outlined" startIcon={<AddIcon />}>
              MCQ
            </Button>
            <Button variant="outlined" startIcon={<Download />}>
              CSV
            </Button>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 12 }}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            color="primary"
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none', width: 'fit-content' }}
            onClick={handleSubmit(onAddAnother)}
          >
            Add Another Question
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
            <Button
              color="error"
              startIcon={<CancelOutlined />}
              sx={{ textTransform: 'none' }}
              onClick={onClear}
              disabled={!hasQuestions}
            >
              Clear All Edits
            </Button>
            <Button
              color="error"
              startIcon={<DeleteOutlineOutlined />}
              sx={{ textTransform: 'none' }}
              onClick={handleSubmit(onDelete)}
              disabled={
                !rowData?.questions?.length ||
                rowData?.questions?.length < questionNumber
              }
            >
              Delete Question
            </Button>
          </Box>
        </Grid>

        <Grid size={12}>
          <Controller
            name="question"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Question"
                placeholder="Type the question here"
                {...register('question')}
                error={!!errors.question}
                helperText={errors.question?.message}
                {...field}
              />
            )}
          />
        </Grid>

        {(['option1', 'option2', 'option3', 'option4'] as const).map(
          (fieldName, index) => (
            <Grid key={fieldName} size={{ xs: 12, md: 12 }}>
              <Controller
                name={fieldName}
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label={`Option ${index + 1}`}
                    placeholder={`Type Option ${index + 1}`}
                    {...register(fieldName)}
                    error={!!errors[fieldName]}
                    helperText={errors[fieldName]?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
          )
        )}

        <Grid size={12}>
          <Controller
            name="correct_option"
            control={control}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Correct Option"
                error={!!errors.correct_option}
                helperText={errors.correct_option?.message}
                {...field}
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
                <MenuItem value="option4">Option 4</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="explanation"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Explanation"
                placeholder="Explanation Type here"
                {...register('explanation')}
                helperText={errors.explanation?.message}
                {...field}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Typography variant="body2" sx={{ mt: 1, fontWeight: 700 }}>
            Question Settings
          </Typography>
        </Grid>

        <Grid size={12}>
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Level Of Difficulty"
                error={!!errors.difficulty}
                helperText={errors.difficulty?.message}
                {...field}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="topic"
            control={control}
            render={({ field }) => (
              <Autocomplete
                id="topic"
                options={topicOptions}
                value={field.value ?? null}
                onChange={(_, value) => field.onChange(value)}
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                getOptionLabel={(option) => option?.name ?? ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Topic"
                    placeholder="Select Topic"
                    error={!!errors.topic}
                    helperText={errors.topic?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="sub_topic"
            control={control}
            render={({ field }) => (
              <Autocomplete
                id="sub_topic"
                options={subTopicOptions}
                value={field.value ?? null}
                onChange={(_, value) => field.onChange(value)}
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                getOptionLabel={(option) => option?.name ?? ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sub Topic"
                    placeholder="Select Sub Topic"
                    error={!!errors.sub_topic}
                    helperText={errors.sub_topic?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Button
            variant="outlined"
            color="warning"
            onClick={onClear}
            disabled={!hasQuestions}
          >
            Exit Test Creation
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
            <Button type="submit" variant="contained">
              Save & Continue
            </Button>

            {questionNumber != rowData?.questions?.length && (
              <Button
                type="button"
                variant="contained"
                onClick={handleSubmit(onNext)}
              >
                Next
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AddQuestionForm;
