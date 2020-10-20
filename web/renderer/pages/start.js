import useSwr from 'swr';
import Head from 'next/head';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSwr('/api/toggl', fetcher);
  const { fromDate, setFromDate } = useState();

  if (error) return <div>Failed to time entries</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Time Entries</h1>
      <DatePicker
        label="From"
        onChange={(_, value) => {
          setDates({ from: value });
        }}
        value={fromDate}
        sundayFirstDayOfWeek
      />
      <ul>
        {data.map((d, i) => {
          return <li key={i}>{d.description}</li>;
        })}
      </ul>
    </>
  );
}
