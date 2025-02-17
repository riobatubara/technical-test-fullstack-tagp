package main

import (
	"bufio"
	"fmt"
	"os"
	"log"
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	producer, err := kafka.NewProducer(&kafka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
	})
	if err != nil {
		log.Fatalf("Failed to create producer: %s\n", err)
	}
	defer producer.Close()

	fmt.Println("Enter the key (press Enter to skip): ")
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()
	key := scanner.Text()

	fmt.Println("Enter the value: ")
	scanner.Scan()
	value := scanner.Text()

	// Produce message to Kafka
	msg := &kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &[]string{"kafka-test"}[0], Partition: kafka.PartitionAny},
		Key:            []byte(key),
		Value:          []byte(value),
	}

	// Send message to Kafka
	err = producer.Produce(msg, nil)
	if err != nil {
		log.Printf("Failed to deliver message: %s\n", err)
	} else {
		log.Println("Message produced successfully")
	}

	// Wait for message delivery before closing producer
	producer.Flush(15 * 1000)
}
