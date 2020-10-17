import fetch from 'node-fetch';
import querystring from 'querystring';
import { encode } from 'base-64';

const API_URL = 'https://api.track.toggl.com/api/v8/time_entries?';

export default async function handler(req, res) {
  const startDate = '2013-03-10T15%3A42%3A46%2B02%3A00';
  const endDate = '2013-03-12T15%3A42%3A46%2B02%3A00';
  const response = await fetch(
    API_URL + querystring.stringify({ startDate, endDate }),
    {
      headers: {
        Authorization: `Basic ${encode(
          `${process.env.TOGGL_TOKEN}:api_token`
        )}`,
      },
    }
  );
  const json = await response.json();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify(
      json.map((item) => {
        const { description, duration, start, stop } = item;
        return { description, duration, start, stop };
      })
    )
  );
}
