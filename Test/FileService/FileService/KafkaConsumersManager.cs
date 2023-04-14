using Confluent.Kafka;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FileService
{
    internal class KafkaConsumersManager
    {
        private readonly IFileServiceConsumer _consumer;
        private readonly ConsumerConfig _config;

        private const int _timeOutMillisec = 100;

        public KafkaConsumersManager(IFileServiceConsumer consumer, string brokerEndpoints, string groupName)
        {
            _consumer = consumer;

            var config = new ConsumerConfig
            {
                BootstrapServers = brokerEndpoints,
                GroupId = groupName,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            _config = config;

            var taskConsumeSelectedFileName = new Task(ConsumeSelectedFileName);
            var taskConsumeNewFile = new Task(ConsumeNewFile);
            var taskConsumeGetFileNames = new Task(ConsumeGetFileNames);

            taskConsumeSelectedFileName.Start();
            taskConsumeNewFile.Start();
            taskConsumeGetFileNames.Start();
        }
      
        private void ConsumeSelectedFileName()
        {
            while (true)
            {
                using(var consumerSelectedFileName = new ConsumerBuilder<Ignore, string>(_config).Build())
                {
                    consumerSelectedFileName.Subscribe("topic123");
                    var message = consumerSelectedFileName.Consume(_timeOutMillisec);
                    if (message == null)
                        continue;
                    var fileName = message.Message.Value;
                    if (fileName != null)
                    {
                        _consumer.DownloadFile(fileName);
                        consumerSelectedFileName.Commit(message);
                    }
                }
            }
        }

        private void ConsumeNewFile()
        {
            while (true)
            {
                using (var consumerNewFile = new ConsumerBuilder<Ignore, string>(_config).Build())
                {
                    consumerNewFile.Subscribe("topic124");
                    var message = consumerNewFile.Consume(_timeOutMillisec);
                    if (message == null)
                        continue;
                    var json = message.Message.Value;
                    var fileParameters = JsonSerializer.Deserialize<NewFileParameters>(json);
                    if (fileParameters != null)
                    {
                        _consumer.UploadFile(fileParameters.Bytes, fileParameters.FileName);
                        consumerNewFile.Commit(message);
                    }
                }
            }
        }

        private void ConsumeGetFileNames()
        {
            while (true)
            {
                using(var consumerGetFileNames = new ConsumerBuilder<Ignore, int>(_config).Build())
                {
                    consumerGetFileNames.Subscribe("topic125");
                    var message = consumerGetFileNames.Consume(_timeOutMillisec);
                    if (message == null)
                        continue;
                    var flag = message.Message.Value;
                    if (flag != null)
                    {
                        _consumer.GetFileNames();
                        consumerGetFileNames.Commit(message);
                    }
                }
            }
        }

        private class NewFileParameters
        {
            public string FileName { get; set; }

            public byte[] Bytes { get; set; }
        }
    }
}
