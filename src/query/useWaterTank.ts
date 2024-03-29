import { InfluxDB, flux } from "@influxdata/influxdb-client";
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET } from "./env";
const url = INFLUX_URL;
const token = INFLUX_TOKEN;
const org = INFLUX_ORG;
const bucket = INFLUX_BUCKET;

const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi(org);

/**
 * Connects to InfluxDB and retrieves data for average pH in the last 7 days.
 * @returns Array of data points or null if no data is found
 */

export const fetchDataAvgpHInfluxDB = async (): Promise<
  | {
      time: string;
      field: string;
      value: string;
    }[]
  | null
> => {
  const query = flux`from(bucket: "${bucket}") 
    |> range(start: -7d)
    |> filter(fn: (r) => r.topic == "wqms/water_tank/tank1")
    |> last()`;

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
