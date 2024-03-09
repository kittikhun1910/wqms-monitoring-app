import { InfluxDB, flux } from "@influxdata/influxdb-client";
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET } from "./env";

// Initialize InfluxDB client with the provided URL, token, org, and bucket
const url = INFLUX_URL;
const token = INFLUX_TOKEN;
const org = INFLUX_ORG;
const bucket = INFLUX_BUCKET;

const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi(org);

// Function to fetch all pH data from the past 7 days
export const fetchAllDataPHInfluxDB = async (): Promise<
  | {
      time: string;
      field: string;
      value: string;
    }[]
  | null
> => {
  // Construct the Flux query to get all pH data from the past 7 days
  const query = flux`
  from(bucket: "${bucket}")
    |> range(start: -7d)
    |> filter(fn: (r) => r.topic == "wqms/water_tank/tank1" and r._field == "avgpH")
`;

  try {
    // Execute the query and collect the rows
    const result = await queryApi.collectRows(query);
    if (result && result.length > 0) {
      // Map the result to the expected format
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
