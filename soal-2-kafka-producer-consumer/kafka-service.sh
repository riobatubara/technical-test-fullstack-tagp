#!/bin/bash

# Define Kafka topic
TOPIC_NAME="kafka-test"
PARTITIONS=1
REPLICATION_FACTOR=1

start_kafka() {
  echo "Starting Zookeeper and Kafka..."
  docker-compose up -d

  echo "Waiting for Kafka to start..."
  KAFKA_READY=1
  while [[ $KAFKA_READY -ne 0 ]]; do
    sleep 5
    docker exec kafka kafka-broker-api-versions --bootstrap-server localhost:9092 >/dev/null 2>&1
    KAFKA_READY=$?
  done

  echo "Kafka is ready. Creating topic: $TOPIC_NAME"
  docker exec -it kafka kafka-topics --create --topic $TOPIC_NAME \
    --bootstrap-server localhost:9092 \
    --partitions $PARTITIONS \
    --replication-factor $REPLICATION_FACTOR || echo "Topic may already exist."
  
  echo "Kafka setup is complete."
}

stop_kafka() {
  echo "Stopping Zookeeper and Kafka..."
  docker-compose down
  echo "Kafka services stopped."
}

case "$1" in
  start)
    start_kafka
    ;;
  stop)
    stop_kafka
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac
