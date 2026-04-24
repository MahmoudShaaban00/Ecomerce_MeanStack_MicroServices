import express from 'express';
import cors from 'cors';
import { Kafka } from 'kafkajs';

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000'
  }));
 
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' })
})

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const connectToKafka = async () => {
  try{
    await producer.connect();
    console.log('Kafka producer connected successfully');
  }catch(error){
    console.error('Error connecting Kafka producer:', error);
  }
};



app.use('/payment-service', async(req, res) => {
  const {cart} = req.body;
  const userId = 123
  console.log('Processing payment for user:', userId, 'with cart:', cart);

  await producer.send({
    topic: 'payment-successful',
    messages: 
    [
      { value: JSON.stringify({ userId, cart }) },
    ],
  })

  return res.json({ message: 'Payment processed successfully' });
});

app.listen(3002, () => {

  connectToKafka();
  console.log('Payment service is running on port 3002');
});