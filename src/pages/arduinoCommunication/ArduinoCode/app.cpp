#include <ArduinoBLE.h>

// Define a BLE service and characteristic (Can replace)
BLEService bleService("12345678-1234-5678-1234-56789abcdef0");
BLECharacteristic bleCharacteristic("87654321-4321-8765-4321-abcdef012345", BLERead | BLEWrite, 512);

void setup() {
  Serial.begin(9600);
  while (!Serial);

  // Initialize BLE
  if (!BLE.begin()) {
    Serial.println("Failed to initialize BLE!");
    while (1);
  }

  Serial.println("BLE initialized.");

  // Set device name
  BLE.setLocalName("Seeeduino Little Rabbit BLE");
  BLE.setAdvertisedService(bleService);

  // Add the characteristic to the service
  bleService.addCharacteristic(bleCharacteristic);
  BLE.addService(bleService);

  // Start advertising
  BLE.advertise();
  Serial.println("BLE advertising...");
}

void loop() {
  // Listen for BLE connections
  BLEDevice central = BLE.central();

  if (central) {
    Serial.print("Connected to central: ");
    Serial.println(central.address());

    // While connected, handle BLE communication
    while (central.connected()) {
      if (bleCharacteristic.written()) {
        String receivedData = bleCharacteristic.value();
        Serial.print("Received: ");
        Serial.println(receivedData);

        // Echo the data back to the central device
        bleCharacteristic.writeValue("Echo: " + receivedData);
      }
    }

    Serial.println("Central disconnected.");
  }
}