export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface StudentProfile {
  id: string;
  name: string;
  major: string;
  year: string;
  university: string;
  avatar: string;
  xp: number;
  level: number;
  badges: string[];
}

export interface AcademicMetric {
  subject: string;
  grade: number; // Percentage
  attendance: number; // Percentage
  trend: 'up' | 'down' | 'stable';
}

export interface CareerMilestone {
  id: string;
  title: string;
  completed: boolean;
  category: 'resume' | 'skill' | 'interview';
}

export interface FinanceEntry {
  category: string;
  amount: number;
  date: string;
}

export interface WellnessLog {
  date: string;
  mood: number; // 1-5
  sleepHours: number;
  socialBattery: number; // 1-100
  waterIntake: number; // glasses
  notes?: string;
}

export interface Counselor {
  id: string;
  name: string;
  specialty: string;
  availableSlots: string[];
  avatar: string;
}

export interface Appointment {
  id: string;
  counselorId: string;
  studentId: string;
  date: string;
  time: string;
  meetLink: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface ForumPost {
  id: string;
  author: string;
  authorAvatar: string;
  category: 'Academics' | 'Career' | 'Wellness' | 'General';
  content: string;
  timestamp: string;
  likes: number;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  solved: boolean;
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  major: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}
