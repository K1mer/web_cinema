using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoomService
{
    internal class Room
    {
        private readonly List<Guid> _connectionIds = new List<Guid>();
        private readonly IRoomServiceProducer _producer;

        public Room(IRoomServiceProducer producer)
        {
            _producer = producer;
        }

        public void AddConnection(Guid connectionId)
        {
            lock(_connectionIds)
                _connectionIds.Add(connectionId);
        }

        public void RemoveConnection(Guid connectionId)
        {
            lock (_connectionIds)
                _connectionIds.Remove(connectionId);
        }

        public void Stop()
        {
            _producer.Stop();
        }

        public void Start()
        {
            _producer.Start();
        }

        public void Start(string filmName)
        {
            _producer.UploadFilm(filmName);
            _producer.Start();
        }

        public void UploadChunk(byte[] chunk)
        {
            _producer.UploadChunk( chunk);
        }

        private List<Guid> GetCopyConnectionIds()
        {
            List<Guid> connectionIds;
            lock (_connectionIds)
                connectionIds = _connectionIds.ToList();

            return connectionIds;
        }
    }
}
