package com.uni.python;

import com.uni.Utils.OSValidator;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

/**
 * @author sdaskaliesku
 */
public final class PythonExecutor {

    public static final String ERROR = "Got error";
    private String FILE_NAME;
    private String PYTHON_BIN;

    private PythonExecutor() {
        if (OSValidator.isWindows()) {
            FILE_NAME = "ser_win.py";
            PYTHON_BIN = "py";
        } else {
            FILE_NAME = "ser.py";
            PYTHON_BIN = "python";
        }
    }

    public static PythonExecutor getInstance() {
        return new PythonExecutor();
    }

    public String executeAndRead(String command) {
        String response;
        File file = new File(FILE_NAME);
        String absolutePath = file.getAbsolutePath();
        String relativePath = file.getPath();
        response = execute(command, absolutePath);
        if (response == null || response.length() < 1) {
            response = execute(command, relativePath);
        }
        return response;
    }

    private String execute(String command, String file) {
        String response;
        String[] cmd = {
                PYTHON_BIN, file, command
        };
        try {
            Process process = Runtime.getRuntime().exec(cmd);
            BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            Thread.sleep(100);
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");
            }
            response = sb.toString();
        } catch (Exception e) {
            response = ERROR;
            e.printStackTrace();
        }
        return response;
    }
}
