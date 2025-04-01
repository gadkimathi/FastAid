import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

type Milestone = {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  status: 'pending';
};

type ProjectFormData = {
  name: string;
  description: string;
  category: 'hunger' | 'drought' | 'poverty' | 'education' | 'healthcare';
  location: string;
  targetAmount: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  milestones: Milestone[];
};

export default function CreateProject() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    category: 'hunger',
    location: '',
    targetAmount: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
    imageUrl: '',
    milestones: [],
  });
  
  const [newMilestone, setNewMilestone] = useState<Omit<Milestone, 'id' | 'status'>>({
    title: '',
    description: '',
    targetAmount: 0,
  });
  
  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'targetAmount' ? parseFloat(value) || 0 : value,
    });
  };
  
  // Handle milestone input changes
  const handleMilestoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMilestone({
      ...newMilestone,
      [name]: name === 'targetAmount' ? parseFloat(value) || 0 : value,
    });
  };
  
  // Add a milestone to the project
  const addMilestone = () => {
    if (!newMilestone.title || !newMilestone.description || newMilestone.targetAmount <= 0) {
      alert('Please fill all milestone fields with valid values.');
      return;
    }
    
    const milestone: Milestone = {
      id: `m-${Date.now()}`,
      ...newMilestone,
      status: 'pending',
    };
    
    setFormData({
      ...formData,
      milestones: [...formData.milestones, milestone],
    });
    
    // Clear the form
    setNewMilestone({
      title: '',
      description: '',
      targetAmount: 0,
    });
  };
  
  // Remove a milestone
  const removeMilestone = (id: string) => {
    setFormData({
      ...formData,
      milestones: formData.milestones.filter(milestone => milestone.id !== id),
    });
  };
  
  // Calculate total milestone amounts
  const totalMilestoneAmount = formData.milestones.reduce(
    (total, milestone) => total + milestone.targetAmount, 
    0
  );
  
  // Check if milestone amounts exceed total project amount
  const milestonesExceedTotal = totalMilestoneAmount > formData.targetAmount;
  
  // Navigate to next step
  const nextStep = () => {
    // Validation for step 1
    if (currentStep === 1) {
      if (!formData.name || !formData.description || !formData.category || !formData.location) {
        alert('Please fill all required fields.');
        return;
      }
    }
    
    // Validation for step 2
    if (currentStep === 2) {
      if (formData.targetAmount <= 0 || !formData.startDate || !formData.endDate) {
        alert('Please fill all required fields with valid values.');
        return;
      }
      
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (end <= start) {
        alert('End date must be after start date.');
        return;
      }
    }
    
    // Validation for step 3
    if (currentStep === 3) {
      if (!formData.imageUrl) {
        alert('Please provide a project image URL.');
        return;
      }
    }
    
    // Validation for step 4
    if (currentStep === 4) {
      if (formData.milestones.length === 0) {
        alert('Please add at least one milestone.');
        return;
      }
      
      if (milestonesExceedTotal) {
        alert('The total of milestone amounts cannot exceed the project target amount.');
        return;
      }
    }
    
    setCurrentStep(prevStep => prevStep + 1);
  };
  
  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.milestones.length === 0) {
      alert('Please add at least one milestone.');
      return;
    }
    
    if (milestonesExceedTotal) {
      alert('The total of milestone amounts cannot exceed the project target amount.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would use Firebase to save the project
      // For the MVP, we'll simulate an API call
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful creation
      setSuccess(true);
      
      // In a real app, we would redirect to the project page
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Error creating project:', error);
      alert('An error occurred while creating the project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Create Project - FAID Platform</title>
        <meta name="description" content="Create a new humanitarian aid project" />
      </Head>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {success ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Project Created!</h2>
              <p className="text-gray-600 text-lg mb-6">Your project has been created successfully and is now pending approval.</p>
              <p className="text-gray-600 mb-8">You will be redirected to your dashboard shortly...</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Create New Project</h1>
                <p className="text-gray-600">Set up your humanitarian aid project with transparent milestones</p>
              </div>
              
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between relative">
                  {/* Progress bar */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-300"
                    style={{ width: `${(currentStep - 1) * 25}%` }}
                  ></div>
                  
                  {/* Steps */}
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentStep >= step 
                            ? 'bg-primary text-white' 
                            : 'bg-white text-gray-500 border border-gray-300'
                        }`}
                      >
                        {currentStep > step ? (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          step
                        )}
                      </div>
                      <div className="text-xs mt-2 text-gray-600 font-medium">
                        {step === 1 && 'Basics'}
                        {step === 2 && 'Details'}
                        {step === 3 && 'Media'}
                        {step === 4 && 'Milestones'}
                        {step === 5 && 'Review'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Form */}
              <div className="bg-white rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Project Basics */}
                  {currentStep === 1 && (
                    <div className="p-6 md:p-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Basics</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="name" className="label">Project Name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="input w-full"
                            placeholder="e.g. Clean Water Initiative"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="label">Description <span className="text-red-500">*</span></label>
                          <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="input w-full"
                            rows={4}
                            placeholder="Describe your project and its impact..."
                            required
                          ></textarea>
                          <p className="mt-1 text-sm text-gray-500">
                            Provide a clear description of the project, its goals, and intended impact.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="category" className="label">Category <span className="text-red-500">*</span></label>
                            <select
                              id="category"
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              className="input w-full"
                              required
                            >
                              <option value="hunger">Hunger Relief</option>
                              <option value="drought">Drought Relief</option>
                              <option value="poverty">Poverty Alleviation</option>
                              <option value="education">Education</option>
                              <option value="healthcare">Healthcare</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="location" className="label">Location <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              id="location"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              className="input w-full"
                              placeholder="e.g. Nairobi, Kenya"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Funding Details */}
                  {currentStep === 2 && (
                    <div className="p-6 md:p-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Funding Details</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="targetAmount" className="label">Funding Target (USD) <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              id="targetAmount"
                              name="targetAmount"
                              value={formData.targetAmount || ''}
                              onChange={handleInputChange}
                              className="input pl-7 w-full"
                              min="1"
                              placeholder="e.g. 50000"
                              required
                            />
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Total funding amount needed for your project.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="startDate" className="label">Start Date <span className="text-red-500">*</span></label>
                            <input
                              type="date"
                              id="startDate"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleInputChange}
                              className="input w-full"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="endDate" className="label">End Date <span className="text-red-500">*</span></label>
                            <input
                              type="date"
                              id="endDate"
                              name="endDate"
                              value={formData.endDate}
                              onChange={handleInputChange}
                              className="input w-full"
                              required
                            />
                            <p className="mt-1 text-sm text-gray-500">
                              Project duration should be at least 1 month.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Project Media */}
                  {currentStep === 3 && (
                    <div className="p-6 md:p-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Media</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="imageUrl" className="label">Project Image URL <span className="text-red-500">*</span></label>
                          <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            className="input w-full"
                            placeholder="e.g. https://example.com/image.jpg"
                            required
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            Provide a URL to an image that represents your project.
                          </p>
                        </div>
                        
                        {formData.imageUrl && (
                          <div>
                            <label className="label">Image Preview</label>
                            <div className="mt-2 relative h-60 rounded-lg overflow-hidden border border-gray-200">
                              <img 
                                src={formData.imageUrl} 
                                alt="Project preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Milestones */}
                  {currentStep === 4 && (
                    <div className="p-6 md:p-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Milestones</h2>
                      
                      <div className="space-y-6">
                        <div className="bg-primary-light rounded-lg p-4">
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <p className="text-primary font-medium">Why Milestones Matter</p>
                              <p className="text-sm text-gray-700 mt-1">
                                Milestones create transparency by breaking your project into verifiable stages. 
                                Funds will be released based on milestone completion, recorded on the Hedera ledger.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Add milestone form */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Add a Milestone</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="milestone-title" className="label">Title <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                id="milestone-title"
                                name="title"
                                value={newMilestone.title}
                                onChange={handleMilestoneChange}
                                className="input w-full"
                                placeholder="e.g. Phase 1: Community Assessment"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="milestone-description" className="label">Description <span className="text-red-500">*</span></label>
                              <textarea
                                id="milestone-description"
                                name="description"
                                value={newMilestone.description}
                                onChange={handleMilestoneChange}
                                className="input w-full"
                                rows={2}
                                placeholder="Describe what will be accomplished in this milestone"
                              ></textarea>
                            </div>
                            
                            <div>
                              <label htmlFor="milestone-amount" className="label">
                                Funding Amount <span className="text-red-500">*</span>
                                {formData.targetAmount > 0 && (
                                  <span className="text-sm font-normal text-gray-500 ml-2">
                                    (Project total: {formatCurrency(formData.targetAmount)})
                                  </span>
                                )}
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                  type="number"
                                  id="milestone-amount"
                                  name="targetAmount"
                                  value={newMilestone.targetAmount || ''}
                                  onChange={handleMilestoneChange}
                                  className="input pl-7 w-full"
                                  min="1"
                                  placeholder="e.g. 10000"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <button
                                type="button"
                                onClick={addMilestone}
                                className="w-full btn btn-primary"
                              >
                                Add Milestone
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Milestone list */}
                        {formData.milestones.length > 0 && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Added Milestones</h3>
                            
                            <div className="space-y-4">
                              {formData.milestones.map((milestone, index) => (
                                <div key={milestone.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium text-gray-900">
                                        {index + 1}. {milestone.title}
                                      </h4>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {milestone.description}
                                      </p>
                                      <p className="text-sm font-medium text-primary mt-2">
                                        {formatCurrency(milestone.targetAmount)}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeMilestone(milestone.id)}
                                      className="text-red-500 hover:text-red-700"
                                      aria-label="Remove milestone"
                                    >
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              ))}
                              
                              <div className="flex justify-between pt-4 border-t border-gray-200">
                                <span className="font-medium text-gray-700">Total Milestone Funding:</span>
                                <span className={`font-medium ${milestonesExceedTotal ? 'text-red-600' : 'text-gray-900'}`}>
                                  {formatCurrency(totalMilestoneAmount)}
                                  {milestonesExceedTotal && (
                                    <span className="ml-2 text-sm">
                                      (exceeds project total by {formatCurrency(totalMilestoneAmount - formData.targetAmount)})
                                    </span>
                                  )}
                                </span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Project Target:</span>
                                <span className="font-medium text-gray-900">
                                  {formatCurrency(formData.targetAmount)}
                                </span>
                              </div>
                              
                              {milestonesExceedTotal && (
                                <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                                  The total of milestone amounts cannot exceed the project target amount.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Step 5: Review */}
                  {currentStep === 5 && (
                    <div className="p-6 md:p-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Project</h2>
                      
                      <div className="space-y-8">
                        {/* Project overview */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Overview</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Project Name</h4>
                                <p className="text-gray-900">{formData.name}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Category</h4>
                                <p className="text-gray-900">{formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Location</h4>
                                <p className="text-gray-900">{formData.location}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Funding Target</h4>
                                <p className="text-gray-900">{formatCurrency(formData.targetAmount)}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Timeline</h4>
                                <p className="text-gray-900">
                                  {new Date(formData.startDate).toLocaleDateString()} to {new Date(formData.endDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Project Image</h4>
                              <div className="relative h-40 rounded-lg overflow-hidden border border-gray-200">
                                <img 
                                  src={formData.imageUrl} 
                                  alt="Project"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                            <p className="text-gray-900">{formData.description}</p>
                          </div>
                        </div>
                        
                        {/* Milestones */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Milestones ({formData.milestones.length})</h3>
                          
                          <div className="space-y-4">
                            {formData.milestones.map((milestone, index) => (
                              <div key={milestone.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <h4 className="font-medium text-gray-900">
                                  {index + 1}. {milestone.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {milestone.description}
                                </p>
                                <p className="text-sm font-medium text-primary mt-2">
                                  {formatCurrency(milestone.targetAmount)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Legal agreement */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="agreement"
                              className="h-4 w-4 text-primary border-gray-300 rounded mt-1"
                              required
                            />
                            <label htmlFor="agreement" className="ml-2 block text-sm text-gray-700">
                              I confirm that the information provided is accurate and I have the authority to create this project. 
                              I understand that all funds will be distributed based on milestone completion and verified through 
                              Hedera's distributed ledger.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Navigation buttons */}
                  <div className="px-6 md:px-8 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200 flex justify-between">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn btn-outline"
                      >
                        Previous
                      </button>
                    ) : (
                      <Link href="/dashboard" className="btn btn-outline">
                        Cancel
                      </Link>
                    )}
                    
                    {currentStep < 5 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn btn-primary"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Project...
                          </div>
                        ) : (
                          'Create Project'
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 