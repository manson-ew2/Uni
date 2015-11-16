import serial
import sys

port = serial.Serial("/dev/ttyUSB0", baudrate=115200, timeout=0.1)
inp = sys.argv[1]
port.write(inp)
print port.readline()