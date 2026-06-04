import {
  Autocomplete,
  Box,
  Button,
  // CircularProgress,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import DifficultyRadio from '../../components/DifficultyRadio';
import MarkingSchemeFields from '../../components/MarkingSchemeFields';
import { useEffect, useMemo } from 'react';
import { TaskCreateFormValues } from './model/create.schema';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSubjectsRequest,
  // resetSubject,
} from '../../store/slices/subjectSlice';
import { SubjectOption, TopicOption } from '../interfaceType';
// TOPIC //
import { resetTopics, getTopicsRequest } from '../../store/slices/topicSlice';
// SUB-TOPIC //
import {
  resetSubTopics,
  getSubTopicsRequest,
} from '../../store/slices/subTopicSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import LoaderOverlay from '../../components/LoaderOverlay';

export default function TaskCreateForm({ isEditMode, onSubmit }: any) {
  const {
    control,
    watch,
    // reset,
    // getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<TaskCreateFormValues>();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const returnTo = location.state?.returnTo;

  // const selectedSubject = useWatch({
  //   control,
  //   name: 'subject',
  // });
  // const selectedTopics = useWatch({
  //   control,
  //   name: 'topics',
  // });

  const selectedSubject = watch('subject');
  const selectedTopics = watch('topics');

  // Selectors
  const { data: subjects, loading: subjectLoader } = useSelector(
    (state: RootState) => state.subjects
  );
  const { data: topics, loading: topicLoader } = useSelector(
    (state: RootState) => state.topics
  );
  const { data: subTopics, loading: subTopicLoader } = useSelector(
    (state: RootState) => state.subTopics
  );

  useEffect(() => {
    if (subjects?.length === 0) dispatch(getSubjectsRequest());

    return (): void => {
      // dispatch(resetSubject());
      // dispatch(resetTopics());
      // dispatch(resetSubTopics());
    };
  }, []);

  // API -> TOPIC
  useEffect(() => {
    if (!selectedSubject?.id) return;

    const shouldResetTopics =
      !selectedTopics?.length ||
      selectedTopics.some((topic) => topic.subject_id !== selectedSubject.id);

    if (shouldResetTopics) {
      setValue('topics', []);
      dispatch(resetTopics());
    }

    dispatch(getTopicsRequest(selectedSubject.id));
  }, [selectedTopics]);

  // API -> SUB-TOPIC
  useEffect(() => {
    if (!selectedTopics?.length) {
      dispatch(resetSubTopics());
      setValue('sub_topics', []);
      return;
    }

    dispatch(resetSubTopics());

    selectedTopics.forEach((topic) => {
      dispatch(getSubTopicsRequest(topic.id));
    });
  }, [selectedTopics]);

  const subjectOptions = useMemo<SubjectOption[]>(
    () =>
      subjects?.map((item) => ({
        id: item.id,
        name: item.name,
      })) ?? [],
    [subjects]
  );

  const topicOptions = useMemo<TopicOption[]>(
    () =>
      topics?.map((topic) => ({
        id: topic.id,
        name: topic.name,
        subject_id: topic.subject_id,
      })) ?? [],
    [topics]
  );

  const subTopicOptions = useMemo<TopicOption[]>(
    () =>
      subTopics?.map((subtopic) => ({
        id: subtopic.id,
        name: subtopic.name,
        topic_id: subtopic.topic_id,
      })) ?? [],
    [subTopics]
  );

  const showLoader = topicLoader && subTopicLoader;

  return (
    <>
      <LoaderOverlay loading={showLoader}>
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
                      loading={subjectLoader}
                      value={field.value ?? null}
                      onChange={(_, value) => field.onChange(value)}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose from Drop-down"
                          error={!!errors.subject}
                          helperText={errors.subject?.message}
                        />
                      )}
                      options={subjectOptions}
                      getOptionLabel={(option) => option.name}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormLabel>Name of Test</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      placeholder="Enter name of Test"
                      error={!!errors.name}
                      helperText={errors.name?.message}
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
                      loading={topicLoader}
                      value={field.value ?? []}
                      onChange={(_, value) => field.onChange(value)}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
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
                      getOptionLabel={(option) => option.name}
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
                      // value={getOptionsByValues(field.value, subTopicOptions)}
                      // onChange={(_, value) =>
                      //   field.onChange(value.map((option) => option.name))
                      // }
                      loading={subTopicLoader}
                      value={field.value ?? []}
                      onChange={(_, value) => field.onChange(value)}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
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
                      getOptionLabel={(option) => option.name}
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
                  name="difficulty"
                  control={control}
                  render={({ field }) => (
                    <DifficultyRadio
                      value={field.value}
                      name={field.name}
                      onChange={(_, value) => field.onChange(value)}
                      onBlur={field.onBlur}
                      error={!!errors.difficulty}
                      helperText={errors.difficulty?.message}
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
                <Button
                  variant="outlined"
                  onClick={() => {
                    // returnTo ? navigate(returnTo) : navigate(-1);
                    if (returnTo) navigate(returnTo);
                  }}
                >
                  Cancel
                </Button>

                <Button variant="contained" type="submit">
                  {isEditMode ? 'Update Test' : 'Next'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </LoaderOverlay>
    </>
  );
}
