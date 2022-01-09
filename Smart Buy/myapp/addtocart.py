import pymongo


client=pymongo.MongoClient("mongodb://localhost:27017/")
db=client['{username}']
collection=db['products']
dictionary={'link': '{productlink}','title': '{productid}','image':'{productpic}'}
ispresent=collection.find_one({'link' :'{productlink}'})
if(ispresent==None): 
 collection.insert_one(dictionary)