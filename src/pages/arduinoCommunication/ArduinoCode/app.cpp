#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <BLE2902.h>
#include <ArduinoJson.h> // Include the ArduinoJson library

BLECharacteristic *pCharacteristic;
bool deviceConnected = false;

#define SERVICE_UUID        "12345678-1234-5678-1234-56789abcdef0"
#define CHARACTERISTIC_UUID "87654321-4321-8765-4321-abcdef012345"

// Define LED pins
const int ledPins[5] = {1, 2, 3, 4, 5}; // Adjust these pins based on your hardware setup

// Variables to store configuration
int loopDuration = 1; // Default loop duration in seconds
int activeOrder[5] = {1, 2, 3, 4, 5}; // Default active order

class MyServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
    Serial.println("Device connected");
  }
  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    Serial.println("Device disconnected");
  }
};

class MyCharacteristicCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    String value = pCharacteristic->getValue();
    if (value.length() > 0) {
      Serial.print("Received: ");
      Serial.println(value.c_str());

      // Parse the JSON string
      StaticJsonDocument<200> doc; // Adjust size based on your JSON structure
      DeserializationError error = deserializeJson(doc, value);

      if (error) {
        Serial.print("JSON parse error: ");
        Serial.println(error.c_str());
        return;
      }

      // Extract values from the JSON object
      loopDuration = doc["loopDuration"];
      JsonArray orderArray = doc["activeOrder"];

      for (int i = 0; i < 5; i++) {
        activeOrder[i] = orderArray[i];
      }

      Serial.print("Loop Duration: ");
      Serial.println(loopDuration);

      Serial.print("Active Order: ");
      for (int i = 0; i < 5; i++) {
        Serial.print(activeOrder[i]);
        Serial.print(" ");
      }
      Serial.println();

      // Send an acknowledgment back to the sender
      String echo = "Configuration updated successfully!";
      pCharacteristic->setValue(echo.c_str());
    }
  }
};

void setup() {
  Serial.begin(115200);
  Serial.println("Starting BLE on XIAO C3...");

  // Initialize LED pins
  for (int i = 0; i < 5; i++) {
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], LOW); // Ensure all LEDs are off initially
  }

  BLEDevice::init("XIAO C3 BLE");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);

  pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ |
    BLECharacteristic::PROPERTY_WRITE
  );

  pCharacteristic->setCallbacks(new MyCharacteristicCallbacks());
  pCharacteristic->setValue("Hello from XIAO C3!");
  pCharacteristic->addDescriptor(new BLE2902());

  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->start();

  Serial.println("BLE service started and advertising...");
}

void loop() {
  if (deviceConnected) {
    // Calculate duration for each LED
    int ledDuration = (loopDuration * 1000) / 5; // Convert seconds to milliseconds

    // Blink LEDs in the order specified by activeOrder
    for (int i = 0; i < 5; i++) {
      int pinIndex = activeOrder[i] - 1; // Convert 1-based index to 0-based index
      if (pinIndex >= 0 && pinIndex < 5) {
        digitalWrite(ledPins[pinIndex], HIGH); // Turn on the LED
        delay(ledDuration);                   // Wait for the duration
        digitalWrite(ledPins[pinIndex], LOW); // Turn off the LED
      }
    }
  }
}