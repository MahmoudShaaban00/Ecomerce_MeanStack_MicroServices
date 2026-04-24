import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: "order-service",
    brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "order-service-group" });

const run = async () => {
    try {
        // Connect producer & consumer
        await producer.connect();
        await consumer.connect();

        console.log("✅ Kafka connected");

        // Subscribe to topic
        await consumer.subscribe({
            topic: "payment-successful",
            fromBeginning: true,
        });

        console.log("📩 Subscribed to payment-successful");

        // Consume messages
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    if (!message.value) return;

                    const paymentData = JSON.parse(message.value.toString());

                    console.log("💰 Payment received:", paymentData);

                    // Generate dynamic orderId
                    const orderId = Date.now();

                    // Send to next topic
                    await producer.send({
                        topic: "order-successful",
                        messages: [
                            {
                                value: JSON.stringify({
                                    orderId,
                                    userId: paymentData.userId,
                                    cart: paymentData.cart,
                                    status: "Order Placed",
                                }),
                            },
                        ],
                    });

                    console.log("📦 Order sent:", orderId);

                } catch (err) {
                    console.error("❌ Error processing message:", err);
                }
            },
        });

    } catch (error) {
        console.error("❌ Error in analytic service:", error);
    }
};

// Graceful shutdown
const shutdown = async () => {
    console.log("🛑 Shutting down...");
    await consumer.disconnect();
    await producer.disconnect();
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Run service
run();