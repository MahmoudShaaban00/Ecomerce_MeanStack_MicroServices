import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-service",
  brokers: ["localhost:9092"],
});

const admin = kafka.admin();

const run = async () => {
  try {
    await admin.connect();

    await admin.createTopics({
      topics: [
        {
          topic: "payment-successful",
          numPartitions: 1,
        },
        {
          topic: "order-successful",
          numPartitions: 1,
        },
        {
          topic: "email-successful",
          numPartitions: 1,
        },
      ],
    });

    console.log("✅ Topics created successfully");

    await admin.disconnect();
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

run();