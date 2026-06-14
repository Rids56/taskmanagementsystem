import AddIcon from '@mui/icons-material/Add';
import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import TestListTable from './TestListTable';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Breadcrumbs>
          <Typography color="text.secondary">Dashboard</Typography>
        </Breadcrumbs>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            navigate('/task-create', {
              state: {
                returnTo: '/dashboard',
              },
            })
          }
          sx={{ minWidth: 180 }}
        >
          Create New Test
        </Button>
      </Box>

      <TestListTable />
    </Box>
  );
}
