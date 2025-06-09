
import React, { useState, useEffect, useCallback } from 'react';
import { BaseRateInfo, BankDepositRate, SpecialOffer } from './types';
import { APP_TITLE } from './constants';
import {
  fetchBaseRate,
  fetchCommercialBankRates,
  fetchSavingsBankRates,
  fetchSpecialOffers,
} from './services/financialDataService';
import LoadingSpinner from './components/LoadingSpinner';
import SectionTitle from './components/SectionTitle';
import BankRateCard from './components/BankRateCard';
import InterestCalculator from './components/InterestCalculator';
import SpecialOfferItem from './components/SpecialOfferItem';
import { BanknotesIcon, BuildingLibraryIcon, CalculatorIcon, SparklesIcon } from './components/icons/IconComponents';

const App: React.FC = () => {
  const [baseRate, setBaseRate] = useState<BaseRateInfo | null>(null);
  const [commercialRates, setCommercialRates] = useState<BankDepositRate[]>([]);
  const [savingsRates, setSavingsRates] = useState<BankDepositRate[]>([]);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAlarms, setActiveAlarms] = useState<Record<string, boolean>>({});
  const [calculatorInitialRate, setCalculatorInitialRate] = useState<{ rate: number; bankName: string; productName: string } | undefined>(undefined);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [base, commercial, savings, offers] = await Promise.all([
        fetchBaseRate(),
        fetchCommercialBankRates(),
        fetchSavingsBankRates(),
        fetchSpecialOffers(),
      ]);
      setBaseRate(base);
      setCommercialRates(commercial);
      setSavingsRates(savings);
      setSpecialOffers(offers);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError('데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAlarmToggle = (id: string, isActive: boolean) => {
    setActiveAlarms(prev => ({ ...prev, [id]: isActive }));
    // In a real app, you might save this preference or schedule a notification
    console.log(`Alarm for offer ${id} is now ${isActive ? 'ON' : 'OFF'}`);
  };

  const handleSelectRateForCalculator = (rate: number, bankName: string, productName: string) => {
    setCalculatorInitialRate({ rate, bankName, productName });
    const calculatorSection = document.getElementById('interest-calculator-section');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const allBankRates = [...commercialRates, ...savingsRates];

  return (
    <div className="min-h-screen bg-neutral pb-16">
      <header className="bg-primary text-white p-5 shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-center">{APP_TITLE}</h1>
      </header>

      <main className="container mx-auto max-w-2xl p-2">
        {isLoading && <LoadingSpinner size="lg" />}
        {error && <p className="text-red-500 text-center p-4">{error}</p>}
        
        {!isLoading && !error && (
          <>
            {/* Base Rate Section */}
            {baseRate && (
              <section id="base-rate-section" className="my-4">
                 <SectionTitle title="한국은행 기준금리" icon={<img src="https://www.bok.or.kr/img/layout/logo_social.png" alt="BOK" className="w-6 h-6 rounded-full"/>} />
                <div className="bg-neutral-light shadow-lg rounded-xl p-6 m-2 text-center">
                  <p className="text-4xl font-bold text-secondary">{baseRate.rate.toFixed(2)}%</p>
                  {baseRate.change !== undefined && (
                    <p className={`text-sm ${baseRate.change > 0 ? 'text-red-500' : baseRate.change < 0 ? 'text-blue-500' : 'text-neutral-textLight'}`}>
                      {baseRate.change > 0 ? '▲' : baseRate.change < 0 ? '▼' : ''} {Math.abs(baseRate.change).toFixed(2)}%
                    </p>
                  )}
                  <p className="text-xs text-neutral-textLight mt-2">
                    (기준일: {baseRate.effectiveDate}, 최종 업데이트: {baseRate.lastUpdated})
                  </p>
                </div>
              </section>
            )}

            {/* Commercial Bank Rates Section */}
            <section id="commercial-rates-section" className="my-4">
              <SectionTitle title="은행 예금금리 TOP 3" icon={<BuildingLibraryIcon className="w-6 h-6" />} />
              {commercialRates.length > 0 ? (
                commercialRates.map(rate => (
                  <BankRateCard key={rate.id} rateInfo={rate} onSelectRate={handleSelectRateForCalculator} />
                ))
              ) : (
                <p className="text-neutral-textLight text-center p-4">은행 예금 금리 정보가 없습니다.</p>
              )}
            </section>

            {/* Savings Bank Rates Section */}
            <section id="savings-rates-section" className="my-4">
              <SectionTitle title="저축은행 예금금리 TOP 3" icon={<BanknotesIcon className="w-6 h-6" />} />
              {savingsRates.length > 0 ? (
                savingsRates.map(rate => (
                  <BankRateCard key={rate.id} rateInfo={rate} onSelectRate={handleSelectRateForCalculator} />
                ))
              ) : (
                <p className="text-neutral-textLight text-center p-4">저축은행 예금 금리 정보가 없습니다.</p>
              )}
            </section>

            {/* Interest Calculator Section */}
            <section id="interest-calculator-section" className="my-4">
              <SectionTitle title="예상 이자 계산기" icon={<CalculatorIcon className="w-6 h-6" />} />
              <InterestCalculator availableRates={allBankRates} initialSelectedRate={calculatorInitialRate} />
            </section>

            {/* Special Offers Section */}
            <section id="special-offers-section" className="my-4">
              <SectionTitle title="특판/이벤트 알림" icon={<SparklesIcon className="w-6 h-6" />} />
              {specialOffers.length > 0 ? (
                specialOffers.map(offer => (
                  <SpecialOfferItem 
                    key={offer.id} 
                    offer={offer}
                    isAlarmActive={!!activeAlarms[offer.id]}
                    onAlarmToggle={handleAlarmToggle}
                  />
                ))
              ) : (
                <p className="text-neutral-textLight text-center p-4">진행중인 특판/이벤트 정보가 없습니다.</p>
              )}
            </section>
          </>
        )}
      </main>
      <footer className="text-center p-4 text-xs text-neutral-textLight border-t border-gray-200 mt-8">
        <p>&copy; {new Date().getFullYear()} {APP_TITLE}. 모든 금융상품 정보는 참고용입니다.</p>
        <p>실제 상품 가입 전 반드시 해당 금융기관의 설명을 확인하시기 바랍니다.</p>
      </footer>
    </div>
  );
};

export default App;
