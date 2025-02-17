# technical-test-fullstack-tagp
----

## **Prerequisites**

tech stack:
```
node.js (v18 or later)
npm (comes with Node.js)
docker
golang
```

### **Clone the Repository**
```
git clone https://github.com/riobatubara/technical-test-fullstack-tagp.git
cd technical-test-fullstack-tagp
```
---

#### **Soal 1 - Buat grafik untuk penduduk Indonesia tahun 2024**
Masuk ke directory
```
cd soal-1-indonesia-population-2024
```

#### **Dependencies Installation**
```
npm install
```

#### **How to Run**
```
node app.js
```

#### **Open Browser**
go to
```
http://localhost:8000
```
---


#### **Soal 2 - Buat producer dan consumer sederhana**
Pastikan docker terinstall, dan masuk ke directory
```
cd soal-2-kafka-producer-consumer
```

#### **Run Kafka Docker Container**
```
./kafka-service.sh start
```

#### **Run Producer**
```
./producer/producer
```

#### **Run Consumer**
```
./consumer/consumer
```

#### **Soal 3**
Jawaban ada di directory soal-3-repository-conflict-strategy
```
cd soal-3-repository-conflict-strategy
```