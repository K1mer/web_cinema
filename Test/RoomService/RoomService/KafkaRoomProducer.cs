using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Confluent.Kafka;

namespace RoomService
{
    public class KafkaRoomProducer:IRoomServiceProducer
    {
        private readonly string HostPort = "";
        private readonly string Topic = "";
        public async void Stop()
        {
            var config = new ProducerConfig
            {
                BootstrapServers = HostPort,
            };
            using (var producer = new ProducerBuilder<Null, Null>(config).Build())
            {
                await producer.ProduceAsync(Topic, new Message<Null, Null> { Value = null });
            }
        }

        public async void Start()
        {
            var config = new ProducerConfig
            {
                BootstrapServers = HostPort,
            };
            using (var producer = new ProducerBuilder<Null, Null>(config).Build())
            {
                await producer.ProduceAsync(Topic, new Message<Null, Null> { Value = null });
            }
        }

        public async void UploadFilm(string filmName)
        {
            var config = new ProducerConfig
            {
                BootstrapServers = HostPort,
            };
            using (var producer = new ProducerBuilder<Null, string>(config).Build())
            {
                await producer.ProduceAsync(Topic, new Message<Null, string> { Value = filmName });
            }
        }

        public async void UploadChunk(byte[] chunk)
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
    }
}
