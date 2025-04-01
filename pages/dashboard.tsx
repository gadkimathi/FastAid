import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/lib/types';
import { getProjects } from '@/lib/db';
import { useRouter } from 'next/router';
import HederaTest from '@/components/HederaTest';

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock transaction data
  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: 'tx1',
      type: 'donation',
      amount: 500,
      project: 'Clean Water Initiative',
      timestamp: new Date('2023-06-15T10:30:00'),
      status: 'confirmed',
      txHash: '0.0.12345678'
    },
    {
      id: 'tx2',
      type: 'milestone',
      amount: 15000,
      project: 'Hunger Relief Program',
      timestamp: new Date('2023-06-10T14:20:00'),
      status: 'confirmed',
      txHash: '0.0.87654321'
    },
    {
      id: 'tx3',
      type: 'donation',
      amount: 1200,
      project: 'Economic Empowerment',
      timestamp: new Date('2023-06-05T09:15:00'),
      status: 'confirmed',
      txHash: '0.0.23456789'
    }
  ]);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        // Add your authentication check here
        setLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In a real app, we would fetch from Firestore
        // For the MVP, we'll use mock data
        
        // Simulate API call
        setTimeout(() => {
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
            },
            {
              id: '4',
              name: 'Sustainable Agriculture',
              description: 'Empowering small-scale farmers with climate-smart agricultural practices and technology.',
              category: 'hunger',
              location: 'Ethiopia',
              targetAmount: 85000,
              raisedAmount: 12000,
              startDate: new Date('2023-04-01'),
              endDate: new Date('2024-04-01'),
              ngoId: 'ngo4',
              ngoName: 'GreenHarvest Africa',
              status: 'active',
              milestones: [
                {
                  id: 'm10',
                  title: 'Farmer Training',
                  description: 'Train 1000 farmers in sustainable methods',
                  targetAmount: 20000,
                  status: 'in_progress'
                },
                {
                  id: 'm11',
                  title: 'Equipment Distribution',
                  description: 'Provide farming equipment to communities',
                  targetAmount: 40000,
                  status: 'pending'
                },
                {
                  id: 'm12',
                  title: 'Market Development',
                  description: 'Create local market systems',
                  targetAmount: 25000,
                  status: 'pending'
                }
              ],
              imageUrl: 'https://images.unsplash.com/photo-1623232527814-0f19407ce624?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            }
          ];
          
          setProjects(mockProjects);
          setFilteredProjects(mockProjects);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Apply filters whenever activeFilter or searchQuery changes
    let filtered = [...projects];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => project.category === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        project => 
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.location.toLowerCase().includes(query) ||
          project.ngoName.toLowerCase().includes(query)
      );
    }
    
    setFilteredProjects(filtered);
  }, [activeFilter, searchQuery, projects]);

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  // Format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Progress indicators for user stats
  const totalDonations = 3;
  const projectsSupported = 2;
  const impactScore = 86;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Dashboard - FAID Platform</title>
        <meta name="description" content="View and manage your humanitarian aid projects" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your projects and track your impact</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link 
                  href="/projects/create" 
                  className="btn btn-primary flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Create Project
                </Link>
              </div>
            </div>
          </header>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Donations</p>
                  <h3 className="text-2xl font-bold text-gray-900 my-1">{formatCurrency(6700)}</h3>
                  <p className="text-green-600 text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5L12 19M12 5L6 11M12 5L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    12% increase
                  </p>
                </div>
                <div className="bg-primary-light p-3 rounded-lg">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.25 18.0001L9 11.2501L13.3064 15.5564C14.5101 13.1881 16.5042 11.2509 19 10.0001M19 10.0001L15.5 10.5001M19 10.0001L18.5 13.5001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${totalDonations * 33}%` }}></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">{totalDonations} donations this month</div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Projects Supported</p>
                  <h3 className="text-2xl font-bold text-gray-900 my-1">{projectsSupported}</h3>
                  <p className="text-green-600 text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5L12 19M12 5L6 11M12 5L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    New project added
                  </p>
                </div>
                <div className="bg-secondary-light p-3 rounded-lg">
                  <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: `${projectsSupported * 25}%` }}></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">Out of {projects.length} active projects</div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Impact Score</p>
                  <h3 className="text-2xl font-bold text-gray-900 my-1">{impactScore}/100</h3>
                  <p className="text-amber-600 text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 19L12 5M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    3 points this week
                  </p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.9395 12.5007C15.9395 15.261 13.7165 17.5007 11.0028 17.5007C8.28902 17.5007 6.06602 15.261 6.06602 12.5007C6.06602 9.74041 8.28902 7.50073 11.0028 7.50073C13.7165 7.50073 15.9395 9.74041 15.9395 12.5007Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M11 2V4M11 21V23M4.20577 4.2318L5.62487 5.65091M16.3759 16.351L17.7951 17.7701M2 12H4M18 12H20M4.20577 20.7692L5.62487 19.3501M16.3759 8.65091L17.7951 7.2318" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${impactScore}%` }}></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">Based on your donations and engagement</div>
            </div>
          </div>
          
          {/* Projects Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900">Projects</h2>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
                {/* Search input */}
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    className="input pl-10" 
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Filter tabs */}
                <div className="flex space-x-2">
                  <button 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeFilter === 'all' 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeFilter === 'drought' 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveFilter('drought')}
                  >
                    Drought
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeFilter === 'hunger' 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveFilter('hunger')}
                  >
                    Hunger
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeFilter === 'poverty' 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveFilter('poverty')}
                  >
                    Poverty
                  </button>
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="relative w-20 h-20">
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200"></div>
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary animate-spin"></div>
                </div>
              </div>
            ) : (
              <>
                {filteredProjects.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                    <button 
                      className="btn btn-outline"
                      onClick={() => {
                        setActiveFilter('all');
                        setSearchQuery('');
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
          
          {/* Recent Transactions */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Recent Transactions</h2>
            
            <div className="overflow-hidden bg-white rounded-xl shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tx Hash
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {transaction.type === 'donation' ? (
                            <span className="bg-primary-light text-primary px-2 py-1 rounded-md text-xs font-medium">
                              Donation
                            </span>
                          ) : (
                            <span className="bg-secondary-light text-secondary px-2 py-1 rounded-md text-xs font-medium">
                              Milestone
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.project}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{formatDate(transaction.timestamp)}</div>
                        <div className="text-xs">{formatTime(transaction.timestamp)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a 
                          href={`https://hashscan.io/testnet/transaction/${transaction.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          {transaction.txHash.substring(0, 6)}...
                          <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          
          {/* HBAR Balance Test Component */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">HBAR Balance Test</h2>
            
            <HederaTest />
          </section>
        </div>
      </main>
    </div>
  );
} 