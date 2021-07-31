def pad_features(example_int, seq_length):
    """
    pad or truncate each data. 
    if sentence length > seq_length, truncate
    if sentence length < seq_length, pad with zeros
    """

    features = np.zeros((len(example_int), seq_length), dtype = int)
    
    for i, example in enumerate(example_int):
        example_len = len(example)        
        if example_len <= seq_length:
            zeroes = list(np.zeros(seq_length-example_len))
            new = zeroes+example
        elif example_len > seq_length:
            new = example[0:seq_length]
            
        features[i,:] = np.array(new)
    
    return features

class RNN(nn.Module):
    def __init__(self, vocab_size, output_size, embedding_dim, hidden_dim, n_layers, model, drop_prob=0.5):
        """
        Initialize the model by setting up the layers.
        """
        super().__init__()

        self.model = model
        self.output_size = output_size
        self.n_layers = n_layers
        self.hidden_dim = hidden_dim
        
        # embedding and LSTM layers
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        
        if self.model == 'lstm':
            self.lstm = nn.LSTM(embedding_dim, hidden_dim, n_layers, batch_first=True,bidirectional=True)
        elif self.model == 'gru':
            self.gru = nn.GRU(embedding_dim, hidden_dim, n_layers, batch_first=True, bidirectional=True)
        # dropout layer
        self.dropout = nn.Dropout(drop_prob)
        
        # linear and softmax layers
        self.fc = nn.Linear(hidden_dim, output_size)
        self.softmax = nn.Softmax()

    def forward(self, x, hidden):
        
        batch_size = x.size(0)
        embeds = self.embedding(x)

        if self.model == 'lstm':
            lstm_out, hidden = self.lstm(embeds, hidden)
            model_out = lstm_out.contiguous().view(-1, self.hidden_dim)
        else:
            gru_out, hidden = self.gru(embeds, hidden)
            model_out = gru_out.contiguous().view(-1, self.hidden_dim)
            
        # dropout and fully-connected layer
        out = self.dropout(model_out)
        out = self.fc(out)

        sm_out = self.softmax(out)
        
        # reshape to be batch_size first
        sm_out = sm_out.view(batch_size, -1)
        sm_out = sm_out[:,-1] # get last batch of labels
        
        return sm_out, hidden


    def init_hidden(self, batch_size):
        ''' Initializes hidden state '''
        # Create two new tensors with sizes n_layers x batch_size x hidden_dim,
        # initialized to zero, for hidden state and cell state of LSTM
        weight = next(self.parameters()).data
        if self.model == 'lstm':
            hidden = (weight.new(self.n_layers*2, batch_size, self.hidden_dim).zero_(),
                      weight.new(self.n_layers*2, batch_size, self.hidden_dim).zero_())
        elif self.model == 'gru':
            hidden = weight.new(self.n_layers*2, batch_size, self.hidden_dim).zero_()
        
        return hidden


