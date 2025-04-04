# FAID - Decentralized Humanitarian Aid Platform

FAID is a decentralized humanitarian aid platform built on Hedera Hashgraph that provides transparent, milestone-based funding for addressing drought, hunger, and poverty in Africa.

## Overview

This platform leverages blockchain technology to ensure transparency, accountability, and efficiency in humanitarian aid distribution:

- **Transparent Funding:** All donations and disbursements are recorded on Hedera's immutable ledger
- **Milestone-Based Release:** Funds are locked in smart contracts and only released when project milestones are verified
- **Real-Time Tracking:** Track the progress of aid projects with verifiable on-chain records
- **Low Transaction Costs:** Hedera's efficient consensus algorithm ensures minimal fees

## Key Features

1. **Hedera Token Service (HTS):** Enable Testnet HBAR/token donations for funding aid projects
2. **Hedera Smart Contracts:** Lock & release funds based on predefined aid milestones
3. **Hedera Consensus Service (HCS):** Log all aid transactions & milestones for full transparency
4. **Web Interface:** Simple web interface for donors & NGOs to create, fund, and track aid projects

## Technical Architecture

### Frontend
- Next.js with TypeScript
- Tailwind CSS for styling
- Responsive design for both desktop and mobile

### Backend
- Firebase Firestore (Free-tier) for project data & authentication
- Next.js API routes for backend functionality
- Hedera JavaScript SDK for blockchain interactions

### Blockchain Integration
- **Hedera Token Service (HTS):** For creating and transferring tokens representing donations
- **Hedera Smart Contracts:** For milestone-based fund locking and release
- **Hedera Consensus Service (HCS):** For transparent logging of all transactions and milestone completions

### Deployment
- Vercel (Free-tier) for hosting the web application
- HashScan for transaction verification

## System Flow

1. NGOs create aid projects (data stored in Firestore, logged on HCS)
2. Donors send Test HBAR tokens (HTS transactions via Hedera SDK)
3. Funds are locked in smart contracts and released on milestone completion
4. Transactions & aid verification are publicly recorded using HCS

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- NPM or Yarn
- Hedera Testnet account

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/faid.git
cd faid
```

2. Install dependencies:
```
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
# Hedera Testnet Credentials
NEXT_PUBLIC_HEDERA_ACCOUNT_ID=0.0.5769340
HEDERA_PRIVATE_KEY=3030020100300706052b8104000a0422042030ce21286aca3108ca03cbee4c3ad984957d3109c13bf55c45bd9beb199d868d

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

4. Run the development server:
```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Import the project in Vercel
3. Configure the environment variables
4. Deploy

## Testing on Hedera Testnet

All Hedera transactions in this MVP are performed on the Testnet. You can:

1. Create and view aid projects
2. Make test donations using Testnet HBAR
3. Track the completion of milestones
4. Verify all transactions on HashScan

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Hedera Hashgraph for providing the blockchain infrastructure
- Firebase for the database and authentication services
- Vercel for hosting

## Disclaimer

This platform is a minimum viable product (MVP) demonstration and uses Testnet resources.
