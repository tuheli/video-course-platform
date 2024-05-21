import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { RedeemOfferCallToAction } from './RedeemOfferCallToAction';

// Smart bar switches which call to action to show on top of app bar

export const SmartBar = () => {
  const isRedeemed = useAppSelector((state) => state.specialOffer.isRedeemed);
  const isRejected = useAppSelector((state) => state.specialOffer.isRejected);
  const isExpired = useAppSelector((state) => state.specialOffer.isExpired);

  // Show offer only on landing page
  const location = useLocation();

  const showSpecialOffer =
    !isRedeemed && !isRejected && !isExpired && location.pathname === '/';

  return <>{showSpecialOffer && <RedeemOfferCallToAction />}</>;
};
