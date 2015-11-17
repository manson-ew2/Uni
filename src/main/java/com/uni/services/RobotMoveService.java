package com.uni.services;

/**
 * @author sdaskaliesku
 */
public class RobotMoveService {

    private static final String COMMAND = "m %s %s 30\r\n";

    public String getCommand(String speed, String angle) {
        return String.format(COMMAND, speed, angle);
    }

    public String getHeightCommand(String height) {
        return "z " + height + "\r\n";
    }
}
