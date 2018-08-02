#include <Arduino.h>
#include "ContinuousServo.h"

ContinuousServo::ContinuousServo(int in) {
  _in = in;

  servo.attach(_in);
}

void ContinuousServo::set(double speed) {
  servo.write(90 + (constrain(speed, -1.0, 1.0) * 90));
}
