#include "Ultrasonic.h"
#include <Arduino.h>

Ultrasonic::Ultrasonic(int echoPin, int trigPin, bool useInches) {
    echo = echoPin;
    trig = trigPin;
    
    if (useInches) {
      conversionFactor = 74.0;
    } else {
      conversionFactor = 29.0;
    }
    
		pinMode(echo, INPUT);
		pinMode(trig, OUTPUT);
	}

float Ultrasonic::getDistance() {
	digitalWrite(trig, LOW);
	delayMicroseconds(2);
	digitalWrite(trig, HIGH);
	delayMicroseconds(10);
	digitalWrite(trig, LOW);

	// Get the echo pulse that will last the time between the ultrasound signal has been emited and its echo has been received.
	// Sound speed throw the air is 343m/s at 20ºC. Given that pulseIn returns microseconds and the pulse has travelled 
	// twice the distance between the sensor and the blocking object, we have: 
	// distance (in meters) = duration (in microseconds) x 343 / 1000000 (microseconds per second) / 2 
	// We are working with distances ranging from 10 to 200 cm so meters are too big for us. We need to work with cm. 
	// Sound speed will be 34300 cm/s andif we invert that 34300 / 1000000 => 1000000 / 34300 = 29,15... 
	// we can express the same formula as: 
	// distance (in centimeters) = duration (in microseconds) / 29 / 2 that is much simpler and faster to compute.

	return pulseIn(echo, HIGH) / conversionFactor / 2.0;	
}
