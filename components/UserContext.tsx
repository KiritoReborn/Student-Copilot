import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Student, Faculty } from '../types/schema';
import { currentUser as mockStudent, currentFaculty as mockFaculty } from '../mockData';

interface UserContextType {
  user: User;
  role: 'student' | 'faculty';
  switchRole: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'student' | 'faculty'>('student');

  const user = role === 'student' ? mockStudent : mockFaculty;

  const switchRole = () => {
    setRole(prev => prev === 'student' ? 'faculty' : 'student');
  };

  return (
    <UserContext.Provider value={{ user, role, switchRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
