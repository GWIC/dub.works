#ifndef L298N_h
#define L298N_h

#include <Arduino.h>
#include "SpeedController.h"

class L298N : public SpeedController {
 public:
// L298N(int in1, int in2, int en);
  L298N(int in1, int in2);
  void set(double speed);
 private:
  int _in1;
  int _in2;
  int _en;
};

#endif
