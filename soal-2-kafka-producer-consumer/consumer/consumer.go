package main

import (
	"fmt"
	"log"
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	// Set up Kafka consumer configuration
	consumer, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers":       "localhost:9092",
		"group.id":                "web-consumer-group",
		"auto.offset.reset":       "earliest",
	})
	if err != nil {
		log.Fatalf("Failed to create consumer: %s\n", err)
	}
	defer consumer.Close()

	err = consumer.Subscribe("kafka-test", nil)
	if err != nil {
		log.Fatalf("Failed to subscribe to topic: %s\n", err)
	}

	log.Println("Consumer started... Waiting for messages")

	for {
		msg, err := consumer.ReadMessage(-1)
		if err == nil {
			fmt.Printf("Received message: key=%s value=%s\n", string(msg.Key), string(msg.Value))
		} else {
			log.Printf("Error receiving message: %v\n", err)
		}
	}
}
