'use client'

import Section from "@/components/User/Resume/Section";
import { useSnackbar } from "@/providers/toaster";
import { Resume } from "@/utils/types";
import { CircularProgress, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const [loading, setLoading] = useState(false)
  const [resumeData, setResumeData] = useState<Resume | null>(null)

  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    fetchResume()
  },[])

  const fetchResume = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/resumes/${id}`);
      if (res.status === 200 && res.data?.resume) {
        setResumeData(res.data?.resume)
      } 
    } catch (error) {
      showSnackbar('Алдаа гарлаа!', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return (
      <div className="relative flex w-full h-[calc(100vh-100px)] justify-center items-center">
        <CircularProgress size={56} />
      </div>
    )
  }

  return(
    <div>
      {resumeData !== null ? (
        <Container maxWidth='lg'>
          <Section id='general' title="Ерөнхий мэдээлэл" resumeData={resumeData} />
          <Section id='contacts' title="Холбоо барих мэдээлэл" resumeData={resumeData}  />
          {/* <Section id= 'education' title="Боловсрол" resumeData={resumeData}  />
          <Section id='jobExperience' title="Ажлын туршлага" resumeData={resumeData}  />
          <Section id='abilities' title="Нэмэлт ур чадвар" resumeData={resumeData}  /> */}
        </Container>
      ) : (
        <div className="relative flex w-full h-[calc(100vh-100px)] justify-center items-center">
          Анкет олдсонгүй
        </div>
      )}
    </div>
  )
}
