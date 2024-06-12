import { Resume } from "@/utils/types";
import { IconButton } from "@mui/material";
import { FunctionComponent } from "react";
import AbilitiesSection from "./Abilities";
import ContactsSection from "./Contact";
import EducationSection from "./Education";
import GeneralSection from "./General";
import JobExperienceSection from "./JobExperience";
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  id: 'general' | 'contacts' | 'education' | 'jobExperience' | 'abilities' 
  title: string
  onEdit?: () => void
  resumeData: Resume
}

const Section: FunctionComponent<Props> = ({ id, title, onEdit, resumeData }) => {

  const sectionData = {
    'general': resumeData.general,
    'contacts': resumeData.contacts,
    'education': resumeData.education,
    'jobExperience': resumeData.jobExperience,
    'abilities': resumeData.abilities
  };

  return(
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        {onEdit && (
          <IconButton color="primary" size="small" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        )}
      </div>
      {id === "general" && <GeneralSection data={sectionData[id]} />}
      {id === "contacts" && <ContactsSection data={sectionData[id]} />}
      {id === "education" && <EducationSection data={sectionData[id]} />}
      {id === "jobExperience" && <JobExperienceSection data={sectionData[id]} />}
      {id === "abilities" && <AbilitiesSection data={sectionData[id]} />}
    </div>
  )
}

export default Section
