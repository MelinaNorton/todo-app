import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 20,               // constant load
  duration: '30m',       // run for 30 minutes
};

export function setup() {
  const loginRes = http.post(
    'https://api.portofolkodimi.com/auth/login',
    JSON.stringify({
      username: 'ozzyfan',
      password: 'CrazyTrain!',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(loginRes, { 'login success': (r) => r.status === 200 });
  const token = loginRes.body
  return { token: token };
}

export default function (data) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
    'Content-Type': 'application/json',
  };

  // GET items
  let getRes = http.get('https://api.portofolkodimi.com/list/items', { headers });
  check(getRes, { 'GET items success': (r) => r.status === 200 });

  sleep(1); // 1 second pause between requests
}
