import {
  Client,
  AccountId,
  PrivateKey,
  TransferTransaction,
  Hbar,
  HbarUnit,
  AccountBalanceQuery
} from "@hashgraph/sdk";

// Your testnet account credentials
const ACCOUNT_ID = "0.0.5769340";
const PRIVATE_KEY = "3030020100300706052b8104000a0422042030ce21286aca3108ca03cbee4c3ad984957d3109c13bf55c45bd9beb199d868d";

// Initialize Hedera client for testnet
const client = Client.forTestnet();

// Set up the client with your credentials
client.setOperator(
  AccountId.fromString(ACCOUNT_ID),
  PrivateKey.fromStringECDSA(PRIVATE_KEY)
);

// Get HBAR balance
export const getAccountBalance = async () => {
  try {
    const balance = await new AccountBalanceQuery()
      .setAccountId(AccountId.fromString(ACCOUNT_ID))
      .execute(client);
    return balance.hbars.to(HbarUnit.Hbar).toString();
  } catch (error) {
    console.error("Error getting balance:", error);
    throw error;
  }
};

// Convert HBAR to USD (using a fixed rate for demo purposes)
const HBAR_TO_USD_RATE = 0.05;

export const hbarToUsd = (hbarAmount: number): number => {
  return hbarAmount * HBAR_TO_USD_RATE;
};

export const usdToHbar = (usdAmount: number): number => {
  return usdAmount / HBAR_TO_USD_RATE;
};

// Make a donation in HBAR
export const makeDonation = async (recipientId: string, hbarAmount: number) => {
  try {
    const transaction = await new TransferTransaction()
      .addHbarTransfer(AccountId.fromString(ACCOUNT_ID), Hbar.fromTinybars(-hbarAmount * 100000000))
      .addHbarTransfer(AccountId.fromString(recipientId), Hbar.fromTinybars(hbarAmount * 100000000))
      .execute(client);

    const receipt = await transaction.getReceipt(client);
    return {
      success: true,
      transactionId: transaction.transactionId.toString(),
      usdEquivalent: hbarToUsd(hbarAmount)
    };
  } catch (error) {
    console.error("Error making donation:", error);
    throw error;
  }
}; 