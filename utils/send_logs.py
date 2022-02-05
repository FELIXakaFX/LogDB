#!/usr/bin/env python3

import requests
from subprocess import Popen, PIPE
from threading import Thread
from queue import Queue
import sys
import socket
import time
import json

api_host = 'localhost:8000'
fail_severity = 2
while sys.argv[1].startswith("-"):
    arg = sys.argv.pop(1)
    if arg == "-h":
        api_host = sys.argv.pop(1)
    if arg == "-s":
        fail_severity = sys.argv.pop(1)

api_url = 'http://'+api_host+'/api/logs/'
log_interval = 5

shell_command = sys.argv[1:]
command_str = " ".join(shell_command)

host     = socket.gethostname()[:25]
sender   = "shell "+sys.argv[1].split("/")[-1][:25]
subject  = "Results from "
subject += (command_str[:250] + '...') if len(command_str) > 250 else command_str
description = command_str
severity = None

log_id = 0
stdout, stderr = b'', b''

last_sent = time.time()

def send_data():
    global description, stderr, stdout, log_id, last_sent
    data = {
        'host_str': host,
        'sender_str': sender,
        'subject': subject,
        'description': description,
        'stdout': stdout,
        'stderr': stderr,
        'severity': severity,
        'tags_str': "shell"
        }

    if not log_id:
        x = requests.post(api_url, data = data)
        log_id = json.loads(x.text)["id"]
    else:
        x = requests.patch(api_url+str(log_id)+"/", data = data)


    last_sent = time.time()

    description, stdout, stderr = "", b"", b""

try:
    def reader(pipe, queue):
        try:
            with pipe:
                for char in iter(pipe.read1, b''):
                    queue.put((pipe, char))
        finally:
            queue.put(None)

    process = Popen(shell_command, stdout=PIPE, stderr=PIPE)
    q = Queue()
    Thread(target=reader, args=[process.stdout, q]).start()
    Thread(target=reader, args=[process.stderr, q]).start()
    for _ in range(2):
        for source, line in iter(q.get, None):
            print(line.decode("utf-8"), end="")
            if(source.name == 3):
                stdout += line
            else:
                stderr += line

            if time.time() - last_sent > log_interval:
                send_data()

    process.communicate()
    if process.returncode:
        severity = fail_severity
        
except Exception as e:
    print(e)
    stdout, stderr = b'', e
    severity = fail_severity

send_data()

print("API_URL: "+str(api_url+str(log_id)))
print("SEVERITY: "+str(severity))