/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { FC } from 'react';
/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';

const progressKeyframes = keyframes`
  0% {
    stroke-dasharray: 0 100;
  }
`;

const circularChartStyles = (size: number, color: string, cursor: string) => css`
  display: inline;
  margin: 0 auto;
  max-width: ${size}px;
  cursor: ${cursor};
  &:hover {
    .circle {
      stroke-width: 3.5;
    }
    text.percentage-class {
      font-size: 0.9em;
    }
    text.divisor-class {
      font-size: 0.45em;
    }
    .null-my-rate-class {
      stroke: ${color};
    }
  }
  .circle {
    fill: none;
    stroke-width: 2.8;
    stroke-linecap: round;
    animation: ${progressKeyframes} 1s ease-out forwards;
    stroke: ${color};
  }
`;

const circleBgStyles = css`
  fill: none;
  stroke: #333333;
  stroke-width: 2.8;
`;

const percentageStyles = (color: string) => css`
  fill: rgba(255, 255, 255, 0.7);
  font-family: sans-serif;
  font-size: 0.8em;
  font-weight: bold;
  text-anchor: middle;
`;

const RIPStyles = css`
  fill: #666;
  font-family: sans-serif;
  font-size: 0.5em;
  font-weight: bold;
  text-anchor: middle;
  stroke: #666; /* ふちどりの色 */
  stroke-width: 1px; /* ふちどりのふとさ */
`;

const divisorStyles = css`
  fill: #666;
  font-family: sans-serif;
  font-size: 0.4em;
  font-weight: bold;
  text-anchor: middle;
`;

const rectStyles = css`
  fill: #666;
  font-family: sans-serif;
  font-size: 0.4em;
  font-weight: bold;
  text-anchor: middle;
`;

const block = (size: number) => css`
  display: inline-block;
  width: ${size}px;
`;

interface Props {
  size: number;
  color: string;
  strokeDasharray: string;
  percentage?: number;
  serviceName: string;
}

const CircularChart = (props: Props) => {
  const { size, color, strokeDasharray, percentage, serviceName } = props;

  return (
    <div css={block(size)}>
      {percentage ? (
        <svg viewBox="0 0 36 36" css={circularChartStyles(size, color, 'pointer')}>
          <path
            className="circle-bg"
            css={circleBgStyles}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray={strokeDasharray}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" css={percentageStyles(color)} className="percentage-class">
            {percentage}
          </text>
          <text x="20" y="27.0" css={divisorStyles} className="divisor-class">
            /10
          </text>
        </svg>
      ) : (
        <div css={block(size)}>
          {serviceName === 'MyRate' ? (
            <Tooltip arrow title="10段階で評価をする" placement="top" enterDelay={700}>
              <svg
                viewBox="0 0 36 36"
                css={circularChartStyles(size, color, 'pointer')}
                className="hover-circle-bg-big"
              >
                <path
                  className="circle-bg null-my-rate-class"
                  css={circleBgStyles}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" css={percentageStyles(color)} className="percentage-class">
                  --
                </text>
                <text x="20" y="27.0" css={divisorStyles} className="divisor-class">
                  /10
                </text>
                {/* <line
          x1="13.5"
          x2="22.5"
          y1="18.5"
          y2="18.5"
          css={css`
            stroke: #666;
            stroke-width: 2;
            stroke-linecap: round;
          `}
        /> */}
              </svg>
            </Tooltip>
          ) : (
            <Tooltip
              arrow
              title="評価が出来ませんでした。評価数が足りないです・・・"
              placement="top"
            >
              <svg viewBox="0 0 36 36" css={circularChartStyles(size, color, 'default')}>
                <path
                  className="circle-bg"
                  css={circleBgStyles}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" css={RIPStyles}>
                  ・_・?
                </text>
                {/* <line
              x1="13.5"
              x2="22.5"
              y1="18.5"
              y2="18.5"
              css={css`
                stroke: #666;
                stroke-width: 2;
                stroke-linecap: round;
              `}
            /> */}
              </svg>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
};

const CircleRate: FC<{ size: number; serviceName: string; rate?: number }> = ({
  size,
  serviceName,
  rate,
}) => (
  <>
    {/* 自分のレート用サークル */}
    {serviceName === 'MyRate' ? (
      <div css={block(size)}>
        {rate ? (
          <CircularChart
            size={size}
            color="#9019FF"
            strokeDasharray={`${String(rate * 10)}, 100`}
            percentage={rate}
            serviceName={serviceName}
          />
        ) : (
          <CircularChart
            size={size}
            color="#9019FF"
            strokeDasharray="0, 100"
            serviceName={serviceName}
          />
        )}
      </div>
    ) : (
      <div css={block(size)}>
        {/* 他人のレーティング用サークル */}
        {rate ? (
          <CircularChart
            size={size}
            color="#30B300"
            strokeDasharray={`${String(rate * 10)}, 100`}
            percentage={rate}
            serviceName={serviceName}
          />
        ) : (
          <CircularChart
            size={size}
            color="#8FCC94"
            strokeDasharray="0, 100"
            serviceName={serviceName}
          />
        )}
      </div>
    )}
  </>
);
export default CircleRate;
