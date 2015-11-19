package com.uni.services;

/**
 * @author sdaskaliesku
 */
public class RobotMoveCommandService {

    private static final String MOVE_COMMAND = "m %s %s 30";

    private static final String TURN_LEFT_COMMAND = "r 1";

    private static final String TURN_RIGHT_COMMAND = "r 2";

    public String getMoveCommand(String speed, String angle) {
        return String.format(MOVE_COMMAND, speed, angle);
    }

    public String getStopCommand() {
        return "s";
    }

    public String getHeightCommand(String height) {
        return "z " + height;
    }

    public String getTurnLeftCommand() {
        return TURN_LEFT_COMMAND;
    }

    public String getTurnRightCommand() {
        return TURN_RIGHT_COMMAND;
    }
}
