import os
import json

def resume_parse(data):
    data = str(data)
    cmd = "echo " + data + " > .\parsers\ResumeParser\ResumeTransducer\UnitTests\out.txt"
    os.system(cmd)
