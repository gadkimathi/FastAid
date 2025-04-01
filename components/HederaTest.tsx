import { useState, useEffect } from 'react';
import { getAccountBalance, hbarToUsd } from '@/lib/hedera';

export default function HederaTest() {
  const [balance, setBalance] = useState<string | null>(null);
  const [usdValue, setUsdValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const hbarBalance = await getAccountBalance();
        setBalance(hbarBalance);
        setUsdValue(hbarToUsd(parseFloat(hbarBalance)));
      } catch (err) {
        setError('Failed to fetch HBAR balance');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">HBAR Balance</h2>
      
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          <span className="text-gray-600">Loading balance...</span>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Your HBAR Balance:</span>
            <span className="text-2xl font-bold text-primary">{balance} HBAR</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">USD Value:</span>
            <span className="text-xl font-semibold text-green-600">
              ${usdValue?.toFixed(2)} USD
            </span>
          </div>
          <p className="text-sm text-gray-500">
            This balance can be used for making donations to humanitarian projects. 
            The USD value is calculated using current market rates.
          </p>
        </div>
      )}
    </div>
  );
} 