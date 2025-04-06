import React, { useState } from 'react';
import './ArduinoCommunication.css';

const BluetoothCommunication = () => {
  const [device, setDevice] = useState(null);
  const [server, setServer] = useState(null);
  const [characteristic, setCharacteristic] = useState(null);
  const [dataToSend, setDataToSend] = useState('');
  const [receivedData, setReceivedData] = useState('');

  const connectToBluetooth = async () => {
    try {
      // Request a Bluetooth device
      const selectedDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['12345678-1234-5678-1234-56789abcdef0'], // Replace with your service UUID
      });
  
      // Connect to the GATT server
      const gattServer = await selectedDevice.gatt.connect();
  
      // Get the primary service
      const service = await gattServer.getPrimaryService('12345678-1234-5678-1234-56789abcdef0'); // Replace with your service UUID
  
      // Get the characteristic for communication
      const char = await service.getCharacteristic('87654321-4321-8765-4321-abcdef012345'); // Replace with your characteristic UUID
  
      // Set up notifications for receiving data
      char.startNotifications();
      char.addEventListener('characteristicvaluechanged', handleReceivedData);
  
      setDevice(selectedDevice);
      setServer(gattServer);
      setCharacteristic(char);
  
      alert('Connected to Seeeduino BLE device!');
    } catch (error) {
      console.error('Error connecting to Bluetooth device:', error);
      alert('Failed to connect to Bluetooth device.');
    }
  };

  const handleReceivedData = (event) => {
    const value = new TextDecoder().decode(event.target.value);
    setReceivedData((prevData) => prevData + value);
  };

  const sendData = async () => {
    try {
      if (characteristic && dataToSend) {
        const encoder = new TextEncoder();
        const data = encoder.encode(dataToSend);
        await characteristic.writeValue(data);
        alert('Data sent to Bluetooth device!');
      } else {
        alert('Please connect to a Bluetooth device and enter data to send.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Failed to send data.');
    }
  };

  const disconnectBluetooth = async () => {
    if (device && server) {
      server.disconnect();
      setDevice(null);
      setServer(null);
      setCharacteristic(null);
      alert('Disconnected from Bluetooth device.');
    }
  };

  return (
    <div className="bluetooth-communication">
      <h1>Bluetooth Communication</h1>
      <textarea
        className="data-input"
        placeholder="Enter data to send"
        value={dataToSend}
        onChange={(e) => setDataToSend(e.target.value)}
      />
      <div className="button-group">
        <button className="connect-button" onClick={connectToBluetooth}>
          Connect
        </button>
        <button className="send-button" onClick={sendData}>
          Send
        </button>
        <button className="disconnect-button" onClick={disconnectBluetooth}>
          Disconnect
        </button>
      </div>
      <div className="received-data">
        <h2>Received Data:</h2>
        <p>{receivedData || 'No data received yet.'}</p>
      </div>
    </div>
  );
};

export default BluetoothCommunication;