using Confluent.Kafka;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FileService
{
    public class KafkaFileConsumer: IFileServiceConsumer
    {
        private readonly string HostPort = "";
        private readonly string Topic = "";
        private readonly string Group = "";
        private readonly int TimeOutMillisec = 100;
        
        public void UploadFile(byte[] data, string nameFile)//НА СЕРВЕР
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = HostPort,
                GroupId = Group,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            using (var consumer = new ConsumerBuilder<Ignore, string>(config).Build())
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

        public void DownloadFile(string fileName) //С СЕРВЕРА
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

        public void GetFileNames()
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = HostPort,
                GroupId = Group,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            using (var consumer = new ConsumerBuilder<Ignore, string[]>(config).Build())
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
