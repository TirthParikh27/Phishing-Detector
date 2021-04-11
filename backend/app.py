from fastapi import FastAPI , Request;
from joblib import load
from bs4 import BeautifulSoup
import requests
from googlesearch import search
import whois
import re

app = FastAPI()
count_vectorizer = load("count_vectorizer.joblib")
tfidf_vectorizer = load("tfidf_vectorizer.joblib")
model = load("voting_model.joblib")
svc = load("svc_tfidf.joblib")
sgd = load("sgd_tfidf.joblib")

def page_rank(url):
    row  = []
    if not re.match(r"^https?", url):
        url = "http://" + url

     #14 Website Traffic 
    
    try:
        rank = BeautifulSoup(requests.get(
            "http://data.alexa.com/data?cli=10&dat=s&url=" + url).text, "html.parser").find("reach")['rank']

        rank = int(rank)
       
    #         print(rank)
        if (rank > 100000):
            row.append(0)
        else:
            row.append(1)
    except :
        row.append(-1)


    #15 Google Index
    #     print(search(url,5))
    if search(url, 5):
        row.append(1)
    else:
        row.append(-1)
    
    return row

@app.post("/detect")
async def index(request: Request):
  body = await request.json()
  url = body['url']
  print(url)
  search_results = []
  search_results = page_rank(url)
  print(search_results)
  
  url_vectorized = count_vectorizer.transform([url])
  result = model.predict(url_vectorized).tolist()[0]
  result2 = svc.predict(url_vectorized).tolist()[0]
  result3 = sgd.predict(url_vectorized).tolist()[0]
  
  if(result2 == 1 and result3 == 1) or (search_results.count(1) == 2):
    result = 1
    if -1 in search_results:
        result = 0
    print("Yep it worked")
    
    

  print(result)
  return {"result" : result}

@app.post("/detectOffline")
async def offline(request: Request):
  body = await request.json()
  url = body['url']
  print(url)
  
  url_vectorized = count_vectorizer.transform([url])
  result = model.predict(url_vectorized).tolist()[0]
    

  print(result)
  return {"result" : result}
