
import { BaseRateInfo, BankDepositRate, SpecialOffer } from '../types';
import { MOCK_API_DELAY } from '../constants';

const mockDelay = <T,>(data: T): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), MOCK_API_DELAY));
};

export const fetchBaseRate = async (): Promise<BaseRateInfo> => {
  // Simulate API call
  const data: BaseRateInfo = {
    rate: 3.50,
    lastUpdated: "2024-07-15",
    change: 0.00,
    effectiveDate: "2023-01-13"
  };
  return mockDelay(data);
};

export const fetchCommercialBankRates = async (): Promise<BankDepositRate[]> => {
  // Simulate API call
  const data: BankDepositRate[] = [
    { id: 'cb1', bankName: 'KB국민은행', productName: {main: 'KB Star 정기예금', sub:'비대면전용'}, rate: 3.55, type: 'commercial', minDurationMonths: 12, conditions: '1년 만기, 비대면 가입시' },
    { id: 'cb2', bankName: '신한은행', productName: {main:'쏠편한 정기예금', sub:'최고금리'}, rate: 3.50, type: 'commercial', minDurationMonths: 12, conditions: '1년 만기, 우대조건 충족시' },
    { id: 'cb3', bankName: '우리은행', productName: {main:'WON플러스 예금', sub:'인기상품'}, rate: 3.45, type: 'commercial', minDurationMonths: 12, conditions: '1년 만기, 모바일 가입' },
  ];
  return mockDelay(data);
};

export const fetchSavingsBankRates = async (): Promise<BankDepositRate[]> => {
  // Simulate API call
  const data: BankDepositRate[] = [
    { id: 'sb1', bankName: 'OK저축은행', productName: {main:'OK e-안심정기예금', sub:'인터넷/모바일'}, rate: 4.10, type: 'savings', minDurationMonths: 12, maxAmount: 50000000, conditions: '1년, 비대면, 5천만원 한도' },
    { id: 'sb2', bankName: '페퍼저축은행', productName: {main:'페퍼스 회전정기예금', sub:'디지털전용'}, rate: 4.05, type: 'savings', minDurationMonths: 12, conditions: '1년, 인터넷/모바일 가입' },
    { id: 'sb3', bankName: 'SBI저축은행', productName: {main:'e-정기예금', sub:'온라인 추천'}, rate: 4.00, type: 'savings', minDurationMonths: 12, conditions: '1년, 온라인 전용' },
  ];
  return mockDelay(data);
};

export const fetchSpecialOffers = async (): Promise<SpecialOffer[]> => {
  // Simulate API call
  const data: SpecialOffer[] = [
    { id: 'so1', title: '신규고객 첫거래 우대 이벤트', bankName: '하나은행', rate: 3.8, description: '선착순 1만명, 모바일 앱으로 가입 시 추가 우대금리 제공!', endDate: '2024-08-31' },
    { id: 'so2', title: '여름맞이 특별금리 정기예금', bankName: 'IBK기업은행', description: '최대 연 3.7% (12개월). 한도 소진 시 조기 종료.', endDate: '2024-09-15' },
    { id: 'so3', title: '저축은행 특판 알림', bankName: '상상인저축은행', rate: 4.2, description: '연 4.2% 고금리 특판! 앱푸시 알림 신청하고 기회를 잡으세요.', link: '#' },
  ];
  return mockDelay(data);
};
