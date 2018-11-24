import { ArtistDashBookings } from '../artist-dash';
import { Landing } from '../components';
import getBookingsData from './services/get-bookings-data';

const routesConfig = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/artist/bookings',
    component: ArtistDashBookings,
    loadData: getBookingsData,
  },
];

export default routesConfig;
