import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "analytic-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "analytic-service-group" });

// 📊 analytics store
const analytics = {
  revenue: 0,
  orders: 0,
  emailsSent: 0,
};

const run = async () => {
  try {
    await consumer.connect();

    // ✅ subscribe لكل topics
    await consumer.subscribe({ topic: "payment-successful" });
    await consumer.subscribe({ topic: "order-successful" });
    await consumer.subscribe({ topic: "email-sent" });

    console.log("📊 Listening to topics...");

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          if (!message.value) return;

          const data = JSON.parse(message.value.toString());

          switch (topic) {
            case "payment-successful": {
              const total = data.cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              analytics.revenue += total;

              console.log("💰 Payment:", total);
              console.log("📈 Revenue:", analytics.revenue);
              break;
            }

            case "order-successful": {
              analytics.orders += 1;

              console.log("📦 Order:", data.orderId);
              console.log("🛒 Total Orders:", analytics.orders);
              break;
            }

            case "email-sent": {
              analytics.emailsSent += 1;

              console.log("📧 Email sent to:", data.email);
              console.log("📨 Total Emails:", analytics.emailsSent);
              break;
            }

            default:
              console.warn(`⚠️ No handler for topic: ${topic}`);
          }
        } catch (err) {
          console.error("❌ Error processing message:", err);
        }
      },
    });
  } catch (error) {
    console.error("❌ Analytic Service Error:", error);
  }
};

run();