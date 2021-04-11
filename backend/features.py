#!/usr/bin/env python
# coding: utf-8

# In[71]:


import ipaddress
import re
import urllib.request
from bs4 import BeautifulSoup
import socket
import requests
from googlesearch import search
import whois
from datetime import date, datetime
import time
from dateutil.parser import parse as date_parse


# In[72]:


def add_row_url(url):
    row = []
    if not re.match(r"^https?", url):
        url = "http://" + url

        
    #1 IP address in URL
    try:
        ip = ipaddress.ip_address(url)
        row.append(-1)
    except ValueError:
        row.append(1)
    
    #2  Long URL to Hide the Suspicious Part
    length = len(url)
    if length >= 76:
        row.append(-1)
    elif length < 55:
        row.append(1)
    else:
        row.append(0)
    
    #3 Using URL Shortening Services “TinyURL”
    # ADD 303 response code
    match = re.search('bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|'
                      'yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|'
                      'short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|'
                      'doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|t\.co|lnkd\.in|'
                      'db\.tt|qr\.ae|adf\.ly|goo\.gl|bitly\.com|cur\.lv|tinyurl\.com|ow\.ly|bit\.ly|ity\.im|'
                      'q\.gs|is\.gd|po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|'
                      'x\.co|prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|tr\.im|link\.zip\.net', url)
    if match :
        row.append(-1)
    else :
        row.append(1)
    
    #4 URL’s having “@” Symbol
    if "@" in url:
        row.append(-1)
    else :
        row.append(1)
    
    #5 Redirecting using “//”
    index = url.rfind("//")
    if index > 6:
        row.append(-1)
    else:
        row.append(1)
    
    #6 Adding Prefix or Suffix Separated by (-) to the Domain
    if re.findall(r"https?://[^\-]+-[^\-]+/", url):
        row.append(-1)
    else:
        row.append(1)
    
    #7 Sub Domain and Multi Sub Domains
    subdomain_count = len(re.findall("/." , url))
    if subdomain_count == 2:
        row.append(0)
    elif subdomain_count == 1:
        row.append(1)
    else:
        row.append(-1)
    
    #8 HTTPS (Hyper Text Transfer Protocol with Secure Sockets Layer) 
    # print("https url : " , url[:6])
    if url[:6] == "https:":
        row.append(1)
    else:
        row.append(-1)
    
    
    return row
    


# In[73]:


def domain_add_row(url , row):
    if not re.match(r"^https?", url):
        url = "http://" + url
    
    try:
        domain = re.findall(r"://([^/]+)/?", url)[0]
        if re.match(r"^www.", domain):
            domain = domain.replace("www.", "")
    except:
        try:
            if re.match(r"^www.", url):
                domain = url.replace("www.", "")
        except:
            domain = url

    
    try:
        response = requests.get(url)
        res_beauty = BeautifulSoup(response.text, 'html.parser')
    except:
        response = ""
        res_beauty = -999
    
    
    #9 Domain Registration Length
    try:
        whois_response = whois.whois(domain)
        expiration_date = whois_response.expiration_date
        registration_length = 0
        try:
            expiration_date = min(expiration_date)
            today = time.strftime('%Y-%m-%d')
            today = datetime.strptime(today, '%Y-%m-%d')
            registration_length = abs((expiration_date - today).days)
#             print("HELLLOOOOo")
#             print(registration_length)
            if registration_length / 365 <= 1:
                row.append(-1)
            else:
                row.append(1)
        except:
            row.append(-1)
    except:
        row.append(-1)
    
    
    #10 Using Non-Standard Port 
    closed_ports = [21,22,23,445,1433,1521,3306,3389]
    flag = 0
    try:
        port_url = domain.split(":")[1]
        for port in closed_ports:
            if port in port_url:
                row.append(-1)
                flag = 1
                break
        if flag == 0:
            row.append(1)
    
    except:
        row.append(1)
    
    #11 HTTPS_token
    #(re.findall(r"^https://", url))
    if re.findall(r"^https://", url):
        row.append(1)
    else:
        row.append(-1)
   
    return row
    


# In[74]:


