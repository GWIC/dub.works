#ifndef TB6612FNG_h
#define TB6612FNG_h

#include <Arduino.h>
#include "SpeedController.h"

/*
 * Truth Table
 * In1 | In2 | PWM | Out1 | Out2 | Mode
 * ----|-----|-----|------|------|-------------
 * H   | H   | H/L | L    | L    | Short Brake
 * L   | H   | H   | L    | H    | CCW
 * L   | H   | L   | L    | L    | Short Brake
 * H   | L   | H   | H    | L    | CW
 * H   | L   | L   | L    | L    | Short Brake
 * L   | L   | H   | OFF  | OFF  | Stop
 */

class TB6612FNG : public SpeedController {
 public:
  TB6612FNG(int in1, int in2, int pwm, int standby);
  void set(double speed);
  void enable();
  void disable();
 private:
  int _in1;
  int _in2;
  int _pwm;
  int _standby;
};

#endif
