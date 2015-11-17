package com.uni.servlet;

/**
 * @author sdaskaliesku
 */
public enum Actions {
    CameraUp, CameraDown, CameraLeft, CameraRight, CameraCenter,
    Move, RobotSpeed, BatteryInfo, RobotHeight, Manual, Unrecognized, RobotStop;

    public static Actions getActionsFromString(String value) {
        for (Actions actions : Actions.values()) {
            if (actions.toString().toLowerCase().contains(value.toLowerCase())) {
                return actions;
            }
        }
        return Unrecognized;
    }
}
