import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Project, Donation, Milestone, User, Transaction, ConsensusMessage } from './types';

// Projects
export const getProjects = async () => {
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef, orderBy('startDate', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    startDate: doc.data().startDate?.toDate(),
    endDate: doc.data().endDate?.toDate()
  } as Project));
};

export const getProjectById = async (projectId: string) => {
  const docRef = doc(db, 'projects', projectId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      startDate: data.startDate?.toDate(),
      endDate: data.endDate?.toDate()
    } as Project;
  }
  
  return null;
};

export const createProject = async (project: Omit<Project, 'id'>) => {
  const projectData = {
    ...project,
    startDate: Timestamp.fromDate(project.startDate),
    endDate: Timestamp.fromDate(project.endDate),
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(collection(db, 'projects'), projectData);
  return docRef.id;
};

export const updateProject = async (projectId: string, project: Partial<Project>) => {
  const projectRef = doc(db, 'projects', projectId);
  
  const updateData = { ...project };
  if (project.startDate) {
    updateData.startDate = Timestamp.fromDate(project.startDate);
  }
  if (project.endDate) {
    updateData.endDate = Timestamp.fromDate(project.endDate);
  }
  
  await updateDoc(projectRef, updateData);
};

// Donations
export const getDonations = async (projectId?: string) => {
  const donationsRef = collection(db, 'donations');
  let q;
  
  if (projectId) {
    q = query(donationsRef, where('projectId', '==', projectId), orderBy('timestamp', 'desc'));
  } else {
    q = query(donationsRef, orderBy('timestamp', 'desc'));
  }
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.toDate()
  } as Donation));
};

export const createDonation = async (donation: Omit<Donation, 'id'>) => {
  const donationData = {
    ...donation,
    timestamp: Timestamp.fromDate(donation.timestamp),
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(collection(db, 'donations'), donationData);
  return docRef.id;
};

// Transactions
export const getTransactions = async (projectId?: string) => {
  const transactionsRef = collection(db, 'transactions');
  let q;
  
  if (projectId) {
    q = query(transactionsRef, where('projectId', '==', projectId), orderBy('timestamp', 'desc'));
  } else {
    q = query(transactionsRef, orderBy('timestamp', 'desc'));
  }
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.toDate()
  } as Transaction));
};

export const createTransaction = async (transaction: Omit<Transaction, 'id'>) => {
  const transactionData = {
    ...transaction,
    timestamp: Timestamp.fromDate(transaction.timestamp),
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(collection(db, 'transactions'), transactionData);
  return docRef.id;
};

// Consensus Messages
export const getConsensusMessages = async (projectId: string) => {
  const messagesRef = collection(db, 'consensusMessages');
  const q = query(
    messagesRef,
    where('projectId', '==', projectId),
    orderBy('timestamp', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.toDate()
  } as ConsensusMessage));
};

export const createConsensusMessage = async (message: Omit<ConsensusMessage, 'id'>) => {
  const messageData = {
    ...message,
    timestamp: Timestamp.fromDate(message.timestamp),
    createdAt: serverTimestamp()
  };
  
  const docRef = await addDoc(collection(db, 'consensusMessages'), messageData);
  return docRef.id;
}; 