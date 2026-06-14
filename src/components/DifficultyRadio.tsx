import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ChangeEvent } from 'react';

interface DifficultyRadioProps {
  value?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
}

export default function DifficultyRadio({
  value,
  name,
  onChange,
  onBlur,
  error = false,
  helperText,
}: DifficultyRadioProps) {
  return (
    <FormControl error={error}>
      <FormLabel>Test Difficulty Level</FormLabel>

      <RadioGroup
        row
        name={name}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mt: 3,
        }}
      >
        <FormControlLabel value="easy" control={<Radio />} label="Easy" />
        <FormControlLabel value="medium" control={<Radio />} label="Medium" />
        <FormControlLabel value="hard" control={<Radio />} label="Hard" />
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
