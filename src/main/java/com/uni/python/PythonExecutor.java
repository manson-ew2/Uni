package com.uni.python;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @author sdaskaliesku
 */
public final class PythonExecutor {

    public static String executeAndRead(String command) {
        String response;
        String absolutePath = new File("ser.py").getAbsolutePath();
        String relativePath = new File("ser.py").getPath();
        System.out.println("ABS: " + absolutePath);
        System.out.println("REL: " + relativePath);
        response = execute(command, absolutePath);
        if (response == null || response.length() < 1) {
            response = execute(command, relativePath);
        }
        return response;
    }

    private static String execute(String command, String file) {
        String response;
        String[] cmd = {
                "python", file, command
        };
        try {
            Process process = Runtime.getRuntime().exec(cmd);
            BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            for (int i = 0; i < 1000; i++) {
                while ((line = br.readLine()) != null) {
                    sb.append(line).append("\n");
                }
            }
            response = sb.toString();
        } catch (Exception e) {
            response = "Got error";
            e.printStackTrace();
        }
        return response;
    }
}
