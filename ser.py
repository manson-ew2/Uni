import serial
import sys
import os

ser = serial.Serial()
ser.baudrate = 115200
ser.timeout = 0.1
ser.port = os.popen('ls /dev/ttyUSB*').read().replace("\n","")
inp = sys.argv[1]
port.write(inp + b'\r' + b'\n')
print port.readline()
port.close()