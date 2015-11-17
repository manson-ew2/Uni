import serial
import sys

port = serial.Serial("COM10", baudrate=115200, timeout=0.1)
inp = sys.argv[1]
port.write(bytes(inp, 'UTF-8'))
print (port.readline())
port.close()