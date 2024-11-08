import type { ActionFunction } from 'react-router';
import axios from 'axios';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  // TODO: save to store
  const data = await axios.post(
    'http://91.219.61.93:4000/auth/login',
    credentials
  );
};

export default action;
