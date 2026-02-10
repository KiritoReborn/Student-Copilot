import { currentUser, wellbeingLogs as initialLogs } from '../mockData';
import { WellbeingLog, Appointment, Counselor } from '../types/schema';

/**
 * SIMULATED DATABASE SERVICE
 * In a real application, this would connect to PostgreSQL/MongoDB.
 * Here, it aggregates data from various modules to provide a holistic view for the AI.
 */

// Mock Database State (Mutable for the session)
let wellnessLogs: WellbeingLog[] = [...initialLogs];
let appointments: Appointment[] = [];

export const counselors: Counselor[] = [
  { 
    id: 'dr-sarah', 
    name: 'Dr. Sarah Jenkins', 
    specialty: 'Academic Stress & Burnout', 
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    availableSlots: ['Mon 10:00 AM', 'Tue 2:00 PM', 'Wed 11:00 AM'] 
  },
  { 
    id: 'mr-david', 
    name: 'Mr. David Chen', 
    specialty: 'Career Anxiety & Motivation', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    availableSlots: ['Mon 3:00 PM', 'Thu 10:00 AM', 'Fri 1:00 PM'] 
  }
];

export const db = {
  // Aggregates all data points to detect well-being
  getStudentHolisticData: () => {
    // 1. Calculate Academic Pressure (Mocked for now)
    const avgAttendance = 88;
    const lowestGrade = 75;
    
    // 2. Calculate Coding Activity (Stress/Grind indicator)
    const solvedProblems = 15;

    // 3. Financial Stress
    const totalSpent = 450;

    // 4. Recent Sleep & Mood
    const recentLogs = wellnessLogs.slice(0, 3);
    const avgSleep = recentLogs.reduce((acc, curr) => acc + (curr.sleepHours || 7), 0) / (recentLogs.length || 1);
    const avgMood = recentLogs.reduce((acc, curr) => acc + (curr.moodScore || 3), 0) / (recentLogs.length || 1);

    return {
      studentName: currentUser.name,
      academic: { avgAttendance, lowestGrade },
      coding: { solvedProblems },
      finance: { totalSpent },
      wellness: { avgSleep, avgMood, logs: wellnessLogs }
    };
  },

  addWellnessLog: (log: Partial<WellbeingLog>) => {
    const newLog: WellbeingLog = {
      id: Date.now().toString(),
      studentId: currentUser.id,
      timestamp: new Date().toISOString(),
      moodScore: log.moodScore || 3,
      stressLevel: log.stressLevel || 5,
      sleepHours: log.sleepHours || 7,
      socialBattery: log.socialBattery || 50,
      notes: log.notes || '',
      ...log
    };
    wellnessLogs = [newLog, ...wellnessLogs];
    return newLog;
  },

  getRecentLogs: () => wellnessLogs,

  bookAppointment: (counselorId: string, slot: string): Appointment => {
    const counselor = counselors.find(c => c.id === counselorId);
    if (!counselor) throw new Error("Counselor not found");

    const newAppt: Appointment = {
      id: Date.now().toString(),
      counselorId,
      studentId: currentUser.id,
      date: new Date().toLocaleDateString(),
      time: slot,
      // Generate a realistic looking Google Meet link
      meetLink: `https://meet.google.com/${Math.random().toString(36).substring(7)}-${Math.random().toString(36).substring(7)}`,
      status: 'scheduled'
    };
    appointments.push(newAppt);
    return newAppt;
  },

  getAppointments: () => appointments
};
