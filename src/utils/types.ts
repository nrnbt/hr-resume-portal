import { Dayjs } from "dayjs";

export interface EducationLevelMatch {
  0: 'Бүрэн бус дунд',
  1: 'Бүрэн дунд',
  2: 'Мэргэжлийн',
  3: 'Бакалавр',
  4: 'Магистер',
  5: 'Доктор',
}

export interface General {
  about: string;
  familyName: string;
  firstName: string;
  lastName: string;
  registerNo: string;
  sex: 'male' | 'female' | 'other';
  birthDate?: Dayjs;
}

export interface Contacts {
  phoneNo: string;
  email: string;
  currentAddress: string;
  fb: string;
  ig: string;
  linkedIn: string;
}

export interface Education {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  country: string;
  schoolName: string;
  joined?: Dayjs;
  graduated?: Dayjs;
  profession: string;
  gpa: string;
}

export interface JobExperience {
  company: string;
  position: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
  responsibilities: string;
}

export interface Sport {
  sportName: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  achievements: string;
}

export interface Art {
  artForm: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  achievements: string;
}

export interface Abilities {
  sports: Sport[];
  arts: Art[];
}

export interface Resume {
  general: General;
  contacts: Contacts;
  education: Education[];
  jobExperience: JobExperience[];
  abilities: Abilities;
}
