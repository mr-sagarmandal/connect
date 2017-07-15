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
    print "connected"

@socketio.on('disconnect')
def test_disconnect():
    print "disconnected"

if __name__ == '__main__':
    webbrowser.open_new('http://127.0.0.1:5000/')
    socketio.run(app)
