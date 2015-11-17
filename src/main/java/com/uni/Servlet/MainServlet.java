package com.uni.servlet;

import com.uni.python.PythonExecutor;
import com.uni.services.ArduinoService;
import com.uni.services.CameraCommandService;
import com.uni.services.RobotMoveService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * @author sdaskaliesku
 */
public class MainServlet extends HttpServlet {

    private CameraCommandService cameraService;
    private RobotMoveService robotMoveService;
    private ArduinoService arduinoService;

    @Override
    public void init() throws ServletException {
        super.init();
        cameraService = new CameraCommandService();
        robotMoveService = new RobotMoveService();
        arduinoService = new ArduinoService();
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/views/main.jsp").forward(request, response);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        String value = request.getParameter("value");
        System.out.println("Got action: " + action);
        System.out.println("Got value: " + value);
        response.setContentType("application/json");
        response.setStatus(200);
        PrintWriter out = response.getWriter();
        String resp = getResponse(action, value);
        System.out.println("Got response from Arduino: " + resp);
        if (resp.equals(PythonExecutor.ERROR)) {
            response.setStatus(500);
        }
        out.flush();
        String jsonResp = "{\"value\":\"" + value + "\"}";
        jsonResp = jsonResp.replace("\n", "").replace("\r", "");
        out.print(jsonResp);
        out.close();
    }

    private String getResponse(String actionString, String param) {
        Actions action = Actions.getActionsFromString(actionString);
        switch (action) {
            case CameraCenter:
                return executePythonScriptWithArgs(cameraService.center());
            case CameraUp:
                return executePythonScriptWithArgs(cameraService.up());
            case CameraDown:
                return executePythonScriptWithArgs(cameraService.down());
            case CameraLeft:
                return executePythonScriptWithArgs(cameraService.left());
            case CameraRight:
                return executePythonScriptWithArgs(cameraService.right());
            case Move:
                String[] values = param.split(",");
                String moveResult = executePythonScriptWithArgs(robotMoveService.getCommand(values[0], values[1]));
                String heightResult = executePythonScriptWithArgs(robotMoveService.getHeightCommand(values[2]));
                return moveResult + "," + heightResult;
            case BatteryInfo:
                return executePythonScriptWithArgs(arduinoService.getBatteryInfo());
            case Manual:
                return executePythonScriptWithArgs(param + "\r\n");
            default:
                break;
        }
        return PythonExecutor.ERROR + " unknown command";
    }

    private static String executePythonScriptWithArgs(String args) {
        System.out.println("Trying to execute python script with args: " + args);
        return PythonExecutor.getInstance().executeAndRead(args);
    }

}
