import { JobExperience } from "@/utils/types";
import cn from "classnames";
import dayjs from "dayjs";

interface JobExperienceProps {
  data?: JobExperience[]
}

const JobExperienceSection: React.FC<JobExperienceProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2">
      {data?.map((experience, index) => (
        <div key={index} className={cn(index%2 === 1 && 'border-r')}>
          <p>Компани: {experience.company}</p>
          <p>Албан тушаал: {experience.position}</p>
          <p>Ажилд орсон огноо: {dayjs(experience.startDate).format('YYYY-MM')}</p>
          <p>Ажилаас гарсан огноо: {dayjs(experience.endDate).format('YYYY-MM')}</p>
          <p>Ажлын үндсэн үүрэг: {experience.responsibilities}</p>
        </div>
      ))}
    </div>
  );
};

export default JobExperienceSection