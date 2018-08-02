#ifndef Gamepad_h
#define Gamepad_h

#include <Arduino.h>
#include <SoftwareSerial.h>

class Gamepad {
 public:
  Gamepad(int rx, int tx);
  void           read_gamepad();
  void           begin();
  void           set_deadband(float value);
  void           set_use_squared(bool value);
  float          get_axis(int axis);
  int            get_button(int button);
 private:
  SoftwareSerial bluetooth;
  float          axis_values[6];
  int            button_values[14];
  float          deadband;
  bool           use_squared;
};

#endif
