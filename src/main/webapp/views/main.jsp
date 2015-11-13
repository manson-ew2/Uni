<%--
  User: sdaskaliesku
  Date: 11/13/2015
  Time: 19:02
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<head>
    <title>Raspberry PI 2 admin</title>
</head>
<link rel="stylesheet" href="<c:url value='/views/css/bootstrap-theme.min.css' />"/>
<link rel="stylesheet" href="<c:url value='/views/css/bootstrap.min.css' />"/>
<script src="<c:url value='/views/js/jquery.min.js' />"></script>
<script src="<c:url value='/views/js/bootstrap.min.js' />"></script>
<script src="<c:url value='/views/js/controller.js' />"></script>
<script src="<c:url value='/views/js/jquery.knob.min.js' />"></script>
<script src="<c:url value='/views/js/knob.js' />"></script>
<link href="<c:url value='/views/fonts/glyphicons-halflings-regular.eot'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/views/fonts/glyphicons-halflings-regular.svg'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/views/fonts/glyphicons-halflings-regular.ttf'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/views/fonts/glyphicons-halflings-regular.woff'/>" rel="stylesheet" type="text/css">
<link href="<c:url value='/views/fonts/glyphicons-halflings-regular.woff2'/>" rel="stylesheet" type="text/css">
<body>

<label>Battery charge</label>

<div class="progress" style="width: 25%">
    <div class="progress-bar progress-bar-striped active progress-bar-success" id="battery-charge" role="progressbar"
         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
        <span id="progress-bar-percent">100%</span>
    </div>
</div>
<button class="button" id="post">Post</button>
<br/>
<center>
    <label>Camera control</label>
    <br/>
    <table>
        <tr>
            <td></td>
            <td>
                <button class="btn glyphicon glyphicon-arrow-up"></button>
            </td>
            <td></td>
        </tr>
        <tr>
            <td>
                <button class="btn glyphicon glyphicon-arrow-left"></button>
            </td>
            <td>
                <button class="btn glyphicon glyphicon-screenshot"></button>
            </td>
            <td>
                <button class="btn glyphicon glyphicon-arrow-right"></button>
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                <button class="btn glyphicon glyphicon-arrow-down"></button>
            </td>
            <td></td>
        </tr>
    </table>
    <br/>
    <table>
        <tr>
            <td>
                <center>
                    <label>Height</label>
                </center>
            </td>
        </tr>
        <tr>
            <td>
                <%--TODO: Min = 4, Max = 12 --%>
                <div style="display:inline;width:150px;height:200px;">
                    <canvas height="200" width="150"></canvas>
                    <input class="knob" data-width="150" data-angleoffset="-125" data-anglearc="250"
                           data-fgcolor="#66EE66" value="10"
                           style="width: 79px; height: 50px; position: absolute; vertical-align: middle;
                           margin-top: 66px; margin-left: -152px;
                           border: 0; font-weight: bold; font-style: normal;
                           font-variant: normal; font-stretch: normal; font-size: 40px; line-height: normal;
                           font-family: Arial,sans-serif; text-align: center; color: rgb(102, 238, 102);
                           padding: 0; -webkit-appearance: none; background: none;" title="">
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <center>
                    <label>Speed</label>
                </center>
            </td>
        </tr>
        <tr>
            <td>
                <div style="display:inline;width:150px;height:200px;">
                    <canvas height="200" width="150"></canvas>
                    <input class="knob" data-width="150" data-angleoffset="-125" data-anglearc="250"
                           data-fgcolor="#66EE66" value="0"
                           style="width: 79px; height: 50px; position: absolute; vertical-align: middle;
                           margin-top: 66px; margin-left: -152px;
                           border: 0; font-weight: bold; font-style: normal;
                           font-variant: normal; font-stretch: normal; font-size: 40px; line-height: normal;
                           font-family: Arial,sans-serif; text-align: center; color: rgb(102, 238, 102);
                           padding: 0; -webkit-appearance: none; background: none;" title="">
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <center>
                    <label>Angle</label>
                </center>
            </td>
        </tr>
        <tr>
            <td>
                <div style="display:inline;width:150px;height:200px;">
                    <canvas height="200" width="150"></canvas>
                    <input style="width: 79px; height: 50px; position: absolute; vertical-align: middle; margin-top: 50px; margin-left: -114px;
    border: 0 none; background: transparent none repeat scroll 0 0; font: bold 30px Arial; text-align: center; color: rgb(34, 34, 34); padding: 0;"
                           class="knob" data-width="150" data-cursor="true" data-fgcolor="#222222"
                           data-thickness=".3" value="0" title=""></div>
            </td>
        </tr>

        <tr>
            <td>
                <button class="btn btn-lg btn-info">Go</button>
            </td>
            <td></td>
            <td>
                <button class="btn btn-lg btn-danger">Stop</button>
            </td>
        </tr>
    </table>
</center>
</body>
</html>
