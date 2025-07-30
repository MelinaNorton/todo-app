import http from 'k6/http';
import { check, sleep } from 'k6';

// Load stages
export let options = {
  stages: [
    { duration: '10s', target: 20 },    // warm-up to 20 users
    { duration: '5s', target: 200 },    // rapid spike to 200 users
    { duration: '30s', target: 200 },   // sustain spike for 30 seconds
    { duration: '10s', target: 0 },     // drop back to idle
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
