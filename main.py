import os
import webbrowser
import sys
import subprocess
import shutil
import json
import time
from shutil import copyfile
from flask import Flask, render_template, request, flash, session, request
from flask_socketio import SocketIO, emit
import ResumeParse
import UserSide

async_mode = None
app = Flask(__name__)
app.secret_key = "\xcc\xaae-6\xd6\x8bk"
socketio = SocketIO(app, async_mode=async_mode)
thread = None

@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

@socketio.on('connect')
def test_connect():
    socketio.emit('init', True)
    print 'connected'

@socketio.on('disconnect')
def test_disconnect():
    print "disconnected"

@socketio.on('resumeText')
def getResume(data):
    #out = ResumeParse.resume_parse(data)
    socketio.emit("ResumeSuccess")

@socketio.on('jobDescriptionText')
def getResume(data):
    socketio.emit("JobDescriptionSuccess", True)

@socketio.on('onResumeVerify')
def sendParsedResume():
    skills = {"skills": ["android", "c", "css", "html", "java", "javascript", "jboss", "mvc", "python", "sql"]}
    socketio.emit("returnParsedResume", skills)

@socketio.on('onJobDescriptVerify')
def sendJobDescription():
    socketio.emit("returnParsedJobDescription", 'sasd')

@socketio.on('getVerifiedResume')
def matchVerifiedResume(skills):
    results = UserSide.findMatches(skills)
    print results
    socketio.emit("sendMatches", results)

if __name__ == '__main__':
    webbrowser.open_new('http://127.0.0.1:5000/')
    socketio.run(app)
