import React, { useState, useEffect } from 'react';
import { CalculatorIcon, InformationCircleIcon } from './icons/IconComponents';
import { BankDepositRate } from '../types';
import { DEFAULT_CALCULATION_PERIOD_YEARS, InterestCalculationType } from '../constants';

interface InterestCalculatorProps {
  availableRates: BankDepositRate[];
  initialSelectedRate?: { rate: number; bankName: string; productName: string };
}

const InterestCalculator: React.FC<InterestCalculatorProps> = ({ availableRates, initialSelectedRate }) => {
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [selectedRateInfo, setSelectedRateInfo] = useState<{ rate: number; bankName: string; productName: string } | null>(null);
  const [calculationPeriodYears, setCalculationPeriodYears] = useState<number>(DEFAULT_CALCULATION_PERIOD_YEARS);
  const [interestType, setInterestType] = useState<InterestCalculationType>(InterestCalculationType.SIMPLE);
  const [calculatedInterest, setCalculatedInterest] = useState<number | null>(null);

  useEffect(() => {
    if (initialSelectedRate) {
      setSelectedRateInfo(initialSelectedRate);
    } else if (availableRates.length > 0) {
      const firstRate = availableRates[0];
      const productNameString = typeof firstRate.productName === 'string' ? firstRate.productName : `${firstRate.productName.main}${firstRate.productName.sub ? ` (${firstRate.productName.sub})` : ''}`;
      setSelectedRateInfo({ rate: firstRate.rate, bankName: firstRate.bankName, productName: productNameString });
    }
  }, [availableRates, initialSelectedRate]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setDepositAmount(value);
    setCalculatedInterest(null); 
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rateId = e.target.value;
    const rate = availableRates.find(r => r.id === rateId);
    if (rate) {
      const productNameString = typeof rate.productName === 'string' ? rate.productName : `${rate.productName.main}${rate.productName.sub ? ` (${rate.productName.sub})` : ''}`;
      setSelectedRateInfo({ rate: rate.rate, bankName: rate.bankName, productName: productNameString });
    }
    setCalculatedInterest(null);
  };
  
  const calculateInterest = () => {
    if (!depositAmount || !selectedRateInfo || parseFloat(depositAmount) <= 0) {
      setCalculatedInterest(null);
      return;
    }

    const principal = parseFloat(depositAmount);
    const rateDecimal = selectedRateInfo.rate / 100;
    let interest = 0;

    if (interestType === InterestCalculationType.SIMPLE) {
      interest = principal * rateDecimal * calculationPeriodYears;
    } else if (interestType === InterestCalculationType.COMPOUNDED_ANNUALLY) {
      interest = principal * (Math.pow(1 + rateDecimal, calculationPeriodYears) - 1);
    }
    
    // Assuming interest is before tax (세전)
    setCalculatedInterest(interest);
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return '-';
    return `${Math.round(value).toLocaleString()}원`;
  };
  
  const selectedRateObject = selectedRateInfo ? availableRates.find(r => r.rate === selectedRateInfo.rate && r.bankName === selectedRateInfo.bankName) : null;

  return (
    <div className="bg-neutral-light shadow-lg rounded-xl p-5 m-2">
      <div className="space-y-4">
        <div>
          <label htmlFor="depositAmount" className="block text-sm font-medium text-neutral-text mb-1">
            예치금액 (원)
          </label>
          <input
            type="text"
            id="depositAmount"
            value={depositAmount === '' ? '' : parseInt(depositAmount, 10).toLocaleString()}
            onChange={handleAmountChange}
            placeholder="금액 입력 (예: 10,000,000)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-right"
          />
        </div>

        <div>
          <label htmlFor="selectedRate" className="block text-sm font-medium text-neutral-text mb-1">
            적용금리 선택
          </label>
          <select
            id="selectedRate"
            value={selectedRateObject?.id || ''}
            onChange={handleRateChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary appearance-none bg-white pr-8 bg-no-repeat"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' class='w-5 h-5'%3E%3Cpath fill-rule='evenodd' d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z' clip-rule='evenodd' /%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25em 1.25em' }}
          >
            {availableRates.length === 0 && <option>금리 정보를 불러오는 중...</option>}
            {availableRates.map((rate) => {
               const productNameString = typeof rate.productName === 'string' ? rate.productName : `${rate.productName.main}${rate.productName.sub ? ` (${rate.productName.sub})` : ''}`;
               return (
                  <option key={rate.id} value={rate.id}>
                    {rate.bankName} - {productNameString} ({rate.rate.toFixed(2)}%)
                  </option>
               );
            })}
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="calculationPeriod" className="block text-sm font-medium text-neutral-text mb-1">
                예치기간 (년)
              </label>
              <input
                type="number"
                id="calculationPeriod"
                value={calculationPeriodYears}
                onChange={(e) => {setCalculationPeriodYears(Math.max(1, parseInt(e.target.value, 10) || 1)); setCalculatedInterest(null);}}
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="interestType" className="block text-sm font-medium text-neutral-text mb-1">
                계산방식
              </label>
              <select
                id="interestType"
                value={interestType}
                onChange={(e) => {setInterestType(e.target.value as InterestCalculationType); setCalculatedInterest(null);}}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary appearance-none bg-white pr-8 bg-no-repeat"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' class='w-5 h-5'%3E%3Cpath fill-rule='evenodd' d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z' clip-rule='evenodd' /%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25em 1.25em' }}
              >
                <option value={InterestCalculationType.SIMPLE}>단리</option>
                <option value={InterestCalculationType.COMPOUNDED_ANNUALLY}>연복리</option>
              </select>
            </div>
        </div>

        <button
          onClick={calculateInterest}
          disabled={!depositAmount || !selectedRateInfo || parseFloat(depositAmount) <= 0}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors font-medium disabled:bg-gray-300 flex items-center justify-center space-x-2"
        >
          <CalculatorIcon className="w-5 h-5" />
          <span>예상 이자 계산하기</span>
        </button>

        {calculatedInterest !== null && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-sm text-neutral-text">예상 이자 (세전, {calculationPeriodYears}년, {interestType === InterestCalculationType.SIMPLE ? '단리' : '연복리'}):</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(calculatedInterest)}</p>
            <p className="text-sm text-neutral-text mt-1">총 예상 수령액: {formatCurrency(parseFloat(depositAmount) + calculatedInterest)}</p>
          </div>
        )}
         <div className="mt-3 text-xs text-neutral-textLight flex items-start space-x-1">
            <InformationCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
                실제 이자액은 세금(일반과세 15.4%) 및 기타 조건에 따라 달라질 수 있습니다. 본 계산 결과는 참고용입니다.
            </span>
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator;
