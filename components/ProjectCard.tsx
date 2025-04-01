import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { makeDonation, usdToHbar } from '@/lib/hedera';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [donationAmount, setDonationAmount] = useState('');
  const [isDonating, setIsDonating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDonate = async () => {
    if (!donationAmount || isNaN(Number(donationAmount))) {
      setError('Please enter a valid amount');
      return;
    }

    setIsDonating(true);
    setError(null);
    setSuccess(false);

    try {
      // Convert USD amount to HBAR
      const hbarAmount = usdToHbar(Number(donationAmount));
      
      // Make the donation
      const result = await makeDonation(project.ngoId, hbarAmount);
      
      if (result.success) {
        setSuccess(true);
        setDonationAmount('');
      }
    } catch (err) {
      setError('Failed to process donation. Please try again.');
      console.error(err);
    } finally {
      setIsDonating(false);
    }
  };

  const progress = (project.raisedAmount / project.targetAmount) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-48">
        <Image
          src={project.imageUrl || '/images/default-project.jpg'}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary bg-primary-light px-2 py-1 rounded">
            {project.category}
          </span>
          <span className="text-sm text-gray-500">
            {project.location}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {project.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">
          {project.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Raised</span>
            <span className="font-medium text-gray-900">
              ${project.raisedAmount.toLocaleString()} / ${project.targetAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Donation Form */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Enter amount in USD"
              className="flex-1 input"
              disabled={isDonating}
            />
            <button
              onClick={handleDonate}
              disabled={isDonating || !donationAmount}
              className={`btn btn-primary ${isDonating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isDonating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Donate'
              )}
            </button>
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          {success && (
            <p className="text-green-600 text-sm">
              Donation successful! Thank you for your support.
            </p>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Link 
            href={`/projects/${project.id}`}
            className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
          >
            View Details
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 