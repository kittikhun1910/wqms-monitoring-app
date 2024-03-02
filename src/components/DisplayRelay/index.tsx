import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import ReactSwitch from "react-switch";
import WaterPumpPNG from "/src/images/water-pump.png";
import mqtt from "mqtt";

interface RelayData {
  time: string;
  field: string;
  value: string | number;
}

interface DisplayRelayProps {
  data: {
    relayStatus: RelayData[] | null;
  };
}

const DisplayRelayComponent: React.FC<DisplayRelayProps> = ({ data }) => {
  const mqttClient = mqtt.connect("ws://54.255.69.30:8080");
  console.log(data.relayStatus);

  const relayData = data.relayStatus || [];
  const relay_1data = relayData.find((item) => item.field === "relay_1");
  const relay_2data = relayData.find((item) => item.field === "relay_2");
  const relay_3data = relayData.find((item) => item.field === "relay_3");
  const relay_4data = relayData.find((item) => item.field === "relay_4");
  const relay_5data = relayData.find((item) => item.field === "relay_5");
  const relay_6data = relayData.find((item) => item.field === "relay_6");

  const [checked, setChecked] = useState(relay_1data?.value === 1);
  const [checked2, setChecked2] = useState(relay_2data?.value === 1);
  const [checked3, setChecked3] = useState(relay_3data?.value === 1);
  const [checked4, setChecked4] = useState(relay_4data?.value === 1);
  const [checked5, setChecked5] = useState(relay_5data?.value === 1);
  const [checked6, setChecked6] = useState(relay_6data?.value === 1);

  useEffect(() => {
    setChecked(relay_1data?.value === 1);
    setChecked2(relay_2data?.value === 1);
    setChecked3(relay_3data?.value === 1);
    setChecked4(relay_4data?.value === 1);
    setChecked5(relay_5data?.value === 1);
    setChecked6(relay_6data?.value === 1);
  }, [
    relay_1data,
    relay_2data,
    relay_3data,
    relay_4data,
    relay_5data,
    relay_6data,
  ]);

  const handleChangerelay_1 = (
    val: boolean | ((prevState: boolean) => boolean)
  ) => {
    setChecked(val);
    const message = JSON.stringify({ relay_1: val ? 1 : 0 });
    mqttClient.publish("esp32/test", message);
  };
  const handleChangerelay_2 = (
    val2: boolean | ((prevState2: boolean) => boolean)
  ) => {
    setChecked2(val2);
    const message = JSON.stringify({ relay_2: val2 ? 1 : 0 });
    mqttClient.publish("esp32/test", message);
  };
  const handleChangerelay_3 = (
    val3: boolean | ((prevState3: boolean) => boolean)
  ) => {
    setChecked3(val3);
    const message = JSON.stringify({ relay_3: val3 ? 1 : 0 });
    mqttClient.publish("esp32/test", message);
  };
  const handleChangerelay_4 = (
    val4: boolean | ((prevState4: boolean) => boolean)
  ) => {
    setChecked4(val4);
    const message = JSON.stringify({ relay_4: val4 ? 1 : 0 });
    mqttClient.publish("esp32/test", message);
  };
  const handleChangerelay_5 = (
    val5: boolean | ((prevState5: boolean) => boolean)
  ) => {
    setChecked5(val5);
    const message = JSON.stringify({ relay_5: val5 ? 1 : 0 });
    mqttClient.publish("esp32/test", message);
  };

  const handleChangerelay_6 = (
    val6: boolean | ((prevState6: boolean) => boolean)
  ) => {
    setChecked6(val6);
    const message = JSON.stringify({ relay_6: val6 ? 1 : 0 });
    mqttClient.publish("esp32/test", message);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <p>Water In Tank1</p>
        <div
          className={`${styles.imgBox} ${
            relay_1data?.value === 1
              ? styles.toggleButtonOn
              : styles.toggleButtonOff
          }`}
        >
          <img src={WaterPumpPNG} alt="" />
        </div>
        {relay_1data?.value === 1 ? "ON " + "disabled" : "OFF" + "disabled"}
        <div className={styles.toggleButton}>
          <ReactSwitch
            checked={checked}
            onChange={handleChangerelay_1}
            onColor="#00BF63" // Custom color when switch is on
            offColor="#FF3131" // Custom color when switch is off
            width={60}
            height={30}
            disabled={true}
          />
        </div>
      </div>
      <div className={styles.contentBox}>
        <p>Water In Tank2</p>
        <div
          className={`${styles.imgBox} ${
            relay_2data?.value === 1
              ? styles.toggleButtonOn
              : styles.toggleButtonOff
          }`}
        >
          <img src={WaterPumpPNG} alt="" />
        </div>
        {relay_2data?.value === 1 ? "ON " + "disabled" : "OFF " + "disabled"}
        <div className={styles.toggleButton}>
          <ReactSwitch
            checked={checked2}
            onChange={handleChangerelay_2}
            onColor="#00BF63" // Custom color when switch is on
            offColor="#FF3131" // Custom color when switch is off
            width={60}
            height={30}
            disabled={true}
          />
        </div>
      </div>
      <div className={styles.contentBox}>
        <p>Filter Pump Tank1</p>
        <div
          className={`${styles.imgBox} ${
            relay_3data?.value === 1
              ? styles.toggleButtonOn
              : styles.toggleButtonOff
          }`}
        >
          <img src={WaterPumpPNG} alt="" />
        </div>
        {relay_3data?.value === 1 ? "ON" : "OFF"}
        <div className={styles.toggleButton}>
          <ReactSwitch
            checked={checked3}
            onChange={handleChangerelay_3}
            onColor="#00BF63" // Custom color when switch is on
            offColor="#FF3131" // Custom color when switch is off
            width={60}
            height={30}
          />
        </div>
      </div>
      <div className={styles.contentBox}>
        <p>Filter Pump Tank2</p>
        <div
          className={`${styles.imgBox} ${
            relay_4data?.value === 1
              ? styles.toggleButtonOn
              : styles.toggleButtonOff
          }`}
        >
          <img src={WaterPumpPNG} alt="" />
        </div>
        {relay_4data?.value === 1 ? "ON" : "OFF"}
        <div className={styles.toggleButton}>
          <ReactSwitch
            checked={checked4}
            onChange={handleChangerelay_4}
            onColor="#00BF63" // Custom color when switch is on
            offColor="#FF3131" // Custom color when switch is off
            width={60}
            height={30}
          />
        </div>
      </div>
      <div className={styles.contentBox}>
        <p>Water Out Tank1</p>
        <div
          className={`${styles.imgBox} ${
            relay_5data?.value === 1
              ? styles.toggleButtonOn
              : styles.toggleButtonOff
          }`}
        >
          <img src={WaterPumpPNG} alt="" />
        </div>
        {relay_5data?.value === 1 ? "ON " + "disabled" : "OFF " + "disabled"}
        <div className={styles.toggleButton}>
          <ReactSwitch
            checked={checked5}
            onChange={handleChangerelay_5}
            onColor="#00BF63" // Custom color when switch is on
            offColor="#FF3131" // Custom color when switch is off
            width={60}
            height={30}
            disabled={true}
          />
        </div>
      </div>
      <div className={styles.contentBox}>
        <p>Water Out Tank2</p>
        <div
          className={`${styles.imgBox} ${
            relay_6data?.value === 1
              ? styles.toggleButtonOn
              : styles.toggleButtonOff
          }`}
        >
          <img src={WaterPumpPNG} alt="" />
        </div>
        {relay_6data?.value === 1 ? "ON " + "disabled" : "OFF " + "disabled"}
        <div className={styles.toggleButton}>
          <ReactSwitch
            checked={checked6}
            onChange={handleChangerelay_6}
            onColor="#00BF63" // Custom color when switch is on
            offColor="#FF3131" // Custom color when switch is off
            width={60}
            height={30}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayRelayComponent;
