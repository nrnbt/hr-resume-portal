import { Contacts } from "@/utils/types";

interface ContactsProps {
  data?: Contacts
}

const ContactsSection: React.FC<ContactsProps> = ({ data }) => {
  return (
    <div>
      <div className="grid grid-cols-2">
        <p>Утасны дугаар: <b>{data?.phoneNo}</b></p>
        <p>Емайл хаяг: <b>{data?.email}</b></p>
        <p>Оршин суугаа хаяг: <b>{data?.currentAddress}</b></p>
      </div>
      <p className="border-t">Сошиал хаяг:</p>
      <ul className="pl-4">
        <li>Facebook: <b>{data?.fb}</b></li>
        <li>Instagram: <b>{data?.ig}</b></li>
        <li>LinkedIn: <b>{data?.linkedIn}</b></li>
      </ul>
    </div>
  );
};

export default ContactsSection