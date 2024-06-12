import { Art } from '@/utils/types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  open: boolean;
  data: Art;
  index: number;
  onClose: () => void;
  onSave: (index: number, field: keyof Art, value: string) => void;
}

const EditArtDialog: React.FC<Props> = ({ open, data, index, onClose, onSave }) => {
  const [art, setArt] = useState<Art>(data);

  const handleChange = (field: keyof Art, value: string) => {
    setArt({ ...art, [field]: value });
  };

  const handleSave = () => {
    onSave(index, 'artForm', art.artForm);
    onSave(index, 'level', art.level ?? 'beginner');
    onSave(index, 'achievements', art.achievements);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Art</DialogTitle>
      <DialogContent>
        <TextField
          label="Art Form"
          value={art.artForm}
          onChange={(e) => handleChange('artForm', e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Level"
          value={art.level}
          onChange={(e) => handleChange('level', e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Achievements"
          value={art.achievements}
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

export default EditArtDialog;