def train(model):
    # Instantiate the model w/ hyperparams
    vocab_size = 8001  # +1 for the 0 padding
    output_size = 2
    embedding_dim = 400
    hidden_dim = 256
    n_layers = 1
    net = RNN(vocab_size, output_size, embedding_dim, hidden_dim, n_layers, model=model)
    batch_size = 20
    epochs = 10
            
    # loss and optimization functions
    lr=0.001

    criterion = nn.BCELoss()
    optimizer = torch.optim.Adam(net.parameters(), lr=lr)

    # training params
    counter = 0
    print_every = 100
    num_correct = 0
    clip=5 # gradient clipping
    losses = []
    val_losses = []
    accuracy = []
    acc_mean = []
    loss_mean = []
    net.train()

    # train for some number of epochs
    for e in range(epochs):
        # initialize hidden state
        h = net.init_hidden(batch_size)

        # batch loop
        for inputs, labels in train_loader:
            
            counter += 1
            # Creating new variables for the hidden state, otherwise
            # we'd backprop through the entire training history
            if model == 'gru':
                h = h.data
            elif model == 'lstm':
                h = tuple([each.data for each in h])
            
            # zero accumulated gradients
            net.zero_grad()

            # get the output from the model
            inputs = inputs.type(torch.LongTensor)
            output, h = net(inputs, h)

            # calculate the loss and perform backprop
            loss = criterion(output.squeeze(), labels.float())
            losses.append(loss.item())
            loss.backward()
            
            pred = torch.round(output.squeeze())
            correct_tensor = pred.eq(labels.float().view_as(pred))
            correct = np.squeeze(np.squeeze(correct_tensor.cpu().numpy()))
            num_correct = np.sum(correct)
            train_acc = num_correct / batch_size
                            
            # `clip_grad_norm` helps prevent the exploding gradient problem in RNNs / LSTMs.
            nn.utils.clip_grad_norm_(net.parameters(), clip)
            optimizer.step()

            # loss stats
            # Get validation loss
            if counter % print_every == 0:
                val_h = net.init_hidden(batch_size)
                
                net.eval()
                for inputs, labels in valid_loader:
                    # Creating new variables for the hidden state, otherwise
                    # we'd backprop through the entire training history
                    if model == 'gru':
                        val_h = val_h.data
                    elif model == 'lstm':
                        val_h = tuple([each.data for each in val_h])

                    inputs = inputs.type(torch.LongTensor)
                    output, val_h = net(inputs, val_h)
                    val_loss = criterion(output.squeeze(), labels.float())
                    
                    pred = torch.round(output.squeeze())
                    correct_tensor = pred.eq(labels.float().view_as(pred))
                    correct = np.squeeze(np.squeeze(correct_tensor.cpu().numpy()))
                    num_correct = np.sum(correct)
                    acc = num_correct / batch_size
                    accuracy.append(acc)

                    val_losses.append(val_loss.item())

                net.train()
                print("Epoch: {}/{}...".format(e+1, epochs),
                      "Step: {}...".format(counter),
                      "Loss: {:.6f}...".format(loss.item()),
                      "Train Acc: {:.6f}".format(train_acc),
                      "Val Loss: {:.6f}".format(np.mean(val_losses)),
                      "Val Accuracy: {:.6f}".format(np.mean(accuracy)))
                acc_mean.append(np.mean(accuracy))
                loss_mean.append(np.mean(val_losses))
                
        torch.save(net, 'TrainedModels/' + model + str(e+1) +'.pt')
        #save every epoch
        
    data_points = {'val_losses': loss_mean}
    start_epoch = 1
    end_epoch = epochs
    labels = ['val_losses']
    assert len(data_points) == len(labels), "The number of labels didn't consist with data points indexing."

    for label in labels:
        plt.plot(range(start_epoch, start_epoch + len(data_points[label])),
                data_points[label],label=label)

    data_points = {'accuracy': acc_mean}
    labels = ['accuracy']
    assert len(data_points) == len(labels), "The number of labels didn't consist with data points indexing."

    for label in labels:
        plt.plot(range(start_epoch, start_epoch + len(data_points[label])),
                data_points[label],
                label=label)

    plt.title("Validation set learning curve vs. Number of Training Epochs")
    plt.xlabel("Training Epochs")
    plt.ylabel("Learning curve")
    plt.ylim((0, 1.))
    plt.xticks(np.arange(0, end_epoch))
    plt.legend()
    plt.savefig(os.path.join('', model + ".png"), dpi=300)
    plt.close()
        
                
def test(model, load_model):
    # Get test data loss and accuracy
    test_losses = [] # track loss
    num_correct = 0
    batch_size = 20
    model = model
    #choose the model to load and test
    net = torch.load(load_model)
  
    h = net.init_hidden(batch_size)
    net.eval()
    criterion = nn.BCELoss()

    # iterate over test data
    for inputs, label in test_loader:
        # Creating new variables for the hidden state, otherwise
        # we'd backprop through the entire training history
        if model == 'gru':
            h = h.data
        elif model == 'lstm':
            h = tuple([each.data for each in h])
                
        # get predicted outputs
        inputs = inputs.type(torch.LongTensor)
        output, h = net(inputs, h)
        
        # calculate loss
        test_loss = criterion(output.squeeze(), label.float())
        test_losses.append(test_loss.item())

        print("Printing examples predicted incorrectly . . .")
        
        # convert output probabilities to predicted class (0 or 1)
        pred = torch.round(output.squeeze())  # rounds to the nearest integer
        
        l = label.tolist()
        inputs = inputs.tolist()
        # compare predictions to true label
        for i, p in enumerate(pred):
            words = []
            if int(p.item()) != int(l[i]):
                print("actual: " + str(l[i]))
                print("prediction: " + str(p.item()))
                for w in inputs[i]:
                    if w == 0:
                        pass
                    else:
                        words.append(index_to_word[w-1])
            
                print(' '.join(words))
              
        correct_tensor = pred.eq(label.float().view_as(pred))
        correct = np.squeeze(np.squeeze(correct_tensor.cpu().numpy()))
        num_correct += np.sum(correct)
    
    # -- stats! -- ##
    # avg test loss
    print("Test loss: {:.3f}".format(np.mean(test_losses)))
  
    # accuracy over all test data
    test_acc = num_correct/len(test_loader.dataset)
    print("Test accuracy: {:.4f}".format(test_acc))

    csv.field_size_limit(sys.maxsize)

    ### test with email data ###
    enron_text = []
    enron_index = []
    PATH = '../Data/parsed_email.csv'

    print("Testing with emails . . .")
    with open(PATH,'r') as file:
        enron = csv.reader(file)
        next(enron) #skip header
        for row in enron:
            enron_text.append(row[0])
            enron_index.append(row[1])
    

    tokenized_sentences = [nltk.word_tokenize(sent) for sent in enron_text]
    for i, sent in enumerate(tokenized_sentences):
        tokenized_sentences[i] = [w if w in word_to_index else unknown_token for w in sent]
    
    enron_ints = []
    for sent in tokenized_sentences:    
        index = [word_to_index[word] for word in sent]
        enron_ints.append(index)
    
    seq_length = 50
    features = pad_features(enron_ints, seq_length)
   
    enron_data = TensorDataset(torch.from_numpy(features))
    enron_loader = DataLoader(enron_data, batch_size=1)

    # init hidden state
    batch_size = 1
    h = net.init_hidden(batch_size)
    net.eval()

    if model == 'gru':
        OUTPUT_PATH = '../Results/GRU_result.csv'
    else:
        OUTPUT_PATH = '../Results/LSTM_result.csv'

    with open(OUTPUT_PATH,'w') as file:
        fieldnames = ['data','prob','index']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        
        for i, inputs in enumerate(enron_loader):
         
            # Creating new variables for the hidden state, otherwise
            # we'd backprop through the entire training history
            if model == 'gru':
                h = h.data
            else:
                h = tuple([each.data for each in h])

            # get predicted outputs
            inputs = inputs[0].type(torch.LongTensor)
            output, h = net(inputs, h)
        
            #if output probability is greater than 0.7, write to csv file
            if output.item() > 0.7:
                writer.writerow({'data': enron_text[i], 'prob':output.item(), 'index': enron_index[i]})
    

