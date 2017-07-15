import os
import json
import subprocess

def resume_parse(data):
    data = str(data)
    cmd = "echo " + data + " > .\parsers\ResumeParser\ResumeTransducer\UnitTests\out.txt"
    os.system(cmd)
