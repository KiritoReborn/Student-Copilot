import { RiskLevel, StudentProfile, AcademicMetric, CareerMilestone, ForumPost, Badge, CodingProblem, ChatContact, ChatMessage } from './types';

export const currentUser: StudentProfile = {
  id: 'st-12345',
  name: 'Alex Rivera',
  major: 'Computer Science',
  year: 'Junior',
  university: 'State University of Tech',
  avatar: 'https://picsum.photos/200',
  xp: 1250,
  level: 5,
  badges: ['streak_master']
};

export const academicMetrics: AcademicMetric[] = [
  { subject: 'Data Structures', grade: 88, attendance: 95, trend: 'up' },
  { subject: 'Linear Algebra', grade: 72, attendance: 80, trend: 'down' },
  { subject: 'Web Development', grade: 94, attendance: 100, trend: 'stable' },
  { subject: 'Ethics in AI', grade: 85, attendance: 90, trend: 'up' },
];

export const dropoutRiskAnalysis = {
  level: RiskLevel.LOW,
  factors: [
    "Consistent LMS login activity.",
    "Assignment submission rate > 95%.",
    "Slight dip in Linear Algebra attendance (needs attention)."
  ],
  supportAction: "Schedule a 15-min chat with Prof. Johnson regarding Linear Algebra."
};

export const careerRoadmap: CareerMilestone[] = [
  { id: '1', title: 'Upload Resume for AI Parsing', completed: true, category: 'resume' },
  { id: '2', title: 'Complete "System Design" Module', completed: false, category: 'skill' },
  { id: '3', title: 'Mock Interview: Behavioral', completed: false, category: 'interview' },
  { id: '4', title: 'Apply to 5 Summer Internships', completed: false, category: 'resume' },
];

export const initialPosts: ForumPost[] = [
  {
    id: 'p1',
    author: 'Sarah Jenkins',
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
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
    authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    category: 'Career',
    content: 'Just bombed my first technical interview. Feeling pretty low. Any tips for bouncing back?',
    timestamp: '5 hours ago',
    likes: 12,
    replies: []
  }
];

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
  { name: 'Alex Rivera', xp: 1250, avatar: 'https://picsum.photos/200' },
  { name: 'Priya Patel', xp: 1400, avatar: 'https://i.pravatar.cc/150?u=priya' },
  { name: 'Jordan Smith', xp: 1100, avatar: 'https://i.pravatar.cc/150?u=jordan' },
];

export const spendingData = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 100 },
  { name: 'Books', value: 150 },
  { name: 'Ent.', value: 80 },
];

export const contacts: ChatContact[] = [
    { id: 'c1', name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=priya', status: 'online', major: 'Computer Science' },
    { id: 'c2', name: 'Jordan Smith', avatar: 'https://i.pravatar.cc/150?u=jordan', status: 'offline', major: 'Psychology' },
    { id: 'c3', name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?u=mike', status: 'online', major: 'Data Science' },
];

export const initialChatHistory: Record<string, ChatMessage[]> = {
    'c1': [
        { id: 'm1', senderId: 'c1', text: 'Hey, are you going to the hackathon?', timestamp: '10:00 AM', isMe: false },
        { id: 'm2', senderId: 'me', text: 'Yeah, I think so! Do you have a team?', timestamp: '10:05 AM', isMe: true },
    ],
    'c2': [],
    'c3': []
};
