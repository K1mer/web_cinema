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
            var connectionIds = GetCopyConnectionIds();
            _producer.Stop(connectionIds);
        }

        public void Start()
        {
            var connectionIds = GetCopyConnectionIds();
            _producer.Start(connectionIds);
        }

        public void Start(string filmName)
        {
            _producer.UploadFilm(filmName);
            var connectionIds = GetCopyConnectionIds();
            _producer.Start(connectionIds);
        }

        public void UploadChunk(byte[] chunk)
        {
            var connectionIds = GetCopyConnectionIds();
            _producer.UploadChunk(connectionIds, chunk);
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
