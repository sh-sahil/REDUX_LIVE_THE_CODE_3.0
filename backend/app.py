from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)

# Configure CORS to allow requests only from specific origins
CORS(app, resources={r"/query": {"origins": "http://localhost:3000"}})

@app.route('/query', methods=['POST'])
def query():
    query_text = request.json.get('query_text')
    
    # Call the query_data.py script
    result = subprocess.run(
        ['python', 'query_data.py', query_text],
        capture_output=True,
        text=True
    )
    
    # Get the response from the script
    response_text = result.stdout
    return jsonify({'response': response_text})

if __name__ == '__main__':
    app.run(debug=True)
