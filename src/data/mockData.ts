import type { Course, ClassSession, AttendanceRecord } from '@/types';

// Mock classroom locations (using a generic university location)
export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'College Composition',
    code: 'ENG 101',
    department: 'English',
    semester: 'Fall 2025',
    instructorId: '2',
    instructorName: 'Dr. Sarah Williams',
    classroom: {
      id: 'c1',
      building: 'Liberal Arts Building',
      roomNumber: '201',
      latitude: 40.7128,
      longitude: -74.006,
      radiusMeters: 50,
    },
    schedule: 'Mon, Wed 9:00 AM - 10:15 AM',
  },
  {
    id: '2',
    name: 'World Literature',
    code: 'ENG 201',
    department: 'English',
    semester: 'Fall 2025',
    instructorId: '2',
    instructorName: 'Dr. Sarah Williams',
    classroom: {
      id: 'c2',
      building: 'Liberal Arts Building',
      roomNumber: '305',
      latitude: 40.7128,
      longitude: -74.006,
      radiusMeters: 50,
    },
    schedule: 'Tue, Thu 11:00 AM - 12:15 PM',
  },
  {
    id: '3',
    name: 'Technical Writing',
    code: 'ENG 301',
    department: 'English',
    semester: 'Fall 2025',
    instructorId: '3',
    instructorName: 'Prof. Michael Chen',
    classroom: {
      id: 'c3',
      building: 'Engineering Hall',
      roomNumber: '102',
      latitude: 40.713,
      longitude: -74.005,
      radiusMeters: 50,
    },
    schedule: 'Mon, Wed, Fri 2:00 PM - 2:50 PM',
  },
  {
    id: '4',
    name: 'Principles of Management',
    code: 'BUS 301',
    department: 'Business',
    semester: 'Fall 2025',
    instructorId: '4',
    instructorName: 'Dr. Emily Roberts',
    classroom: {
      id: 'c4',
      building: 'Business Center',
      roomNumber: '401',
      latitude: 40.712,
      longitude: -74.007,
      radiusMeters: 50,
    },
    schedule: 'Tue, Thu 3:30 PM - 4:45 PM',
  },
];

export const mockSessions: ClassSession[] = [
  {
    id: 's1',
    courseId: '1',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:15',
    classroomId: 'c1',
    isActive: true,
  },
  {
    id: 's2',
    courseId: '2',
    date: new Date().toISOString().split('T')[0],
    startTime: '11:00',
    endTime: '12:15',
    classroomId: 'c2',
    isActive: true,
  },
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'a1',
    studentId: '1',
    studentName: 'Alex Johnson',
    sessionId: 's1',
    timestamp: new Date().toISOString(),
    status: 'present',
    locationCoordinate: { latitude: 40.7128, longitude: -74.006 },
  },
];

// Simulate a function that returns enrollment data
export function getEnrolledCourses(studentId: string): Course[] {
  // In a real app, this would filter based on enrollments
  return mockCourses;
}

export function getInstructorCourses(instructorId: string): Course[] {
  return mockCourses.filter(course => course.instructorId === instructorId);
}

export function getActiveSession(courseId: string): ClassSession | undefined {
  return mockSessions.find(session => session.courseId === courseId && session.isActive);
}

export function getAttendanceForSession(sessionId: string): AttendanceRecord[] {
  return mockAttendanceRecords.filter(record => record.sessionId === sessionId);
}
