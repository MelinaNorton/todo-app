import http from 'k6/http';
import { check, sleep } from 'k6';

// Load stages
export let options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '30s', target: 50 },
    { duration: '20s', target: 0 },
  ],
};

// Setup: login once to get token
export function setup() {
  const loginRes = http.post(
    'https://api.portofolkodimi.com/auth/login',
    JSON.stringify({
      username: 'ozzyfan',
      password: 'CrazyTrain!',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  console.log("Login Response Body:", loginRes.body);
  check(loginRes, { 'login success': (r) => r.status === 200 });

  const token = loginRes.body
  return { token : token };
}

// Default: use token in requests
export default function (data) {
  const itemsRes = http.get('https://api.portofolkodimi.com/list/items', {
    headers: { Authorization: `Bearer ${data.token}` },
  });

  check(itemsRes, {
    'status is 200': (r) => r.status === 200,
    'response time < 400ms': (r) => r.timings.duration < 400,
  });

  sleep(1);
}
