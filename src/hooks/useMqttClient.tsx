import { useState, useEffect, useRef } from "react";
import mqtt, { MqttClient } from "mqtt";

interface MqttConnection {
  client: MqttClient | null;
  errorMessage: string | null;
  connectToBroker: () => void;
}

export function useMqttClient(brokerAddress: string): MqttConnection {
  const clientRef = useRef<MqttClient | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [connectRequested, setConnectRequested] = useState<boolean>(false);
  const client = mqtt.connect(brokerAddress, {});
  const connectToBroker = (): void => {
    setConnectRequested(true);
  };

  useEffect(() => {
    if (connectRequested) {
      if (clientRef.current) {
        clientRef.current.end();
      }

      client.on("connect", () => {
        console.log("connected");
        setErrorMessage(null);
        client.subscribe("test/1", (err) => {
          if (!err) {
            client.publish("test/1", "hello mqtt");
          }
        });
      });

      client.on("message", (topic, message) => {
        console.log(topic.toString(), message.toString());
        client.end();
      });

      client.on("error", (err: Error) => {
        console.log("connection failed");
        setErrorMessage("connection failed");
        setConnectRequested(false);
        console.log("error", err);
        setTimeout(() => {
          client.end();
          alert("faield to connect");
        }, 5000);
      });

      clientRef.current = client;

      return () => {
        if (clientRef.current) {
          clientRef.current.end();
        }
      };
    }

    return () => {};
  }, [connectRequested, brokerAddress]);

  return { client: clientRef.current, errorMessage, connectToBroker };
}
