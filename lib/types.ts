export interface User {
  id: string;
  email: string;
  name: string;
  role: 'donor' | 'ngo' | 'admin';
  accountId?: string; // Hedera account ID if available
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  completedDate?: Date;
  proofHash?: string; // Hash of evidence document
  status: 'pending' | 'in_progress' | 'completed' | 'verified';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  category: 'drought' | 'hunger' | 'poverty' | 'other';
  targetAmount: number;
  raisedAmount: number;
  startDate: Date;
  endDate: Date;
  ngoId: string;
  ngoName: string;
  topicId?: string; // Hedera Consensus Service topic ID
  tokenId?: string; // Hedera Token ID
  contractId?: string; // Hedera Smart Contract ID
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  milestones: Milestone[];
  imageUrl?: string;
}

export interface Donation {
  id: string;
  amount: number;
  donorId: string;
  donorName: string;
  projectId: string;
  projectName: string;
  timestamp: Date;
  transactionId: string; // Hedera transaction ID
}

export interface Transaction {
  id: string;
  type: 'donation' | 'milestone_release' | 'refund';
  amount: number;
  fromAccountId: string;
  toAccountId: string;
  projectId: string;
  milestoneId?: string;
  timestamp: Date;
  transactionId: string; // Hedera transaction ID
  status: 'pending' | 'confirmed' | 'failed';
}

export interface ConsensusMessage {
  timestamp: Date;
  messageType: 'project_created' | 'donation_received' | 'milestone_completed' | 'funds_released';
  projectId: string;
  data: any;
  transactionId: string;
} 