import os
import json
import subprocess

def resume_parse(data):
    data = str(data)
    cmd = "echo " + data + " > .\parsers\ResumeParser\ResumeTransducer\UnitTests\out.txt"
    os.system(cmd)

    os.system("cd ResumeParser/ResumeTransducer")
    os.system('export GATE_HOME="..\GATEFiles"')
    os.system("java -cp 'bin/*:../GATEFiles/lib/*:../GATEFiles/bin/gate.jar:lib/*' code4goal.antony.resumeparser.ResumeParserProgram ..\..\out.txt ..\..\parsedresume.txt")
    os.system("java ./ResumeProcessing/src/Parser ../../parsedresume.txt | java ./ResumeProcessing/src/ExtractHotWords > ../../results.txt")
    os.system("rm ../../parsedresume.txt")
    os.system("cd ../..")

    return './results.txt'
