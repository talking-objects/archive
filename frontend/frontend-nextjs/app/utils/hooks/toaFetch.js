import { BASE_URL } from "../constant/etc";

export const toaFetchData = async ({bodyData}) => {
  const req = await fetch(`${BASE_URL}/api/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData),
    cache: "no-cache"
  });
  const res = await req.json();
  return res;
};
