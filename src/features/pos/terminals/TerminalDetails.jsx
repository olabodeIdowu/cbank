import { useParams } from 'react-router-dom';
import { useMoveBack } from '../../../hooks/useMoveBack';
import { axiosPrivate } from '../../../services/axios';
import Spinner from '../../../ui/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatCurrency } from '../../../utils/helpers';

export default function TerminalDetails() {
  const [terminalData, setTerminalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('terminal_details');
  const { terminalDetails } = useParams();
  const moveBack = useMoveBack();
  console.log(terminalDetails);
  useEffect(() => {
    async function getTerminalDetails() {
      try {
        setIsLoading(true);
        const data = await axiosPrivate.get(
          `/admin/terminals/${terminalDetails}`
        );
        if (!data) throw new Error(`data not found`);
        setIsLoading(false);
        console.log(data?.data?.data);
        setTerminalData(data?.data?.data.terminal);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
    getTerminalDetails();
  }, [terminalDetails]);

  if (isLoading) return <Spinner />;

  console.log(terminalData);
  // const { serial_number, type_id } = terminalData;
  // const { id, name, provider, price } = terminalData?.type;

  return (
    <section>
      <button onClick={moveBack} id='move-back'>
        <span>&larr; </span>
        Back
      </button>

      <ul className='terminal-details-nav'>
        <li
          onClick={() => setActiveTab('terminal_details')}
          className={`tab-details-navLink ${
            activeTab === 'terminal_details'
              ? 'tab-details-navLink__active'
              : ''
          }`}
        >
          Terminal Details
        </li>
      </ul>

      <main id='terminal-details'>
        <h3>Terminal Details</h3>
        <p className='terminal-details-sec-header'>
          Basic information about the account like terminal details
        </p>

        <ul className='terminal-details-list'>
          <li>
            <p>Terminal ID</p>
            <h6>{terminalData?.type?.id}</h6>
          </li>
          <li>
            <p>Name</p>
            <h6>{terminalData?.type?.name}</h6>
          </li>
          <li>
            <p>Serial No</p>
            <h6>{terminalData?.serial_number}</h6>
          </li>
          <li>
            <p>Provider</p>
            <h6>{terminalData?.type?.provider}</h6>
          </li>
          <li>
            <p>Price</p>
            <h6>{formatCurrency(terminalData?.type?.price)}</h6>
          </li>
        </ul>
      </main>
    </section>
  );
}
