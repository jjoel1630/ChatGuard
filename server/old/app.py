from flask import Flask, session, redirect
from nltk.classify import NaiveBayesClassifier
from nltk.corpus import subjectivity
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.util import *
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk import tokenize
from OCR import *
from sentiment import *
from sexualharassment import *


app = Flask(__name__)

@app.route('/OCR')
def OCRRoute():
    n_instances = 100
    subj_docs = [(sent, 'subj') for sent in subjectivity.sents(categories='subj')[:n_instances]]
    obj_docs = [(sent, 'obj') for sent in subjectivity.sents(categories='obj')[:n_instances]]

    train_subj_docs = subj_docs[:80]
    test_subj_docs = subj_docs[80:100]
    train_obj_docs = obj_docs[:80]
    test_obj_docs = obj_docs[80:100]
    training_docs = train_subj_docs+train_obj_docs
    testing_docs = test_subj_docs+test_obj_docs
    sentim_analyzer = SentimentAnalyzer()
    all_words_neg = sentim_analyzer.all_words([mark_negation(doc) for doc in training_docs])

    lines_list = tokenize.sent_tokenize(paragraph)
    sentences.extend(lines_list)

    return OCR.OCR();

@app.route('/sexualharassment', methods=['GET', 'POST'])
def textanalysis():
    videos = []
    # people = []
    # places = []
    if 'transcript' in session:
        if request.method == 'POST':
            emailform = request.form
            reciever = emailform['email']
            subject = emailform['subject']
        keywords = api.sample_analyze_entities(session['transcript'])
        session["keywords"] = []

        for x in range(0, len(keywords)):
            if not keywords[x].isdigit():
                session["keywords"].append(keywords[x])
        
        if 'keywords' in session:
            for keyword in keywords:
                video = getYT.searchVideoForKeyword(keyword)
                for indivvideo in video:
                        #     if catergory == "people":
                        #         people.append(f'{indivvideo}')
                        #     elif catergory == "placesOrOrganizations":
                        #         places.append(f'{indivvideo}')
                    videos.append(f'{indivvideo}')
            session['videos'] = videos
            length_keywords = len(session['keywords'])
            # return render_template('textanalysis.html', session=session, length_keywords=length_keywords)
            return (session, length_keywords)


if __name__ == '__main__':
    app.run(host="localhost", port=5500, debug=True)