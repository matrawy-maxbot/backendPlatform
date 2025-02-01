import mongoose from 'mongoose';
import { mongodb } from '../../../../config/database.config.js';

const connectDB = async () => {
     try {
          await mongoose.connect(mongodb.uri, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useCreateIndex: true,
               useFindAndModify: false
          });
          console.log('MongoDB connected successfully.');

          mongoose.connection.on('connected', () => {
               console.log('Mongoose connected to DB');
          });
             
          mongoose.connection.on('error', (err) => {
               console.error('Mongoose connection error:', err);
          });
             
          mongoose.connection.on('disconnected', () => {
               console.log('Mongoose disconnected from DB');
          });

     } catch (err) {
          console.error('MongoDB connection error:', err);
          //process.exit(1); // إغلاق التطبيق في حالة خطأ
     }
};

export default connectDB;