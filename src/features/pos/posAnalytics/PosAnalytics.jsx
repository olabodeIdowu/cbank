import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import Spinner from '../../../ui/Spinner';
import { useAnalytics } from './useAnalytics';
import { RangeLine } from './Range';
import styled from 'styled-components';
const PosAnalytic = styled.figure`
  margin-block: 1rem 2rem;
  & h6 {
    font-size: 2.4rem;
  }
  & p {
    font-size: 1.4rem;
    color: #777;
    margin-bottom: 2rem;
  }

  & div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }
`;

const MainAnalytic = styled.main`
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2rem;
  align-items: center;
`;

const ActivePos = styled.div`
  background: #2eb85c;
  border-radius: 6px;
  padding: 1.6rem 3.2rem;
  color: #ffffff;
  font-weight: 700;

  & h6 {
    font-size: 1.6rem;
  }

  & h2 {
    font-size: 2.6rem;
  }
`;
const CountPos = styled.div`
  background: #321fdb;
  border-radius: 6px;
  padding: 1.6rem 3.2rem;
  color: #ffffff;
  font-weight: 700;

  & h6 {
    font-size: 1.6rem;
  }

  & h2 {
    font-size: 2.6rem;
  }
`;

const InactivePos = styled.div`
  background: #e55353;
  border-radius: 6px;
  padding: 1.6rem 3.2rem;
  color: #ffffff;
  font-weight: 700;

  & h6 {
    font-size: 1.6rem;
  }

  & h2 {
    font-size: 2.6rem;
  }
`;

const PosPaymentAnalytic = styled.figure`
  margin-block: 1rem 2rem;
  & h6 {
    font-size: 2.4rem;
  }
  & p {
    font-size: 1.4rem;
    color: #777;
    margin-bottom: 2rem;
  }

  & div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }
`;

const TotalAmountPayment = styled.div`
  background: #2eb85c;
  border-radius: 6px;
  padding: 1.6rem 3.2rem;
  color: #ffffff;
  font-weight: 700;

  & h6 {
    font-size: 1.6rem;
  }

  & h2 {
    font-size: 2.6rem;
  }
`;
const CountPayments = styled.div`
  background: #321fdb;
  border-radius: 6px;
  padding: 1.6rem 3.2rem;
  color: #ffffff;
  font-weight: 700;

  & h6 {
    font-size: 1.6rem;
  }

  & h2 {
    font-size: 2.6rem;
  }
`;
const PosRequestAnalytic = styled.figure`
  margin-block: 1rem 4rem;
  & h6 {
    font-size: 2.4rem;
  }
  & p {
    font-size: 1.4rem;
    color: #777;
    margin-bottom: 2rem;
  }

  & div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Dispatched = styled.div`
  background: #2eb85c;
  border-radius: 6px;
  padding: 1.6rem 3.2rem;
  color: #ffffff;
  font-weight: 700;

  & h6 {
    font-size: 1.6rem;
  }

  & h2 {
    font-size: 2.6rem;
  }
`;

const Pending = styled.div`
  background: #e55353;
  border-radius: 6px;
  padding: 1.6rem 3.2rem;
  color: #ffffff;
  font-weight: 700;

  & h6 {
    font-size: 1.6rem;
  }

  & h2 {
    font-size: 2.6rem;
  }
`;

const Proccessed = styled.div`
  background: #f9b115;
  border-radius: 6px;
  padding: 1.6rem 3.2rem;
  color: #ffffff;
  font-weight: 700;

  & h6 {
    font-size: 1.6rem;
  }

  & h2 {
    font-size: 2.6rem;
  }
`;

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function PosAnalytics() {
  const { isLoading, analytics } = useAnalytics();
  console.log(analytics);
  if (isLoading) return <Spinner />;
  return (
    <>
      <main>
        <PosAnalytic>
          <h6>Pos</h6>
          <p>Total Pos analytics for this week</p>

          <MainAnalytic>
            <ActivePos>
              <h6>Total Active</h6>
              <h2>{analytics?.pos?.total_active}</h2>
            </ActivePos>

            <CountPos>
              <h6>Total Count</h6>
              <h2>{analytics?.pos?.total_count}</h2>
            </CountPos>

            <InactivePos>
              <h6>Total Inactive</h6>
              <h2>{analytics?.pos?.total_inactive}</h2>
            </InactivePos>
          </MainAnalytic>
        </PosAnalytic>

        <PosPaymentAnalytic>
          <h6>Pos Payment</h6>
          <p>Total Pos payments for this week</p>
          <MainAnalytic>
            <TotalAmountPayment>
              <h6>Total Amount</h6>
              <h2>{analytics?.pos_payment?.total_amount}</h2>
            </TotalAmountPayment>
            <CountPayments>
              <h6>Total Count</h6>
              <h2>{analytics?.pos_payment?.total_count}</h2>
            </CountPayments>
          </MainAnalytic>
        </PosPaymentAnalytic>

        <PosRequestAnalytic>
          <h6>Pos Request</h6>
          <p>Total Pos requests for this week</p>
          <MainAnalytic>
            <Dispatched>
              <h6>Dispatched</h6>
              <h2>{analytics?.pos_request?.dispatched}</h2>
            </Dispatched>
            <Pending>
              <h6>Pending</h6>
              <h2>{analytics?.pos_request?.pending}</h2>
            </Pending>
            <Proccessed>
              <h6>Proccessed</h6>
              <h2>{analytics?.pos_request?.processed}</h2>
            </Proccessed>
          </MainAnalytic>
        </PosRequestAnalytic>
      </main>
      <AreaChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
        <Area type='monotone' dataKey='pv' stroke='#000000' fill='#000000' />
      </AreaChart>
    </>
  );
}
