//
//  ESC.h
//
//
//  Created by Alex Broaddus on 10/30/17.
//

#ifndef ESC_h
#define ESC_h

#include <Arduino.h>
#include <Servo.h>

class ESC : public Servo{
public:
    ESC(int pin);
    void start();
    void stop();
    void setPower(float power);
    float getPower();
    bool isOn();
    void reverse();
private:
    int _pin;
    float _power;
    void rewrite();
    bool isReversed;
};

#endif /* ESC_h */
