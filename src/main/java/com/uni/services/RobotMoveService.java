package com.uni.services;

/**
 * @author sdaskaliesku
 */
public class RobotMoveService {

    private static final String COMMAND = "m %s %s 30";

    public String getMoveCommand(String speed, String angle) {
        return String.format(COMMAND, speed, angle);
    }

    public String getStopCommand() {
        return "s";
    }

    public String getHeightCommand(String height) {
        return "z " + height;
    }
}
