package com.uni.services;

/**
 * @author sdaskaliesku
 */
public class CameraCommandService {

    private static final String COMMAND = "C %s %s\r\n";
    private static final int MIN_X = 20;
    private static final int MIN_Y = 20;
    private static final int MAX_X = 160;
    private static final int MAX_Y = 160;
    private static final int STEP = 10;
    private static final int DEFAULT_X = 90;
    private static final int DEFAULT_Y = 90;
    private int x;
    private int y;

    public CameraCommandService() {
        x = DEFAULT_X;
        y = DEFAULT_Y;
    }

    public String up() {
        y += STEP;
        y = validateY();
        return getCurrentCommand();
    }

    public String down() {
        y -= STEP;
        y = validateY();
        return getCurrentCommand();
    }

    public String left() {
        x += STEP;
        x = validateX();
        return getCurrentCommand();
    }

    public String right() {
        x -= STEP;
        x = validateX();
        return getCurrentCommand();
    }

    public String center() {
        x = DEFAULT_X;
        y = DEFAULT_Y;
        return getCurrentCommand();
    }

    public String getCurrentCommand() {
        return String.format(COMMAND, x, y);
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    private int validateX() {
        return validate(x, MAX_X, MIN_X);
    }

    private int validateY() {
        return validate(y, MAX_Y, MIN_Y);
    }

    private int validate(int variable, int max, int min) {
        if (variable >= max) {
            return max;
        }
        if (variable <= min) {
            return min;
        }
        return variable;
    }
}
