🚀 E-Commerce MEAN Stack Microservices with Kafka
📌 Overview
This project is a scalable E-Commerce system built using a Microservices Architecture with MEAN Stack (MongoDB, Express, Angular/Next.js, Node.js) and Kafka for event-driven communication.

🏗️ Architecture
The project follows a Microservices Architecture where each service is independent and communicates using events.
🔹 Services Included


🧑‍💻 User Service – Authentication & user management


📦 Product Service – Manage products


🛒 Order Service – Handle orders


💳 Payment Service – Process payments


📧 Email Service – Send notifications


📊 Analytics Service – Track system events



⚡ Tech Stack
🔧 Backend


Node.js


Express.js


MongoDB


Kafka


Docker


🎨 Frontend


Next.js


💳 Payment


Stripe (or any payment gateway)



🔄 Event-Driven Flow (Kafka)
🧭 Example Flow


User creates order


Order Service → order-created


Payment Service consumes event


Payment successful → payment-successful


Email Service sends confirmation


Analytics Service logs data



📂 Project Structure
.├── user-service├── product-service├── order-service├── payment-service├── email-service├── analytics-service├── gateway├── frontend├── docker-compose.yml

🐳 Run with Docker
docker-compose up -d

⚙️ Environment Variables
PORT=5000MONGO_URI=your_mongo_connectionKAFKA_BROKER=localhost:9092JWT_SECRET=your_secret

▶️ Run Services Manually
cd service-namenpm installnpm run dev

🔐 Authentication


JWT Authentication


Role-based access



💳 Payment Flow


Payment service listens to Kafka


Emits payment-successful


باقي الخدمات بتتعامل مع الحدث



📡 Kafka Topics


order-created


payment-successful


order-successful


send-email



🧪 Testing


Jest


Postman



📈 Scalability


Microservices architecture


Event-driven (Kafka)


Docker scaling



🤝 Contributing
Pull requests are welcome.

📜 License
MIT License

👨‍💻 Author
Mahmoud Shaaban
