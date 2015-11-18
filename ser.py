import serial
import sys

port = serial.Serial("/dev/ttyUSB0", baudrate=115200, timeout=0.1)
inp = sys.argv[1]
port.write(inp + b'\r' + b'\n')
print port.readline()
port.close()