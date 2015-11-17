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
<link rel="stylesheet" href="<c:url value='/views/css/main.css' />"/>
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
<center>
    <label><h2>Raspberry PI Admin Page</h2></label><br/>
    <table width="auto">
        <tr>
            <td id="camera-frame">
                <table id="camera-table">
                    <tr>
                        <td>
                            <img width="500" height="500" src="">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="btn-group" data-toggle="buttons">
                                <label class="btn btn-primary">
                                    <input type="radio" name="options" id="video" autocomplete="off">Video
                                </label>
                                <label class="btn btn-primary active">
                                    <input type="radio" name="options" id="videoOff" autocomplete="off" checked>No
                                    video
                                </label>
                                <label class="btn btn-primary">
                                    <input type="radio" name="options" id="videoRec" autocomplete="off">Video +
                                    recognition
                                </label>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
            <td>
                <center>
                    <table>
                        <tr>
                            <td><label>Camera control</label>
                                <center>
                                    <table class="control" id="spider-control">
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
                                </center>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table id="spider-params">
                                    <tr>
                                        <td><label>Speed</label></td>
                                        <td><label>Angle</label></td>
                                        <td><label>Height</label></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <br/>
                                            <input class="knob speed"
                                                   data-width="150"
                                                   data-angleoffset="-125"
                                                   data-anglearc="250"
                                                   data-min="0"
                                                   data-max="100"
                                                   data-fgcolor="#66EE66" value="0"
                                                   style="" title="Speed">

                                        </td>
                                        <td>
                                            <br/>
                                            <input class="knob angle"
                                                   data-width="150"
                                                   data-cursor="true"
                                                   data-fgcolor="#222222"
                                                   data-min="0"
                                                   data-max="360"
                                                   data-thickness=".3"
                                                   value="0"
                                                   title="Angle">
                                        </td>
                                        <td>
                                            <br/>
                                            <input class="knob height" data-width="150" data-angleoffset="-125"
                                                   data-anglearc="250"
                                                   data-min="4"
                                                   data-max="12"
                                                   data-fgcolor="#66EE66" value="5" title="Height">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="button" id="go" class="btn btn-lg btn-success" value="GO">
                                        </td>
                                        <td>
                                            <input type="button" id="update" class="btn btn-lg btn-info" value="Update">
                                        </td>
                                        <td>
                                            <input type="button" id="stop" class="btn btn-lg btn-danger" value="STOP">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3"><br/>
                                            <label>Battery 1:</label>
                                            <br/>

                                            <div class="progress" style="width: 100%">
                                                <div class="progress-bar progress-bar-striped active progress-bar-success"
                                                     id="battery-charge1"
                                                     role="progressbar"
                                                     aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                                     style="width: 100%">
                                                    <span id="progress-bar-percent1">100%</span>
                                                </div>
                                            </div>
                                            <label>Battery 2:</label>

                                            <div class="progress" style="width: 100%">
                                                <div class="progress-bar progress-bar-striped active progress-bar-success"
                                                     id="battery-charge2"
                                                     role="progressbar"
                                                     aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                                     style="width: 100%">
                                                    <span id="progress-bar-percent2">100%</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </center>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <div class="container">
                    <div class="jumbotron DivWithScroll" id="logs">

                    </div>
                    <div class="input-group">
                        <input type="text" id="console-input" class="form-control" placeholder="Enter your command...">
                    <span class="input-group-btn">
                        <button class="btn btn-warning" id="clear" type="button">Clear</button>
                        <button class="btn btn-info" id="send" type="button">Send!</button>
                    </span>
                    </div>
                </div>
            </td>
    </table>
</center>
</body>
</html>
