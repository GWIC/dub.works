#include <Arduino.h>
#include "TB6612FNG.h"

TB6612FNG::TB6612FNG(int in1, int in2, int pwm, int standby) {
  _in1 = in1;
  _in2 = in2;

  _pwm = pwm;
  _standby = standby;

  pinMode(_in1, OUTPUT);
  pinMode(_in2, OUTPUT);

  pinMode(_pwm, OUTPUT);
  pinMode(_standby, OUTPUT);

  digitalWrite(_standby, HIGH);
}

void TB6612FNG::set(double speed) {
  if (speed > 0.0) {
    digitalWrite(_in1, HIGH);
    digitalWrite(_in2, LOW);
    analogWrite(_pwm, abs(speed) * 255);
  } else if (speed < 0.0) {
    digitalWrite(_in1, LOW);
    digitalWrite(_in2, HIGH);
    analogWrite(_pwm, abs(speed) * 255);
  } else {
    digitalWrite(_in1, LOW);
    digitalWrite(_in2, LOW);
    analogWrite(_pwm, 0.0);
  }
}

void TB6612FNG::enable() {
  digitalWrite(_standby, HIGH);
}

void TB6612FNG::disable() {
  digitalWrite(_standby, LOW);
}
