'use client'
import React, { useState, useEffect, FunctionComponent } from 'react';
import axios from 'axios';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { User } from '@/providers/auth/types';

const UserList: FunctionComponent = () => {
  const [userLists, setUserLists] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  useEffect(() => {
    fetchUsers(search);
  }, []);

  const fetchUsers = async(queryParams = {}): Promise<void> => {
    setLoading(true);
    await axios.get('/api/admin/users', { params: queryParams })
      .then((res) => {
        if(res.status === 200) {
          setUserLists(res.data);
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setSearch(prevSearch => ({
      ...prevSearch,
      [name]: value
    }));
  };

  const handleFetchWithParams = () => {
    const queryParams = { ...search };
    fetchUsers(queryParams);
  };

  return (
    <div>
      <div className='flex justify-center gap-3 border-2 rounded-lg mb-4 p-2'>
        <TextField
          label="Емайл"
          name="email"
          value={search.email}
          onChange={handleChange}
          size='small'
          variant='standard'
        />
        <TextField
          label="Нэр"
          name="firstName"
          value={search.firstName}
          onChange={handleChange}
          size='small'
          variant='standard'
        />
        <TextField
          label="Овог"
          name="lastName"
          value={search.lastName}
          onChange={handleChange}
          size='small'
          variant='standard'
        />
        <TextField
          label="Дугаар"
          name="phone"
          value={search.phone}
          onChange={handleChange}
          size='small'
          variant='standard'
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
              <TableCell>Email</TableCell>
              <TableCell>Овог</TableCell>
              <TableCell>Нэр</TableCell>
              <TableCell>Дугаар</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
               <TableRow>
                  <TableCell colSpan={5}>
                    <div className="relative flex w-full h-full justify-center items-center">
                      <CircularProgress size={48} />        
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
              userLists.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5}>
                      <div className='text-center'>
                        Хэрэглэгч олдсонгүй
                      </div>
                    </TableCell>
                </TableRow>
              ) : (
                userLists.map((user, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.phone}</TableCell>
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

export default UserList;
