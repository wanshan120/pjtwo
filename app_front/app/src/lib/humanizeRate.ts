// import { object } from 'decoders/annotate';

const labels: { [index: number]: string } = {
  1: 'RIP',
  2: 'C',
  3: 'C+',
  4: 'B',
  5: 'B+',
  6: 'A',
  7: 'A+',
  8: 'S',
  9: 'S+',
  10: 'GOD',
};

const humanizeRate = (rateValue: number) => {
  let label = '';
  Object.keys(labels).some((element) => {
    if (Number(element) >= rateValue) {
      label = labels[Number(element)];

      return true;
    }

    return false;
  });

  return label;
};

export default humanizeRate;
