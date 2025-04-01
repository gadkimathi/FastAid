import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import MilestoneCard from '@/components/MilestoneCard';
import { Project, Donation, Transaction } from '@/lib/types';
import { getProjectById, getDonations, getTransactions } from '@/lib/db';
import { releaseMilestoneFunds, submitMessage } from '@/lib/hedera';

export default function ProjectDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [project, setProject] = useState<Project | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [processingDonation, setProcessingDonation] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id) return;
      
      try {
        // In a real app, we would fetch from Firestore
        // For the MVP demo, we'll use mock data
        setTimeout(() => {
          const mockProject: Project = {
            id: id as string,
            name: 'Clean Water Initiative',
            description: 'Providing clean water access to drought-affected communities in Eastern Africa. This project aims to build sustainable water infrastructure for long-term solutions to drought and water scarcity.',
            category: 'drought',
            location: 'Kenya',
            targetAmount: 50000,
            raisedAmount: 32500,
            startDate: new Date('2023-01-01'),
            endDate: new Date('2023-12-31'),
            ngoId: 'ngo1',
            ngoName: 'WaterAid Africa',
            status: 'active',
            topicId: '0.0.12345',
            tokenId: '0.0.67890',
            contractId: '0.0.54321',
            milestones: [
              {
                id: 'm1',
                title: 'Well Construction',
                description: 'Construction of five community wells in drought-affected regions to provide sustainable water access.',
                targetAmount: 25000,
                status: 'completed',
                completedDate: new Date('2023-06-15'),
                proofHash: '0x3a1b2c3d4e5f...'
              },
              {
                id: 'm2',
                title: 'Distribution Network',
                description: 'Build water distribution pipelines connecting wells to community centers and residential areas.',
                targetAmount: 15000,
                status: 'in_progress'
              },
              {
                id: 'm3',
                title: 'Education Program',
                description: 'Train community on water conservation techniques and sustainable water management practices.',
                targetAmount: 10000,
                status: 'pending'
              }
            ],
            imageUrl: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          };
          
          const mockDonations: Donation[] = [
            {
              id: 'd1',
              amount: 5000,
              donorId: 'user1',
              donorName: 'John Smith',
              projectId: id as string,
              projectName: 'Clean Water Initiative',
              timestamp: new Date('2023-02-15'),
              transactionId: '0.0.123456@1677628800.000000000'
            },
            {
              id: 'd2',
              amount: 10000,
              donorId: 'user2',
              donorName: 'Sarah Johnson',
              projectId: id as string,
              projectName: 'Clean Water Initiative',
              timestamp: new Date('2023-03-01'),
              transactionId: '0.0.123457@1677715200.000000000'
            },
            {
              id: 'd3',
              amount: 7500,
              donorId: 'user3',
              donorName: 'Michael Brown',
              projectId: id as string,
              projectName: 'Clean Water Initiative',
              timestamp: new Date('2023-04-10'),
              transactionId: '0.0.123458@1681171200.000000000'
            }
          ];
          
          const mockTransactions: Transaction[] = [
            {
              id: 't1',
              type: 'donation',
              amount: 5000,
              fromAccountId: '0.0.111111',
              toAccountId: '0.0.222222',
              projectId: id as string,
              timestamp: new Date('2023-02-15'),
              transactionId: '0.0.123456@1677628800.000000000',
              status: 'confirmed'
            },
            {
              id: 't2',
              type: 'milestone_release',
              amount: 25000,
              fromAccountId: '0.0.222222',
              toAccountId: '0.0.333333',
              projectId: id as string,
              milestoneId: 'm1',
              timestamp: new Date('2023-06-20'),
              transactionId: '0.0.123459@1687305600.000000000',
              status: 'confirmed'
            }
          ];
          
          setProject(mockProject);
          setDonations(mockDonations);
          setTransactions(mockTransactions);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching project data:', error);
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donationAmount || isNaN(Number(donationAmount)) || Number(donationAmount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }
    
    setProcessingDonation(true);
    
    try {
      // In a real app, we would call Hedera SDK to process the donation
      // For the MVP demo, we'll just simulate it
      
      setTimeout(() => {
        alert(`Thank you for your donation of $${donationAmount}! In a production app, this would connect to Hedera SDK.`);
        setDonationAmount('');
        setProcessingDonation(false);
        
        // Update the mock data with the new donation
        if (project) {
          setProject({
            ...project,
            raisedAmount: project.raisedAmount + Number(donationAmount)
          });
          
          const newDonation: Donation = {
            id: `d${donations.length + 1}`,
            amount: Number(donationAmount),
            donorId: 'current-user',
            donorName: 'You (Demo User)',
            projectId: project.id,
            projectName: project.name,
            timestamp: new Date(),
            transactionId: `0.0.123460@${Math.floor(Date.now() / 1000)}.000000000`
          };
          
          setDonations([newDonation, ...donations]);
          
          const newTransaction: Transaction = {
            id: `t${transactions.length + 1}`,
            type: 'donation',
            amount: Number(donationAmount),
            fromAccountId: '0.0.111111',
            toAccountId: '0.0.222222',
            projectId: project.id,
            timestamp: new Date(),
            transactionId: `0.0.123460@${Math.floor(Date.now() / 1000)}.000000000`,
            status: 'confirmed'
          };
          
          setTransactions([newTransaction, ...transactions]);
        }
      }, 2000);
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('An error occurred while processing your donation. Please try again.');
      setProcessingDonation(false);
    }
  };

  const handleVerifyMilestone = async (milestoneId: string) => {
    try {
      // In a real app, we would call Hedera SDK to verify the milestone and release funds
      // For the MVP demo, we'll just simulate it
      
      alert(`In a production app, this would connect to Hedera to verify milestone ${milestoneId} and release funds.`);
      
      // Update the mock data
      if (project) {
        const updatedMilestones = project.milestones.map(m => 
          m.id === milestoneId ? { ...m, status: 'verified' as const } : m
        );
        
        setProject({
          ...project,
          milestones: updatedMilestones
        });
      }
    } catch (error) {
      console.error('Error verifying milestone:', error);
      alert('An error occurred while verifying the milestone. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
            <Link href="/projects" className="btn btn-primary">
              Browse Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate progress percentage
  const progressPercentage = Math.min(
    Math.round((project.raisedAmount / project.targetAmount) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/projects" className="text-primary hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Projects
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="relative w-full h-80 rounded-xl overflow-hidden mb-6">
              {project.imageUrl ? (
                <img 
                  src={project.imageUrl} 
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                  No image available
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full text-sm font-medium">
                {project.category}
              </div>
            </div>
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <span className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {project.location}
                </span>
                <span className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  {project.ngoName}
                </span>
                <span className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  End Date: {new Date(project.endDate).toLocaleDateString()}
                </span>
                <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'active' ? 'bg-green-100 text-green-800' : 
                  project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  Status: {project.status}
                </span>
              </div>
              
              <p className="text-gray-600">{project.description}</p>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Milestones</h2>
              <div className="space-y-4">
                {project.milestones.map((milestone, index) => (
                  <MilestoneCard 
                    key={milestone.id} 
                    milestone={milestone} 
                    index={index}
                    onVerify={handleVerifyMilestone}
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Donations</h2>
              {donations.length === 0 ? (
                <p className="text-gray-600">No donations yet. Be the first to donate!</p>
              ) : (
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <div key={donation.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between">
                        <span className="font-medium">{donation.donorName}</span>
                        <span className="text-green-600 font-medium">${donation.amount}</span>
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>{new Date(donation.timestamp).toLocaleDateString()}</span>
                        <a 
                          href={`https://hashscan.io/testnet/transaction/${encodeURIComponent(donation.transactionId)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          View on HashScan
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Hedera Transaction Records */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction Records</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 uppercase text-sm">
                      <th className="py-3 px-4 text-left">Type</th>
                      <th className="py-3 px-4 text-left">Amount</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-t">
                        <td className="py-3 px-4 capitalize">
                          {tx.type.replace('_', ' ')}
                        </td>
                        <td className="py-3 px-4">${tx.amount}</td>
                        <td className="py-3 px-4">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tx.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <a 
                            href={`https://hashscan.io/testnet/transaction/${encodeURIComponent(tx.transactionId)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            {tx.transactionId.substring(0, 10)}...
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="card sticky top-6">
              <h3 className="text-xl font-bold mb-4">Funding Progress</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between text-lg mb-6">
                <span className="text-gray-600">Raised: <span className="font-semibold text-gray-800">${project.raisedAmount}</span></span>
                <span className="text-gray-600">Goal: <span className="font-semibold text-gray-800">${project.targetAmount}</span></span>
              </div>
              
              {/* Donation Form */}
              <form onSubmit={handleDonate} className="mb-6">
                <div className="mb-4">
                  <label htmlFor="donation-amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Donation Amount (USD)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="donation-amount"
                      name="donation-amount"
                      min="1"
                      step="1"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3"
                  disabled={processingDonation}
                >
                  {processingDonation ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Donate Now'
                  )}
                </button>
              </form>
              
              <div className="text-sm text-gray-500 mb-6">
                <p className="mb-2">Your donation will be processed using Hedera Token Service (HTS) on the Testnet.</p>
                <p className="mb-2">Funds will be locked in a smart contract and released only when project milestones are verified.</p>
                <p>All transactions are publicly recorded on Hedera's ledger for complete transparency.</p>
              </div>
              
              {/* Project Info */}
              <div className="border-t pt-6">
                <h4 className="font-medium mb-2">Blockchain Details</h4>
                <ul className="space-y-2 text-sm">
                  {project.topicId && (
                    <li className="flex justify-between">
                      <span className="text-gray-600">Topic ID:</span>
                      <a 
                        href={`https://hashscan.io/testnet/topic/${project.topicId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {project.topicId}
                      </a>
                    </li>
                  )}
                  {project.tokenId && (
                    <li className="flex justify-between">
                      <span className="text-gray-600">Token ID:</span>
                      <a 
                        href={`https://hashscan.io/testnet/token/${project.tokenId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {project.tokenId}
                      </a>
                    </li>
                  )}
                  {project.contractId && (
                    <li className="flex justify-between">
                      <span className="text-gray-600">Contract ID:</span>
                      <a 
                        href={`https://hashscan.io/testnet/contract/${project.contractId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {project.contractId}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 