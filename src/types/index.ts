export type UserRole = 'student' | 'instructor';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  major?: string;
  department?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  semester: string;
  instructorId: string;
  instructorName: string;
  classroom: Classroom;
  schedule: string;
}

export interface Classroom {
  id: string;
  building: string;
  roomNumber: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
}

export interface ClassSession {
  id: string;
  courseId: string;
  date: string;
  startTime: string;
  endTime: string;
  classroomId: string;
  isActive: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  sessionId: string;
  timestamp: string;
  status: 'present' | 'absent' | 'late';
  locationCoordinate: {
    latitude: number;
    longitude: number;
  };
}

export interface LocationState {
  isLoading: boolean;
  isWithinRange: boolean;
  error: string | null;
  currentPosition: GeolocationPosition | null;
}