vocabulary_size = 8000
unknown_token = "UNKNOWN_TOKEN"
#read train and test data
print("Reading CSV file..")
labels = []
sentences = []
    
with open('../Data/TestTrainData/nh_h_train.csv', 'r') as f:
    reader = csv.reader(f, skipinitialspace=True)
    data = []
    
    for x in reader:
        data.append((x[0].lower(),int(x[1])))
        
    for d in data:
        labels.append(d[1])
        sentences.append(d[0])

with open('../Data/TestTrainData/nh_h_test.csv','r') as f:
    reader = csv.reader(f, skipinitialspace=True)
    data = []
    
    for x in reader:
        data.append((x[0].lower(),int(x[1])))
        
    for d in data:
        labels.append(d[1])
        sentences.append(d[0])
        
print("Parsed %d sentences." % (len(sentences)))
    
# Tokenize the sentences into words
tokenized_sentences = [nltk.word_tokenize(sent) for sent in sentences]
# Count the word frequencies
word_freq = nltk.FreqDist(itertools.chain(*tokenized_sentences))
print("Found %d unique words tokens." % len(word_freq.items()))
 
# Get the most common words and build index_to_word and word_to_index vectors
vocab = word_freq.most_common(vocabulary_size - 1)
index_to_word = [x[0] for x in vocab]
index_to_word.append(unknown_token)
word_to_index = dict([(w,i+1) for i,w in enumerate(index_to_word)])
 
print("Using vocabulary size %d." % vocabulary_size)
print("The least frequent word in our vocabulary is '%s' and appeared %d times." % (vocab[-1][0], vocab[-1][1])) 
# Replace all words not in our vocabulary with the unknown token
for i, sent in enumerate(tokenized_sentences):
    tokenized_sentences[i] = [w if w in word_to_index else unknown_token for w in sent]

print("\nExample sentence: '%s'" % sentences[0])
print("\nExample sentence after Pre-processing: '%s'" % tokenized_sentences[0])

example_int = []
for example in tokenized_sentences:
    index = [word_to_index[w] for w in example]
    example_int.append(index)

labels = np.array(labels)

#pad with zeros; all input will be word length = seq_length
seq_length = 50
features = pad_features(example_int, seq_length)

#train 80, valid 10, test 10
split_frac = 0.8
len_feat = len(features)
train_x = features[0:int(split_frac*len_feat)]
train_y = labels[0:int(split_frac*len_feat)]

remaining_x = features[int(split_frac*len_feat):]
remaining_y = labels[int(split_frac*len_feat):]
valid_x = remaining_x[0:int(len(remaining_x)*0.5)]
valid_y = remaining_y[0:int(len(remaining_y)*0.5)]
test_x = remaining_x[int(len(remaining_x)*0.5):]
test_y = remaining_y[int(len(remaining_y)*0.5):]

# create Tensor datasets
train_data = TensorDataset(torch.from_numpy(train_x), torch.from_numpy(train_y))
valid_data = TensorDataset(torch.from_numpy(valid_x), torch.from_numpy(valid_y))
test_data = TensorDataset(torch.from_numpy(test_x), torch.from_numpy(test_y))
# dataloaders

batch_size = 20
# make sure to SHUFFLE your data
train_loader = DataLoader(train_data, shuffle=True, batch_size=batch_size, drop_last=True)
valid_loader = DataLoader(valid_data, shuffle=True, batch_size=batch_size, drop_last=True)
test_loader = DataLoader(test_data, shuffle=False, batch_size=batch_size, drop_last=True) #didn't shuffle test data b/c I wanted to print out outputs that were predicted incorrectly

# obtain one batch of training data
dataiter = iter(train_loader)
sample_x, sample_y = dataiter.next()
print('Sample input size: ', sample_x.size()) # batch_size, seq_length
print('Sample input: \n', sample_x)
print()
print('Sample label size: ', sample_y.size()) # batch_size
print('Sample label: \n', sample_y)


if __name__ == '__main__':
    train_or_test = sys.argv[1]
    model = sys.argv[2]
    if train_or_test == 'train':
        train(model)
    elif train_or_test == 'test':
        load_model = sys.argv[3]
        test(model, load_model)

    print("Done!")