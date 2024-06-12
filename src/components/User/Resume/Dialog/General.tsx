// GeneralSection.tsx
import { General } from '@/utils/types';
import { MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  data: General;
  onChange: (field: keyof General, value: string | Dayjs) => void;
}

const GeneralDialogContent: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      <TextField
        label="Миний тухай"
        value={data.about}
        onChange={(e) => onChange('about', e.target.value)}
        fullWidth
        multiline
        minRows={3}
        margin="dense"
        size='small'
      />
      <TextField
        label="Ургийн овог"
        value={data.familyName}
        onChange={(e) => onChange('familyName', e.target.value)}
        fullWidth
        margin="dense"
        size='small'
      />
      <TextField
        label="Овог"
        value={data.lastName}
        onChange={(e) => onChange('lastName', e.target.value)}
        fullWidth
        margin="dense"
        size='small'
      />
      <TextField
        label="Нэр"
        value={data.firstName}
        onChange={(e) => onChange('firstName', e.target.value)}
        fullWidth
        margin="dense"
        size='small'
      />
      <TextField
        label="Регистрийн дугаар"
        value={data.registerNo}
        onChange={(e) => onChange('registerNo', e.target.value)}
        fullWidth
        margin="dense"
        size='small'
      />
      <div className='mt-2'>
        <div className='h-full flex items-center'>
          Хүйс
        </div>
        <Select
          value={data.sex}
          className='text-black'
          onChange={(e) => onChange('sex', e.target.value)}
        >
          <MenuItem value={'male'}>эрэгтэй</MenuItem>
          <MenuItem value={'female'}>эмэгтэй</MenuItem>
          <MenuItem value={'other'}>бусад</MenuItem>
        </Select>
      </div>
      <div className='mt-4'>
        <DatePicker
          label="Төрсөн огноо"
          views={['year', 'month', 'day']}
          value={(dayjs(data.birthDate) ?? new Dayjs())}
          onChange={(newValue) => onChange('birthDate', newValue ?? new Dayjs())}
        />
      </div>
    </div>
  );
};

export default GeneralDialogContent;
