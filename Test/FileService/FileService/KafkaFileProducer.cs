using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Confluent.Kafka;
using System.Net;

namespace FileService
{
    public class KafkaFileProducer: IFileServiceProducer
    {
        private readonly string HostPort = "";
        private readonly string Topic = "";
        public async void SendChunk(byte[] chunk)
        {
            var config = new ProducerConfig
            {
                BootstrapServers = HostPort,
            };
            using (var producer = new ProducerBuilder<Null, byte[]>(config).Build())
            {
                await producer.ProduceAsync(Topic, new Message<Null, byte[]> { Value = chunk });
            }
        }
        public async void SendFileNames (string[] filenames)
        {
            var config = new ProducerConfig
            {
                BootstrapServers = HostPort,
            };
            using (var producer = new ProducerBuilder<Null, string[]>(config).Build())
            {
                await producer.ProduceAsync(Topic, new Message<Null, string[]> { Value = filenames });
            }
        }
    }
}
