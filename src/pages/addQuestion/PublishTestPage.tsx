import { Box, Button, Container, Grid } from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';

import PublishSettings from './PublishSettings';

import {
  publishSchema as FormSchema,
  PublishFormValues as IFormInput,
} from './model/publish.schema';

import { zodResolver } from '@hookform/resolvers/zod';

interface PublishTestPageProps {
  rowData: any;
  onCancel: () => void;
}

export default function PublishTestPage({
  rowData,
  onCancel,
}: PublishTestPageProps) {
  const formContext = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      publishMode: 'now',
      publishDate: '',
      publishTime: '',
      liveUntil: 'custom',
      endDate: '',
      endTime: '',
    },
  });

  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = formContext;

  // selector
  // const {
  //   edit: {
  //     data: editTestSuccess,
  //     loading: editTestLoader,
  //     error: editTestError,
  //   },
  // } = useSelector((state: RootState) => state.testList);

  const buildPayload = (data: IFormInput) => {
    let scheduled_date: string | null = null;
    let expiry_date: string | null = null;

    if (
      data.publishMode === 'schedule' &&
      data.publishDate &&
      data.publishTime
    ) {
      scheduled_date = new Date(
        `${data.publishDate}T${data.publishTime}`
      ).toISOString();
    }

    if (data.liveUntil === 'custom' && data.endDate && data.endTime) {
      expiry_date = new Date(`${data.endDate}T${data.endTime}`).toISOString();
    }

    return {
      status: data.publishMode === 'now' ? 'live' : 'scheduled',
      scheduled_date,
      expiry_date,
    };
  };

  const onSubmit = (data: IFormInput) => {
    const payload = buildPayload(data);
    console.log(payload, data, rowData, errors);

    // dispatch(
    //   updateTestRequest({
    //     id: rowData.id,
    //     payload,
    //   })
    // );
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

              <Button variant="contained" type="submit">
                {watch('publishMode') === 'now'
                  ? 'Publish Now'
                  : 'Schedule Test'}
              </Button>
            </Box>
          </Grid>
        </Box>
      </FormProvider>
    </>
  );
}
