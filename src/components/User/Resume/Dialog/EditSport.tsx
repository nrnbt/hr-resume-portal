import { Sport } from '@/utils/types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  open: boolean;
  data: Sport;
  index: number;
  onClose: () => void;
  onSave: (index: number, field: keyof Sport, value: string) => void;
}

const EditSportDialog: React.FC<Props> = ({ open, data, index, onClose, onSave }) => {
  const [sport, setSport] = useState<Sport>(data);

  const handleChange = (field: keyof Sport, value: string) => {
    setSport({ ...sport, [field]: value });
  };

  const handleSave = () => {
    onSave(index, 'sportName', sport.sportName);
    onSave(index, 'level', sport.level ?? 'beginner');
    onSave(index, 'achievements', sport.achievements);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Sport</DialogTitle>
      <DialogContent>
        <TextField
          label="Sport Name"
          value={sport.sportName}
          onChange={(e) => handleChange('sportName', e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Level"
          value={sport.level}
          onChange={(e) => handleChange('level', e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Achievements"
          value={sport.achievements}
          onChange={(e) => handleChange('achievements', e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSportDialog;
