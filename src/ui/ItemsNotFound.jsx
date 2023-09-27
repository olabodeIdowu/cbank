import styled from 'styled-components';
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md';

const Error = styled.main`
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #df3131;
    /* stroke: #df3131; */
  }
`;

export default function ItemsNotFound() {
  return (
    <Error>
      <p>No items</p>
      <MdOutlineDoNotDisturbAlt />
    </Error>
  );
}
