# Connectr
### Linkedin Hackathon Project

## The Problem
Career fairs over years have turned chaotic. Hundreds of students show up and line up without knowing much about most of the companies and whether the positions they offer are suitable to them. Recruiters spend big chunk of the day talking to candidates who are not suitable for the roles available instead of targeting their best prospects. With Connectr, we aim to solved the problem.

## What & Who
Connectr is a software that solves this problem by parsing through resumes and job descriptions, and matching the candidates to jobs that fit their qualifications the most. This saves time in both ends and end up making career fairs a very personalized experience.

## Dependencies
* Python 2.7 and its Dependencies -
  * Flask
  * Socketio
  * Happybase (Only works well in Unix based systems)
* Java
* Javascript

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
