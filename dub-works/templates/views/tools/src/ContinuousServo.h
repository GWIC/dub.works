#ifndef ContinuousServo_h
#define ContinuousServo_h

#include <Arduino.h>
#include <Servo.h>
#include "SpeedController.h"

class ContinuousServo : public SpeedController {
 public:
  ContinuousServo(int in);
  void set(double speed);
 private:
  int _in;
  Servo servo;
};

#endif
