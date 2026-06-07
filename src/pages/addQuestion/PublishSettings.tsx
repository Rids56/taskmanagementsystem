import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from '@mui/material';
import { PublishFormValues as IFormInput } from './model/publish.schema';
import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { useEffect } from 'react';

export default function PublishSettings() {
  const { control, register, trigger } = useFormContext<IFormInput>();
  const { errors } = useFormState({
    control,
  });

  const publishMode = useWatch({
    control,
    name: 'publishMode',
  });
  const liveUntil = useWatch({
    control,
    name: 'liveUntil',
  });

  useEffect(() => {
    trigger(['endDate', 'endTime']);
  }, [liveUntil, trigger]);

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={12}>
        <Controller
          name="publishMode"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              exclusive
              value={field.value}
              onChange={(_, value) => {
                if (value !== null) {
                  field.onChange(value);
                }
              }}
            >
              <ToggleButton value="now">Publish Now</ToggleButton>
              <ToggleButton value="schedule">Schedule Publish</ToggleButton>
            </ToggleButtonGroup>
          )}
        />
      </Grid>

      <Grid size={12}>
        {publishMode === 'schedule' && (
          <>
            <Typography sx={{ fontWeight: 600, mb: 2 }} variant="h6">
              Select Date & Time
            </Typography>

            <Grid sx={{ mb: 4 }} container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="publishDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="date"
                      label="Publish Date"
                      {...register('publishDate')}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      error={!!errors.publishDate}
                      helperText={errors.publishDate?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  control={control}
                  name="publishTime"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="time"
                      label="Publish Time"
                      {...register('publishTime')}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      error={!!errors.publishTime}
                      helperText={errors.publishTime?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>

      <Grid size={12}>
        <Typography sx={{ fontWeight: 600 }} variant="h6">
          Live Until
        </Typography>
      </Grid>

      <Grid size={12}>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Choose how long this test should remain available on the platform.
        </Typography>
      </Grid>

      <Grid size={12}>
        <Controller
          control={control}
          name="liveUntil"
          render={({ field }) => (
            <RadioGroup {...field}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControlLabel
                    value="always"
                    control={<Radio />}
                    label="Always Available"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControlLabel
                    value="3weeks"
                    control={<Radio />}
                    label="3 Weeks"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControlLabel
                    value="1week"
                    control={<Radio />}
                    label="1 Week"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControlLabel
                    value="1month"
                    control={<Radio />}
                    label="1 Month"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControlLabel
                    value="2weeks"
                    control={<Radio />}
                    label="2 Weeks"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControlLabel
                    value="custom"
                    control={<Radio />}
                    label="Custom Duration"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <TextField
              fullWidth
              type="date"
              label="End Date"
              disabled={liveUntil !== 'custom'}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
              {...field}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={control}
          name="endTime"
          render={({ field }) => (
            <TextField
              fullWidth
              type="time"
              label="End Time"
              disabled={liveUntil !== 'custom'}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              error={!!errors.endTime}
              helperText={errors.endTime?.message}
              {...field}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
