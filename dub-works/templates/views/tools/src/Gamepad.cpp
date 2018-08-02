#include <Arduino.h>
#include "Gamepad.h"
#include <SoftwareSerial.h>

Gamepad::Gamepad(int rx, int tx) : bluetooth(rx, tx) {

}

void Gamepad::begin() {
    bluetooth.begin(9600);
}

void Gamepad::set_deadband(float value) {
    deadband = value;
}

void Gamepad::set_use_squared(bool value) {
    use_squared = value;
}

void Gamepad::read_gamepad() {
    char serial_value;

    while (bluetooth.available()) {
        serial_value = bluetooth.read();

        if (serial_value == 'A') {
            //int index = (int)bluetooth.read() - 48;

            int index = bluetooth.parseInt();

            float temp = bluetooth.parseFloat();

            if (-deadband <= temp && temp <= deadband) {
                temp = 0.0;
            }

            axis_values[index] = temp;
        } else if (serial_value == 'B') {
            //int index = (int)bluetooth.read() - 48;

            int index = bluetooth.parseInt();

            button_values[index] = bluetooth.parseFloat();
        } else if (serial_value == '\n') {
            break;
        } else { }
    }
}

float Gamepad::get_axis(int axis) {
    if (use_squared) {
        return axis_values[axis] * axis_values[axis];
    }

    return axis_values[axis];
}

int Gamepad::get_button(int button) {
    return button_values[button];
}
