import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function QuestionList({ questions, setQuestions }: any) {
  const deleteQuestion = (id: number) => {
    setQuestions((prev: any[]) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Added Questions
      </Typography>

      <Stack spacing={2}>
        {questions.map((question: any, index: number) => (
          <Paper
            key={question.id}
            sx={{
              p: 2,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>
                Q{index + 1}. {question.question_text}
              </Typography>

              <Box>
                <IconButton>
                  <EditOutlinedIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => deleteQuestion(question.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>

      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant="contained" disabled={!questions.length}>
          Save & Continue
        </Button>
      </Box>
    </Box>
  );
}
