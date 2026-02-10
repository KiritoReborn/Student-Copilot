import { Student, Faculty, Course, RiskAssessment, WellbeingLog, CareerMilestone, Badge, CodingProblem, ForumPost, ChatContact, ChatMessage } from './types/schema';

// --- Users ---

export const currentUser: Student = {
  id: 'student-1',
  role: 'student',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-PzmmvujnSuwjFctQi2l70lNkKjKuW6vYLhr80vjfsrvb2F-pJ-Az3OXMKx4n9Jam17Q5jxeuBri9gzf_mJcKgtk4IuQcQQqHDxu_EWSdGglavGfLDJRIhNUcNzyzNnk5m-WJvyb29PawyPtNGEzrGIPHLqYi_y_0RP6kZRSslJzqovIxScWWHRfK7X3VsKr4t7txYndU9S_y9M0roXFnx7SXyQ8r1_t6jIeX2v51PK-UchFKYavH1HGLHDdRyeYOHsrDKT_ePwY',
  major: 'Computer Science',
  year: 2,
  gpa: 3.8,
  departmentId: 'dept-cs',
  xp: 1250,
  level: 5,
  badges: ['streak_master']
};

export const currentFaculty: Faculty = {
  id: 'faculty-1',
  role: 'faculty',
  name: 'Dr. Sarah Chen',
  email: 'sarah.chen@university.edu',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
  department: 'Computer Science',
  coursesTaught: ['course-101', 'course-202']
};

// --- Other Students (For Faculty View) ---

export const students: Student[] = [
  currentUser,
  {
    id: 'student-2',
    role: 'student',
    name: 'Jordan Lee',
    email: 'jordan.lee@university.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    major: 'Computer Science',
    year: 2,
    gpa: 2.4,
    departmentId: 'dept-cs',
    xp: 800,
    level: 3
  },
  {
    id: 'student-3',
    role: 'student',
    name: 'Casey Smith',
    email: 'casey.smith@university.edu',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
    major: 'Computer Science',
    year: 2,
    gpa: 3.9,
    departmentId: 'dept-cs',
    xp: 1500,
    level: 6
  }
];

// --- Courses ---

export const courses: Course[] = [
  {
    id: 'course-101',
    code: 'CS101',
    name: 'Intro to Computer Science',
    credits: 4,
    instructorId: 'faculty-1',
    schedule: 'Mon/Wed 10:00 AM'
  },
  {
    id: 'course-202',
    code: 'CS202',
    name: 'Data Structures & Algorithms',
    credits: 4,
    instructorId: 'faculty-1',
    schedule: 'Tue/Thu 2:00 PM'
  }
];

// --- Risk Assessments ---

export const riskAssessments: Record<string, RiskAssessment> = {
  'student-1': {
    studentId: 'student-1',
    overallRisk: 'Low',
    factors: {
      academic: 'Low',
      attendance: 'Low',
      wellbeing: 'Low'
    },
    details: "Alex is performing consistently well. Attendance is near perfect.",
    interventionStatus: 'resolved'
  },
  'student-2': {
    studentId: 'student-2',
    overallRisk: 'High',
    factors: {
      academic: 'High', // Failing grades
      attendance: 'Medium', // Missed last 2 classes
      wellbeing: 'Medium' // Reported high stress
    },
    details: "Jordan's grades in CS202 have dropped significantly (65%). Attendance has become irregular over the last 2 weeks.",
    interventionStatus: 'pending'
  },
  'student-3': {
    studentId: 'student-3',
    overallRisk: 'Low',
    factors: {
      academic: 'Low',
      attendance: 'Low',
      wellbeing: 'Low'
    },
    details: "Casey is a top performer. No concerns.",
    interventionStatus: 'resolved'
  }
};

// --- Wellbeing Logs ---

export const wellbeingLogs: WellbeingLog[] = [
  { id: 'log-1', studentId: 'student-1', timestamp: '2023-10-24T09:00:00Z', moodScore: 4, stressLevel: 3, sleepHours: 7, notes: "Feeling good about the exam." },
  { id: 'log-2', studentId: 'student-1', timestamp: '2023-10-23T09:00:00Z', moodScore: 3, stressLevel: 5, sleepHours: 6, notes: "A bit tired." },
  { id: 'log-3', studentId: 'student-1', timestamp: '2023-10-22T09:00:00Z', moodScore: 5, stressLevel: 2, sleepHours: 8, notes: "Great weekend!" },
];

