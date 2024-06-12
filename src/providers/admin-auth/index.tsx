'use client'

import jwt from "jsonwebtoken";
import { FunctionComponent, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { AdminAuthContext, Admin } from './types';

const adminAuthContext = createContext<AdminAuthContext>({
  isLoggedIn: false,
  loaded: false,
  login: async () => {
    throw new Error('login not implemented')
  },
  logout: () => {
    throw new Error('logout not implemented')
  }});

export const AdminAuthProvider: FunctionComponent<PropsWithChildren>  = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | undefined | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('admin');
    if (storedUser) {
      setAdmin(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setLoaded(true)
  }, []);

  const login = async(token: string): Promise<void> => {
    const user = jwt.decode(token)
    if(user !== undefined) {
      setAdmin(user as Admin)
      localStorage.setItem('admin', JSON.stringify(user));
      setIsLoggedIn(true)
    } else {
      console.error('admin undefined')
    }
  }

  const logout = async(): Promise<void> => {
    localStorage.removeItem('admin');
    setAdmin(null);
    setIsLoggedIn(false);
  };

  return (
    <adminAuthContext.Provider value={{ loaded, admin, isLoggedIn, login, logout }}>
      {children}
    </adminAuthContext.Provider>
  );
};

export const useAdminAuthContext = (): AdminAuthContext => {
  return useContext(adminAuthContext)
}