cd ResumeTransducer
$env:GATE_HOME="..\GATEFiles"
java -cp '.\\bin\\*;..\\GATEFiles\\lib\\*;..\\GATEFILES\\bin\\gate.jar;.\\lib\\*' code4goal.antony.resumeparser.ResumeParserProgram .\\UnitTests\\AntonyDeepakThomas.pdf parsedresume.json
cd ResumeProcessing/src
java Parser ../../parsedresume.json
rm ../../parsedresume.json
cd ../../..
