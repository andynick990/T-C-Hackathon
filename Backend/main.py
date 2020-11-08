from urllib import request
from bs4 import BeautifulSoup
import flask
import Summarize as sm
from flask_cors import CORS
import json

def getDefinitions():
    hdr = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
        'Accept-Encoding': 'none',
        'Accept-Language': 'en-US,en;q=0.8',
        'Connection': 'keep-alive'}
    req = request.Request("https://www.collinsdictionary.com/word-lists/law-law-terms", headers=hdr)
    page = request.urlopen(req)
    content = page.read()
    definitions = {}
    soup = BeautifulSoup(content, features="html.parser")
    soup = soup.find("span", attrs={"class" : "note type-note table"})
    for pair in soup.findAll("span", attrs={"class" : "tr"}):
        arr = pair.findAll("span")
        try:
            definitions[arr[0].text.strip()] = arr[1].text.strip()
        except:
            continue
    return definitions


app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/', methods = ['GET'])
def home():
    str = """
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </head>
        <body>
            <form action="/summary" method="POST">
              <input type="text" id="lname" name="lname" value="Doe"><br><br>
              <input type="submit" value="Submit">
            </form>
        </body>
    </html>
    """
    return str

@app.route('/definitions', methods = ['GET'])
def definitions():
    response = []
    for key, value in getDefinitions().items():
        response.append({key: value})
    return json.dumps(response)

@app.route('/summary', methods = ['POST'])
def summary():
    summaryFile=flask.request.get_data()
    data = sm.mainFunction(str(summaryFile))
    template = '''
    <div id="summarizedTermsContainer">
    <div class="summarizedTerms">
    <h1>&nbsp;&nbsp;Summary </h1>
    <button id="BigX" onclick="document.getElementById('summarizedTermsContainer').remove()">X</button>
    <br>
    '''
    end = '''</div></div>'''
    
    for paragraph in data:
        template +="<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        template += str(paragraph)
        template += "</p>"
    template +=end
    return template


if __name__ == '__main__':
    app.run()