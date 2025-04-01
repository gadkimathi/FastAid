import { Milestone } from '@/lib/types';

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
  onVerify?: (milestoneId: string) => void;
  isNGO?: boolean;
}

const MilestoneCard = ({ 
  milestone, 
  index, 
  onVerify, 
  isNGO = false 
}: MilestoneCardProps) => {
  // Get status badge color
  const getStatusBadgeClass = () => {
    switch (milestone.status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-yellow-100 text-yellow-800';
      case 'verified':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-gray-500 text-sm">Milestone {index + 1}</span>
          <h4 className="text-lg font-medium mt-1">{milestone.title}</h4>
        </div>
        <span className={`${getStatusBadgeClass()} px-2 py-1 rounded-full text-xs font-medium`}>
          {milestone.status.replace('_', ' ')}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{milestone.description}</p>

      <div className="flex justify-between items-center text-sm mb-4">
        <span className="text-gray-600">Target amount: <span className="font-semibold">${milestone.targetAmount}</span></span>
        
        {milestone.completedDate && (
          <span className="text-gray-600">
            Completed: {new Date(milestone.completedDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {milestone.proofHash && (
        <div className="bg-gray-50 p-3 rounded-md text-xs text-gray-500 mb-4 break-all">
          <span className="block mb-1 font-medium">Verification Hash:</span>
          {milestone.proofHash}
        </div>
      )}

      {isNGO && milestone.status === 'in_progress' && (
        <button 
          className="btn btn-primary w-full text-sm"
          onClick={() => {
            // In real app, this would open a form to upload milestone completion proof
            alert('In a real app, this would open a milestone completion form');
          }}
        >
          Submit Completion Proof
        </button>
      )}

      {!isNGO && milestone.status === 'completed' && onVerify && (
        <button 
          className="btn btn-secondary w-full text-sm"
          onClick={() => onVerify(milestone.id)}
        >
          Verify & Release Funds
        </button>
      )}
    </div>
  );
};

export default MilestoneCard; 