using Confluent.Kafka;

namespace FileService
{
    internal class KafkaProducersManager : IFileServiceProducer, IDisposable
    {
        private readonly IProducer<Null, string[]> _producerFileNames;
        private readonly IProducer<Null, byte[]> _producerFile;

        public KafkaProducersManager(string brokerEndpoints)
        {
            var config = new ProducerConfig
            {
                BootstrapServers = brokerEndpoints
            };

            _producerFileNames = new ProducerBuilder<Null, string[]>(config).Build();
            _producerFile = new ProducerBuilder<Null, byte[]>(config).Build();
        }

        public void Dispose() 
        {
            _producerFileNames.Dispose();
            _producerFile.Dispose();
        }

        public async void SendChunk(byte[] chunk)
        {
            await _producerFile.ProduceAsync("topic1", new Message<Null, byte[]> { Value = chunk });
        }

        public async void SendFileNames(string[] filenames)
        {
            await _producerFileNames.ProduceAsync("topic2", new Message<Null, string[]> { Value = filenames });
        }
    }
}
