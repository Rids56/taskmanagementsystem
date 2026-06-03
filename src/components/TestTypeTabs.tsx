import { Tabs, Tab, Box } from '@mui/material';

export default function TestTypeTabs({ methods }: any) {
  const { watch, setValue } = methods;
  const tabMapping = ['Chapter Wise', 'PYQ', 'Mock Test'];

  const testType = watch('test_type');

  const tabValue = Math.max(tabMapping.indexOf(testType), 0);

  return (
    <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => {
          setValue('test_type', tabMapping[newValue], {
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
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
}
