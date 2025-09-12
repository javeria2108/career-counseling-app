import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background with floating elements - similar to landing page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-highlight rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-accent rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-accent-light rounded-full opacity-25 animate-ping"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-overlay backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center">
                <span className="text-btn-text font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-heading">CareerPath</span>
            </div>
            <a
              href="/"
              className="text-subtle hover:text-accent-light transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default AuthLayout;
