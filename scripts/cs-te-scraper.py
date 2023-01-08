import csv
import requests
from bs4 import BeautifulSoup
import re


with open('data/cs-tech-electives.csv', 'w', newline='') as file:
    writer = csv.writer(file, quoting=csv.QUOTE_ALL)
    writer.writerow(['Category','Course','Name','Credit Hours'])

    URL = 'http://catalog.illinois.edu/undergraduate/engineering/computer-science-bs/#degreerequirementstext'
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')

    # Parse technical electives
    header = soup.find('h3', text='Technical Electives')
    table = header.find_next_sibling('table', class_='sc_courselist')
    tbody = table.find('tbody')
    for tr in tbody.find_all('tr'):
        if 'areaheader' in tr['class']:
            text = tr.find('span').text
            if text[-1] != ':':
                continue
            text = text[:-1]
            current_category = text.strip()
        else:
            if (current_category is None):
                continue
            tds = tr.find_all('td')
            course = tds[0].get_text()
            if len(course) == 0 or len(course) > 6:
                continue
            writer.writerow([current_category, course, tds[1].get_text(), tds[2].get_text()])