// --- Career Milestones ---

export const careerMilestones: CareerMilestone[] = [
    { id: '1', studentId: 'student-1', title: 'Upload Resume for AI Parsing', status: 'completed', category: 'internship' },
    { id: '2', studentId: 'student-1', title: 'Complete "System Design" Module', status: 'in_progress', category: 'skill' },
    { id: '3', studentId: 'student-1', title: 'Mock Interview: Behavioral', status: 'todo', category: 'internship' },
    { id: '4', studentId: 'student-1', title: 'Apply to 5 Summer Internships', status: 'todo', category: 'internship' },
];

// --- Gamification Data ---

export const availableBadges: Badge[] = [
  { id: 'streak_master', name: 'Streak Master', icon: '🔥', description: 'Maintain a 7-day coding streak', unlocked: true },
  { id: 'algo_expert', name: 'Algo Expert', icon: '🧠', description: 'Solve 50 Hard problems', unlocked: false },
  { id: 'bug_hunter', name: 'Bug Hunter', icon: '🐞', description: 'Submit 10 successful test cases', unlocked: false },
  { id: 'community_hero', name: 'Community Hero', icon: '🤝', description: 'Get 50 likes on the forum', unlocked: false },
];

export const initialProblems: CodingProblem[] = [
  { id: 'cp1', title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees", solved: false },
  { id: 'cp2', title: "Climbing Stairs", difficulty: "Easy", topic: "DP", solved: true },
  { id: 'cp3', title: "Number of Islands", difficulty: "Medium", topic: "Graphs", solved: false },
  { id: 'cp4', title: "Two Sum", difficulty: "Easy", topic: "Arrays", solved: true },
  { id: 'cp5', title: "Merge K Sorted Lists", difficulty: "Hard", topic: "Linked Lists", solved: false },
];

export const leaderboard = [
    { name: 'Alex Rivera', xp: 1250, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-PzmmvujnSuwjFctQi2l70lNkKjKuW6vYLhr80vjfsrvb2F-pJ-Az3OXMKx4n9Jam17Q5jxeuBri9gzf_mJcKgtk4IuQcQQqHDxu_EWSdGglavGfLDJRIhNUcNzyzNnk5m-WJvyb29PawyPtNGEzrGIPHLqYi_y_0RP6kZRSslJzqovIxScWWHRfK7X3VsKr4t7txYndU9S_y9M0roXFnx7SXyQ8r1_t6jIeX2v51PK-UchFKYavH1HGLHDdRyeYOHsrDKT_ePwY' },
    { name: 'Casey Smith', xp: 1500, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200' },
    { name: 'Jordan Lee', xp: 800, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200' }
];

// --- Community Data ---

export const initialPosts: ForumPost[] = [
  {
    id: 'p1',
    author: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    category: 'Academics',
    content: 'Has anyone taken Prof. Miller for Advanced Algos? Is the textbook mandatory?',
    timestamp: '2 hours ago',
    likes: 5,
    replies: [
      { id: 'r1', author: 'Mike Chen', content: 'Yes, he uses questions directly from the book for quizzes.', timestamp: '1 hour ago'}
    ]
  },
  {
    id: 'p2',
    author: 'David Okonjo',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    category: 'Career',
    content: 'Just bombed my first technical interview. Feeling pretty low. Any tips for bouncing back?',
    timestamp: '5 hours ago',
    likes: 12,
    replies: []
  }
];

export const contacts: ChatContact[] = [
    { id: 'c1', name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=200', status: 'online', major: 'Computer Science' },
    { id: 'c2', name: 'Jordan Smith', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200', status: 'offline', major: 'Psychology' },
    { id: 'c3', name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', status: 'online', major: 'Data Science' },
];

export const initialChatHistory: Record<string, ChatMessage[]> = {
    'c1': [
        { id: 'm1', senderId: 'c1', text: 'Hey, are you going to the hackathon?', timestamp: '10:00 AM', isMe: false },
        { id: 'm2', senderId: 'me', text: 'Yeah, I think so! Do you have a team?', timestamp: '10:05 AM', isMe: true },
    ],
    'c2': [],
    'c3': []
};

// --- Finance Data ---

export const spendingData = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 100 },
  { name: 'Books', value: 150 },
  { name: 'Ent.', value: 80 },
];
