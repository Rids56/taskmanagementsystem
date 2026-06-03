import { ChangeEvent } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';

interface DifficultyRadioProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  error?: boolean;
  helperText?: string;
}

export default function DifficultyRadio({
  value,
  onChange,
  error = false,
  helperText,
}: DifficultyRadioProps) {
  return (
    <FormControl error={error}>
      <FormLabel>Test Difficulty Level</FormLabel>

      <RadioGroup
        row
        value={value ?? ''}
        onChange={onChange}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mt: 3,
        }}
      >
        <FormControlLabel value="Easy" control={<Radio />} label="Easy" />

        <FormControlLabel value="Medium" control={<Radio />} label="Medium" />

        <FormControlLabel
          value="Difficult"
          control={<Radio />}
          label="Difficult"
        />
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
