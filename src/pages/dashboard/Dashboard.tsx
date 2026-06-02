import { Box, Card, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 24,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        {[1, 2, 3, 4].map((item) => (
          <Card
            key={item}
            sx={{
              p: 3,
            }}
          >
            <Typography>Total Tests</Typography>
            <Typography variant="h4">125</Typography>
          </Card>
        ))}
      </Box>
    </>
  );
}
