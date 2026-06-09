import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import startCase from 'lodash/startCase';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { TopicOption } from '../interfaceType';
import IconChapter from '../../assets/ar_stickers.png';
import IconLevel from '../../assets/cognition.png';

interface TestInfoCardProps {
  rowData: any;
}

export default function TestInfoCard({ rowData }: TestInfoCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isViewMode = location.state?.mode === 'view';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        border: 1,
        borderColor: 'divider',
        borderRadius: 3,
        position: 'relative',
      }}
    >
      {/* Edit */}
      <IconButton
        disabled={isViewMode}
        size="small"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
        onClick={() =>
          navigate('/task-create', {
            state: {
              mode: 'edit',
              // rowData: rowData,
              id: rowData?.id,
              returnTo: '/task-create/add-question',
            },
          })
        }
      >
        <EditOutlinedIcon />
      </IconButton>

      {/* Test Type */}
      <Chip
        label={startCase(rowData?.type) ?? 'Chapter Wise'}
        sx={{
          mb: 3,
          bgcolor: '#09104D',
          color: 'white',
          borderRadius: 10,
        }}
      />

      {/* Header */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Box
          sx={{ objectFit: 'scale-down' }}
          component="img"
          src={IconChapter}
        ></Box>

        <Typography sx={{ fontWeight: 700 }} variant="h4">
          {rowData?.name}
        </Typography>

        <Chip
          icon={
            <Box
              component="img"
              src={IconLevel}
              alt="Difficulty"
              sx={{ objectFit: 'scale-down' }}
            />
          }
          label={startCase(rowData?.difficulty)}
          sx={{
            borderRadius: 2,
            minWidth: 100,
            bgcolor: '#2AB7A9',
          }}
        />
      </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
        {/* Left */}
        <Stack spacing={2}>
          <Stack direction="row" spacing={3}>
            <Typography color="text.secondary" sx={{ minWidth: 120 }}>
              Subject
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>
              {rowData?.subject?.name ?? ''}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={3}>
            <Typography color="text.secondary" sx={{ minWidth: 120 }}>
              Topic
            </Typography>

            <Stack direction="row" spacing={1}>
              {rowData?.topics?.map((topic: TopicOption) => (
                <Chip
                  key={topic?.id}
                  label={topic?.name}
                  variant="outlined"
                  color="warning"
                />
              ))}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={3}>
            <Typography color="text.secondary" sx={{ minWidth: 120 }}>
              Sub Topic
            </Typography>

            <Stack direction="row" spacing={1}>
              {rowData?.sub_topics?.map((subTopic: TopicOption) => (
                <Chip
                  key={subTopic?.id}
                  label={subTopic?.name}
                  variant="outlined"
                  color="warning"
                />
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* Right Stats */}
        <Paper
          elevation={0}
          sx={{
            px: 2,
            py: 1,
            border: 1,
            borderColor: 'divider',
            borderRadius: 3,
          }}
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Stack direction="row" spacing={1}>
              <AccessTimeOutlinedIcon fontSize="small" />
              <Typography>{rowData?.total_time} Min</Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <QuizOutlinedIcon fontSize="small" />
              <Typography>{rowData?.total_questions} Q's</Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <AssessmentOutlinedIcon fontSize="small" />
              <Typography>{rowData?.total_marks} Marks</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Paper>
  );
}
