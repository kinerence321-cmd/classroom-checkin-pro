import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';
import { GraduationCap, MapPin, Clock, Shield, ChevronRight } from 'lucide-react';

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: MapPin,
      title: 'Location Verified',
      description: 'Check in only when you\'re physically present in the classroom',
    },
    {
      icon: Clock,
      title: 'Real-Time Tracking',
      description: 'Instant attendance confirmation for students and instructors',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Anti-fraud measures ensure accurate attendance records',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                <GraduationCap className="h-4 w-4" />
                <span>Streamlining attendance since 2025</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                  Classroom
                  <span className="block text-gradient">Check-In</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  The modern way to track attendance. Location-verified check-ins 
                  ensure students are where they need to be.
                </p>
              </div>

              {!showAuth ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="xl" 
                    variant="hero"
                    onClick={() => setShowAuth(true)}
                  >
                    Get Started
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <Button 
                    size="xl" 
                    variant="outline"
                    onClick={() => {
                      setShowAuth(true);
                      setShowLogin(true);
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAuth(false)}
                  className="text-muted-foreground"
                >
                  ← Back to home
                </Button>
              )}

              {/* Features */}
              {!showAuth && (
                <div className="grid gap-4 pt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  {features.map((feature, index) => (
                    <div 
                      key={feature.title}
                      className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-custom-sm hover:shadow-custom-md transition-all duration-200"
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-primary">
                        <feature.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Content - Auth Forms */}
            <div className="flex justify-center lg:justify-end">
              {showAuth ? (
                showLogin ? (
                  <LoginForm onToggle={() => setShowLogin(false)} />
                ) : (
                  <RegisterForm onToggle={() => setShowLogin(true)} />
                )
              ) : (
                <div className="relative w-full max-w-md aspect-square animate-fade-in">
                  {/* Decorative Card Stack */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-primary transform rotate-6 opacity-20" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-accent transform -rotate-3 opacity-30" />
                  <div className="absolute inset-0 rounded-3xl bg-card shadow-custom-xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="h-24 w-24 mx-auto rounded-2xl bg-gradient-hero flex items-center justify-center mb-6 shadow-glow">
                        <GraduationCap className="h-12 w-12 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Ready to Check In?
                      </h3>
                      <p className="text-muted-foreground">
                        Join thousands of students and instructors using our platform
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Classroom Check-In</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Classroom Check-In. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
