import { useAppSelector } from '../../../app/hooks';
import { RedeemOfferCallToAction } from './RedeemOfferCallToAction';

// Smart bar switches which call to action to show on top of app bar

export const SmartBar = () => {
  const isRedeemed = useAppSelector((state) => state.offer.isRedeemed);

  if (isRedeemed) {
    return null;
  }

  return <RedeemOfferCallToAction />;
};
