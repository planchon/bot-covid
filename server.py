import os
from flask import Flask, jsonify, request, session, Response, send_from_directory
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import pickle
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv("./covid_19faq.csv")
model = SentenceTransformer("bert-base-nli-mean-tokens")
question_bert_vector = np.load(open("./question_faq.pickle", "rb"))

app = Flask(__name__)
CORS(app)

def get_response(question):
    test = model.encode([question])
    i = np.argmax(cosine_similarity(test, question_bert_vector))
    return df["answers"].iloc[i]
    
@app.route('/', defaults=dict(filename=None))
@app.route('/<path:filename>', methods=['GET'])
def index(filename):
    filename = filename or 'index.html'
    if request.method == 'GET':
        print("path", filename)
        return send_from_directory('./html/', filename)

    return jsonify(request.data)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json["message"]
    print("question :", data)
    return jsonify({
        "message": get_response(data)
    })

if __name__ == "__main__":
    app.run(debug=True)
