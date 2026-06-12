import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Chip,
  IconButton,
  Paper,
  Snackbar,
  Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { TestList } from '../interfaceType';
import { RootState } from '@/src/store/store';
import {
  deleteTestRequest,
  getTestListRequest,
  resetTestList,
} from '../../store/slices/testListSlice';
import { tabMapping } from '../taskCreate/TestTypeTabs';

export default function TestListTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    mode: 'success' | 'error' | 'info' | 'warning';
    msg: string;
  }>({
    isOpen: false,
    mode: 'success',
    msg: '',
  });
  const {
    get: { data: testListData, loading: testListLoader },
    delete: {
      selected: testDeleteSuccess,
      loading: testDeleteLoader,
      error: testDeleteError,
    },
    edit: { data: editPublishTestSuccess },
  } = useSelector((state: RootState) => state?.testList ?? []);

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
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();

          const typeLabel =
            tabMapping.find((item) => item.value === value)?.label ??
            value ??
            '-';

          return typeLabel;
        },
      },
      {
        accessorKey: 'subject',
        header: 'Subject',
      },
      {
        accessorKey: 'topics',
        header: 'Topics',
        Cell: ({ cell }) => {
          const value = cell.getValue<string[]>();

          return Array.isArray(value) ? value.join(', ') : '-';
        },
      },
      {
        accessorKey: 'sub_topics',
        header: 'Sub Topics',
        Cell: ({ cell }) => {
          const value = cell.getValue<string[]>();

          return Array.isArray(value) ? value.join(', ') : '-';
        },
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
        Cell: ({ cell }: any) => {
          const status = cell.getValue();

          if (!status) return null;

          return (
            <Chip
              size="small"
              label={status.toUpperCase()}
              color={status === 'live' ? 'success' : 'warning'}
            />
          );
        },
      },
      {
        accessorKey: 'unattempt_marks',
        header: 'Unattempt Marks',
      },
      {
        accessorKey: 'created_at',
        header: 'Created Date',
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();

          return value ? dayjs(value).format('DD/MM/YYYY hh:mm A') : '-';
        },
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
                onClick={() => handleDeleteTest(row?.original)}
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

  useEffect(() => {
    dispatch(getTestListRequest());

    return (): void => {
      dispatch(resetTestList());
    };
  }, []);

  useEffect(() => {
    if (!isEmpty(editPublishTestSuccess)) {
      setSnackbar({
        isOpen: true,
        mode: 'success',
        msg: `Test updated successfully`,
      });
    }
  }, [editPublishTestSuccess]);

  useEffect(() => {
    if (testDeleteSuccess) {
      setSnackbar({
        isOpen: true,
        mode: 'success',
        msg: testDeleteSuccess?.message ?? 'Test Successfully Deleted.',
      });

      dispatch(getTestListRequest());
    }

    if (testDeleteError) {
      setSnackbar({
        isOpen: true,
        mode: 'error',
        msg: testDeleteError?.message ?? 'upadate failed',
      });
    }
  }, [testDeleteSuccess, testDeleteError]);

  const handleDeleteTest = (data: TestList) => {
    if (data?.id)
      dispatch(
        deleteTestRequest({
          id: data?.id,
        })
      );
  };

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
        enablePagination={false}
        enableBottomToolbar={false}
        muiTableContainerProps={{
          sx: {
            maxHeight: 'calc(100vh - 250px)',
          },
        }}
        initialState={{
          columnPinning: { right: ['actions'] },
        }}
        state={{
          isLoading: testListLoader || testDeleteLoader,
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
        muiTableHeadCellProps={({ column }) => ({
          sx: {
            backgroundColor: '#F5F7FA',
            borderBottom: '1px solid #EAEAEA',
            borderTop: '1px solid #EAEAEA',

            ...(column.getIsPinned() && {
              boxShadow:
                column.getIsPinned() === 'right'
                  ? '-8px 0 12px -6px rgba(0,0,0,.15)'
                  : '8px 0 12px -6px rgba(0,0,0,.15)',
            }),
          },
        })}
        muiTableBodyCellProps={({ column }) => ({
          sx: {
            borderBottom: '1px solid #EAEAEA',

            ...(column.getIsPinned() && {
              boxShadow:
                column.getIsPinned() === 'right'
                  ? '-8px 0 12px -6px rgba(0,0,0,.15)'
                  : '8px 0 12px -6px rgba(0,0,0,.15)',
            }),
          },
        })}
        enableRowVirtualization
        rowVirtualizerOptions={{
          overscan: 4,
        }}
        // enableColumnVirtualization
        // columnVirtualizerOptions={{
        //   overscan: 4,
        // }}
      />
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
    </Paper>
  );
}
