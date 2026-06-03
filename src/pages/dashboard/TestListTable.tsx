import { useMemo } from 'react';
import { Box, Chip, IconButton, Paper, Tooltip } from '@mui/material';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { mockTests, Test } from './data';
import { useNavigate } from 'react-router-dom';

export default function TestListTable() {
  const navigate = useNavigate();
  const data = useMemo<Test[]>(() => mockTests, []);
  const columns = useMemo<MRT_ColumnDef<Test>[]>(
    () => [
      {
        accessorKey: 'test_name',
        header: 'Test Name',
        size: 250,
      },
      {
        accessorKey: 'subject',
        header: 'Subject',
      },
      {
        accessorKey: 'test_type',
        header: 'Test Type',
      },
      {
        accessorKey: 'difficulty_level',
        header: 'Difficulty',
      },
      {
        accessorKey: 'total_time',
        header: 'Total Time',
        Cell: ({ cell }: any) => `${cell.getValue()} min`,
      },
      {
        accessorKey: 'total_marks',
        header: 'Total Marks',
      },
      {
        accessorKey: 'total_questions',
        header: 'Total Questions',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }: any) => (
          <Chip
            size="small"
            label={cell.getValue()}
            color={cell.getValue() === 'Published' ? 'success' : 'warning'}
          />
        ),
      },
      {
        accessorKey: 'created_date',
        header: 'Created Date',
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 140,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }: any) => (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title="View">
              <IconButton
                size="small"
                onClick={() => console.log('View', row.original)}
              >
                <VisibilityOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() =>
                  navigate('/task-create', {
                    state: {
                      mode: 'edit',
                      rowData: row.original,
                    },
                  })
                }
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                size="small"
                color="error"
                onClick={() => console.log('Delete', row.original)}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableColumnActions={false}
        enableHiding={false}
        enableColumnFilters={false}
        enableGlobalFilter
        positionGlobalFilter="left"
        initialState={{
          pagination: {
            pageIndex: 0,
            pageSize: 10,
          },
          columnPinning: { right: ['actions'] },
        }}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: 2,
          },
        }}
      />
    </Paper>
  );
}
