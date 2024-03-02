import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

const MQTTComponent: React.FC = () => {
  const [client, setClient] = useState<any>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const mqttClient = mqtt.connect("ws://54.255.69.30:8080");

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe("your/topic"); // Subscribe to a topic
    });

    mqttClient.on("message", (topic: string, payload: Buffer) => {
      console.log(`Received message on topic ${topic}: ${payload.toString()}`);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end(); // Disconnect from MQTT broker on unmount
    };
  }, []);

  const handlePublish = () => {
    if (client) {
      client.publish("your/topic", message); // Publish a message to a topic
    }
  };

  return (
    <div>
      <h1>MQTT Component</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to publish"
      />
      <button onClick={handlePublish}>Publish</button>
    </div>
  );
};

export default MQTTComponent;
