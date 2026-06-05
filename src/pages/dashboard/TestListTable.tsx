import { useEffect, useMemo } from 'react';
import { Box, Chip, IconButton, Paper, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { TestList } from '../interfaceType';
import { RootState } from '@/src/store/store';
import {
  getTestListRequest,
  resetTestList,
} from '../../store/slices/testListSlice';

export default function TestListTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: testListData, loading: testListLoader } = useSelector(
    (state: RootState) => state?.testList ?? []
  );

  useEffect(() => {
    dispatch(getTestListRequest());

    return (): void => {
      dispatch(resetTestList());
    };
  }, []);

  const data = useMemo<TestList[]>(() => testListData ?? [], [testListData]);

  const columns = useMemo<MRT_ColumnDef<TestList>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Test Name',
        size: 250,
      },
      {
        accessorKey: 'type',
        header: 'Test Type',
      },
      {
        accessorKey: 'subject',
        header: 'Subject',
      },
      {
        accessorKey: 'topics',
        header: 'Topics',
      },
      {
        accessorKey: 'sub_topics',
        header: 'Sub Topics',
      },
      {
        accessorKey: 'correct_marks',
        header: 'Correct Marks',
      },
      {
        accessorKey: 'wrong_marks',
        header: 'Wrong Marks',
      },
      {
        accessorKey: 'difficulty',
        header: 'Difficulty',
      },
      {
        accessorKey: 'total_marks',
        header: 'Total Marks',
      },
      {
        accessorKey: 'total_time',
        header: 'Total Time',
        Cell: ({ cell }: any) => `${cell.getValue()} min`,
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
            color={cell.getValue() === 'live' ? 'success' : 'warning'}
          />
        ),
      },
      {
        accessorKey: 'unattempt_marks',
        header: 'Unattempt Marks',
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
                onClick={() => {
                  // dispatch(getTestByIdRequest(row.original.id.toString()));
                  navigate('/task-create', {
                    state: {
                      mode: 'view',
                      // rowData: row.original,
                      id: row.original.id,
                      returnTo: '/dashboard',
                    },
                  });
                }}
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
                      // rowData: row.original,
                      id: row.original.id,
                      returnTo: '/dashboard',
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
        enableStickyHeader
        initialState={{
          pagination: {
            pageIndex: 0,
            pageSize: 10,
          },
          columnPinning: { right: ['actions'] },
        }}
        state={{
          isLoading: testListLoader,
        }}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: 2,
            height: 'calc(100vh - 205px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      />
    </Paper>
  );
}
