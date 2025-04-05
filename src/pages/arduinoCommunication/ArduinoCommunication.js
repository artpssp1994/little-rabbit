import React, { useState } from 'react';
import './ArduinoCommunication.css';

const ArduinoCommunication = () => {
  const [port, setPort] = useState(null);
  const [writer, setWriter] = useState(null);
  const [dataToSend, setDataToSend] = useState('');

  const connectToArduino = async () => {
    try {
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate: 9600 });

      const textEncoder = new TextEncoderStream();
      textEncoder.readable.pipeTo(selectedPort.writable);
      const writableStream = textEncoder.writable.getWriter();

      setPort(selectedPort);
      setWriter(writableStream);

      alert('Connected to Arduino!');
    } catch (error) {
      console.error('Error connecting to Arduino:', error);
      alert('Failed to connect to Arduino.');
    }
  };

  const sendData = async () => {
    try {
      if (writer && dataToSend) {
        await writer.write(dataToSend + '\n');
        alert('Data sent to Arduino!');
      } else {
        alert('Please connect to Arduino and enter data to send.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Failed to send data.');
    }
  };

  const handleUnload = async () => {
    if (writer) {
      await writer.close();
    }
    if (port) {
      await port.close();
    }
  };

  React.useEffect(() => {
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [writer, port]);

  return (
    <div className="arduino-communication">
      <h1>Send Data to Arduino</h1>
      <textarea
        className="data-input"
        placeholder="Enter data to send"
        value={dataToSend}
        onChange={(e) => setDataToSend(e.target.value)}
      />
      <div className="button-group">
        <button className="connect-button" onClick={connectToArduino}>
          Connect
        </button>
        <button className="send-button" onClick={sendData}>
          Send
        </button>
      </div>
      <div className="footer">
        <p>Ensure your Arduino is connected via USB.</p>
      </div>
    </div>
  );
};

export default ArduinoCommunication;