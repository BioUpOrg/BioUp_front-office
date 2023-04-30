#!/usr/bin/env python
# coding: utf-8

# In[20]:


# Data Citation:
# F. Maxwell Harper and Joseph A. Konstan. 2015. The MovieLens Datasets: History and Context. ACM Transactions on 
# Interactive Intelligent Systems (TiiS) 5, 4: 19:1–19:19. <https://doi.org/10.1145/2827872>



# In[12]:





# In[83]:


# import the dataset
import pandas as pd
movies_df = pd.read_csv("C:/Users/user/Downloads/products.csv")
ratings_df = pd.read_csv("C:/Users/user/Downloads/ratings.csv")


# In[84]:


print('The dimensions of movies dataframe are:', movies_df.shape,'\nThe dimensions of ratings dataframe are:', ratings_df.shape)


# In[85]:


# Take a look at movies_df
movies_df.head()


# In[86]:


# Take a look at ratings_df
ratings_df.head()


# In[87]:


# Movie ID to movie name mapping
movie_names = movies_df.set_index('productId')['title'].to_dict()
n_users = len(ratings_df.userId.unique())
n_items = len(ratings_df.productId.unique())
print("Number of unique users:", n_users)
print("Number of unique movies:", n_items)
print("The full rating matrix will have:", n_users*n_items, 'elements.')
print('----------')
print("Number of ratings:", len(ratings_df))
print("Therefore: ", len(ratings_df) / (n_users*n_items) * 100, '% of the matrix is filled.')
print("We have an incredibly sparse matrix to work with here.")
print("And... as you can imagine, as the number of users and products grow, the number of elements will increase by n*2")
print("You are going to need a lot of memory to work with global scale... storing a full matrix in memory would be a challenge.")
print("One advantage here is that matrix factorization can realize the rating matrix implicitly, thus we don't need all the data")


# In[88]:


import torch
import numpy as np
from torch.autograd import Variable
from tqdm import tqdm as notebook

class MatrixFactorization(torch.nn.Module):
    def __init__(self, n_users, n_items, n_factors=20):
        super().__init__()
        # create user embeddings
        self.user_factors = torch.nn.Embedding(n_users, n_factors) # think of this as a lookup table for the input.
        # create item embeddings
        self.item_factors = torch.nn.Embedding(n_items, n_factors) # think of this as a lookup table for the input.
        self.user_factors.weight.data.uniform_(0, 0.05)
        self.item_factors.weight.data.uniform_(0, 0.05)
        
    def forward(self, data):
        # matrix multiplication
        users, items = data[:,0], data[:,1]
        return (self.user_factors(users)*self.item_factors(items)).sum(1)
    # def forward(self, user, item):
    # 	# matrix multiplication
    #     return (self.user_factors(user)*self.item_factors(item)).sum(1)
    
    def predict(self, user, item):
        return self.forward(user, item)


# In[89]:


# Creating the dataloader (necessary for PyTorch)
from torch.utils.data.dataset import Dataset
from torch.utils.data import DataLoader # package that helps transform your data to machine learning readiness

# Note: This isn't 'good' practice, in a MLops sense but we'll roll with this since the data is already loaded in memory.
class Loader(Dataset):
    def __init__(self):
        self.ratings = ratings_df.copy()
        
        # Extract all user IDs and movie IDs
        users = ratings_df.userId.unique()
        movies = ratings_df.productId.unique()
        
        #--- Producing new continuous IDs for users and movies ---
        
        # Unique values : index
        self.userid2idx = {o:i for i,o in enumerate(users)}
        self.movieid2idx = {o:i for i,o in enumerate(movies)}
        
        # Obtained continuous ID for users and movies
        self.idx2userid = {i:o for o,i in self.userid2idx.items()}
        self.idx2movieid = {i:o for o,i in self.movieid2idx.items()}
        
        # return the id from the indexed values as noted in the lambda function down below.
        self.ratings.productId = ratings_df.productId.apply(lambda x: self.movieid2idx[x])
        self.ratings.userId = ratings_df.userId.apply(lambda x: self.userid2idx[x])
        
        
        self.x = self.ratings.drop(['rating', 'timestamp'], axis=1).values
        self.y = self.ratings['rating'].values
        self.x, self.y = torch.tensor(self.x), torch.tensor(self.y) # Transforms the data to tensors (ready for torch models.)

    def __getitem__(self, index):
        return (self.x[index], self.y[index])

    def __len__(self):
        return len(self.ratings)


# In[90]:


num_epochs = 128
cuda = torch.cuda.is_available()

print("Is running on GPU:", cuda)

model = MatrixFactorization(n_users, n_items, n_factors=8)
print(model)
for name, param in model.named_parameters():
    if param.requires_grad:
        print(name, param.data)
# GPU enable if you have a GPU...
if cuda:
    model = model.cuda()

# MSE loss
loss_fn = torch.nn.MSELoss()

# ADAM optimizier
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# Train data
train_set = Loader()
train_loader = DataLoader(train_set, 128, shuffle=True)


# In[91]:


for it in notebook(range(num_epochs)):
    losses = []
    for x, y in train_loader:
         if cuda:
            x, y = x.cuda(), y.cuda()
            optimizer.zero_grad()
            outputs = model(x)
            loss = loss_fn(outputs.squeeze(), y.type(torch.float32))
            losses.append(loss.item())
            loss.backward()
            optimizer.step()


# In[92]:


# By training the model, we will have tuned latent factors for movies and users.
c = 0
uw = 0
iw = 0 
for name, param in model.named_parameters():
    if param.requires_grad:
        print(name, param.data)
        if c == 0:
          uw = param.data
          c +=1
        else:
          iw = param.data
        #print('param_data', param_data)


# In[93]:


trained_movie_embeddings = model.item_factors.weight.data.cpu().numpy()


# In[94]:


len(trained_movie_embeddings) # unique movie factor weights


# In[100]:


from sklearn.cluster import KMeans
# Fit the clusters based on the movie weights
kmeans = KMeans(n_clusters=10, random_state=0).fit(trained_movie_embeddings)


# In[136]:

products = []
for cluster in range(8):
  case = {'cluster':format(cluster)}
  products.append(case)

  movs = []
  print("Cluster #{}".format(cluster))
  for movidx in np.where(kmeans.labels_ == cluster)[0]:
    movid = train_set.idx2movieid[movidx]
    rat_count = ratings_df.loc[ratings_df['productId']==movid].count()[0]
    if movid in movie_names:
      movs.append((movid, rat_count))
  c = 0
  for mov in sorted(movs, key=lambda tup: tup[1], reverse=True)[:10]:
    c = c + 1
    print("\t", mov[0])
    stringc = str(c)
    case.update({'product'+stringc:mov[0]})



import json

jsonString = json.dumps(products)
jsonFile = open("data.json", "w")
jsonFile.write(jsonString)
jsonFile.close()


# In[ ]:





# In[ ]:





# In[ ]:




