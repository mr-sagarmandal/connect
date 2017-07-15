# Connectr

# The Problem
We can all relate to the chaos of student career fairs. Students waste time wandering from booth to booth because they don’t have enough time beforehand to research each job opening and company. Recruiters waste time sifting through dozens of paper resumes trying to remember the best talent.
# What & Who
Connectr is a software that solves this problem by parsing through resumes and job descriptions to create opportunities based on matching qualifications and interests.

# Technicals
In order to utilize the database, two tables must be created in HBASE using the following schema:
'job', {NAME => 'company'}, {NAME => 'job_info'}, {NAME => 'qualification'}
'resume', {NAME => 'education'}, {NAME => 'experience'}, {NAME => 'personal_data'}, {NAME => 'skill'}

This software leverages a variety of modules, written primarily in Python and Java. The frontend interacts with the database using Python, with user interface implementing Flask. Communications between the database and backend use a combination of plain .txt and .json files.
Backend modules use java and a shell script to pipe data between parsers. Two open source parsers are used, found here:
https://github.com/antonydeepak/ResumeParser
and here: https://github.com/vinee109/JobDescrption-Resume-Parser
Having gone through parsers, data should be redirected through ExtractHotWords.java to isolate key words, which are then cross referenced with jobs in the HBASE in order to generate a list of matches.

In order to run the shell script, usage is ./runResumeParser.sh /home/hadoop/connect/resume.pdf /home/hadoop/connect/out.txt /home/hadoop/connect/results.txt   Replace hadoop with appropriate home connection. 3 input variables are input file, intermediate file (this is not available to user), and output file. Input formats are pdf, doc, txt, docx. Output is txt.
