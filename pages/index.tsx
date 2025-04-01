import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/lib/types';
import { getProjects } from '@/lib/db';
import Head from 'next/head';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch real projects from Firebase Firestore
        const projects = await getProjects();
        
        // Limit to 3 featured projects
        const featured = projects.slice(0, 3);
        setFeaturedProjects(featured);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
        
        // Fallback to mock data if Firebase fetch fails
        const mockProjects: Project[] = [
          {
            id: '1',
            name: 'Clean Water Initiative',
            description: 'Providing clean water access to drought-affected communities in Eastern Africa.',
            category: 'drought',
            location: 'Kenya',
            targetAmount: 50000,
            raisedAmount: 32500,
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-12-31'),
            ngoId: 'ngo1',
            ngoName: 'WaterAid Africa',
            status: 'active',
            milestones: [
              {
                id: 'm1',
                title: 'Well Construction',
                description: 'Construction of five community wells',
                targetAmount: 25000,
                status: 'completed'
              },
              {
                id: 'm2',
                title: 'Distribution Network',
                description: 'Build water distribution pipelines',
                targetAmount: 15000,
                status: 'in_progress'
              },
              {
                id: 'm3',
                title: 'Education Program',
                description: 'Train community on water conservation',
                targetAmount: 10000,
                status: 'pending'
              }
            ],
            imageUrl: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: '2',
            name: 'Hunger Relief Program',
            description: 'Emergency food distribution to communities affected by severe hunger in the Horn of Africa.',
            category: 'hunger',
            location: 'Somalia',
            targetAmount: 75000,
            raisedAmount: 45000,
            startDate: new Date('2023-02-15'),
            endDate: new Date('2023-12-15'),
            ngoId: 'ngo2',
            ngoName: 'Food Security Alliance',
            status: 'active',
            milestones: [
              {
                id: 'm4',
                title: 'Food Procurement',
                description: 'Purchase emergency food supplies',
                targetAmount: 40000,
                status: 'completed'
              },
              {
                id: 'm5',
                title: 'Distribution Centers',
                description: 'Establish regional distribution hubs',
                targetAmount: 20000,
                status: 'in_progress'
              },
              {
                id: 'm6',
                title: 'Sustainable Agriculture',
                description: 'Provide farming tools and seeds',
                targetAmount: 15000,
                status: 'pending'
              }
            ],
            imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: '3',
            name: 'Economic Empowerment',
            description: 'Microfinance and training program for impoverished communities in urban centers.',
            category: 'poverty',
            location: 'Nigeria',
            targetAmount: 100000,
            raisedAmount: 28000,
            startDate: new Date('2023-03-01'),
            endDate: new Date('2024-03-01'),
            ngoId: 'ngo3',
            ngoName: 'Uplift Africa',
            status: 'active',
            milestones: [
              {
                id: 'm7',
                title: 'Microloans',
                description: 'Provide microloans to 500 entrepreneurs',
                targetAmount: 50000,
                status: 'in_progress'
              },
              {
                id: 'm8',
                title: 'Skills Training',
                description: 'Vocational skills training programs',
                targetAmount: 30000,
                status: 'pending'
              },
              {
                id: 'm9',
                title: 'Market Access',
                description: 'Connect entrepreneurs to markets',
                targetAmount: 20000,
                status: 'pending'
              }
            ],
            imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          }
        ];
        
        setFeaturedProjects(mockProjects);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>FAID - Decentralized Humanitarian Aid Platform</title>
        <meta name="description" content="Transparent, secure, and efficient humanitarian aid powered by Hedera blockchain technology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/world-map-dots.svg')] bg-no-repeat bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36">
            <div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Transparent Humanitarian Aid
                <span className="block text-blue-200">Powered by Hedera</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                FAID creates a transparent, secure, and efficient channel between donors and beneficiaries using Hedera's distributed ledger technology.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link href="/projects" className="btn bg-white text-primary hover:bg-blue-50 font-medium px-6 py-3 rounded-lg">
                  Explore Projects
                </Link>
                <Link href="/dashboard" className="btn bg-blue-700 text-white hover:bg-blue-800 font-medium px-6 py-3 rounded-lg">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" className="w-full h-auto fill-background">
            <path d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,96C672,75,768,53,864,64C960,75,1056,117,1152,133.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">How FAID Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform leverages blockchain technology to ensure every dollar donated reaches its intended destination.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Transparent</h3>
              <p className="text-gray-600">
                Every transaction is recorded on Hedera's distributed ledger, ensuring complete transparency and accountability.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Milestone-Based Funding</h3>
              <p className="text-gray-600">
                Funds are released in stages as project milestones are verified and completed, maximizing impact.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600">
                Track your donations in real-time and see exactly how your contribution is making a difference.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lower Fees</h3>
              <p className="text-gray-600">
                Our blockchain-based approach significantly reduces administrative costs, ensuring more of your donation reaches those in need.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">NGO Verification</h3>
              <p className="text-gray-600">
                All NGOs on our platform are verified to ensure your donations go to legitimate humanitarian projects.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Currencies</h3>
              <p className="text-gray-600">
                Donate using cryptocurrency or traditional currency, with automatic conversion to maximize efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">The Donation Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how your contribution flows through our transparent system from donation to impact.
            </p>
          </div>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 z-10 relative">1</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose a Project</h3>
                <p className="text-gray-600">Browse verified humanitarian projects and select one that aligns with your values.</p>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 z-10 relative">2</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Make a Donation</h3>
                <p className="text-gray-600">Contribute using HBAR, USDC, or other supported currencies with minimal fees.</p>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 z-10 relative">3</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor the project's milestones and see how your donation is being utilized.</p>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 z-10 relative">4</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Impact</h3>
                <p className="text-gray-600">Confirm the completion of milestones through verified proof and transparent reporting.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/projects" className="btn btn-primary px-6 py-3">
              Find Projects to Support
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our community of donors and NGOs working together to create positive change through transparent humanitarian aid.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard" className="btn bg-white text-primary hover:bg-blue-50 px-6 py-3 rounded-lg">
                Start Donating
              </Link>
              <Link href="/projects/create" className="btn bg-blue-700 text-white hover:bg-blue-800 border border-blue-600 px-6 py-3 rounded-lg">
                Create a Project
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Support these high-impact humanitarian projects and make a real difference in people's lives.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/projects" className="btn btn-primary px-8 py-3">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">FAID</h3>
              <p className="mb-4">
                Decentralized humanitarian aid platform powered by Hedera blockchain technology.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/projects" className="hover:text-white">Browse Projects</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/projects/create" className="hover:text-white">Create Project</Link></li>
                <li><Link href="/#features" className="hover:text-white">How It Works</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Hedera Integration</a></li>
                <li><a href="#" className="hover:text-white">Smart Contracts</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2023 FAID Platform. All rights reserved.</p>
              <div className="flex mt-4 md:mt-0 space-x-6">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 