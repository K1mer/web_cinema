using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Confluent.Kafka;

namespace RoomService
{
    public class KafkaRoomConsumer: IRoomServiceConsumer
    {
        private readonly string HostPort = "";
        private readonly string Topic = "";
        private readonly string Group = "";
        private readonly int TimeOutMillisec = 100;
        public void AddConnection(Guid connectionId)
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = HostPort,
                GroupId = Group,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            using (var consumer = new ConsumerBuilder<Ignore, Task>(config).Build())
            {
                consumer.Subscribe(Topic);

                while (true)
                {
                    var consumeResult = consumer.Consume(TimeOutMillisec);

                    // Описана логига работы с результатом.
                }

                consumer.Close();
            }
        }

        public void RemoveConnection(Guid connectionId)
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = HostPort,
                GroupId = Group,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            using (var consumer = new ConsumerBuilder<Ignore, Task>(config).Build())
            {
                consumer.Subscribe(Topic);

                while (true)
                {
                    var consumeResult = consumer.Consume(TimeOutMillisec);

                    // Описана логига работы с результатом.
                }

                consumer.Close();
            }
        }

        public void Stop()
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = HostPort,
                GroupId = Group,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            using (var consumer = new ConsumerBuilder<Ignore, Task>(config).Build())
            {
                consumer.Subscribe(Topic);

                while (true)
                {
                    var consumeResult = consumer.Consume(TimeOutMillisec);

                    // Описана логига работы с результатом.
                }

                consumer.Close();
            }
        }

        public void Start()
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = HostPort,
                GroupId = Group,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            using (var consumer = new ConsumerBuilder<Ignore, Task>(config).Build())
            {
                consumer.Subscribe(Topic);

                while (true)
                {
                    var consumeResult = consumer.Consume(TimeOutMillisec);

                    // Описана логига работы с результатом.
                }

                consumer.Close();
            }
        }

        public void DownloadChunk(byte[] chunk)
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = HostPort,
                GroupId = Group,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            using (var consumer = new ConsumerBuilder<Ignore, byte[]>(config).Build())
            {
                consumer.Subscribe(Topic);

                while (true)
                {
                    var consumeResult = consumer.Consume(TimeOutMillisec);

                    // Описана логига работы с результатом.
                }

                consumer.Close();
            }
        }

        public void Start(string filmName)
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = HostPort,
                GroupId = Group,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            using (var consumer = new ConsumerBuilder<Ignore, Task>(config).Build())
            {
                consumer.Subscribe(Topic);

                while (true)
                {
                    var consumeResult = consumer.Consume(TimeOutMillisec);

                    // Описана логига работы с результатом.
                }

                consumer.Close();
            }
        }
    }
}
