import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: "email-service",
    brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "email-service-group" });

const run = async () => {
    try {
        await consumer.connect();

        console.log("✅ Email Service Connected");

        await consumer.subscribe({
            topic: "order-successful",
            fromBeginning: false, // أفضل في production
        });

        console.log("📩 Listening to order-successful");

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    if (!message.value) return;

                    const orderData = JSON.parse(message.value.toString());

                    console.log("📦 Order received:", orderData);

                    // ✅ Static Email
                    const email = "mahmoud@example.com";

                    // ✉️ simulate sending email
                    console.log(`📧 Sending email to ${email}...`);
                    console.log(`✅ Email sent for order ${orderData.orderId}`);

                } catch (err) {
                    console.error("❌ Error processing message:", err);
                }
            },
        });

    } catch (error) {
        console.error("❌ Email Service Error:", error);
    }
};

// graceful shutdown
const shutdown = async () => {
    console.log("🛑 Shutting down email service...");
    await consumer.disconnect();
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

run();