def rank_add_row(url , row):
    if not re.match(r"^https?", url):
        url = "http://" + url

    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
    except:
        response = ""
        soup = -999

    try:
        domain = re.findall(r"://([^/]+)/?", url)[0]
        if re.match(r"^www.", domain):
            domain = domain.replace("www.", "")
    except:
        try:
            if re.match(r"^www.", url):
                domain = url.replace("www.", "")
        except:
            domain = url

    
    
    #12 Domain Age
    if response == "":
        row.append(-1)
    else:
        try:
            whois_response = whois.whois(domain)
            try:
                registration_date = re.findall(
                        r'Registration Date:</div><div class="df-value">([^<]+)</div>', whois_response.text)[0]
                if ((date.today().year - date_parse(registration_date).year) * 12 + date.today().month - date_parse(registration_date).month) >= 6: 
                    row.append(-1)
                else:
                    row.append(1)
            except:
                row.append(1)
        except:
            row.append(-1)
    
    
    #13 DNS Record
    try:
        d = whois.whois(domain)
        row.append(1)
    except:
        row.append(-1)
    
    #14 Website Traffic 
    try:
        rank = BeautifulSoup(requests.get(
            "http://data.alexa.com/data?cli=10&dat=s&url=" + url).text, "html.parser").find("reach")['rank']
        
        rank = int(rank)
        #print(rank)
        if (rank > 100000):
            row.append(0)
        else:
            row.append(1)
    except :
        row.append(-1)
    
#     #15 PageRank
   
#     try:
#         global_rank = int(re.findall(r"Global Rank: ([0-9]+)", rank_checker_response.text)[0])
#     except:
#         global_rank = -1
        
#     if global_rank > 0 and global_rank < 100000:
#         row.append(-1)
#     else:
#         row.append(1)

    #15 Google Index
    #print(search(url,5))
    if search(url, 5):
        row.append(1)
    else:
        row.append(-1)
    
    #16 Statistical_report
    url_match = re.search(
        'at\.ua|usa\.cc|baltazarpresentes\.com\.br|pe\.hu|esy\.es|hol\.es|sweddy\.com|myjino\.ru|96\.lt|ow\.ly', url)
    try:
        ip_address = socket.gethostbyname(domain)
        ip_match = re.search('146\.112\.61\.108|213\.174\.157\.151|121\.50\.168\.88|192\.185\.217\.116|78\.46\.211\.158|181\.174\.165\.13|46\.242\.145\.103|121\.50\.168\.40|83\.125\.22\.219|46\.242\.145\.98|'
                             '107\.151\.148\.44|107\.151\.148\.107|64\.70\.19\.203|199\.184\.144\.27|107\.151\.148\.108|107\.151\.148\.109|119\.28\.52\.61|54\.83\.43\.69|52\.69\.166\.231|216\.58\.192\.225|'
                             '118\.184\.25\.86|67\.208\.74\.71|23\.253\.126\.58|104\.239\.157\.210|175\.126\.123\.219|141\.8\.224\.221|10\.10\.10\.10|43\.229\.108\.32|103\.232\.215\.140|69\.172\.201\.153|'
                             '216\.218\.185\.162|54\.225\.104\.146|103\.243\.24\.98|199\.59\.243\.120|31\.170\.160\.61|213\.19\.128\.77|62\.113\.226\.131|208\.100\.26\.234|195\.16\.127\.102|195\.16\.127\.157|'
                             '34\.196\.13\.28|103\.224\.212\.222|172\.217\.4\.225|54\.72\.9\.51|192\.64\.147\.141|198\.200\.56\.183|23\.253\.164\.103|52\.48\.191\.26|52\.214\.197\.72|87\.98\.255\.18|209\.99\.17\.27|'
                             '216\.38\.62\.18|104\.130\.124\.96|47\.89\.58\.141|78\.46\.211\.158|54\.86\.225\.156|54\.82\.156\.19|37\.157\.192\.102|204\.11\.56\.48|110\.34\.231\.42', ip_address)
        if url_match:
            row.append(-1)
        elif ip_match:
            row.append(-1)
        else:
            row.append(1)
    except:
        row.append(-1)
        #print('Connection problem. Please check your internet connection')

    return row





# In[ ]:
# Tokenizer
def extract_tokens(url):
    tokens = re.split('[/-]' , url)
    
    for token in tokens:
        if "." in token:
            final_split = token.split(".")
            
            if "com" in final_split:
                final_split.remove("com")
            if "www" in final_split:
                final_split.remove("www")
            
            
            tokens = tokens + final_split
    return tokens




# In[ ]:




