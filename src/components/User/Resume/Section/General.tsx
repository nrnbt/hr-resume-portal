import { General } from "@/utils/types";
import dayjs from "dayjs";

interface GeneralProps {
  data: General
}

const GeneralSection: React.FC<GeneralProps> = ({ data }) => {
  return (
    <div>
      <p>Миний тухай: <i>{data?.about}</i></p>
      <div className="grid grid-cols-2">
        <p>Ургийн овог: <b>{data?.familyName}</b></p>
        <p>Овог: <b>{data?.lastName}</b></p>
        <p>Нэр: <b>{data?.firstName}</b></p>
        <p>Регистрийн дугаар: <b>{data?.registerNo}</b></p>
        <p>Хүйс: <b>{data?.sex}</b></p>
        <p>Төрсөн огноо: <b>{dayjs(data?.birthDate).format('DD/MM/YYYY')}</b></p>
      </div>
    </div>
  );
};

export default GeneralSection