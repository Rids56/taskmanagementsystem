import { Box, CircularProgress } from '@mui/material';

interface LoaderOverlayProps {
  loading: boolean;
  children: React.ReactNode;
}

export default function LoaderOverlay({
  loading,
  children,
}: LoaderOverlayProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          filter: loading ? 'blur(4px)' : 'none',
          pointerEvents: loading ? 'none' : 'auto',
          transition: 'all .2s',
        }}
      >
        {children}
      </Box>

      {loading && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(2px)',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
