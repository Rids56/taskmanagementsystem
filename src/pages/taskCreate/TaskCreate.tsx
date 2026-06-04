import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

import TestTypeTabs from '../../components/TestTypeTabs';
import TaskCreateForm from './TaskCreateForm';
import { TaskCreateFormValues, taskCreateSchema } from './model/create.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  createTestRequest,
  getTestByIdRequest,
  updateTestRequest,
} from '../../store/slices/testListSlice';
import { getSubjectsRequest } from '../../store/slices/subjectSlice';
import { useEffect, useState, useRef } from 'react';
import { RootState } from '@/src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTopicsBySubjectApi } from '../../api/topicApi';
import { getSubTopicsByTopicApi } from '../../api/subTopicApi';
import { getDirtyValues } from '../../utils/getDirtyValues';

export default function TaskCreate() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const editId = location.state?.id;
  const isEditMode = location.state?.mode === 'edit';
  const returnTo = location.state?.returnTo;

  const methods = useForm({
    resolver: zodResolver(taskCreateSchema),
    mode: 'onSubmit',
    defaultValues: {
      type: 'chapterwise',
      subject: { id: '', name: '' },
      topics: [],
      sub_topics: [],
      difficulty: 'easy',
      correct_marks: 0,
      wrong_marks: 0,
      unattempt_marks: 0,
      total_time: 0,
      total_marks: 0,
      total_questions: 0,
      // status: 'draft',
    },
  });

  const {
    reset,
    formState,
    formState: { errors, dirtyFields },
  } = methods;

  // Selectors
  const { data: subjects } = useSelector((state: RootState) => state.subjects);
  const {
    selected: getOnesuccessTest,
    loading,
    error,
  } = useSelector((state: RootState) => state.testList);

  const [pendingSave, setPendingSave] = useState(false);
  const rowDataRef = useRef<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  useEffect(() => {
    if (!subjects?.length) {
      dispatch(getSubjectsRequest());
    }

    if (isEditMode && editId) {
      dispatch(getTestByIdRequest(editId));
    }
  }, [dispatch, isEditMode, editId, subjects?.length]);

  useEffect(() => {
    if (getOnesuccessTest && isEditMode && !loading && subjects?.length > 0) {
      hydrateEditForm(getOnesuccessTest);
      // reset(getOnesuccessTest as any);
    }
  }, [getOnesuccessTest, isEditMode, loading, subjects?.length]);

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

  const hydrateEditForm = async (testData: any) => {
    // 1. Subject
    const selectedSubject = subjects.find(
      (subject) => subject.name === testData.subject
    );

    if (!selectedSubject) return;

    // 2. Topics API
    const topicsResponse = await getTopicsBySubjectApi(selectedSubject.id);

    const topicsData = topicsResponse.data ?? [];

    const selectedTopics = topicsData.filter((topic: any) =>
      testData.topics?.includes(topic.name)
    );

    // 3. SubTopics API
    const subTopicResponses = await Promise.all(
      selectedTopics.map((topic: any) => getSubTopicsByTopicApi(topic.id))
    );

    const allSubTopics = subTopicResponses.flatMap(
      (response) => response.data ?? []
    );

    const selectedSubTopics = allSubTopics.filter((subTopic: any) =>
      testData.sub_topics?.includes(subTopic.name)
    );

    // 4. Populate form
    reset({
      ...testData,

      subject: {
        id: selectedSubject.id,
        name: selectedSubject.name,
      },

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
    });
  };

  const onSubmit = async (data: TaskCreateFormValues) => {
    if (Object.keys(errors).length === 0) {
      const finalPayload = {
        ...data,
        subject: data.subject?.id ?? '',
        topics: (data.topics ?? []).map((t: any) => t.id),
        sub_topics: (data.sub_topics ?? []).map((s: any) => s.id),
      };

      rowDataRef.current = data;
      setPendingSave(true);

      if (isEditMode && editId) {
        const dirtyData = getDirtyValues(data, dirtyFields);
        console.log('dirtyData', dirtyData);
        // const finalPayload = {
        //   ...dirtyData,
        //   ...(dirtyData.subject && { subject: dirtyData.subject?.id ?? '' }),
        //   ...(dirtyData.topics && {
        //     topics: (dirtyData.topics ?? []).map((t: any) => t.id),
        //   }),
        //   ...(dirtyData.sub_topics && {
        //     sub_topics: (dirtyData.sub_topics ?? []).map((s: any) => s.id),
        //   }),
        // };

        dispatch(updateTestRequest({ id: editId, payload: finalPayload }));
      } else {
        dispatch(createTestRequest(finalPayload));
      }
    } else {
      console.log('Form Errors', errors, formState.errors, !errors);
    }
  };

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
        {showLoader ? (
          <Box
            sx={{
              minHeight: '60vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TestTypeTabs methods={methods} />

            <Box sx={{ mt: 4 }}>
              <FormProvider {...methods}>
                <TaskCreateForm isEditMode={isEditMode} onSubmit={onSubmit} />
              </FormProvider>
            </Box>
          </>
        )}
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
