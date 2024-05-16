import { useAppSelector } from '../../../app/hooks';
import { RedeemOfferCallToAction } from './RedeemOfferCallToAction';

// Smart bar switches which call to action to show on top of app bar

export const SmartBar = () => {
  const isRedeemed = useAppSelector((state) => state.specialOffer.isRedeemed);
  const isRejected = useAppSelector((state) => state.specialOffer.isRejected);
  const isExpired = useAppSelector((state) => state.specialOffer.isExpired);

  const showSpecialOffer = !isRedeemed && !isRejected && !isExpired;

  return <>{showSpecialOffer && <RedeemOfferCallToAction />}</>;
};
