package com.uni.services;

/**
 * @author sdaskaliesku
 */
public class ArduinoCommandService {

    public String getBatteryInfo() {
        return "i 100";
    }

    public String getTemperature() {
        return "i 99";
    }

}
