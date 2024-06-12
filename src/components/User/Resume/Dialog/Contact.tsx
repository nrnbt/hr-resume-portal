import { Contacts } from '@/utils/types';
import { TextField } from '@mui/material';
import React from 'react';

interface Props {
  data: Contacts;
  onChange: (field: keyof Contacts, value: string) => void;
}

const ContactsDialogContent: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div>
      <TextField
        label="Phone Number"
        value={data.phoneNo}
        onChange={(e) => onChange('phoneNo', e.target.value)}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Email"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Current Address"
        value={data.currentAddress}
        onChange={(e) => onChange('currentAddress', e.target.value)}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Facebook"
        value={data.fb}
        onChange={(e) => onChange('fb', e.target.value)}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Instagram"
        value={data.ig}
        onChange={(e) => onChange('ig', e.target.value)}
        fullWidth
        margin="dense"
      />
      <TextField
        label="LinkedIn"
        value={data.linkedIn}
        onChange={(e) => onChange('linkedIn', e.target.value)}
        fullWidth
        margin="dense"
      />
    </div>
  );
};

export default ContactsDialogContent;
