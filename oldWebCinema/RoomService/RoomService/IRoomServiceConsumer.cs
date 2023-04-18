using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoomService
{
    internal interface IRoomServiceConsumer
    {
        void AddConnection(Guid connectionId);

        void RemoveConnection(Guid connectionId);

        void Stop();

        void Start();

        void UploadChunk(byte[] chunk);

        void Start(string filmName);
    }
}
