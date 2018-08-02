#ifndef RobotDrive_h
#define RobotDrive_h

#include <Arduino.h>
#include "SpeedController.h"

class RobotDrive {
 public:
  RobotDrive(SpeedController *left, SpeedController *right);
  void tankDrive(double left, double right);
  void arcadeDrive(double move, double rotate);
 private:
  SpeedController *_left;
  SpeedController *_right;
};

#endif
