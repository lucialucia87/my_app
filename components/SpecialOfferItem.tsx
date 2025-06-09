
import React from 'react';
import { SpecialOffer } from '../types';
import NotificationToggle from './NotificationToggle';
import { BellIcon, SparklesIcon } from './icons/IconComponents';

interface SpecialOfferItemProps {
  offer: SpecialOffer;
  isAlarmActive: boolean;
  onAlarmToggle: (id: string, isActive: boolean) => void;
}

const SpecialOfferItem: React.FC<SpecialOfferItemProps> = ({ offer, isAlarmActive, onAlarmToggle }) => {
  return (
    <div className="bg-neutral-light shadow-lg rounded-xl p-5 m-2">
      <div className="flex justify-between items-start mb-3">
        <div>
            <div className="flex items-center mb-1">
                <SparklesIcon className="w-5 h-5 text-accent mr-2" />
                <h4 className="text-md font-semibold text-neutral-dark">{offer.title}</h4>
            </div>
            <p className="text-sm text-neutral-textLight">{offer.bankName}</p>
        </div>
        <NotificationToggle id={offer.id} isToggled={isAlarmActive} onToggle={onAlarmToggle} />
      </div>
      
      {offer.rate && (
        <p className="text-lg font-bold text-accent mb-2">최대 연 {offer.rate.toFixed(2)}%</p>
      )}
      
      <p className="text-sm text-neutral-text mb-2">{offer.description}</p>
      
      <div className="flex justify-between items-center text-xs text-neutral-textLight">
        {offer.endDate && <span>기한: ~{offer.endDate}</span>}
        {offer.link && (
          <a 
            href={offer.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline"
          >
            자세히 보기
          </a>
        )}
      </div>
      {isAlarmActive && (
        <div className="mt-3 flex items-center text-xs text-green-600 bg-green-100 p-2 rounded-md">
            <BellIcon className="w-4 h-4 mr-1" active={true}/>
            <span>이 특판 상품 알림이 설정되었습니다.</span>
        </div>
      )}
    </div>
  );
};

export default SpecialOfferItem;
