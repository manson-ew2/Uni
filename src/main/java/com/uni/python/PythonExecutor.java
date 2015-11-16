package com.uni.python;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @author sdaskaliesku
 */
public final class PythonExecutor {

    public static String executeAndRead(String command) {
        String response;
        String[] cmd = {
                "python ser.py fds"
        };
        try {
            Process process = Runtime.getRuntime().exec(cmd);
            BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");
            }
            response = sb.toString();
        } catch (IOException e) {
            response = "Got error";
            e.printStackTrace();
        }
        return response;
    }
}
