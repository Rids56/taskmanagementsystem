import { useEffect, useState, useRef, useMemo } from 'react';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Autocomplete,
  Button,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  getTestByIdRequest,
  createTestRequest,
  updateTestRequest,
} from '../../store/slices/testListSlice';
import { getSubjectsRequest } from '../../store/slices/subjectSlice';
import { getTopicsRequest } from '../../store/slices/topicSlice';
import { getMultiSubTopicsRequest } from '../../store/slices/subTopicSlice';

import { RootState } from '../../store/store';
import { getDirtyValues } from '../../utils/getDirtyValues';
import LoaderOverlay from '../../components/LoaderOverlay';
import TestTypeTabs from '../../components/TestTypeTabs';
import { SubjectOption, TopicOption } from '../interfaceType';
import { TaskCreateFormValues, taskCreateSchema } from './model/create.schema';
import DifficultyRadio from '../../components/DifficultyRadio';

export default function TaskCreate() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { id: editId, mode } = location.state;
  const isEditMode = mode === 'edit' || mode === 'view';
  const isViewMode = mode === 'view';

  const returnTo = location.state?.returnTo;

  // Selectors
  const {
    selected: getOnesuccessTest,
    loading,
    error,
  } = useSelector((state: RootState) => state.testList);
  const { data: subjects, loading: subjectLoader } = useSelector(
    (state: RootState) => state.subjects
  );
  const { data: topics, loading: topicLoader } = useSelector(
    (state: RootState) => state.topics
  );
  const { data: subTopics, loading: subTopicLoader } = useSelector(
    (state: RootState) => state.subTopics
  );

  // States
  const rowDataRef = useRef<any>(null);
  const [pendingSave, setPendingSave] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const methods = useForm({
    resolver: zodResolver(taskCreateSchema),
    mode: 'onSubmit',
    defaultValues: {
      type: 'chapterwise',
      subject: null,
      name: '',
      topics: [],
      sub_topics: [],
      difficulty: 'easy',
      total_time: 0,
      correct_marks: 0,
      wrong_marks: 0,
      unattempt_marks: 0,
      total_marks: 0,
      total_questions: 0,
      status: 'draft',
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    getValues,
    formState,
    formState: { errors, dirtyFields },
  } = methods;
  const watchedSubject = watch('subject');
  const watchedTopics = watch('topics');

  useEffect(() => {
    // Get subjects
    if (subjects?.length === 0) {
      dispatch(getSubjectsRequest());
    }

    // GetOne test
    if (isEditMode && editId) {
      dispatch(getTestByIdRequest(editId));
    }
  }, [isEditMode, editId]);

  // Get topics in edit mode
  useEffect(() => {
    if (!isEditMode || !getOnesuccessTest || subjects?.length === 0) return;

    const selectedSubject = subjects.find(
      (s) => s.name === getOnesuccessTest.subject
    );

    if (!selectedSubject) return;

    dispatch(getTopicsRequest(selectedSubject.id));
  }, [isEditMode, getOnesuccessTest, subjects, dispatch]);

  // Get topics in create mode
  useEffect(() => {
    if (isEditMode || !watchedSubject?.id) return;
    dispatch(getTopicsRequest(watchedSubject.id));
  }, [isEditMode, watchedSubject, dispatch]);

  // Get multi sub-topics in edit mode
  useEffect(() => {
    if (!isEditMode || !getOnesuccessTest || topics?.length === 0) return;

    const selectedTopics = topics.filter((topic) =>
      getOnesuccessTest.topics?.includes(topic.name)
    );

    const topicIds = selectedTopics.map((t) => t.id);

    if (topicIds.length) {
      dispatch(getMultiSubTopicsRequest(topicIds));
    }
  }, [isEditMode, getOnesuccessTest, topics, dispatch]);

  // Get multi sub-topics in create mode
  useEffect(() => {
    if (
      isEditMode ||
      !Array.isArray(watchedTopics) ||
      watchedTopics.length === 0
    )
      return;

    const topicIds = watchedTopics
      .map((topic: any) => topic.id)
      .filter(Boolean);
    if (topicIds.length) {
      dispatch(getMultiSubTopicsRequest(topicIds));
    }
  }, [isEditMode, watchedTopics, dispatch]);

  // After subjects,topics,sub-topics get
  useEffect(() => {
    if (!isEditMode || !getOnesuccessTest) return;

    // Check if we have all necessary data loaded
    const hasAllData = subjects?.length && topics?.length;
    if (!hasAllData) return;

    hydrateEditForm(getOnesuccessTest);
  }, [isEditMode, getOnesuccessTest, subjects, topics, subTopics]);

  // Handle create test result: navigate on success, show toast on failure
  useEffect(() => {
    if (!pendingSave) return;

    // still waiting for API
    if (loading) return;

    if (error) {
      let message = '';
      if (typeof error === 'string') message = error;
      else if (error?.errors && Array.isArray(error.errors)) {
        message = error.errors.map((e: any) => e.msg).join('; ');
      } else if (error?.message) message = error.message;
      else message = JSON.stringify(error);

      setSnackbarMsg(message);
      setSnackbarOpen(true);
      setPendingSave(false);
      return;
    }

    // success
    if (!loading && !error && getOnesuccessTest) {
      // if (isEditMode) {
      //   navigate(returnTo ?? '/dashboard', {
      //     state: { rowData: rowDataRef.current },
      //   });
      // } else {
      navigate('/add-question', {
        state: { rowData: rowDataRef.current },
      });
      // }
      setPendingSave(false);
    }
  }, [
    loading,
    error,
    getOnesuccessTest,
    pendingSave,
    navigate,
    isEditMode,
    returnTo,
  ]);

  const hydrateEditForm = (getOnesuccessTest: any) => {
    // Validate that we have all necessary data
    if (!getOnesuccessTest || !subjects?.length) return;

    // 1. Subject - API returns subject as string (name only), find the object
    const selectedSubject = subjects.find(
      (subject) => subject.name === getOnesuccessTest.subject
    );

    if (!selectedSubject) {
      console.warn('Subject not found:', getOnesuccessTest.subject);
      return;
    }

    // 2. Topics - API returns topics as array of strings (names only), match with fetched data
    const topicNames = Array.isArray(getOnesuccessTest.topics)
      ? getOnesuccessTest.topics
      : [];
    const selectedTopics = topics.filter((topic: any) =>
      topicNames.includes(topic.name)
    );

    // 3. SubTopics - API returns sub_topics as array of strings (names only), match with fetched data
    const subTopicNames = Array.isArray(getOnesuccessTest.sub_topics)
      ? getOnesuccessTest.sub_topics
      : [];
    const selectedSubTopics = (subTopics || []).filter((subTopic: any) =>
      subTopicNames.includes(subTopic.name)
    );

    // 4. Populate form with proper structure
    const formData = {
      ...getOnesuccessTest,

      subject: selectedSubject
        ? {
            id: selectedSubject.id,
            name: selectedSubject.name,
          }
        : null,

      topics: selectedTopics.map((topic: any) => ({
        id: topic.id,
        name: topic.name,
        subject_id: topic.subject_id,
      })),

      sub_topics: selectedSubTopics.map((subTopic: any) => ({
        id: subTopic.id,
        name: subTopic.name,
        topic_id: subTopic.topic_id,
      })),
    };

    reset(formData);
  };

  const onSubmit = async (data: TaskCreateFormValues) => {
    if (Object.keys(errors).length === 0) {
      rowDataRef.current = data;
      setPendingSave(true);
      const dirtyData = getDirtyValues(data, dirtyFields);

      if (Object.keys(dirtyData).length === 0) {
        setSnackbarMsg('No fields to update');
        setSnackbarOpen(true);
        setPendingSave(false);
        return;
      }

      if (isEditMode && editId) {
        const finalPayload = {
          ...dirtyData,
          ...(dirtyData.subject && { subject: dirtyData.subject?.id ?? '' }),
          ...(dirtyData.topics && {
            topics: (dirtyData.topics ?? []).map((t: any) => t.id),
          }),
          ...(dirtyData.sub_topics && {
            sub_topics: (dirtyData.sub_topics ?? []).map((s: any) => s.id),
          }),
        };

        dispatch(updateTestRequest({ id: editId, payload: finalPayload }));
      } else {
        const finalPayload = {
          ...data,
          subject: data.subject?.id ?? '',
          topics: (data.topics ?? []).map((t: any) => t.id),
          sub_topics: (data.sub_topics ?? []).map((s: any) => s.id),
        };
        dispatch(createTestRequest(finalPayload));
      }
    } else {
      console.log('Form Errors', errors, formState.errors, !errors);
    }
  };

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

  const showLoader = isEditMode && loading;

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
        <LoaderOverlay loading={showLoader}>
          <TestTypeTabs methods={methods} />
          <Box sx={{ mt: 4 }}>
            <FormProvider {...methods}>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
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
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
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
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
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
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                      <FormLabel>Sub Topic</FormLabel>
                      <Controller
                        name="sub_topics"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            id="sub_topics"
                            selectOnFocus
                            multiple
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
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
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
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                    >
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
                              placeholder="Wrong Answer"
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
                              placeholder="Unattempted"
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
                              placeholder="Correct Answer"
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
                              placeholder="No Of Questions"
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
                              placeholder="Total Marks"
                              type="number"
                              error={!!errors?.total_marks}
                              helperText={errors?.total_marks?.message}
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid size={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                      }}
                    >
                      {isViewMode ? (
                        <>
                          <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                          >
                            Back
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              const rowData = getValues();
                              navigate('/add-question', {
                                state: { rowData },
                              });
                            }}
                          >
                            Next
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              if (isEditMode) {
                                if (returnTo) {
                                  navigate(returnTo);
                                }
                                // else {
                                //   navigate(-1);
                                // }
                              } else {
                                reset();
                              }
                            }}
                          >
                            Cancel
                          </Button>

                          <Button variant="contained" type="submit">
                            {isEditMode ? 'Update Test' : 'Next'}
                          </Button>
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </FormProvider>
          </Box>
        </LoaderOverlay>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
