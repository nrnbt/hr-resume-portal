'use client'

import ResumeDialog from "@/components/User/Resume/Dialog"
import Section from "@/components/User/Resume/Section"
import { useAuthContext } from "@/providers/auth"
import { useSnackbar } from "@/providers/toaster"
import { Resume } from "@/utils/types"
import { Button, CircularProgress, Container } from "@mui/material"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { FunctionComponent, useEffect, useReducer, useState } from "react"

interface State {
  resume: Resume;
  openSection?: string;
  editIndex?: {
    sports?: number;
    arts?: number;
    jobExperience?: number;
    education?: number;
  };
}

const initialState: State = {
  resume: {
    general: {
      about: '',
      familyName: '',
      firstName: '',
      lastName: '',
      registerNo: '',
      sex: 'male',
      birthDate: undefined
    },
    contacts: {
      phoneNo: '',
      email: '',
      currentAddress: '',
      fb: '',
      ig: '',
      linkedIn: ''
    },
    education: [],
    jobExperience: [],
    abilities: {
      sports: [],
      arts: []
    }
  },
  openSection: undefined,
  editIndex: {},
};

const resumeReducer = (state: State, action: { type: string, section?: string, payload?: any, index?: number }) => {
  switch (action.type) {
    case 'SET_SECTION':
      return {
        ...state,
        openSection: action.section,
        editIndex: {}
      };
    case 'SET_RESUME':
      return {
        ...state,
        resume: action.payload
      };
    case 'SET_EDIT_INDEX':
      return {
        ...state,
        editIndex: {
          ...state.editIndex,
          [action.section!]: action.index
        }
      };
    case 'ADD_SPORT':
      return {
        ...state,
        resume: {
          ...state.resume,
          abilities: {
            ...state.resume.abilities,
            sports: [...state.resume.abilities.sports, { sportName: '', level: '', achievements: '' }]
          }
        }
      };
    case 'ADD_ART':
      return {
        ...state,
        resume: {
          ...state.resume,
          abilities: {
            ...state.resume.abilities,
            arts: [...state.resume.abilities.arts, { artForm: '', level: '', achievements: '' }]
          }
        }
      };
    default:
      return state;
  }
};

const ResumePage: FunctionComponent = () => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const [resumeId, setResumeId] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { showSnackbar } = useSnackbar()

  const { user, loaded } = useAuthContext()

  const fetchResume = async (): Promise<void> => {
    const userId = user?.userId;
    if (userId) {
      setLoading(true);
      try {
        const res = await axios.get(`/api/resume/${userId}`);
        if (res.status === 200 && res.data?.resume) {
          setResumeId(res.data?._id)
          dispatch({ type: 'SET_RESUME', payload: res.data?.resume });
        } else {
          const tmpResume = state.resume
          tmpResume.general.firstName = user.firstName
          tmpResume.general.lastName = user.lastName
          tmpResume.contacts.phoneNo = user.phone
          tmpResume.contacts.email = user.email
          dispatch({ type: 'SET_RESUME', payload: tmpResume });
        }
      } catch (error) {
        showSnackbar('Алдаа гарлаа!', 'error');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if(loaded) {
      fetchResume()
    }
  },[loaded])

  if(!loaded || loading) {
    return(
      <div className="relative flex w-full h-[calc(100vh-100px)] justify-center items-center">
        <CircularProgress size={56} />        
      </div>
    )
  }

  if (user === null || user === undefined) {
    return (
      <div className="flex flex-col w-full justify-center items-center">
        <Image  src='/please_login.jpg' alt="ask-login" width={300} height={300}></Image>
        <p>Та бүртгэлээрээ нэвтрэн үү.</p>
        <Button variant="outlined" style={{ marginTop: '16px' }}>
          <Link href='/login'>
            Нэвтрэх
          </Link>
        </Button>

      </div>
    )
  }

  const handleOpen = (section: string) => {
    dispatch({ type: 'SET_SECTION', section });
  };

  const handleClose = () => {
    dispatch({ type: 'SET_SECTION' });
  };

  const handleSave = async(): Promise<void> => {
    setSaving(true)
    try {
      let url = ''
      if(resumeId === null || resumeId === undefined) {
        url = '/api/resume/create'
      } else {
        url = `/api/resume/update/${resumeId}`
      }
      const resumeData = {
        resume: state.resume,
        userId: user?.userId
      }
      const res = await axios.post(url, resumeData);
      if (res.status === 200 && res.data?.resume) {
        setResumeId(res.data?._id)
        const resume = res.data.resume
        resume._id = null
        dispatch({ type: 'SET_RESUME', payload: res.data.resume });
        showSnackbar('Анкет амжилттай шинэчлэгдлээ.', 'success');
      }
    } catch (error) {
      showSnackbar('Алдаа гарлаа!', 'error');
      console.error(error);
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (section: string, field: string, value: any) => {
    const updatedResume = {
      ...state.resume,
      [section]: {
        ...state.resume[section],
        [field]: value
      }
    };
    dispatch({ type: 'SET_RESUME', payload: updatedResume });
  };


  const handleAddSport = () => {
    dispatch({ type: 'ADD_SPORT' });
  };

  const handleAddArt = () => {
    dispatch({ type: 'ADD_ART' });
  };

  const { resume, openSection } = state;

  return (
    <div className="p-4">
      <Container maxWidth='lg'>
        <Section id='general' title="Ерөнхий мэдээлэл" onEdit={() => handleOpen('general')} resumeData={resume} />
        <Section id='contacts' title="Холбоо барих мэдээлэл" onEdit={() => handleOpen('contacts')} resumeData={resume}  />
        <Section id= 'education' title="Боловсрол" onEdit={() => handleOpen('education')} resumeData={resume}  />
        <Section id='jobExperience' title="Ажлын туршлага" onEdit={() => handleOpen('jobExperience')} resumeData={resume}  />
        <Section id='abilities' title="Нэмэлт ур чадвар" onEdit={() => handleOpen('abilities')} resumeData={resume}  />
      </Container>
      
      {openSection && (
        <ResumeDialog 
          handleChange={handleChange}
          handleClose={handleClose} 
          open={true}
          openSection={openSection as keyof Resume}
          resume={resume}
          handleSave={handleSave}
          saving={saving}
          handleAddSport={handleAddSport}
          handleAddArt={handleAddArt}
        />
      )}
    </div>
  )
}

export default ResumePage