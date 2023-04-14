using Confluent.Kafka;

namespace FileService
{
    internal class KafkaConsumersManager
    {
        private readonly IConsumer<Ignore, string> _consumerSelectedFileName;
        private readonly IConsumer<Ignore, NewFileParameters> _consumerNewFile;
        private readonly IConsumer<Ignore, bool> _consumerGetFileNames;

        private readonly IFileServiceConsumer _consumer;

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

            _consumerSelectedFileName = new ConsumerBuilder<Ignore, string>(config).Build();
            _consumerNewFile = new ConsumerBuilder<Ignore, NewFileParameters>(config).Build();
            _consumerGetFileNames = new ConsumerBuilder<Ignore, bool>(config).Build();

            _consumerSelectedFileName.Subscribe("topic123");
            _consumerNewFile.Subscribe("topic124");
            _consumerGetFileNames.Subscribe("topic125");

            var taskConsumeSelectedFileName = new Task(ConsumeSelectedFileName);
            var taskConsumeNewFile = new Task(ConsumeNewFile);
            var taskConsumeGetFileNames = new Task(ConsumeGetFileNames);
        }
      

        private void ConsumeSelectedFileName()
        {
            while (true)
            {
                var message = _consumerSelectedFileName.Consume(_timeOutMillisec);
                var fileName = message.Message.Value;
                if(fileName != null)
                {
                    _consumer.DownloadFile(fileName);
                    _consumerSelectedFileName.Commit(message);
                }
            }
        }

        private void ConsumeNewFile()
        {
            while (true)
            {
                var message = _consumerNewFile.Consume(_timeOutMillisec);
                var fileParameters = message.Message.Value;
                if (fileParameters != null)
                {
                    _consumer.UploadFile(fileParameters.Bytes, fileParameters.FileName);
                    _consumerNewFile.Commit(message);
                }
            }
        }

        private void ConsumeGetFileNames()
        {
            while (true)
            {
                var message = _consumerGetFileNames.Consume(_timeOutMillisec);
                var flag = message.Message.Value;
                if (flag)
                {
                    _consumer.GetFileNames();
                    _consumerGetFileNames.Commit(message);
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
