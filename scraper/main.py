from flask import Flask, jsonify, abort
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)


def get_data():
    urls = ['https://news.ycombinator.com/?p=1', 'https://news.ycombinator.com/?p=2', 'https://news.ycombinator.com/?p=3']
    
    new_data = []

    for new_url in urls:
        try:
            response = requests.get(new_url)

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')

                elements1 = soup.findAll("span", class_='titleline')
                elements2 = soup.findAll("span", class_='subline')
                merged_elements = list(zip(elements1, elements2))

                for el1, el2 in merged_elements:
                    data = {}
                    titleline1 = el1.select_one('.titleline > a')
                    score1 = el1.select_one('.score')
                    age1 = el1.select_one('.age')
                    age, score, titleline = "", "", ""

                    titleline = titleline1.get_text(strip=True)
                    titleline2 = el2.select_one('.titleline > a')
                    score2 = el2.select_one('.score')
                    age2 = el2.select_one('.age')
                    comments = el2.select('span > a[href^="item?id="]')[-1].get_text(strip=True)
                    url = titleline1['href']
                    score = score2.get_text(strip=True)
                    age = age2['title']
                    comments = comments.split("\xa0")[0]

                    if comments == "discuss":
                        comments = 0
                    score = score.split(" ")[0]

                    data = {"title": titleline, "post_date": age, "url": url, "upvote": score, "comments": comments}
                    new_data.append(data)
            else:
                abort(500, description=f"Error: Failed to fetch data from {new_url}")

        except requests.RequestException as e:
            abort(500, description=f"Error: {e}")

    return new_data

@app.route('/')
def index():
    return "Welcome to the home page!"

@app.route('/data')
def data():
    try:
        result = get_data()
        return jsonify(result)
    except Exception as e:
        abort(500, description=str(e))

if __name__ == '__main__':
    app.run(debug=True)
