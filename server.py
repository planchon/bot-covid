import os
from flask import Flask, jsonify, request, session, Response, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
        "message": "c paul"
    })

if __name__ == "__main__":
    app.run(debug=True)
