import mongoose from 'mongoose'

const connection = {};
const uri = "mongodb+srv://new_user:HARRY@cluster0.vvnhw.mongodb.net/bitastik?retryWrites=true&w=majority"
const dbConnect = async () => {
  if (connection.isConnected) return;
  
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;