import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { CourseCard } from '@/components/student/CourseCard';
import { CheckInModal } from '@/components/student/CheckInModal';
import { AttendanceTable } from '@/components/instructor/AttendanceTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getEnrolledCourses, 
  getInstructorCourses, 
  mockAttendanceRecords 
} from '@/data/mockData';
import { 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Calendar,
  TrendingUp 
} from 'lucide-react';
import type { Course, AttendanceRecord } from '@/types';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [selectedCourseForAttendance, setSelectedCourseForAttendance] = useState<Course | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    if (user) {
      if (user.role === 'student') {
        setCourses(getEnrolledCourses(user.id));
      } else {
        const instructorCourses = getInstructorCourses(user.id);
        setCourses(instructorCourses);
        if (instructorCourses.length > 0) {
          setSelectedCourseForAttendance(instructorCourses[0]);
        }
      }
    }
  }, [user, isAuthenticated, navigate]);

  const handleCourseClick = (course: Course) => {
    if (user?.role === 'student') {
      setSelectedCourse(course);
      setIsCheckInModalOpen(true);
    } else {
      setSelectedCourseForAttendance(course);
    }
  };

  const handleCheckIn = (courseId: string, position: GeolocationPosition) => {
    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      studentId: user!.id,
      studentName: `${user!.firstName} ${user!.lastName}`,
      sessionId: `session-${courseId}`,
      timestamp: new Date().toISOString(),
      status: 'present',
      locationCoordinate: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    };
    setAttendanceRecords(prev => [...prev, newRecord]);
  };

  if (!user) return null;

  const isStudent = user.role === 'student';
  const todayDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const checkedInToday = attendanceRecords.filter(
    r => r.studentId === user.id && 
    new Date(r.timestamp).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-muted-foreground mt-1">{todayDate}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-lg animate-slide-up">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{courses.length}</p>
                <p className="text-sm text-muted-foreground">
                  {isStudent ? 'Enrolled Courses' : 'Teaching'}
                </p>
              </div>
            </CardContent>
          </Card>

          {isStudent ? (
            <>
              <Card className="shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{checkedInToday}</p>
                    <p className="text-sm text-muted-foreground">Checked In Today</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">95%</p>
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">2</p>
                    <p className="text-sm text-muted-foreground">Classes Today</p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">127</p>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{attendanceRecords.length}</p>
                    <p className="text-sm text-muted-foreground">Check-ins Today</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">89%</p>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content */}
        {isStudent ? (
          // Student View - Course Grid
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Current Courses</h2>
              <span className="text-sm text-muted-foreground">
                Click a course to check in
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {courses.map((course, index) => (
                <div 
                  key={course.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <CourseCard course={course} onClick={handleCourseClick} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Instructor View - Course Tabs with Attendance
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Class Attendance</h2>

            <Tabs 
              value={selectedCourseForAttendance?.id || courses[0]?.id} 
              onValueChange={(id) => {
                const course = courses.find(c => c.id === id);
                if (course) setSelectedCourseForAttendance(course);
              }}
            >
              <TabsList className="mb-6 flex-wrap h-auto gap-2">
                {courses.map(course => (
                  <TabsTrigger key={course.id} value={course.id} className="px-4">
                    {course.code}
                  </TabsTrigger>
                ))}
              </TabsList>

              {courses.map(course => (
                <TabsContent key={course.id} value={course.id}>
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle>{course.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {course.classroom.building}, Room {course.classroom.roomNumber} • {course.schedule}
                          </p>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => toast.info('Session management coming soon!')}
                        >
                          Start New Session
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <AttendanceTable 
                        records={attendanceRecords.filter(r => r.sessionId.includes(course.id))} 
                        enrolledCount={32}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </main>

      {/* Check-in Modal (Students Only) */}
      <CheckInModal
        course={selectedCourse}
        isOpen={isCheckInModalOpen}
        onClose={() => setIsCheckInModalOpen(false)}
        onCheckIn={handleCheckIn}
      />
    </div>
  );
};

export default Dashboard;
