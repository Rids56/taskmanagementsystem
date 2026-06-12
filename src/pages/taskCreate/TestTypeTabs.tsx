import { Tabs, Tab, Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { TaskCreateFormValues as IFormInput } from './model/create.schema';

export const tabMapping = [
  {
    label: 'Chapter Wise',
    value: 'chapterwise',
  },
  {
    label: 'PYQ',
    value: 'pyq',
  },
  {
    label: 'Mock',
    value: 'mock',
  },
];

export default function TestTypeTabs() {
  const { watch, setValue } = useFormContext<IFormInput>();

  // const tabMapping = ['chapterwise', 'pyq', 'mock'];

  const testType = watch('type');

  const tabValue = Math.max(
    tabMapping.findIndex((tab) => tab.value === testType),
    0
  );

  return (
    <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => {
          setValue('type', tabMapping[newValue].value, {
            shouldDirty: true,
          });
        }}
        sx={{
          mb: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        }}
      >
        {tabMapping.map((tab) => (
          <Tab key={tab.value} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
}
