import { JobExperience } from '@/utils/types';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface Props {
  data: JobExperience[];
  onChange: (index: number, field: keyof JobExperience, value: string | Dayjs) => void;
}

const JobExperienceDialogContent: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      {data.map((job, index) => (
        <div key={index}>
          <TextField
            label="Company"
            value={job.company}
            onChange={(e) => onChange(index, 'company', e.target.value)}
            fullWidth
            margin="dense"
            size='small'
          />
          <TextField
            label="Position"
            value={job.position}
            onChange={(e) => onChange(index, 'position', e.target.value)}
            fullWidth
            margin="dense"
            size='small'
          />
          <div className='mt-4'>
            <DatePicker
              label="Start Date"
              views={['year', 'month', 'day']}
              value={(dayjs(job.startDate) ?? new Dayjs())}
              onChange={(newValue) => onChange(index, 'startDate', newValue ?? new Dayjs())}
            />
          </div>
          <div className='mt-4'>
            <DatePicker
              label="End Date"
              views={['year', 'month', 'day']}
              value={(dayjs(job.endDate) ?? new Dayjs())}
              onChange={(newValue) => onChange(index, 'endDate', newValue ?? new Dayjs())}
            />
          </div>
          <TextField
            label="Responsibilities"
            value={job.responsibilities}
            onChange={(e) => onChange(index, 'responsibilities', e.target.value)}
            fullWidth
            margin="dense"
            size='small'
          />
        </div>
      ))}
    </div>
  );
};

export default JobExperienceDialogContent;
