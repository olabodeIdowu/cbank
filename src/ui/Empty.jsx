import styled from 'styled-components';

const EmptyText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  font-size: 2.5rem;
`;
function Empty({ resourceName }) {
  return <EmptyText>No {resourceName} could be found 🚫</EmptyText>;
}

export default Empty;
