import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, User } from 'lucide-react';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <Card 
      className="group overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
      onClick={() => onClick(course)}
    >
      <div className="h-2 bg-primary group-hover:bg-accent transition-all duration-300" />
      <CardContent className="p-5">
        <div className="space-y-3">
          <div>
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              {course.code}
            </span>
            <h3 className="text-lg font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
              {course.name}
            </h3>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{course.instructorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{course.classroom.building}, Room {course.classroom.roomNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{course.schedule}</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {course.semester}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
