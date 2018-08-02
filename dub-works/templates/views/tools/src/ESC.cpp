//
//  ESC.cpp
//
//
//  Created by Alex Broaddus on 10/30/17.
//

#include <Arduino.h>
#include "ESC.h"

ESC::ESC(int pin){
    _pin = pin;
    _power = 1;
    isReversed = false;
    attach(_pin);
    write(90);
}

void ESC::start(){
    if(!isReversed)
        write(90 + 90*_power);
    else
        write(90 + 90*_power*-1);
}

void ESC::stop(){
    write(90);
}

void ESC::setPower(float power){
    if(power > 1)
        power = 1;
    else if(power < 0)
        power = 0;
    _power = power;
    if(isOn())
        start();
}

float ESC::getPower(){
    return _power;
}

bool ESC::isOn(){
    return read() != 90;
}

void ESC::reverse(){
    isReversed = !isReversed;
}
