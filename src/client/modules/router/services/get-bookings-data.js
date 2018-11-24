import axios from 'axios';

const getBookingsData = match => {
  return axios.get('http://localhost:1337/api/artist/bookings')
    .then(resp => resp.data);
};

export default getBookingsData;
