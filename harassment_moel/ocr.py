from PIL import Image
import pytesseract
import pickle
import sexual_harassment_model as model

sample = pytesseract.image_to_string(Image.open('unknown.png'))


data = model.cv.transform([sample]).toarray()
prediction = model.clf.predict(data)

if prediction == ['Offensive Language'] or prediction == ['Hate Speech']:
    print(sample, '\n', 'True')
else:
    print('False')