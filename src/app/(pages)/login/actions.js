'use server'

import { redirect } from 'next/navigation'
import page from '../profile/page';

export async function navigate(data) {
  let username = '';
  for (let [key, value] of data.entries()) {
    if (key === 'username') {
      username = value;
      break;
    }
  }
  let password = '';
  for (let [key, value] of data.entries()) {
    if (key === 'password') {
      password = value;
      break;
    }
  }

  const res = await fetch('https://dummyjson.com/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000/profile'
    },
    body: JSON.stringify({

      username: username,
      password: password,
      expiresInMins: 30,
    }),
  })
  const newData = await res.json();
  redirect(`/profile?token=${newData.accessToken}`)
  return <page newData={newData} />
}

export async function checkData(token) {
  const response = await fetch("https://dummyjson.com/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  const newData = await response.json();
  // console.log(newData)
  return <page newData={newData} />

}