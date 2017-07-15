import os
import json
import subprocess
import json

def resume_parse(data):
    data = str(data)
    cmd = "echo " + data + " > .\input.txt"
    os.system(cmd)
    os.system('./runResumeParser.sh /home/hadoop/connect/input.txt /home/hadoop/connect/out.txt /home/hadoop/connect/final.txt')
    out = {}
    with open('final.txt') as data_file:
        out = json.load(data_file)
    print out
    return out
