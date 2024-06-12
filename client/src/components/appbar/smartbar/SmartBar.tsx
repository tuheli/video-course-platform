import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { RedeemOfferCallToAction } from './RedeemOfferCallToAction';

export const SmartBar = () => {
  const isRedeemed = useAppSelector((state) => state.specialOffer.isRedeemed);
  const isRejected = useAppSelector((state) => state.specialOffer.isRejected);
  const isExpired = useAppSelector((state) => state.specialOffer.isExpired);

  const location = useLocation();

  const showSpecialOffer =
    !isRedeemed && !isRejected && !isExpired && location.pathname === '/';

  return <>{showSpecialOffer && <RedeemOfferCallToAction />}</>;
};
