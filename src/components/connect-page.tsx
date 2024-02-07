import { useState } from "react";
import { useMqttClient } from "../hooks/useMqttClient";

export function ConnectPage() {
  const defaultBrokerAddress: string = "ws://broker.emqx.io:8083/mqtt";
  const [brokerAddress, setBrokerAddress] = useState(defaultBrokerAddress);
  const { connectToBroker, errorMessage } = useMqttClient(brokerAddress);

  const createConnection = () => {
    connectToBroker();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 p-2 border w-full rounded-md"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 border w-full rounded-md"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="station"
            className="block text-sm font-medium text-gray-600"
          >
            Station Serial
          </label>
          <input
            type="number"
            id="station"
            className="mt-1 p-2 border w-full rounded-md"
            placeholder="Enter station serial"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="broker"
            className="block text-sm font-medium text-gray-600"
          >
            Broker Address
          </label>
          <input
            type="text"
            id="broker"
            className="mt-1 p-2 border w-full rounded-md"
            defaultValue={defaultBrokerAddress}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all w-full"
          onClick={createConnection}
        >
          Connect
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
}
