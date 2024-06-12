import { Education } from "@/utils/types";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

interface Props {
  open: boolean;
  data: Education;
  index: number;
  onClose: () => void;
  onSave: (index: number, field: keyof Education, value: any) => void;
}

const EditEducationDialog: React.FC<Props> = ({ open, data, index, onClose, onSave }) => {
  const [education, setEducation] = useState<Education>(data);

  const handleChange = (field: keyof Education, value: any) => {
    setEducation({ ...education, [field]: value });
  };

  const handleSave = () => {
    onSave(index, 'level', education.level);
    onSave(index, 'country', education.country);
    onSave(index, 'schoolName', education.schoolName);
    onSave(index, 'joined', education.joined);
    onSave(index, 'graduated', education.graduated);
    onSave(index, 'profession', education.profession);
    onSave(index, 'gpa', education.gpa);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Education</DialogTitle>
      <DialogContent>
        <TextField
          label="Level"
          value={education.level || ''}
          onChange={(e) => handleChange('level', parseInt(e.target.value))}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Country"
          value={education.country}
          onChange={(e) => handleChange('country', e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="School Name"
          value={education.schoolName}
          onChange={(e) => handleChange('schoolName', e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Joined"
          value={education.joined?.format('YYYY-MM-DD') || ''}
          onChange={(e) => handleChange('joined', dayjs(e.target.value))}
          type="date"
          fullWidth
          margin="dense"
        />
        <TextField
          label="Graduated"
          value={education.graduated?.format('YYYY-MM-DD') || ''}
          onChange={(e) => handleChange('graduated', dayjs(e.target.value))}
          type="date"
          fullWidth
          margin="dense"
        />
        <TextField
          label="Profession"
          value={education.profession}
          onChange={(e) => handleChange('profession', e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="GPA"
          value={education.gpa}
          onChange={(e) => handleChange('gpa', e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Болих
        </Button>
        <Button onClick={handleSave} color="primary">
          Хадгалах
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEducationDialog