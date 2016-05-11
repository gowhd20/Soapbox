#!/usr/bin/env python
# http://stackoverflow.com/questions/16608296/websocket-javascript-client-and-python-server-retreiving-garbage-in-output
import socket
import threading
import struct
import hashlib
import base64

PORT = 8889
_address = ""

def create_handshake_resp(handshake):
    final_line = ""
    lines = handshake.splitlines()
    for line in lines:
        parts = line.partition(": ")
        if parts[0] == "Sec-WebSocket-Key":
            key = parts[2]


    magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

    accept_key = base64.b64encode(hashlib.sha1(key+magic).digest())

    return (
        "HTTP/1.1 101 Switching Protocols\r\n"
        "Upgrade: WebSocket\r\n"
        "Connection: Upgrade\r\n"
        "Sec-WebSocket-Accept: " + accept_key + "\r\n\r\n")


def handle(s, addr):
    data = s.recv(20000)
    print data
    response = create_handshake_resp(data)
    s.sendto(response, addr)
    lock = threading.Lock()
    while 1:
        print "Waiting for data from", addr
        data = s.recv(20000)
        print "Done"
        if not data:
            print "No data"
            break

        print 'Data from', addr, ':', DecodedCharArrayFromByteStreamIn(bytes(data))

    print 'Client closed:', addr
    lock.acquire()
    clients.remove(s)
    lock.release()
    s.close()

def start_server():
    print 'STARTING SERVER...'
    s = socket.socket()
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind(('', PORT))
    s.listen(1)
    print 'SERVER STARTED'
    while 1:
        conn, addr = s.accept()
        print 'NEW CONNECTION ['+str(len(clients))+'], connected by ', addr
        clients.append(conn)
        threading.Thread(target = handle, args = (conn, addr)).start()


# http://stackoverflow.com/questions/8125507/how-can-i-send-and-receive-websocket-messages-on-the-server-side
def DecodedCharArrayFromByteStreamIn(stringStreamIn):
    #turn string values into opererable numeric byte values
    byteArray = [ord(character) for character in stringStreamIn]
    datalength = byteArray[1] & 127
    indexFirstMask = 2 
    if datalength == 126:
        indexFirstMask = 4
    elif datalength == 127:
        indexFirstMask = 10
    masks = [m for m in byteArray[indexFirstMask : indexFirstMask+4]]
    indexFirstDataByte = indexFirstMask + 4
    decodedChars = []
    i = indexFirstDataByte
    j = 0
    while i < len(byteArray):
        decodedChars.append( chr(byteArray[i] ^ masks[j % 4]) )
        i += 1
        j += 1

    return reduce(lambda x,y:x+y,decodedChars)

clients = []
start_server()