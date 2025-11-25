import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, BookOpen, Trophy, Zap, Code2, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
          Learn Python Interactively
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Master Python programming through hands-on coding, gamified challenges, and instant feedback.
          No installation required – start coding in your browser!
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/console" className="btn btn-primary text-lg px-8 py-3">
            <Terminal className="w-5 h-5 inline mr-2" />
            Try Console
          </Link>
          <Link to="/lessons" className="btn btn-secondary text-lg px-8 py-3">
            <BookOpen className="w-5 h-5 inline mr-2" />
            Start Learning
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Python Trainer?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Terminal className="w-10 h-10 text-primary-600" />}
            title="Interactive Console"
            description="Run Python code directly in your browser with our powerful WebAssembly-based interpreter."
          />
          <FeatureCard
            icon={<BookOpen className="w-10 h-10 text-primary-600" />}
            title="Progressive Lessons"
            description="Learn from basics to advanced concepts with structured, easy-to-follow lessons."
          />
          <FeatureCard
            icon={<Trophy className="w-10 h-10 text-primary-600" />}
            title="Fun Challenges"
            description="Solve coding challenges, earn achievements, and track your progress."
          />
          <FeatureCard
            icon={<Zap className="w-10 h-10 text-primary-600" />}
            title="Instant Feedback"
            description="Get immediate feedback on your code with detailed error messages and hints."
          />
          <FeatureCard
            icon={<Code2 className="w-10 h-10 text-primary-600" />}
            title="Real Python"
            description="Write real Python code with full standard library support, not a simplified version."
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-primary-600" />}
            title="Community Driven"
            description="Learn from others, share your solutions, and grow together."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="card max-w-2xl mx-auto bg-gradient-to-r from-primary-600 to-purple-600 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Python Journey?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of learners mastering Python through interactive practice.
          </p>
          <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};
