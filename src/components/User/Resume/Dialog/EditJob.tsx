import { JobExperience } from "@/utils/types";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

interface Props {
  open: boolean;
  data: JobExperience;
  index: number;
  onClose: () => void;
  onSave: (index: number, field: keyof JobExperience, value: any) => void;
}

const EditJobExperienceDialog: React.FC<Props> = ({ open, data, index, onClose, onSave }) => {
  const [jobExperience, setJobExperience] = useState<JobExperience>(data);

  const handleChange = (field: keyof JobExperience, value: any) => {
    setJobExperience({ ...jobExperience, [field]: value });
  };

  const handleSave = () => {
    onSave(index, 'company', jobExperience.company);
    onSave(index, 'position', jobExperience.position);
    onSave(index, 'startDate', jobExperience.startDate);
    onSave(index, 'endDate', jobExperience.endDate);
    onSave(index, 'responsibilities', jobExperience.responsibilities);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ажлын туршлага засах</DialogTitle>
      <DialogContent>
        <TextField
          label="Company"
          value={jobExperience.company}
          onChange={(e) => handleChange('company', e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Position"
          value={jobExperience.position}
          onChange={(e) => handleChange('position', e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Start Date"
          value={jobExperience.startDate?.format('YYYY-MM-DD') || ''}
          onChange={(e) => handleChange('startDate', dayjs(e.target.value))}
          type="date"
          fullWidth
          margin="dense"
        />
        <TextField
          label="End Date"
          value={jobExperience.endDate?.format('YYYY-MM-DD') || ''}
          onChange={(e) => handleChange('endDate', dayjs(e.target.value))}
          type="date"
          fullWidth
          margin="dense"
        />
        <TextField
          label="Responsibilities"
          value={jobExperience.responsibilities}
          onChange={(e) => handleChange('responsibilities', e.target.value)}
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


export default EditJobExperienceDialog