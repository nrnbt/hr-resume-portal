import { Education } from "@/utils/types";
import cn from 'classnames'
import dayjs from "dayjs";

interface EducationProps {
  data: Education[]
}

const EducationSection: React.FC<EducationProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2">
      {data?.map((education, index) => (
        <div key={index} className={cn(index%2 === 1 && 'border-r')}>
          <p>Түвшин: {education.level}</p>
          <p>Улс: {education.country}</p>
          <p>Сургуулийн нэр: {education.schoolName}</p>
          <p>Элссэн: {dayjs(education.joined).format('YYYY-MM')}</p>
          <p>Төгссөн: {dayjs(education.graduated).format('YYYY-MM')}</p>
          <p>Мэргэжил: {education.profession}</p>
          <p>Голч: {education.gpa}</p>
        </div>
      ))}
    </div>
  );
};

export default EducationSection
