import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useGeolocation } from '@/hooks/useGeolocation';
import { toast } from 'sonner';
import { 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Navigation,
  AlertTriangle 
} from 'lucide-react';
import type { Course } from '@/types';

interface CheckInModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckIn: (courseId: string, position: GeolocationPosition) => void;
}

export function CheckInModal({ course, isOpen, onClose, onCheckIn }: CheckInModalProps) {
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const { isLoading, isWithinRange, error, currentPosition, checkLocation } = useGeolocation(
    course?.classroom
  );

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen && course) {
      setCheckInSuccess(false);
      checkLocation();
    }
  }, [isOpen, course, checkLocation]);

  const handleCheckIn = async () => {
    if (!course || !currentPosition) return;

    setIsCheckingIn(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onCheckIn(course.id, currentPosition);
    setCheckInSuccess(true);
    setIsCheckingIn(false);
    toast.success(`Successfully checked in for ${course.name}!`);
  };

  const handleClose = () => {
    setCheckInSuccess(false);
    onClose();
  };

  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Checking In for {course.name}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {/* Success State */}
          {checkInSuccess && (
            <div className="flex flex-col items-center text-center space-y-4 animate-scale-in">
              <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Great Job!</h3>
                <p className="text-muted-foreground mt-1">
                  You've successfully checked into {course.name}
                </p>
              </div>
              <Button onClick={handleClose} className="w-full" size="lg">
                Done
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !checkInSuccess && (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-secondary animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Verifying Location</h3>
                <p className="text-muted-foreground mt-1">
                  Please wait while we confirm your position...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && !checkInSuccess && (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Location Error</h3>
                <p className="text-muted-foreground mt-1">{error}</p>
              </div>
              <Button onClick={checkLocation} variant="outline" className="w-full">
                <Navigation className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          )}

          {/* Within Range - Can Check In */}
          {isWithinRange && !isLoading && !checkInSuccess && !error && (
            <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
              <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center animate-pulse-glow">
                <MapPin className="h-10 w-10 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-success">Location Verified</h3>
                <p className="text-muted-foreground mt-1">
                  You're in {course.classroom.building}, Room {course.classroom.roomNumber}
                </p>
              </div>
              <Button 
                onClick={handleCheckIn} 
                variant="success"
                className="w-full" 
                size="lg"
                disabled={isCheckingIn}
              >
                {isCheckingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking In...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Check In Now
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Not Within Range */}
          {!isWithinRange && !isLoading && !checkInSuccess && !error && currentPosition && (
            <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
              <div className="h-20 w-20 rounded-full bg-warning/10 flex items-center justify-center">
                <XCircle className="h-10 w-10 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-warning">Not in Approved Area</h3>
                <p className="text-muted-foreground mt-1">
                  Please proceed to {course.classroom.building}, Room {course.classroom.roomNumber} to check in
                </p>
              </div>
              <div className="w-full space-y-2">
                <Button 
                  onClick={checkLocation} 
                  variant="outline" 
                  className="w-full"
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Refresh Location
                </Button>
                <p className="text-xs text-muted-foreground">
                  Make sure you're inside the classroom and try again
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
