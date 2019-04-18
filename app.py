import flask
import os
from flask import jsonify, request
from flask import flash, redirect, url_for, session
from joblib import load
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import requests, json
import pandas as pd


app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.secret_key = 'super secret key'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.secret_key = 'super secret key'
cors = CORS(app, resources={r"/*": {"origins": "*"}})


import twitter
api = twitter.Api(
    consumer_key=['3UQqy7VFHUBXqpbBqbvIeGaMT'],
    consumer_secret=['mPP0JQFF7dWLs49w8QFWUCwvsJTR65L2AcMw9VHAch0apXUD2k'],
    access_token_key=['2436707539-pLVOXwpKiEwo6eB3UYAJnIC9UTkNl5pIUahrarW'],
    access_token_secret=['MhYzJxQrjUt9m9wM3nCfxzSuz5tyoxUMwridcXC8w2NyS'])

@app.route('/loadCSV', methods=['GET'])
def loadCSV():
    print("loaded")
    testData = pd.read_csv("upload/temp.csv")
    print(testData)
    print(testData.columns)
    data = testData.columns
    print()
    return jsonify( { 'sys': data[0] , 'dis' : data[1], 'hrt' : data[2], 'temp' : testData[data[1]][0]  } )

app.run(host='0.0.0.0',port=5000)