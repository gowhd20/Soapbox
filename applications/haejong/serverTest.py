#!/usr/bin/env python

import socket, threading, time

def handle(s):
  print repr(s.recv(4096))
  s.send("HTTP/1.1 101 Switching Protocols\r\n"
         "Upgrade: WebSocket\r\n"
         "Connection: Upgrade\r\n")
  time.sleep(1)
  s.send('\x00hello\xff')
  time.sleep(1)
  s.send('\x00world\xff')

s = socket.socket()
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind(('', 8889));
s.listen(1);
while 1:
  t,_ = s.accept();
  threading.Thread(target = handle, args = (t,)).start()


  """
    s.send('''
  HTTP/1.1 101 Web Socket Protocol Handshake\r
  Upgrade: WebSocket\r
  Connection: Upgrade\r
  WebSocket-Origin: http://localhost:8082\r
  WebSocket-Location: ws://localhost:8889/\r
  WebSocket-Protocol: sample
  '''.strip() + '\r\n\r\n')"""