using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoomService
{
    internal interface IRoomServiceProducer
    {
        void Stop();

        void Start();

        void UploadFilm(string filmName);

        void UploadChunk(byte[] chunk);
    }
}
