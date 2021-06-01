# To run this file, open terminal to this file directory and run command "python main.py"

import requests
from bs4 import BeautifulSoup as bs

url = 'https://p2p.binance.com/en/trade/buy/BTC'

res = requests.get(url)

data = bs(res.content, 'lxml')

table = data.findAll('div', {'class': 'css-cjwhpx'})

print(table[0].prettify())