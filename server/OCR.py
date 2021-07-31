import cv2
import pytesseract
from textblob import TextBlob
import spacy
import urlib


nlp = spacy.load("en_core_web_sm")

pytesseract.pytesseract.tesseract_cmd = r'D:\\Program Files\\Tesseract-OCR\\tesseract.exe'

img = cv2.imread("pedo.jpg")

text = pytesseract.image_to_string(img)
# print(text)

sentiment = TextBlob(text)

# print(sentiment.sentiment)
# print(sentiment.sentences)

avg = 0
count = 0

for sentence in text.split("\n"):
    for word in sentence.split(" "):
        if word != '':
            print(f"word: {word} - sentiment: {TextBlob(word).sentiment.polarity}")
            count += 1
            avg += TextBlob(word).sentiment.polarity

avg = avg / count
print(avg)

# print(text.split("\n"))

summary = nlp(text)
# print(summary)

