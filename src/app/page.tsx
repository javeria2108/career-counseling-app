const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-heading">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-overlay backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center">
                <span className="text-btn-text font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-heading">CareerPath</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-subtle hover:text-accent-light transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-subtle hover:text-accent-light transition-colors"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-subtle hover:text-accent-light transition-colors"
              >
                About
              </a>
            </div>
            <button className="bg-btn-bg hover:bg-btn-hover text-btn-text px-6 py-2 rounded-lg font-medium border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-12 h-12 bg-highlight rounded-full opacity-15 animate-bounce"></div>
          <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-accent rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <span className="text-heading">Discover Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                    Perfect Career
                  </span>
                  <br />
                  <span className="text-heading">Path</span>
                </h1>
                <p className="text-xl leading-relaxed mb-8 text-subtle">
                  Take scientifically-backed assessments to uncover your
                  strengths, interests, and ideal career matches. Your future
                  starts with understanding yourself.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-accent hover:bg-accent-light text-btn-text px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  Start Free Assessment
                </button>
                <button className="bg-btn-bg hover:bg-btn-hover text-btn-text px-8 py-4 rounded-lg font-semibold text-lg border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-background to-btn-bg/20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-heading">
              Comprehensive Career{" "}
              <span className="text-accent">Assessment Suite</span>
            </h2>
            <p className="text-xl text-subtle max-w-3xl mx-auto">
              Our scientifically-backed assessments help you discover your true
              potential and match you with careers that align with your unique
              strengths.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🧠",
                title: "Aptitude Test",
                description:
                  "Measure your logical reasoning, numerical ability, and problem-solving skills to identify your cognitive strengths.",
              },
              {
                icon: "🎭",
                title: "Personality Test",
                description:
                  "Discover your personality type using proven frameworks like Myers-Briggs and Big Five personality models.",
              },
              {
                icon: "💡",
                title: "Skills & Interest Survey",
                description:
                  "Explore your passions and natural inclinations across various subjects and activities.",
              },
              {
                icon: "⚖️",
                title: "SWOT Analysis",
                description:
                  "Self-assess your Strengths, Weaknesses, Opportunities, and Threats for complete career clarity.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-overlay backdrop-blur-md rounded-xl p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-heading">
                  {feature.title}
                </h3>
                <p className="text-subtle">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-heading">
              Your Journey to{" "}
              <span className="text-accent-light">Career Clarity</span>
            </h2>
            <p className="text-xl text-subtle max-w-3xl mx-auto">
              Simple steps to unlock your potential and discover careers that
              match your unique profile.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description:
                  "Sign up and provide basic information about your education, interests, and career goals.",
              },
              {
                step: "2",
                title: "Complete Assessments",
                description:
                  "Take our comprehensive battery of tests covering aptitude, personality, skills, and interests.",
              },
              {
                step: "3",
                title: "Get Personalized Results",
                description:
                  "Receive detailed career recommendations with reasoning and actionable next steps.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-2xl font-bold text-btn-text mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-heading">
                  {step.title}
                </h3>
                <p className="text-subtle text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/20 via-background to-accent-light/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-heading">
            Ready to Discover Your{" "}
            <span className="text-highlight">Dream Career</span>?
          </h2>
          <p className="text-xl mb-8 text-subtle">
            Join thousands of students who have already found their perfect
            career path through our assessments.
          </p>
          <button className="bg-accent hover:bg-accent-light text-btn-text px-12 py-4 rounded-lg font-semibold text-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            Start Your Free Assessment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-btn-bg py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-lg flex items-center justify-center">
                  <span className="text-btn-text font-bold text-lg">C</span>
                </div>
                <span className="text-xl font-bold text-heading">
                  CareerPath
                </span>
              </div>
              <p className="text-subtle">
                Empowering students to discover their ideal career paths through
                scientific assessments.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-heading">Features</h4>
              <ul className="space-y-2 text-subtle">
                <li>Aptitude Tests</li>
                <li>Personality Assessment</li>
                <li>Skills Survey</li>
                <li>SWOT Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-heading">Company</h4>
              <ul className="space-y-2 text-subtle">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-heading">Support</h4>
              <ul className="space-y-2 text-subtle">
                <li>Help Center</li>
                <li>FAQ</li>
                <li>Student Resources</li>
                <li>Career Guides</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-subtle">
            <p>&copy; 2024 CareerPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
