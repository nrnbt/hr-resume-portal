import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { Art, Resume, Sport } from '@/utils/types';
import GeneralDialogContent from './General';
import ContactsDialogContent from './Contact';
import EducationDialogContent from './Education';
import JobExperienceDialogContent from './JobExperience';
import AbilitiesDialogContent from './Abilities';
import EditSportDialog from './EditSport';
import EditArtDialog from './EditArt';

interface Props {
  open: boolean;
  handleClose: () => void;
  resume: Resume;
  handleChange: (section: keyof Resume, field: string, value: any) => void;
  openSection: keyof Resume | null;
  handleSave: () => void;
  saving: boolean;
  handleAddSport: () => void;
  handleAddArt: () => void;
}

const ResumeDialog: React.FC<Props> = ({ 
  open, 
  handleClose, 
  resume, 
  handleChange, 
  openSection, 
  handleSave, 
  saving, 
  handleAddSport, 
  handleAddArt 
}) => {
  const [editSportIndex, setEditSportIndex] = useState<number | null>(null);
  const [editArtIndex, setEditArtIndex] = useState<number | null>(null);

  const handleDialogTitle = () => {
    switch (openSection) {
      case 'general': return 'Ерөнхий мэдээлэл';
      case 'contacts': return 'Холбоо барих мэдээлэл';
      case 'education': return 'Боловсрол';
      case 'jobExperience': return 'Ажлын туршлага';
      case 'abilities': return 'Нэмэлт ур чадвар';
      default: return '';
    }
  };

  const handleEditSport = (index: number) => {
    setEditSportIndex(index);
  };

  const handleEditArt = (index: number) => {
    setEditArtIndex(index);
  };

  const handleCloseEdit = () => {
    setEditSportIndex(null);
    setEditArtIndex(null);
  };

  const handleChangeSport = (index: number, field: keyof Sport, value: string) => {
    const updatedSports = [...resume.abilities.sports];
    updatedSports[index] = { ...updatedSports[index], [field]: value };
    handleChange('abilities', 'sports', updatedSports);
  };

  const handleChangeArt = (index: number, field: keyof Art, value: string) => {
    const updatedArts = [...resume.abilities.arts];
    updatedArts[index] = { ...updatedArts[index], [field]: value };
    handleChange('abilities', 'arts', updatedArts);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{handleDialogTitle()}</DialogTitle>
      <DialogContent>
        {openSection === 'general' && (
          <GeneralDialogContent 
            data={resume.general} 
            onChange={(field, value) => handleChange('general', field, value)} 
          />
        )}
        {openSection === 'contacts' && (
          <ContactsDialogContent 
            data={resume.contacts} 
            onChange={(field, value) => handleChange('contacts', field, value)} 
          />
        )}
        {openSection === 'education' && (
          <EducationDialogContent 
            data={resume.education} 
            onChange={(index, field, value) => handleChange('education', `${index}.${field}`, value)} 
          />
        )}
        {openSection === 'jobExperience' && (
          <JobExperienceDialogContent 
            data={resume.jobExperience} 
            onChange={(index, field, value) => handleChange('jobExperience', `${index}.${field}`, value)} 
          />
        )}
        {openSection === 'abilities' && (
          <div>
            <AbilitiesDialogContent
              data={resume.abilities}
              handleSportChange={handleChangeSport}
              handleArtChange={handleChangeArt}
              handleEditSport={handleEditSport}
              handleEditArt={handleEditArt}
              handleAddSport={handleAddSport}
              handleAddArt={handleAddArt}
            />
            {editSportIndex !== null && (
              <EditSportDialog
                open={true}
                data={resume.abilities.sports[editSportIndex]}
                index={editSportIndex}
                onClose={handleCloseEdit}
                onSave={handleChangeSport}
              />
            )}
            {editArtIndex !== null && (
              <EditArtDialog
                open={true}
                data={resume.abilities.arts[editArtIndex]}
                index={editArtIndex}
                onClose={handleCloseEdit}
                onSave={handleChangeArt}
              />
            )}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant='outlined'>
          Болих
        </Button>
        <Button onClick={handleSave} color="primary" variant='contained' disabled={saving}>
          {saving ? <CircularProgress className='text-white' size={24} /> : 'Хадгалах'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResumeDialog;
