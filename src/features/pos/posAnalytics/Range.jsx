import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const Result = styled.span`
  color: #70c47e;
  font-weight: bold;
`;
const Bar = styled.span`
  position: relative;
  height: 2px;
  border-top: 2px solid #eaeaea;
  flex: 1;
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    left: ${({ lower, min, max }) => ((lower - min) / max) * 100}%;
    top: -5px;
    height: 8px;
    width: ${({ lower, upper, max }) => ((upper - lower) / max) * 100}%;
    background-color: rgba(112, 196, 126, 0.4);
  }
  &::after {
    content: '•';
    font-size: 20px;
    position: absolute;
    left: ${({ result, max }) => (result / max) * 100}%;
    top: -12px;
  }
`;
export function RangeLine({
  min = 0,
  max = 75,
  lower = 25,
  upper = 75,
  result = 49,
}) {
  return (
    <Wrap>
      <Result>{result}</Result>
      <Bar result={result} lower={lower} upper={upper} max={max} min={min} />
    </Wrap>
  );
}
