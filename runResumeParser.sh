#!/bin/bash

cd /home/hadoop/connect/ResumeParser/ResumeTransducer
java -cp 'bin/*:../GATEFiles/lib/*:../GATEFiles/bin/gate.jar:lib/*' code4goal.antony.resumeparser.ResumeParserProgram $1 $2

cd /home/hadoop/connect/JobDescrption-Resume-Parser
java -cp /home/hadoop/connect/JobDescrption-Resume-Parser Parser $2| java -cp /home/hadoop/connect ExtractHotWords > $3 
#rm $2 
cat $3  
