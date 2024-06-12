import { Abilities } from "@/utils/types";

interface AbilitiesProps {
  data?: Abilities
}

const AbilitiesSection: React.FC<AbilitiesProps> = ({ data }) => {
  return (
    <div>
      <div>
        <h3>Спорт</h3>
        {data?.sports.map((sport, index) => (
          <div key={index}>
            <p>Спортын төрөл: {sport.sportName}</p>
            <p>Түвшин: {sport.level}</p>
            {sport.achievements && <p>Шагнал: {sport.achievements}</p>}
          </div>
        ))}
      </div>
      <h3 className="border-t">Урлаг</h3>
       <div className="grid grid-cols-2">
        {data?.arts.map((art, index) => (
          <div key={index} className="p-2 border">
            <p>Урлгын төрөл: {art.artForm}</p>
            <p>Түвшин: {art.level}</p>
            {art.achievements && <p>Шагнал: {art.achievements}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbilitiesSection