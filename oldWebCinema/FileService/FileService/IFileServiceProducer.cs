using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileService
{
    internal interface IFileServiceProducer
    {
        void SendChunk(byte[] chunk);

        void SendFileNames(string[] fileNames);
    }
}
