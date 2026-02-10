import { students, riskAssessments, courses } from '../mockData';
import { RiskAssessment, Student, Course } from '../types/schema';

// --- Faculty Service (Simulates Backend Logic) ---

export const getAtRiskStudents = (): { student: Student, assessment: RiskAssessment }[] => {
  return students
    .map(student => ({
      student,
      assessment: riskAssessments[student.id]
    }))
    .filter(item => item.assessment && item.assessment.overallRisk !== 'Low')
    .sort((a, b) => {
      // Sort High risk to the top
      if (a.assessment.overallRisk === 'High') return -1;
      if (b.assessment.overallRisk === 'High') return 1;
      return 0;
    });
};

export const getCourseRoster = (courseId: string): Student[] => {
  // In a real app, we'd query enrollment tables.
  // Here, we'll return all mock students for demo purposes.
  return students;
};

export const getFacultyCourses = (facultyId: string): Course[] => {
  return courses.filter(c => c.instructorId === facultyId);
};
