using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoomService
{
    internal interface IRoomServiceProducer
    {
        void Stop(List<Guid> connectionIds);

        void Start(List<Guid> connectionIds);

        void UploadFilm(string filmName);

        void UploadChunk(List<Guid> connectionIds, byte[] chunk)
    }
}
