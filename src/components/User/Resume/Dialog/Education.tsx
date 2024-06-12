import { Education } from '@/utils/types';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface Props {
  data: Education[];
  onChange: (index: number, field: keyof Education, value: string | Dayjs) => void;
}

const EducationDialogContent: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      {data.map((edu, index) => (
        <div key={index}>
          <TextField
            label="Level"
            value={edu.level}
            onChange={(e) => onChange(index, 'level', e.target.value)}
            fullWidth
            margin="dense"
            size='small'
          />
          <TextField
            label="Country"
            value={edu.country}
            onChange={(e) => onChange(index, 'country', e.target.value)}
            fullWidth
            margin="dense"
            size='small'
          />
          <TextField
            label="School Name"
            value={edu.schoolName}
            onChange={(e) => onChange(index, 'schoolName', e.target.value)}
            fullWidth
            margin="dense"
            size='small'
          />
          <div className='mt-4'>
            <DatePicker
              label="Start Date"
              views={['year', 'month']}
              value={(dayjs(edu.joined) ?? new Dayjs())}
              onChange={(newValue) => onChange(index, 'joined', newValue ?? new Dayjs())}
            />
          </div>
          <div className='mt-4'>
            <DatePicker
              label="Graduated"
              views={['year', 'month']}
              value={(dayjs(edu.graduated) ?? new Dayjs())}
              onChange={(newValue) => onChange(index, 'graduated', newValue ?? new Dayjs())}
            />
          </div>
          <TextField
            label="Profession"
            value={edu.profession}
            onChange={(e) => onChange(index, 'profession', e.target.value)}
            fullWidth
            margin="dense"
            size='small'
          />
          <TextField
            label="GPA"
            value={edu.gpa}
            onChange={(e) => onChange(index, 'gpa', e.target.value)}
            fullWidth
            margin="dense"
            size='small'
          />
        </div>
      ))}
    </div>
  );
};

export default EducationDialogContent;
