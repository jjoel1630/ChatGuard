import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.calibration import CalibratedClassifierCV
from sklearn.svm import LinearSVC
# import sklearn.external.joblib as extjoblib
import joblib
import numpy as np
from profanity_check import predict


# Read in data
data = pd.read_csv('clean_data.csv')
print("task complete")
texts = data['text'].astype(str)
print("task complete")
y = data['is_offensive']

# Vectorize the text
vectorizer = CountVectorizer(stop_words='english', min_df=1)
print("task complete")
X = vectorizer.fit_transform(texts)

# Train the model
model = LinearSVC(class_weight="balanced", dual=False, tol=1e-2, max_iter=1e5)
print("task complete")
cclf = CalibratedClassifierCV(base_estimator=model)
cclf.fit(X, y)
print("task complete")

# Save the model
joblib.dump(vectorizer, 'vectorizer.joblib')
joblib.dump(cclf, 'model.joblib') 
print("task complete")