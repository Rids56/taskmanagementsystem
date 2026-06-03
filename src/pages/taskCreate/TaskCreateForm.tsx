import {
  Autocomplete,
  Box,
  Button,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DifficultyRadio from '../../components/DifficultyRadio';
import MarkingSchemeFields from '../../components/MarkingSchemeFields';
import { useEffect } from 'react';
import { TaskCreateFormValues } from './model/create.schema';

const subjectOptions = [
  { id: 'physics', label: 'Physics' },
  { id: 'chemistry', label: 'Chemistry' },
];

const topicOptions = [
  { id: 'motion', label: 'Motion' },
  { id: 'organic', label: 'Organic' },
];

const subTopicOptions = [
  { id: 'velocity', label: 'Velocity' },
  { id: 'hydrocarbon', label: 'Hydrocarbon' },
];

const getOptionByValue = (
  value: string,
  options: { id: string; label: string }[]
) =>
  options.find((option) => option.id === value || option.label === value) ||
  null;

const getOptionsByValues = (
  values: string[] = [],
  options: { id: string; label: string }[]
) =>
  options.filter(
    (option) => values.includes(option.label) || values.includes(option.id)
  );

export default function TaskCreateForm({ row, isEditMode, onSubmit }: any) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormContext<TaskCreateFormValues>();

  useEffect(() => {
    if (row && isEditMode) {
      reset(row);
    }
  }, [row, isEditMode, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormLabel>Subject</FormLabel>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  id="subject"
                  selectOnFocus
                  value={getOptionByValue(field.value, subjectOptions)}
                  onChange={(_, value) => field.onChange(value?.label ?? '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose from Drop-down"
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                    />
                  )}
                  options={subjectOptions}
                  getOptionLabel={(option) => option.label}
                />
              )}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormLabel>Name of Test</FormLabel>
            <Controller
              name="test_name"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  placeholder="Enter name of Test"
                  error={!!errors.test_name}
                  helperText={errors.test_name?.message}
                  {...field}
                />
              )}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormLabel>Topic</FormLabel>
            <Controller
              name="topics"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  id="topics"
                  selectOnFocus
                  multiple
                  value={getOptionsByValues(field.value, topicOptions)}
                  onChange={(_, value) =>
                    field.onChange(value.map((option) => option.label))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose from Drop-down"
                      error={!!errors.topics}
                      helperText={errors.topics?.message}
                    />
                  )}
                  options={topicOptions}
                  getOptionLabel={(option) => option.label}
                />
              )}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormLabel>Sub Topic</FormLabel>
            <Controller
              name="sub_topics"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  id="sub_topics"
                  selectOnFocus
                  multiple
                  value={getOptionsByValues(field.value, subTopicOptions)}
                  onChange={(_, value) =>
                    field.onChange(value.map((option) => option.label))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose from Drop-down"
                      error={!!errors.sub_topics}
                      helperText={errors.sub_topics?.message}
                    />
                  )}
                  options={subTopicOptions}
                  getOptionLabel={(option) => option.label}
                />
              )}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormLabel>Duration (Minutes)</FormLabel>
            <Controller
              name="total_time"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  placeholder="Enter the time"
                  type="number"
                  error={!!errors.total_time}
                  helperText={errors.total_time?.message}
                  {...field}
                />
              )}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Controller
              name="difficulty_level"
              control={control}
              render={({ field }) => (
                <DifficultyRadio
                  value={field.value}
                  name={field.name}
                  onChange={(_, value) => field.onChange(value)}
                  onBlur={field.onBlur}
                  error={!!errors.difficulty_level}
                  helperText={errors.difficulty_level?.message}
                />
              )}
            />
          </Box>
        </Grid>

        <Grid size={12}>
          <MarkingSchemeFields />
        </Grid>

        <Grid size={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined">Cancel</Button>

            <Button variant="contained" type="submit">
              {isEditMode ? 'Update Test' : 'Next'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
