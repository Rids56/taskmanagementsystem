import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  CancelOutlined,
  CloudUpload,
  DeleteOutlineOutlined,
  // Download,
} from '@mui/icons-material';

import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { useRef } from 'react';
import type { AddQuestionFormValues as IFormInput } from './model/addQuestion.schema';
import { useLocation, useNavigate } from 'react-router-dom';
import { Editor } from 'primereact/editor';
import CsvUploadButton from '../../components/CsvUploadButton';

interface AddQuestionFormProps {
  onAddAnother: (values: IFormInput) => void;
  onNext: (values: IFormInput) => void;
  onClear?: () => void;
  onDelete: (values: IFormInput) => void;
  hasQuestions: boolean;
  menuListQuestions: number;
  questionNumber: number;
  totalQuestions: number;
}

const AddQuestionForm = ({
  onAddAnother,
  onNext,
  onClear,
  onDelete,
  hasQuestions,
  menuListQuestions,
  questionNumber,
  totalQuestions,
}: AddQuestionFormProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);

  const rowData = location.state?.rowData;
  const returnTo = location.state?.returnTo;
  const isViewMode = location.state?.mode === 'view';

  const { control, register, handleSubmit, getValues, setValue } =
    useFormContext<IFormInput>();
  const { errors } = useFormState({
    control,
  });

  const topicOptions = rowData?.topics ?? [];
  const subTopicOptions = rowData?.sub_topics ?? [];

  const questionId = getValues('id');
  const isExistingQuestion = !!questionId && questionId !== 'temp_id';
  const canDelete =
    !isViewMode &&
    (isExistingQuestion || (rowData?.questions?.length ?? 0) >= questionNumber);
  const minRows = 8;

  // csv parsing helpers
  const getSelectOption = (
    field: 'topic' | 'sub_topic',
    value?: string | null
  ) => {
    if (!value) return null;
    const search = value.toString().trim().toLowerCase();
    const options = field === 'topic' ? topicOptions : subTopicOptions;
    return (
      options.find(
        (option: any) =>
          option?.name?.toString().trim().toLowerCase() === search
      ) ?? null
    );
  };
  const normalizeCorrectOption = (value?: string) => {
    if (!value) return '';
    const normalized = value.toString().trim().toLowerCase();
    if (
      ['option1', 'option 1', '1', 'a', 'option a', 'opt1'].includes(normalized)
    )
      return 'option1';
    if (
      ['option2', 'option 2', '2', 'b', 'option b', 'opt2'].includes(normalized)
    )
      return 'option2';
    if (
      ['option3', 'option 3', '3', 'c', 'option c', 'opt3'].includes(normalized)
    )
      return 'option3';
    if (
      ['option4', 'option 4', '4', 'd', 'option d', 'opt4'].includes(normalized)
    )
      return 'option4';
    return normalized.startsWith('option') ? normalized : '';
  };
  const updateFormFromCsvRow = (row: Record<string, any>) => {
    setValue(
      'question',
      row.question ?? row.Question ?? row.question_text ?? ''
    );

    setValue('option1', row.option1 ?? row.Option1 ?? row['Option 1'] ?? '');
    setValue('option2', row.option2 ?? row.Option2 ?? row['Option 2'] ?? '');
    setValue('option3', row.option3 ?? row.Option3 ?? row['Option 3'] ?? '');
    setValue('option4', row.option4 ?? row.Option4 ?? row['Option 4'] ?? '');

    setValue(
      'correct_option',
      normalizeCorrectOption(
        row.correct_option ??
          row.CorrectOption ??
          row['Correct Option'] ??
          row.answer ??
          ''
      )
    );

    setValue('explanation', row.explanation ?? row.Explanation ?? '');
    setValue('difficulty', row.difficulty ?? row.Difficulty ?? '');

    setValue(
      'topic',
      getSelectOption(
        'topic',
        row.topic ?? row.Topic ?? row['Topic Name'] ?? row['topic name']
      )
    );

    setValue(
      'sub_topic',
      getSelectOption(
        'sub_topic',
        row.sub_topic ??
          row.SubTopic ??
          row['Sub Topic'] ??
          row['sub_topic_name']
      )
    );
  };

  return (
    <>
      <Grid container spacing={3} key={rowData?.id}>
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
            {/* <Button variant="outlined" startIcon={<Download />}>
              CSV
            </Button> */}
            <CsvUploadButton
              disabled={canDelete}
              onCsvParsed={(row) => {
                // form-specific logic
                updateFormFromCsvRow(row);
              }}
              // onRowsParsed={(rows) => {
              //   console.log('multiple row', rows);
              // }}
              buttonText="CSV"
            />
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
              disabled={!canDelete}
            >
              Delete Question
            </Button>
          </Box>
        </Grid>

        <Grid size={12}>
          <Controller
            name="question"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Box
                    className={`app-editor ${fieldState.error ? 'app-editor-error' : ''}`}
                  >
                    <Editor
                      value={field.value ?? ''}
                      onTextChange={(e) => {
                        // const html = e.htmlValue ?? '';
                        // const text = e.textValue?.trim() ?? '';
                        // const normalizedHtml = `<p>${text}</p>`;
                        // field.onChange(html === normalizedHtml ? text : html);
                        field.onChange(e.htmlValue ?? '');
                      }}
                      style={{
                        minHeight: `${minRows * 24}px`,
                      }}
                    />
                  </Box>

                  {fieldState.error && (
                    <FormHelperText error sx={{ ml: 2 }}>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </>
              );
            }}
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
                {...register('correct_option')}
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

        <Grid size={{ xs: 12 }}>
          <Controller
            name="media_url"
            control={control}
            render={({ field }) => (
              <>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const reader = new FileReader();

                    reader.onload = () => {
                      setValue('media_url', reader.result as string, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    };

                    reader.readAsDataURL(file);
                  }}
                />

                <Box sx={{ position: 'relative' }}>
                  <TextField
                    // sx={{ pr: 8 }}
                    fullWidth
                    label="Media URL"
                    placeholder="Image URL or upload a file"
                    error={!!errors.media_url}
                    helperText={errors.media_url?.message}
                    {...field}
                    slotProps={{
                      htmlInput: {
                        style: {
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        pr: 8, // reserve space for upload icon
                      },
                    }}
                  />

                  <IconButton
                    onClick={() => fileRef.current?.click()}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      zIndex: 1,
                    }}
                  >
                    <CloudUpload />
                  </IconButton>
                </Box>

                {field.value ? (
                  <Box sx={{ mt: 2 }}>
                    <img
                      src={field.value}
                      alt="preview"
                      style={{
                        maxWidth: 240,
                        maxHeight: 160,
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                ) : null}
              </>
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
                {...register('difficulty')}
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
            render={({ field }) => {
              return (
                <Autocomplete
                  id="topic"
                  selectOnFocus
                  options={topicOptions}
                  value={field.value ?? null}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
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
              );
            }}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="sub_topic"
            control={control}
            render={({ field }) => {
              return (
                <Autocomplete
                  id="sub_topic"
                  options={subTopicOptions}
                  value={field.value ?? null}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
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
              );
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              if (returnTo) {
                navigate(returnTo, {
                  state: {
                    ...(location.state.mode && { mode: location.state.mode }),
                    id: rowData?.id,
                  },
                });
              } else navigate(-1);
            }}
            disabled={!hasQuestions}
          >
            Exit Test Creation
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
            <Button type="submit" variant="contained" disabled={isViewMode}>
              Save & Continue
            </Button>

            {(questionNumber != rowData?.questions?.length ||
              questionNumber != menuListQuestions) &&
              isExistingQuestion && (
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
