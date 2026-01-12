from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for simplicity
messages = [
    {"id": 1, "username": "Alice", "body": "Hello world!"},
    {"id": 2, "username": "Bob", "body": "Hi there!"}
]

@app.route("/messages", methods=["GET"])
def get_messages():
    return jsonify(messages)

@app.route("/messages", methods=["POST"])
def create_message():
    data = request.get_json()
    new_id = max(m["id"] for m in messages) + 1 if messages else 1
    new_message = {
        "id": new_id,
        "username": data["username"],
        "body": data["body"]
    }
    messages.append(new_message)
    return jsonify(new_message), 201

if __name__ == "__main__":
    app.run(port=5555, debug=True)
