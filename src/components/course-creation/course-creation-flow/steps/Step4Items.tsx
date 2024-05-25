import { step4Data } from './step4Data';
import { Step4Item } from './Step4Item';

export const Step4Items = () => {
  return (
    <>
      {step4Data.map((item) => (
        <Step4Item key={item.value} {...item} />
      ))}
    </>
  );
};
