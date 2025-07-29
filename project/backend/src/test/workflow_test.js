import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '20s', target: 10 },   // Ramp up to 10 users
    { duration: '40s', target: 50 },   // Hold at 50 users
    { duration: '30s', target: 0 },    // Ramp down
  ],
};

// Step 1: Login once for all VUs
export function setup() {
  const loginRes = http.post(
    'https://api.portofolkodimi.com/auth/login',
    JSON.stringify({
      username: 'ozzyfan',
      password: 'CrazyTrain!',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(loginRes, {
    'login success': (r) => r.status === 200,
  });

  const token = loginRes.body;
  return { token };
}

// Step 2: Simulate workflow for each VU
export default function (data) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
    'Content-Type': 'application/json',
  };

  // GET all items
  const getRes = http.get('https://api.portofolkodimi.com/list/items', { headers });
  check(getRes, { 'GET items success': (r) => r.status === 200 });

  // POST new item
  const newItem = JSON.stringify({ text: 'Test item', done: false });
  const postRes = http.post('https://api.portofolkodimi.com/list/item', newItem, { headers });
  check(postRes, { 'POST item success': (r) => r.status === 201 });

  const postBody = JSON.parse(postRes.body);
  const itemId = postBody._id;

  // DELETE the item
  if (itemId) {
    const deleteRes = http.del(
      `https://api.portofolkodimi.com/list/item?item_id=${itemId}`,
      null,
      { headers }
    );
    check(deleteRes, { 'DELETE item success': (r) => r.status === 200 });
  }

  sleep(1);
}
