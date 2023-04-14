using Confluent.Kafka;

namespace FileService
{
    internal class KafkaProducersManager : IFileServiceProducer
    {
        private readonly ProducerConfig _config;

        public KafkaProducersManager(string brokerEndpoints)
        {
            var config = new ProducerConfig
            {
                BootstrapServers = brokerEndpoints,
            };
            _config = config;
        }

        public async void SendChunk(byte[] chunk)
        {
            using (var producer = new ProducerBuilder<Null, byte[]>(_config).Build())
            {
                await producer.ProduceAsync("topic1", new Message<Null, byte[]> { Value = chunk });
            }
            
        }

        public async void SendFileNames(string[] filenames)
        {
            using (var producer = new ProducerBuilder<Null, string[]>(_config).Build())
            {
                await producer.ProduceAsync("topic2", new Message<Null, string[]> { Value = filenames });
            }
            
        }
    }
}
