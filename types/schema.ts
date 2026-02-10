export type UserRole = 'student' | 'faculty';

export type RiskLevel = 'Low' | 'Medium' | 'High';

// --- SQL-like Structures (Relational Data) ---

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Student extends User {
  role: 'student';
  major: string; // e.g., "Computer Science"
  year: number; // e.g., 2
  gpa: number; // e.g., 3.8
  departmentId: string;

  // Gamification
  xp?: number;
  level?: number;
  badges?: string[]; // IDs of unlocked badges
}

export interface Faculty extends User {
  role: 'faculty';
  department: string;
  coursesTaught: string[]; // Array of Course IDs
}

export interface Course {
  id: string;
  code: string; // e.g., "CS101"
  name: string; // e.g., "Intro to Computer Science"
  credits: number;
  instructorId: string;
  schedule: string; // e.g., "Mon/Wed 10:00 AM"
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  grade: number; // Current percentage (0-100)
  attendance: number; // Percentage (0-100)
  lastSubmissionDate?: string;
}

// --- NoSQL-like Structures (Document/Log Data) ---

export interface WellbeingLog {
  id: string;
  studentId: string;
  timestamp: string; // ISO Date
  moodScore: number; // 1-5 (1=Sad, 5=Happy)
  stressLevel: number; // 1-10 (1=Low, 10=High)
  sleepHours: number;
  notes?: string;
  tags?: string[]; // e.g., ["exam", "family", "tired"]

  // Backward compatibility fields for UI
  date?: string;
  mood?: number;
  socialBattery?: number;
  waterIntake?: number;
}

export interface AIInsight {
  id: string;
  targetId: string; // Student ID or Course ID
  type: 'academic_risk' | 'wellbeing' | 'career_path';
  generatedAt: string;
  content: string; // The AI-generated text
  confidenceScore: number; // 0-1
  actionItems?: string[]; // Suggested next steps
}

export interface RiskAssessment {
  studentId: string;
  overallRisk: RiskLevel;
  factors: {
    academic: RiskLevel; // "Low grade trend"
    attendance: RiskLevel; // "Missed 3 classes"
    wellbeing: RiskLevel; // "High stress reported"
  };
  details: string; // AI explanation: "Student is at risk due to..."
  interventionStatus: 'pending' | 'active' | 'resolved';
}

export interface CareerMilestone {
  id: string;
  studentId: string;
  title: string; // e.g., "Build a Portfolio Website"
  category: 'internship' | 'skill' | 'project';
  status: 'todo' | 'in_progress' | 'completed';
  aiSuggestion?: string; // "Consider using Next.js for this..."
}

// --- Counseling ---

export interface Counselor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  availableSlots: string[];
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

// --- Gamification Types ---

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

// --- Community Types ---

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
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
