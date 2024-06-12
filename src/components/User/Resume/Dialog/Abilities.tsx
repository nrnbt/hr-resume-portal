// /Comp/Resume/Dialog/Abilitities.tsx

import { Abilities, Art, Sport } from '@/utils/types';
import { Button, TextField } from '@mui/material';
import React from 'react';

interface Props {
  data: Abilities;
  handleSportChange: (index: number, field: keyof Sport, value: string) => void;
  handleArtChange: (index: number, field: keyof Art, value: string) => void;
  handleEditSport: (index: number) => void;
  handleEditArt: (index: number) => void;
  handleAddSport: () => void;
  handleAddArt: () => void;
}

const AbilitiesDialogContent: React.FC<Props> = ({ data, handleSportChange, handleArtChange, handleEditSport, handleEditArt, handleAddSport, handleAddArt }) => {
  return (
    <div>
      <h3>Sports</h3>
      {data?.sports?.map((sport, index) => (
        <div key={index}>
          <TextField
            label="Sport Name"
            value={sport.sportName}
            onChange={(e) => handleSportChange(index, 'sportName', e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Level"
            value={sport.level}
            onChange={(e) => handleSportChange(index, 'level', e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Achievements"
            value={sport.achievements}
            onChange={(e) => handleSportChange(index, 'achievements', e.target.value)}
            fullWidth
            margin="dense"
          />
          <Button onClick={() => handleEditSport(index)}>Edit</Button>
        </div>
      ))}
      <Button onClick={handleAddSport}>Add Sport</Button>

      <h3>Arts</h3>
      {data?.arts?.map((art, index) => (
        <div key={index}>
          <TextField
            label="Art Form"
            value={art.artForm}
            onChange={(e) => handleArtChange(index, 'artForm', e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Level"
            value={art.level}
            onChange={(e) => handleArtChange(index, 'level', e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Achievements"
            value={art.achievements}
            onChange={(e) => handleArtChange(index, 'achievements', e.target.value)}
            fullWidth
            margin="dense"
          />
          <Button onClick={() => handleEditArt(index)}>Edit</Button>
        </div>
      ))}
      <Button onClick={handleAddArt}>Add Art</Button>
    </div>
  );
};

export default AbilitiesDialogContent;
