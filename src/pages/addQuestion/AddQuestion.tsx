import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import AddQuestionForm from './AddQuestionForm';

import {
  addQuestionSchema as FormSchema,
  AddQuestionFormValues as IFormInput,
} from './model/addQuestion.schema';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import {
  getQuestionsRequest,
  createQuestionsRequest,
  resetQuestions,
  updateQuestionsRequest,
  deleteQuestionsRequest,
} from '../../store/slices/questionSlice';
import TestInfoCard from './TestInfoCard';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { getDirtyValues } from '../../utils/getDirtyValues';
import PublishTestPage from './PublishTestPage';
import { CheckCircle } from '@mui/icons-material';
import { updateTestRequest } from '../../store/slices/testListSlice';

export default function AddQuestion() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData;

  const defaultQuestions = useMemo(
    () => rowData?.questions ?? [],
    [rowData?.questions]
  );
  const topicOptions = rowData?.topics ?? [];
  const subTopicOptions = rowData?.sub_topics ?? [];

  const [pageMode, setPageMode] = useState<'questions' | 'publish'>(
    'questions'
  );
  const [questions, setQuestions] = useState<any[]>(defaultQuestions);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(
    defaultQuestions.length ? 0 : null
  );
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    mode: 'success' | 'error' | 'info' | 'warning';
    msg: string;
  }>({
    isOpen: false,
    mode: 'success',
    msg: '',
  });

  const initialValues = {
    id: 'temp_id',
    test_id: rowData?.id,
    type: 'mcq',
    subject: rowData?.subject?.name ?? '',
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correct_option: '',
    difficulty: '',
    media_url: '',
    topic: null,
    sub_topic: null,
    explanation: '',
  };

  const formContext = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { ...initialValues },
  });

  const {
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = formContext;

  // Selectors
  const {
    add: {
      data: addQuestionsSuccess,
      // loading: addQuestionsLoader,
      error: addQuestionsError,
    },
    edit: {
      data: editQuestionsSuccess,
      // loading: editQuestionsLoader,
      error: editQuestionsError,
    },
    get: {
      data: getQuestionsSuccess,
      // loading: getQuestionsLoader,
      error: getQuestionsError,
    },
    delete: {
      data: deleteQuestionsSuccess,
      // loading: deleteQuestionsLoader,
      error: deleteQuestionsError,
    },
  } = useSelector((state: RootState) => state.question);

  useEffect(() => {
    const validId = questions[currentQuestionNumber - 1];
    if (validId === 'temp_id' || validId == null) return;

    if (questions && questions?.length > 0) {
      dispatch(
        getQuestionsRequest({
          question_ids: currentQuestionNumber
            ? [questions[currentQuestionNumber - 1]]
            : questions,
        })
      );
    }
    return (): void => {
      // reset({ ...initialValues });
      dispatch(resetQuestions());
    };
  }, [activeQuestionIndex]);

  useEffect(() => {
    if (!isEmpty(getQuestionsSuccess)) {
      const data = getQuestionsSuccess?.[0] as any;
      reset({
        ...data,
        topic:
          topicOptions.find((option: any) => option.name === data.topic) ??
          null,
        sub_topic:
          subTopicOptions.find(
            (option: any) => option.name === data.sub_topic
          ) ?? null,
        media_url: data.media_url ?? '',
      });
    }

    if (getQuestionsError) {
      setSnackbar({
        isOpen: true,
        mode: 'error',
        msg: getQuestionsError?.message ?? 'Api failed to fetch data',
      });
    }
  }, [getQuestionsSuccess, getQuestionsError]);

  useEffect(() => {
    if (!isEmpty(addQuestionsSuccess)) {
      setSnackbar({
        isOpen: true,
        mode: 'success',
        msg: `Successfully Created ${addQuestionsSuccess?.length > 1 ? 'Questions' : 'Question'}`,
      });

      const createdQuestionId = addQuestionsSuccess?.[0]?.id;

      setQuestions((prev) => {
        const updated = [...prev];

        if (activeQuestionIndex !== null && activeQuestionIndex < prev.length) {
          updated[activeQuestionIndex] = createdQuestionId;
        } else {
          updated.push(createdQuestionId);
        }

        // dynamic add another question
        updated.push('temp_id');
        setActiveQuestionIndex(updated.length - 1);
        reset({ ...initialValues });

        return updated;
      });
    }

    if (addQuestionsError) {
      setSnackbar({
        isOpen: true,
        mode: 'error',
        msg: addQuestionsError?.message ?? 'Api failed',
      });
    }
  }, [addQuestionsSuccess, addQuestionsError]);

  useEffect(() => {
    if (!isEmpty(editQuestionsSuccess)) {
      setSnackbar({
        isOpen: true,
        mode: 'success',
        msg: `Successfully updated ${editQuestionsSuccess?.length > 1 ? 'Questions' : 'Question'}`,
      });
    }

    if (editQuestionsError) {
      setSnackbar({
        isOpen: true,
        mode: 'error',
        msg: editQuestionsError?.message ?? 'upadate failed',
      });
    }
  }, [editQuestionsSuccess, editQuestionsError]);

  useEffect(() => {
    if (!isEmpty(deleteQuestionsSuccess)) {
      const deletedQuestionId =
        deleteQuestionsSuccess?.[0]?.id || (deleteQuestionsSuccess as any)?.id;

      setSnackbar({
        isOpen: true,
        mode: 'success',
        msg: `Successfully deleted ${
          deleteQuestionsSuccess?.length > 1 ? 'Questions' : 'Question'
        }`,
      });

      setQuestions((prev) => {
        const updatedQuestions = prev.filter((id) => id !== deletedQuestionId);

        const apiQuestionIds = updatedQuestions.filter(
          (id) => id !== 'temp_id'
        );

        dispatch(
          updateTestRequest({
            id: rowData?.id || rowData?.test_id,
            payload: {
              questions: apiQuestionIds,
            },
          })
        );

        const nextIndex = Math.min(
          activeQuestionIndex ?? 0,
          updatedQuestions.length - 1
        );

        const nextQuestionId = updatedQuestions[nextIndex];

        if (!nextQuestionId || nextQuestionId === 'temp_id') {
          setActiveQuestionIndex(Math.max(nextIndex, 0));
          reset(initialValues);
        } else {
          handleQuestionSelect(Math.max(nextIndex, 0));
        }

        return updatedQuestions;
      });
    }

    if (deleteQuestionsError) {
      setSnackbar({
        isOpen: true,
        mode: 'error',
        msg: deleteQuestionsError?.message ?? 'delete failed',
      });
    }
  }, [deleteQuestionsSuccess, deleteQuestionsError]);

  const onSubmit = (data: IFormInput) => {
    const dirtyData = getDirtyValues(data, dirtyFields);
    if (Object.keys(dirtyData).length === 0) {
      setSnackbar({
        isOpen: true,
        mode: 'error',
        msg: 'No fields to update',
      });
      // setPendingSave(false);
      return;
    }

    // PUT API
    const isExistingQuestion =
      data?.id && (data.id !== 'temp_id' || data?.id == null);
    if (isExistingQuestion) {
      const updatePayload = {
        id: data.id,
        ...dirtyData,
        ...(dirtyData.topic && {
          topic:
            typeof dirtyData.topic === 'object'
              ? dirtyData.topic.id
              : dirtyData.topic == null
                ? ''
                : dirtyData.topic,
        }),
        ...(dirtyData.sub_topic && {
          sub_topic:
            typeof dirtyData.sub_topic === 'object'
              ? dirtyData.sub_topic.id
              : dirtyData.sub_topic == null
                ? ''
                : dirtyData.sub_topic,
        }),
      };

      dispatch(updateQuestionsRequest({ questions: [updatePayload] }));
      return;
    }

    // POST API
    const { id, ...restData } = data;
    const createPayload = {
      ...restData,
      ...(id !== 'temp_id' && { id }),
      topic:
        data.topic && typeof data.topic === 'object'
          ? data.topic.id
          : data.topic == null
            ? ''
            : data.topic,
      sub_topic:
        data.sub_topic && typeof data.sub_topic === 'object'
          ? data.sub_topic.id
          : data.sub_topic == null
            ? ''
            : data.sub_topic,
    };
    dispatch(createQuestionsRequest({ questions: [createPayload] }));
  };

  const handleSaveContinue = (data: IFormInput) => {
    onSubmit(data);
  };

  const handleAddAnotherQuestion = () => {
    if (
      activeQuestionIndex !== null &&
      activeQuestionIndex < questions.length
    ) {
      reset({ ...initialValues });

      setQuestions((prev) => {
        const updated = [...prev];
        updated.push('temp_id');

        const blankIndex = updated.length;
        setActiveQuestionIndex(blankIndex - 1);

        return updated;
      });
    }
  };

  const handleNext = (_data: IFormInput) => {
    // onSubmit(data);
    reset({ ...initialValues });

    if (
      activeQuestionIndex !== null &&
      activeQuestionIndex < questions.length - 1
    ) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const handleQuestionSelect = (/*_question: any, */ index: number) => {
    reset({ ...initialValues });
    // if (question === 'temp_id') reset({ ...initialValues });
    setActiveQuestionIndex(index);
  };

  const handleClearQuestions = () => {
    if (activeQuestionIndex === null) {
      navigate(-1);
      return;
    }

    const isExistingQuestion = questions[activeQuestionIndex];
    const isNewQuestion =
      !isExistingQuestion || isExistingQuestion === 'temp_id';

    if (isNewQuestion) {
      const updatedQuestions = questions.filter(
        (_, index) => index !== activeQuestionIndex
      );

      setQuestions(updatedQuestions);

      const nextIndex =
        updatedQuestions.length === 0
          ? null
          : Math.max(0, activeQuestionIndex - 1);

      setActiveQuestionIndex(nextIndex);

      // if (nextIndex !== null) {
      //   reset(updatedQuestions[nextIndex]);
      // } else {
      //   reset(initialValues);
      // }

      return;
    }

    // // Existing question -> discard changes only
    // reset(currentQuestion);
    if (!isEmpty(getQuestionsSuccess)) {
      const data = getQuestionsSuccess?.[0] as any;
      reset({
        ...data,
        topic:
          topicOptions.find((option: any) => option.name === data.topic) ??
          null,
        sub_topic:
          subTopicOptions.find(
            (option: any) => option.name === data.sub_topic
          ) ?? null,
          media_url: data.media_url ?? '',
      });
    } else {
      // api issue : Deleted question have [] data without remove from questions[ids..] in testlist
      reset({ ...initialValues });
    }

    // OR if you keep original API data separately:
    // reset(getOneSuccess.questions[activeQuestionIndex]);

    setActiveQuestionIndex(activeQuestionIndex);
  };

  const handleDeleteQuestions = (data: IFormInput) => {
    // setQuestions([]);
    // setActiveQuestionIndex(null);
    // reset({ ...initialValues });

    // navigate(-1);
    const isExistingQuestion =
      data?.id && (data.id !== 'temp_id' || data?.id == null);
    if (isExistingQuestion && questions[currentQuestionNumber - 1] === data?.id)
      dispatch(
        deleteQuestionsRequest({
          // question_ids: [data?.id],
          id: data?.id,
        })
      );
  };

  const totalQuestions = rowData?.total_questions ?? 50;
  const currentQuestionNumber =
    activeQuestionIndex !== null
      ? activeQuestionIndex + 1
      : questions.length + 1;

  const handlePublish = () => {
    setPageMode('publish');
  };

  return (
    <FormProvider {...formContext}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <Breadcrumbs sx={{ mb: 4 }}>
            <Typography>Test Creation</Typography>
            <Typography>Create Test</Typography>
            <Typography color="primary">Add Questions</Typography>
          </Breadcrumbs>

          <Button variant="contained" onClick={handlePublish}>
            Publish
          </Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              lg: '250px minmax(0, 1fr)',
            },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 1,
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Question creation
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
              {/* Question {currentQuestionNumber}/{totalQuestions} */}
              Total Questions {totalQuestions}
            </Typography>

            <Box
              sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              {questions.length ? (
                questions.map((_question: any, index: number) => {
                  const isActive = activeQuestionIndex === index;

                  return (
                    <Box
                      key={index}
                      onClick={() => handleQuestionSelect(/*question, */ index)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                        py: 0.75,
                        borderRadius: '18px',
                        border: '2px solid',
                        borderColor: isActive ? '#9EE2BE' : '#E5E7EB',
                        bgcolor: isActive ? '#F3FFF8' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all .2s ease',
                      }}
                    >
                      <CheckCircleRoundedIcon
                        sx={{
                          fontSize: 22,
                          color: isActive ? '#00A651' : '#D1D5DB',
                          mr: 2,
                        }}
                      />

                      <Typography
                        sx={{
                          flex: 1,
                          fontSize: 16,
                          fontWeight: 500,
                          color: isActive ? '#00A651' : '#475569',
                        }}
                      >
                        Question {index + 1}
                      </Typography>

                      <ChevronRightRoundedIcon
                        sx={{
                          color: isActive ? '#9EE2BE' : '#E5E7EB',
                          fontSize: 24,
                        }}
                      />
                    </Box>
                  );
                })
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Typography color="text.secondary">
                    No questions added yet. Start by filling the question form.
                  </Typography>
                </Paper>
              )}
            </Box>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 1,
            }}
          >
            {pageMode === 'publish' && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 3,
                  flexWrap: 'wrap',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 0,
                  }}
                >
                  Test Created
                </Typography>

                <Button
                  color="success"
                  variant="outlined"
                  startIcon={<CheckCircle />}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#9EE2BE',
                    bgcolor: '#F3FFF8',
                    px: 3,
                    py: 1,
                    borderRadius: 3,
                    width: 'auto',
                  }}
                >
                  {`All ${totalQuestions} Questions Done`}
                </Button>
              </Box>
            )}

            <TestInfoCard rowData={rowData} />

            {pageMode === 'publish' ? (
              <PublishTestPage
                rowData={rowData}
                onCancel={() => setPageMode('questions')}
              />
            ) : (
              <form onSubmit={handleSubmit(handleSaveContinue)}>
                <AddQuestionForm
                  onNext={handleNext}
                  onAddAnother={handleAddAnotherQuestion}
                  onClear={handleClearQuestions}
                  onDelete={handleDeleteQuestions}
                  hasQuestions={questions.length > 0}
                  questionNumber={currentQuestionNumber}
                  totalQuestions={totalQuestions}
                />
              </form>
            )}
          </Paper>
        </Box>

        <Snackbar
          open={snackbar?.isOpen}
          autoHideDuration={6000}
          onClose={() =>
            setSnackbar({
              isOpen: false,
              mode: 'success',
              msg: '',
            })
          }
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() =>
              setSnackbar({
                isOpen: false,
                mode: 'success',
                msg: '',
              })
            }
            severity={snackbar?.mode}
            sx={{ width: '100%' }}
          >
            {snackbar?.msg}
          </Alert>
        </Snackbar>
      </Box>
    </FormProvider>
  );
}
