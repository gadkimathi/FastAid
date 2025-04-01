import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Project, Milestone } from '@/lib/types';
import { createProject } from '@/lib/db';
import { createTopic, createProjectToken, deployMilestoneContract } from '@/lib/hedera';

export default function CreateProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  // Project basic details
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('drought');
  const [location, setLocation] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  // Milestones
  const [milestones, setMilestones] = useState<Partial<Milestone>[]>([
    { title: '', description: '', targetAmount: 0, status: 'pending' }
  ]);
  
  const handleMilestoneChange = (index: number, field: string, value: string | number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = { 
      ...updatedMilestones[index], 
      [field]: field === 'targetAmount' ? Number(value) : value 
    };
    setMilestones(updatedMilestones);
  };
  
  const addMilestone = () => {
    setMilestones([...milestones, { title: '', description: '', targetAmount: 0, status: 'pending' }]);
  };
  
  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      const updatedMilestones = [...milestones];
      updatedMilestones.splice(index, 1);
      setMilestones(updatedMilestones);
    }
  };
  
  const handleNext = () => {
    if (step === 1) {
      // Validate basic details
      if (!projectName || !description || !category || !location || !targetAmount || !startDate || !endDate) {
        alert('Please fill in all required fields.');
        return;
      }
      
      if (isNaN(Number(targetAmount)) || Number(targetAmount) <= 0) {
        alert('Please enter a valid target amount.');
        return;
      }
      
      setStep(2);
    }
  };
  
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate milestones
    let isValid = true;
    let milestonesTotalAmount = 0;
    
    milestones.forEach((milestone, index) => {
      if (!milestone.title || !milestone.description || !milestone.targetAmount) {
        alert(`Please fill in all fields for Milestone ${index + 1}.`);
        isValid = false;
        return;
      }
      
      if (isNaN(Number(milestone.targetAmount)) || Number(milestone.targetAmount) <= 0) {
        alert(`Please enter a valid target amount for Milestone ${index + 1}.`);
        isValid = false;
        return;
      }
      
      milestonesTotalAmount += Number(milestone.targetAmount);
    });
    
    if (!isValid) return;
    
    // Check if milestones total matches project target amount
    if (milestonesTotalAmount !== Number(targetAmount)) {
      alert(`The sum of milestone amounts (${milestonesTotalAmount}) must equal the project target amount (${targetAmount}).`);
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, we would create Hedera resources and save to Firestore
      // For the MVP demo, we'll just simulate it
      
      setTimeout(() => {
        alert('Project created successfully! In a production app, this would connect to Hedera SDK and Firestore.');
        router.push('/projects');
      }, 2000);
      
      /*
      // Example of what would happen in a production app:
      
      // 1. Create a Hedera Consensus Service topic for logging project events
      const topicId = await createTopic(projectName, description);
      
      // 2. Create a token for the project
      const tokenSymbol = projectName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 5).toUpperCase();
      const tokenId = await createProjectToken(projectName, tokenSymbol, Number(targetAmount));
      
      // 3. Deploy smart contract for milestone-based fund release
      const milestoneDescriptions = milestones.map(m => m.description);
      const contractId = await deployMilestoneContract(`project-${Date.now()}`, milestoneDescriptions);
      
      // 4. Save project data to Firestore
      const projectData: Omit<Project, 'id'> = {
        name: projectName,
        description,
        category: category as 'drought' | 'hunger' | 'poverty' | 'other',
        location,
        targetAmount: Number(targetAmount),
        raisedAmount: 0,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        ngoId: 'current-user-id', // In real app, this would be the authenticated user ID
        ngoName: 'Test NGO', // In real app, this would be the authenticated user name
        topicId,
        tokenId,
        contractId,
        status: 'active',
        milestones: milestones.map((m, index) => ({
          id: `m${index + 1}`,
          title: m.title || '',
          description: m.description || '',
          targetAmount: Number(m.targetAmount) || 0,
          status: 'pending'
        })),
        imageUrl: imageUrl || undefined
      };
      
      await createProject(projectData);
      
      // 5. Log project creation to HCS
      await submitMessage(topicId, JSON.stringify({
        type: 'project_created',
        data: {
          name: projectName,
          description,
          tokenId,
          contractId
        }
      }));
      
      router.push('/projects');
      */
    } catch (error) {
      console.error('Error creating project:', error);
      alert('An error occurred while creating the project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Create Humanitarian Aid Project</h1>
            <p className="text-gray-600 mt-2">
              Create a transparent, milestone-based aid project powered by Hedera Hashgraph
            </p>
          </div>
          
          {/* Step Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 1 ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
                1
              </div>
              <div className={`h-1 w-16 ${step === 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 2 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <div className={`text-sm w-32 text-center ${step === 1 ? 'text-primary font-medium' : 'text-primary font-medium'}`}>Project Details</div>
              <div className={`text-sm w-32 text-center ${step === 2 ? 'text-primary font-medium' : 'text-gray-500'}`}>Milestones</div>
            </div>
          </div>
          
          <div className="card">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Project Details */}
              {step === 1 && (
                <div>
                  <div className="mb-6">
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name*
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="e.g., Clean Water Initiative"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Describe your humanitarian aid project..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category*
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      >
                        <option value="drought">Drought Relief</option>
                        <option value="hunger">Hunger Relief</option>
                        <option value="poverty">Poverty Alleviation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location*
                      </label>
                      <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        placeholder="e.g., Kenya"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-1">
                        Target Amount (USD)*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          id="targetAmount"
                          value={targetAmount}
                          onChange={(e) => setTargetAmount(e.target.value)}
                          min="1"
                          step="1"
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          placeholder="e.g., 50000"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date*
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                        End Date*
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL (optional)
                    </label>
                    <input
                      type="url"
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="e.g., https://example.com/image.jpg"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Add a URL for a representative image for your project.
                    </p>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn btn-primary px-6 py-2"
                    >
                      Next: Define Milestones
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Milestones */}
              {step === 2 && (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-800">Project Milestones</h2>
                      <button
                        type="button"
                        onClick={addMilestone}
                        className="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Milestone
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      Define milestones for your project. The total amount of all milestones should equal your project target amount (${targetAmount}).
                    </p>
                    
                    {milestones.map((milestone, index) => (
                      <div key={index} className="border rounded-lg p-4 mb-4 bg-white">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">Milestone {index + 1}</h3>
                          {milestones.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMilestone(index)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor={`milestone-${index}-title`} className="block text-sm font-medium text-gray-700 mb-1">
                              Title*
                            </label>
                            <input
                              type="text"
                              id={`milestone-${index}-title`}
                              value={milestone.title || ''}
                              onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                              placeholder="e.g., Well Construction"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor={`milestone-${index}-amount`} className="block text-sm font-medium text-gray-700 mb-1">
                              Amount (USD)*
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">$</span>
                              </div>
                              <input
                                type="number"
                                id={`milestone-${index}-amount`}
                                value={milestone.targetAmount || ''}
                                onChange={(e) => handleMilestoneChange(index, 'targetAmount', e.target.value)}
                                min="1"
                                step="1"
                                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                placeholder="e.g., 10000"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor={`milestone-${index}-description`} className="block text-sm font-medium text-gray-700 mb-1">
                            Description*
                          </label>
                          <textarea
                            id={`milestone-${index}-description`}
                            value={milestone.description || ''}
                            onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                            rows={2}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            placeholder="Describe what will be accomplished in this milestone..."
                            required
                          ></textarea>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Sum of milestone amounts */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total Milestone Amount:</span>
                      <span className={`font-medium ${
                        milestones.reduce((sum, m) => sum + (Number(m.targetAmount) || 0), 0) === Number(targetAmount)
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        ${milestones.reduce((sum, m) => sum + (Number(m.targetAmount) || 0), 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-700">Project Target Amount:</span>
                      <span className="font-medium">${targetAmount}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-6 py-2"
                    >
                      Back to Details
                    </button>
                    
                    <button
                      type="submit"
                      className="btn btn-primary px-6 py-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Project...
                        </span>
                      ) : (
                        'Create Project on Hedera'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By creating a project, you agree to the FAID platform's terms and conditions.
              All projects are deployed on the Hedera Testnet for demonstration purposes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 