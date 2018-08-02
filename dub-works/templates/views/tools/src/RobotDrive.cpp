#include <Arduino.h>
#include "RobotDrive.h"

RobotDrive::RobotDrive(SpeedController *left, SpeedController *right) {
  _left  = left;
  _right = right;
}

void RobotDrive::tankDrive(double left, double right) {
  _left->set(left);
  _right->set(right);
}


void RobotDrive::arcadeDrive(double move, double rotate) {
  double leftSpeed, rightSpeed;

  move = constrain(move, -1.0, 1.0);
  rotate = constrain(rotate, -1.0, 1.0);

  if (move > 0.0) {
    if (rotate > 0.0) {
      leftSpeed =  move - rotate;
      rightSpeed = max(move, rotate);
    } else {
      leftSpeed = max(move, -rotate);
      rightSpeed = move + rotate;
    }
  } else {
    if (rotate > 0.0) {
      leftSpeed = -max(-move, rotate);
      rightSpeed = move + rotate;
    } else {
      leftSpeed = move - rotate;
      rightSpeed = -max(-move, -rotate);
    }
  }

 _left->set(constrain(leftSpeed, -1.0, 1.0));
 _right->set(constrain(rightSpeed, -1.0, 1.0));
}
