import { InfluxDB, flux } from "@influxdata/influxdb-client";
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET } from "./env";

// Initialize InfluxDB client with the provided URL, token, org, and bucket
const url = INFLUX_URL;
const token = INFLUX_TOKEN;
const org = INFLUX_ORG;
const bucket = INFLUX_BUCKET;

const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi(org);

// Function to fetch data for the minimum and maximum temperature values
export const fetchDataMaxMinTempInfluxDB = async (): Promise<
  | {
      time: string;
      field: string;
      value: string;
    }[]
  | null
> => {

  // Construct the Flux query to get the minimum and maximum temperature values
  const query = flux`from(bucket: "${bucket}") 
    |> range(start: -1d)
    |> filter(fn: (r) => r.topic == "wqms/water_tank/tank1" and r._field == "temperature")
    |> aggregateWindow(every: 5m, fn: min)
    |> aggregateWindow(every: 5m, fn: max)
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
