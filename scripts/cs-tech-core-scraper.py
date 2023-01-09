import csv
import requests
from bs4 import BeautifulSoup
import re


with open('data/cs-tech-core.csv', 'w', newline='') as file:
    writer = csv.writer(file, quoting=csv.QUOTE_ALL)
    writer.writerow(['Course','Name','Credit Hours'])

    URL = 'http://catalog.illinois.edu/undergraduate/engineering/computer-science-bs/#degreerequirementstext'
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')

    # Parse technical electives
    header = soup.find('h3', text='Computer Science Technical Core')
    table = header.find_next_sibling('table', class_='sc_courselist')
    tbody = table.find('tbody')
    for tr in tbody.find_all('tr'):
        if 'listsum' in tr['class']:
            continue
        else:
            tds = tr.find_all('td')
            course = tds[0].get_text()
            writer.writerow([course, tds[1].get_text(), tds[2].get_text()])
