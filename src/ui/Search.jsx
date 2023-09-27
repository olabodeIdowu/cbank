import { AiOutlineSearch } from 'react-icons/ai';

export default function Search() {
  return (
    <div className='search'>
      <AiOutlineSearch />
      <input type='text' placeholder='Search here...' />
    </div>
  );
}
