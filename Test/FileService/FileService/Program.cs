using Confluent.Kafka;
using FileService;

var endpoint = "127.0.0.1:9092";
var fileServiceProducer = new KafkaProducersManager(endpoint);
var fileManager = new FileManager(fileServiceProducer);
var fileServiceConsumer = new KafkaConsumersManager(fileManager, endpoint, "fileService");

Console.WriteLine();
