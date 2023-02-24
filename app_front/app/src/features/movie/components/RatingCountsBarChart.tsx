import { FC } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import humanizeRate from 'lib/humanizeRate';
import useGetRatingCounts from '../hooks/use-get-rating-counts';

const RatingCountsBarChart: FC<{ movieId: string }> = ({ movieId }) => {
  const data = useGetRatingCounts(movieId);
  const tenHumanizedData = Array.from(Array(11).keys())
    .map((_, i) => ({
      id: i,
      name: humanizeRate(i),
      Nactmユーザーの評価: data?.find(({ id }) => id === i)?.count,
    }))
    .slice(1);

  return (
    <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
      <BarChart
        data={tenHumanizedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={{ fill: '#616C75' }} />
        <Legend />
        <Bar dataKey="Nactmユーザーの評価" fill="#8884d8" />
        {/* <Bar dataKey="count" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RatingCountsBarChart;
