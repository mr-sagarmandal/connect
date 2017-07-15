cd ResumeTransducer
$env:GATE_HOME="..\GATEFiles"
java -cp '.\\bin\\*;..\\GATEFiles\\lib\\*;..\\GATEFILES\\bin\\gate.jar;.\\lib\\*' code4goal.antony.resumeparser.ResumeParserProgram .\\UnitTests\\Andrew_Ge_Resume.pdf parsedresume.txt
cd ResumeProcessing/src
Get-Content ../../parsedresume.txt
Get-Content ../../parsedresume.txt | java RegexMatches > parsedskills.txt
Get-Content parsedskills.txt
java Parser parsedskills.txt
rm parsedskills.txt
rm ../../parsedresume.txt
cd ../../..
