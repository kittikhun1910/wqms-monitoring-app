// This is the main function that runs the query and fetches data from the server
import { InfluxDB, flux } from "@influxdata/influxdb-client";
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET } from "./env";
const url = INFLUX_URL;
const token = INFLUX_TOKEN;
const org = INFLUX_ORG;
const bucket = INFLUX_BUCKET;

const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi(org);

// Fetch all data for the tank'temperatures'field. This is used to determine which fields are visible
export const fetchAllDataTempInfluxDB = async (): Promise<
  | {
      time: string;
      field: string;
      value: string;
    }[]
  | null
> => {
  const query = flux`
  from(bucket: "${bucket}")
    |> range(start: -7d)
    |> filter(fn: (r) => r.topic == "wqms/water_tank/tank1" and r._field == "temperature")
`;

  // Query and return records if they exist. Returns null if there are no records
  try {
    const result = await queryApi.collectRows(query);
    if (result && result.length > 0) {
      const records = result.map((record: any) => ({
        time: record._time,
        field: record._field,
        value: record._value,
      }));
      return records;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error querying InfluxDB:", error);
    throw error;
  }
};
