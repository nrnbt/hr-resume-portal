'use client'

import React, { useState, useEffect, FunctionComponent } from 'react';
import axios from 'axios';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { Resume } from '@/utils/types';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Link from 'next/link';

interface ResumeData {
  _id: string
  resume: Resume
  userId: string
  createdAt?: Date
  updatedAt?: Date
}

const ResumesLists: FunctionComponent = () => {
  const [resumesLists, setResumesLists] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({
    registerNo: '',
    phoneNo: '',
    jobExperienceNo: '',
    educationNo: '',
    updatedAtGte: null,
    updatedAtLte: null
  });

  useEffect(() => {
    fetchResumes(search);
  }, []);

  const fetchResumes = async(queryParams = {}): Promise<void> => {
    setLoading(true);
    await axios.get('/api/admin/resumes', { params: queryParams })
      .then((res) => {
        if(res.status === 200) {
          setResumesLists(res.data);
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (event: { target: { name: string; value: any; }; }) => {
    const { name, value } = event.target;
    setSearch(prevSearch => ({
      ...prevSearch,
      [name]: value
    }));
  };
  
  const handleDateChange = (name: string, value: any) => {
    setSearch(prevSearch => ({
      ...prevSearch,
      [name]: value
    }));
  };

  const handleFetchWithParams = () => {
    const queryParams = { ...search };
    fetchResumes(queryParams);
  };

  return (
    <div>
      <div className='flex flex-wrap justify-center gap-3 border-2 rounded-lg mb-4 p-2'>
        <TextField
          label="Регистрийн дугаар"
          name="registerNo"
          value={search.registerNo}
          onChange={handleChange}
          size='small'
          variant='standard'
        />
        <TextField
          label="Утасны дугаар"
          name="phoneNo"
          value={search.phoneNo}
          onChange={handleChange}
          size='small'
          variant='standard'
        />
        <TextField
          label="Ажилласан газрын тоо"
          name="jobExperienceNo"
          value={search.jobExperienceNo}
          onChange={handleChange}
          size='small'
          variant='standard'
        />
        <TextField
          label="Боловсролын тоо"
          name="educationNo"
          value={search.educationNo}
          onChange={handleChange}
          size='small'
          variant='standard'
        />
        <DatePicker
          label="Шинэчлэгдсэн (Эхлэх)"
          value={search.updatedAtGte}
          onChange={(newValue) => handleDateChange('updatedAtGte', newValue)}
        />
        <DatePicker
          label="Шинэчлэгдсэн (Дуусах)"
          value={search.updatedAtLte}
          onChange={(newValue) => handleDateChange('updatedAtLte', newValue)}
        />        
        <Button variant="contained" onClick={handleFetchWithParams} style={{ margin: 8 }}>
          Хайх
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Регистрийн дугаар</TableCell>
              <TableCell>Утасны дугаар</TableCell>
              <TableCell>Ажилласан газрын тоо</TableCell>
              <TableCell>Боловсрлын тоо</TableCell>
              <TableCell>Сүүлд шинэчилсэн</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
               <TableRow>
                  <TableCell colSpan={6}>
                    <div className="relative flex w-full h-full justify-center items-center">
                      <CircularProgress size={48} />        
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
              resumesLists.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={6}>
                      <div className='text-center'>
                        Анкет олдсонгүй
                      </div>
                    </TableCell>
                </TableRow>
              ) : (
                resumesLists.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{item.resume.general.registerNo}</TableCell>
                    <TableCell>{item.resume.contacts.phoneNo}</TableCell>
                    <TableCell>{item.resume.jobExperience.length}</TableCell>
                    <TableCell>{item.resume.education.length}</TableCell>
                    <TableCell>{dayjs(item?.createdAt).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>
                      <Button variant='outlined'>
                        <Link href={`/admin/resumes/${item._id}`}>
                          Дэлгэрэнгүй
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResumesLists;
