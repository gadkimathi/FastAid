import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Project } from '@/lib/types';

export default function DonatePage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('hbar');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [donationStatus, setDonationStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [transactionInfo, setTransactionInfo] = useState<any>(null);
  
  // This is just for display, in a real app would be dynamic
  const exchangeRate = 0.068; // USD to HBAR (just an example rate)
  
  useEffect(() => {
    if (!id) return;
    
    const fetchProject = async () => {
      try {
        // In a real app, we would fetch from Firestore
        // For the MVP, we'll use mock data
        setTimeout(() => {
          const mockProject: Project = {
            id: id as string,
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
          };
          
          setProject(mockProject);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Calculate progress percentage
  const calculateProgress = (raised: number, target: number) => {
    return Math.min(Math.round((raised / target) * 100), 100);
  };
  
  // Handle donation amount selection
  const handleAmountSelect = (amount: number) => {
    setCustomAmount(false);
    setDonationAmount(amount);
  };
  
  // Handle custom amount input
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setDonationAmount(value);
    } else {
      setDonationAmount(0);
    }
  };
  
  // Handle donation submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (donationAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    
    setIsSubmitting(true);
    setDonationStatus('processing');
    
    try {
      // In a real app, we would use the Hedera SDK to create a transaction
      // For the MVP, we'll simulate a transaction
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful transaction
      const mockTransactionInfo = {
        id: `0.0.${Math.floor(Math.random() * 1000000)}`,
        amount: donationAmount,
        amountInHbar: donationAmount / exchangeRate,
        timestamp: new Date(),
        status: 'SUCCESS',
        memo: message || 'Donation to ' + project?.name,
      };
      
      setTransactionInfo(mockTransactionInfo);
      setDonationStatus('success');
      
      // In a real app, we would update the project's raised amount in Firestore
      
    } catch (error) {
      console.error('Error processing donation:', error);
      setDonationStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{project ? `Donate to ${project.name}` : 'Make a Donation'} - FAID Platform</title>
        <meta name="description" content="Make a secure donation using Hedera cryptocurrency" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-5xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200"></div>
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary animate-spin"></div>
              </div>
            </div>
          ) : donationStatus === 'success' ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-600 text-lg mb-6">Your donation has been processed successfully.</p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Transaction Details</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(transactionInfo.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">HBAR Amount:</span>
                    <span className="font-medium text-gray-900">{transactionInfo.amountInHbar.toFixed(2)} ℏ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <a 
                      href={`https://hashscan.io/testnet/transaction/${transactionInfo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      {transactionInfo.id}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {transactionInfo.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href={`/projects/${id}`} className="btn btn-outline">
                  Back to Project
                </Link>
                <Link href="/dashboard" className="btn btn-primary">
                  View Your Dashboard
                </Link>
              </div>
            </div>
          ) : project ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Project Overview */}
              <div>
                <Link href={`/projects/${id}`} className="inline-flex items-center text-primary hover:underline mb-6">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Project
                </Link>
                
                <div className="relative h-60 rounded-xl overflow-hidden mb-4">
                  <img 
                    src={project.imageUrl} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">{project.name}</h1>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" fill="currentColor"/>
                    </svg>
                    {project.location}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-6">{project.description}</p>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Funding Progress</span>
                    <span className="text-gray-900 font-semibold">{calculateProgress(project.raisedAmount, project.targetAmount)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${calculateProgress(project.raisedAmount, project.targetAmount)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Raised: <span className="font-semibold text-primary">{formatCurrency(project.raisedAmount)}</span></span>
                    <span className="text-gray-600">Goal: <span className="font-semibold text-gray-900">{formatCurrency(project.targetAmount)}</span></span>
                  </div>
                </div>
                
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-center mb-3">
                    <svg className="w-5 h-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M12 3L4.93 6.97C4.65568 7.11587 4.42669 7.33549 4.27397 7.60841C4.12126 7.88134 4.04932 8.19355 4.064 8.507L4.57 16.057C4.59306 16.5457 4.79909 17.0062 5.14679 17.3467C5.49448 17.6872 5.96093 17.8838 6.45 17.897L17.55 17.997C18.0381 17.9886 18.5052 17.7975 18.854 17.4618C19.2028 17.126 19.4112 16.6699 19.438 16.183L19.938 8.603C19.9446 8.28063 19.8636 7.96255 19.7022 7.68536C19.5409 7.40818 19.3045 7.18729 19.023 7.049L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className="font-medium text-gray-900">Organized by</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-600 font-medium">{project.ngoName.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{project.ngoName}</div>
                        <div className="text-xs text-gray-500">Verified Organization</div>
                      </div>
                    </div>
                    <a href="#" className="text-primary text-sm hover:underline">View Profile</a>
                  </div>
                </div>
              </div>
              
              {/* Donation Form */}
              <div>
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Make a Donation</h2>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Donation Amount */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">Select Amount</label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {[25, 50, 100].map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            className={`py-3 rounded-md transition-colors ${
                              !customAmount && donationAmount === amount
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                            onClick={() => handleAmountSelect(amount)}
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="customAmount"
                          checked={customAmount}
                          onChange={() => setCustomAmount(!customAmount)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="customAmount" className="ml-2 block text-sm text-gray-700">
                          Custom amount
                        </label>
                      </div>
                      
                      {customAmount && (
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            min="1"
                            placeholder="Enter amount"
                            value={donationAmount || ''}
                            onChange={handleCustomAmountChange}
                            className="input pl-7"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Payment Method */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          className={`flex items-center justify-center py-3 px-4 rounded-md border transition-colors ${
                            paymentMethod === 'hbar'
                              ? 'border-primary bg-primary-light text-primary' 
                              : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
                          }`}
                          onClick={() => setPaymentMethod('hbar')}
                        >
                          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.97 6.62L19.97 6.62C20.5012 7.14323 20.748 7.86701 20.6605 8.59284C20.573 9.31866 20.1624 9.96726 19.54 10.34L19.54 10.34L13.06 14.34C12.7342 14.5484 12.371 14.6598 12 14.6598C11.629 14.6598 11.2658 14.5484 10.94 14.34L10.94 14.34L4.46 10.34C3.84058 9.9591 3.43547 9.31007 3.35433 8.58653C3.27319 7.86299 3.5276 7.14324 4.06 6.62L4.06 6.62L6.4 4.27C6.61095 4.05713 6.86323 3.88891 7.14 3.77627C7.41776 3.66258 7.7151 3.60596 8.01 3.61L8.01 3.61L16.01 3.61C16.605 3.60906 17.1783 3.82298 17.61 4.21L17.61 4.21L19.97 6.62Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.94 14.34V19.37C10.94 19.7492 11.0527 20.1133 11.2603 20.4108C11.4678 20.7083 11.7579 20.9225 12.092 21.021C12.426 21.1195 12.7836 21.0969 15.11 20.9561C13.0312 19.7754 11.5685 17.8358 10.94 15.58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          HBAR
                        </button>
                        <button
                          type="button"
                          className={`flex items-center justify-center py-3 px-4 rounded-md border transition-colors ${
                            paymentMethod === 'usdc'
                              ? 'border-primary bg-primary-light text-primary' 
                              : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
                          }`}
                          onClick={() => setPaymentMethod('usdc')}
                        >
                          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.5 10.5H16.5M16.5 10.5C15.5 13.5 14 14.5 12 14.5C10 14.5 8.16667 13.3333 7.5 10.5M16.5 10.5C16.8333 9.5 17 8 16.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          USDC
                        </button>
                      </div>
                      
                      {paymentMethod === 'hbar' && (
                        <div className="mt-3 text-sm flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-gray-600">
                            Approximately <span className="font-medium">{(donationAmount / exchangeRate).toFixed(2)} ℏ</span> ({exchangeRate} USD/HBAR)
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Additional Options */}
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="anonymousDonation"
                          checked={isAnonymous}
                          onChange={() => setIsAnonymous(!isAnonymous)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="anonymousDonation" className="ml-2 block text-sm text-gray-700">
                          Make this donation anonymous
                        </label>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Add a message (optional)</label>
                        <textarea
                          id="message"
                          rows={3}
                          placeholder="Your message of support..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="input w-full"
                        ></textarea>
                      </div>
                    </div>
                    
                    {/* Donation Security */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900">Secure Donation via Hedera</h3>
                          <p className="text-sm text-gray-600">
                            Your donation will be securely processed on the Hedera network and verified on the public ledger.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || donationAmount <= 0}
                      className={`w-full btn ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'btn-primary'
                      } py-3 font-medium text-base`}
                    >
                      {donationStatus === 'processing' ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : donationStatus === 'error' ? (
                        'Try Again'
                      ) : (
                        `Donate ${formatCurrency(donationAmount)}`
                      )}
                    </button>
                    
                    {donationStatus === 'error' && (
                      <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                        There was an error processing your donation. Please try again.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
              <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
              <Link href="/projects" className="btn btn-primary">
                View All Projects
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 