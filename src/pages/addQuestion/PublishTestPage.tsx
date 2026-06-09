import { Alert, Box, Button, Container, Grid, Snackbar } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateTestRequest } from '../../store/slices/testListSlice';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store/store';
import { useEffect, useRef, useState } from 'react';
import PublishSettings from './PublishSettings';
import { getDirtyValues } from '../../utils/getDirtyValues';
import {
  publishSchema as FormSchema,
  PublishFormValues as IFormInput,
} from './model/publish.schema';
import dayjs from 'dayjs';

interface PublishTestPageProps {
  rowData: any;
  onCancel: () => void;
}

const PublishTestPage = ({ rowData, onCancel }: PublishTestPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isViewMode = location?.state?.mode === 'view';

  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    mode: 'success' | 'error' | 'info' | 'warning';
    msg: string;
  }>({
    isOpen: false,
    mode: 'success',
    msg: '',
  });
  const initializedRef = useRef(false);

  const formContext = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      publishMode: 'now',
      // publishDate: '',
      // publishTime: '',
      scheduled_date: null,
      liveUntil: 'custom',
      // endDate: '',
      // endTime: '',
      expiry_date: null,
    },
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { dirtyFields },
  } = formContext;

  // selector
  const {
    edit: {
      data: editTestSuccess,
      // loading: editTestLoader,
      error: editTestError,
    },
  } = useSelector((state: RootState) => state.testList);

  useEffect(() => {
    if (!rowData || initializedRef.current) return;

    reset({
      publishMode: rowData.status === 'live' ? 'now' : 'schedule',

      scheduled_date: rowData.scheduled_date
        ? dayjs(rowData.scheduled_date)
        : null,

      expiry_date: rowData.expiry_date ? dayjs(rowData.expiry_date) : null,

      liveUntil: rowData.expiry_date ? 'custom' : 'always',
    });

    initializedRef.current = true;
  }, [rowData, reset]);

  useEffect(() => {
    if (!isEmpty(editTestSuccess)) {
      setSnackbar({
        isOpen: true,
        mode: 'success',
        msg: `Test updated successfully`,
      });

      navigate('/dashboard');
    }

    if (editTestError) {
      setSnackbar({
        isOpen: true,
        mode: 'error',
        msg: editTestError?.message ?? 'Api failed',
      });
    }
  }, [editTestSuccess, editTestError]);

  const onSubmit = (data: IFormInput) => {
    const dirtyData = getDirtyValues(data, dirtyFields);
    if (Object.keys(dirtyData).length === 0) {
      setSnackbar({
        isOpen: true,
        mode: 'error',
        msg: 'No fields to update',
      });
      return;
    }

    const payload = {
      status: data.publishMode === 'now' ? 'live' : 'draft',

      scheduled_date:
        data.publishMode === 'schedule'
          ? data.scheduled_date?.format('YYYY-MM-DDTHH:mm:ss.SSSZ')
          : null,

      ...(data.expiry_date && {
        expiry_date:
          data.liveUntil === 'custom'
            ? data.expiry_date?.format('YYYY-MM-DDTHH:mm:ss.SSSZ')
            : null,
      }),
    };

    dispatch(
      updateTestRequest({
        id: rowData.id,
        payload,
      })
    );
  };

  return (
    <>
      <FormProvider {...formContext}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Container maxWidth={false}>
            <PublishSettings />
          </Container>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1,
              }}
            >
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>

              <Button variant="contained" type="submit" disabled={isViewMode}>
                {watch('publishMode') === 'now'
                  ? 'Publish Now'
                  : 'Schedule Test'}
              </Button>
            </Box>
          </Grid>

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
    </>
  );
};

export default PublishTestPage;
