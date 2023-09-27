import {
  BsFillPersonFill,
  BsFillPersonPlusFill,
  BsEnvelopePaperFill,
  BsListColumnsReverse,
  BsShieldLockFill,
  BsFillFilePostFill,
} from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { MdOutlineFormatListNumbered } from 'react-icons/md';

export const navLists = [
  {
    id: nanoid(),
    name: 'Accounts',
    active: false,
    list: ['Accounts', 'Debit Mandate'],
    icon: <ion-icon name='analytics'></ion-icon>,
  },
  {
    id: nanoid(),
    name: 'Pos Management',
    active: false,
    list: [
      'analytics',
      'Pos Type',
      'Pos Request',
      'Pos Payment',
      'Pos',
      'Terminal',
    ],
    icon: <BsFillFilePostFill />,
  },
  // {
  //   id: nanoid(),
  //   name: 'Partners',
  //   active: false,
  //   list: ['Partner'],
  //   icon: <BsFillPersonPlusFill />,
  // },
  {
    id: nanoid(),
    name: 'Message',
    active: false,
    list: ['Telephone Token', 'Email Token', 'Send Message'],
    icon: <BsEnvelopePaperFill />,
  },
  {
    id: nanoid(),
    name: 'Transactions',
    active: false,
    list: ['View Transaction', 'Create Transaction', 'Reverse Transaction'],
    icon: <BsListColumnsReverse />,
  },
  {
    id: nanoid(),
    name: 'Investments',
    active: false,
    list: ['View Investment', 'Create Investment'],
    icon: <MdOutlineFormatListNumbered />,
  },
  {
    id: nanoid(),
    name: 'Security',
    active: false,
    list: [
      'Change Password',
      'Change Transaction Pin',
      'Reset Transaction Pin',
    ],
    icon: <BsShieldLockFill />,
  },
  {
    id: nanoid(),
    name: 'Admin',
    active: false,
    list: ['Internal Users', 'Teams', 'Roles', 'Permissions'],
    icon: <BsFillPersonFill />,
  },
];
