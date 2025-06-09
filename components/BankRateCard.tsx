
import React from 'react';
import { BankDepositRate } from '../types';
import { BuildingLibraryIcon, BanknotesIcon } from './icons/IconComponents';

interface BankRateCardProps {
  rateInfo: BankDepositRate;
  onSelectRate?: (rate: number, bankName: string, productName: string) => void;
}

const BankRateCard: React.FC<BankRateCardProps> = ({ rateInfo, onSelectRate }) => {
  const productNameString = typeof rateInfo.productName === 'string' ? rateInfo.productName : `${rateInfo.productName.main}${rateInfo.productName.sub ? ` (${rateInfo.productName.sub})` : ''}`;
  
  return (
    <div className="bg-neutral-light shadow-lg rounded-xl p-5 m-2 transition-all hover:shadow-xl">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center mb-1">
            <BuildingLibraryIcon className="w-5 h-5 text-secondary mr-2" />
            <h3 className="text-lg font-semibold text-neutral-dark">{rateInfo.bankName}</h3>
          </div>
          <p className="text-sm text-neutral-textLight">{productNameString}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{rateInfo.rate.toFixed(2)}%</p>
          <p className="text-xs text-neutral-textLight">연, 세전</p>
        </div>
      </div>
      
      {rateInfo.conditions && (
        <p className="text-xs text-neutral-textLight bg-neutral p-2 rounded-md mb-3">
          조건: {rateInfo.conditions}
        </p>
      )}

      <div className="text-xs text-neutral-textLight space-y-1">
        {rateInfo.minDurationMonths && <p>최소 가입기간: {rateInfo.minDurationMonths}개월</p>}
        {rateInfo.maxAmount && <p>최대 예치금액: {rateInfo.maxAmount.toLocaleString()}원</p>}
      </div>

      {onSelectRate && (
        <button
          onClick={() => onSelectRate(rateInfo.rate, rateInfo.bankName, productNameString)}
          className="mt-4 w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium"
        >
          이 금리로 계산하기
        </button>
      )}
    </div>
  );
};

export default BankRateCard;
