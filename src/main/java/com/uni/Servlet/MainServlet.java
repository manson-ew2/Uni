package com.uni.servlet;

import com.uni.python.PythonExecutor;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

/**
 * @author sdaskaliesku
 */
public class MainServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/views/main.jsp").forward(request, response);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        System.out.println("Got action: " + action);
        response.setContentType("application/json");
        response.setStatus(200);
        PrintWriter out = response.getWriter();
        String value = PythonExecutor.getInstance().executeAndRead(new Date().toString());
        if (value.equals(PythonExecutor.ERROR)) {
            response.setStatus(500);
        }
        out.flush();
        String resp = "{\"value\":\"" + value + "\"}";
        resp = resp.replace("\n", "").replace("\r", "");
        out.print(resp);
        out.close();
    }

}
