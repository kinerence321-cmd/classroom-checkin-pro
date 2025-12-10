import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, GraduationCap, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-custom-md">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">Classroom Check-In</span>
            <span className="text-xs text-muted-foreground hidden sm:block">Attendance made easy</span>
          </div>
        </div>

        {isAuthenticated && user && (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 rounded-full bg-muted px-4 py-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs text-muted-foreground capitalize">
                ({user.role})
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
