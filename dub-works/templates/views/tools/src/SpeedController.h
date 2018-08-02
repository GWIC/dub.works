#ifndef SpeedController_h
#define SpeedController_h

#include <Arduino.h>

class SpeedController {
 public:
  SpeedController();
  virtual void set(double speed) = 0;
};

#endif
