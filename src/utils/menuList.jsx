import { MdHome } from 'react-icons/md';
import { MdFactCheck } from 'react-icons/md';
import { MdWatchLater } from 'react-icons/md';
// import { BsFillExclamationSquareFill } from 'react-icons/bs';
import { AiFillExclamationCircle } from 'react-icons/ai';


export const navMenus = [
  { label: 'Home', to: '/', icon: <MdHome className="w-5 h-5" />, idx: 0 }, // jsx는 js 파일에서 지정할 수 없다.
  {
    label: 'Completed',
    to: '/completed',
    icon: <MdFactCheck className="w-5 h-5" />,
    idx: 1,
  },
  {
    label: 'Proceeding',
    to: '/proceeding',
    icon: <MdWatchLater className="w-5 h-5" />,
    idx: 2,
  },
  {
    label: 'Important',
    to: '/important',
    icon: <AiFillExclamationCircle className="w-5 h-5" />,
    idx: 3,
  },
  {
    label: 'GoogleMaps',
    to: '/googleMaps',
    icon: <AiFillExclamationCircle className="w-5 h-5" />,
    idx: 4,
  }
];




