from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# for simplicity of the project text is all lowercase and without any special signs
PREDIFINED_TEXT = "to make cozy hot chocolate heat a cup of milk on the stove add two tablespoons of cocoa powder one tablespoon of sugar and a pinch of salt stir until smooth for richness add a splash of vanilla or melted chocolate pour into a mug and top with marshmallows enjoy"

@app.route("/")
def index():
    return render_template("index.html", predifined_text = PREDIFINED_TEXT)

@app.route("/calculate_wpm", methods = ["POST"])
def calculate_wpm():
    data = request.json
    user_words = data["user_words"]
    elapsed_time = data["elapsed_time"]

    # calculate wpm, return as JSON
    wpm = (len(user_words) / elapsed_time) * 60

    return jsonify({"wpm": round(wpm, 2)})

if __name__ == '__main__':
    app.run(debug=True)