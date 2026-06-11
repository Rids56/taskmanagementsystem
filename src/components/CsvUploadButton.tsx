import { useRef, type ChangeEvent } from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { usePapaParse } from 'react-papaparse';

export interface CsvUploadButtonProps {
  /**
   * Callback for first row only
   */
  onCsvParsed: (row: Record<string, any>) => void;

  /**
   * Callback for all rows
   */
  onRowsParsed?: (rows: Record<string, any>[]) => void;

  /**
   * Parse all rows instead of first row
   */
  acceptMultipleRows?: boolean;

  /**
   * Button text
   */
  buttonText?: string;

  /**
   * Button variant
   */
  variant?: 'text' | 'outlined' | 'contained';

  /**
   * Disable button
   */
  disabled?: boolean;

  /**
   * Custom button icon
   */
  startIcon?: React.ReactNode;
}

const CsvUploadButton = ({
  onCsvParsed,
  onRowsParsed,
  acceptMultipleRows = false,
  buttonText = 'Upload CSV',
  variant = 'outlined',
  disabled = false,
  startIcon = <DownloadIcon />,
}: CsvUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { readString } = usePapaParse();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;

      if (typeof text !== 'string') return;

      readString(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = Array.isArray(results?.data)
            ? (results.data as Record<string, any>[])
            : [];

          if (!rows.length) return;

          if (acceptMultipleRows) {
            onRowsParsed?.(rows);
          } else {
            onCsvParsed(rows[0]);
          }
        },
        error: (error) => {
          console.error('CSV parsing failed:', error);
        },
      });
    };

    reader.readAsText(file);

    // allow re-uploading same file
    event.target.value = '';
  };

  console.log('CSV component');

  return (
    <>
      <Button
        variant={variant}
        startIcon={startIcon}
        onClick={() => handleFileSelect}
        disabled={disabled}
      >
        {buttonText}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        hidden
        onChange={handleFileChange}
      />
    </>
  );
};

export default CsvUploadButton;
