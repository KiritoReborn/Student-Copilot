import { academicMetrics, currentUser, spendingData, initialProblems } from '../mockData';
import { WellnessLog, Appointment, Counselor } from '../types';

/**
 * SIMULATED DATABASE SERVICE
 * In a real application, this would connect to PostgreSQL/MongoDB.
 * Here, it aggregates data from various modules to provide a holistic view for the AI.
 */

// Mock Database Tables
let wellnessLogs: WellnessLog[] = [
  { date: '2023-10-24', mood: 4, sleepHours: 7, socialBattery: 80, waterIntake: 6, notes: "Feeling good" },
  { date: '2023-10-25', mood: 3, sleepHours: 6, socialBattery: 60, waterIntake: 4, notes: "Tired from study" },
  { date: '2023-10-26', mood: 2, sleepHours: 4, socialBattery: 20, waterIntake: 2, notes: "Stressed about exams" },
];

let appointments: Appointment[] = [];

export const counselors: Counselor[] = [
  { 
    id: 'dr-sarah', 
    name: 'Dr. Sarah Jenkins', 
    specialty: 'Academic Stress & Burnout', 
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    availableSlots: ['Mon 10:00 AM', 'Tue 2:00 PM', 'Wed 11:00 AM'] 
  },
  { 
    id: 'mr-david', 
    name: 'Mr. David Chen', 
    specialty: 'Career Anxiety & Motivation', 
    avatar: 'https://i.pravatar.cc/150?u=david',
    availableSlots: ['Mon 3:00 PM', 'Thu 10:00 AM', 'Fri 1:00 PM'] 
  }
];

export const db = {
  // Aggregates all data points to detect well-being
  getStudentHolisticData: () => {
    // 1. Calculate Academic Pressure
    const avgAttendance = academicMetrics.reduce((acc, curr) => acc + curr.attendance, 0) / academicMetrics.length;
    const lowestGrade = Math.min(...academicMetrics.map(m => m.grade));
    
    // 2. Calculate Coding Activity (Stress/Grind indicator)
    const solvedProblems = initialProblems.filter(p => p.solved).length;

    // 3. Financial Stress
    const totalSpent = spendingData.reduce((acc, curr) => acc + curr.value, 0);

    // 4. Recent Sleep & Mood
    const recentLogs = wellnessLogs.slice(0, 3);
    const avgSleep = recentLogs.reduce((acc, curr) => acc + curr.sleepHours, 0) / (recentLogs.length || 1);
    const avgMood = recentLogs.reduce((acc, curr) => acc + curr.mood, 0) / (recentLogs.length || 1);

    return {
      studentName: currentUser.name,
      academic: { avgAttendance, lowestGrade },
      coding: { solvedProblems },
      finance: { totalSpent },
      wellness: { avgSleep, avgMood, logs: wellnessLogs }
    };
  },

  addWellnessLog: (log: WellnessLog) => {
    wellnessLogs = [log, ...wellnessLogs];
    return log;
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
