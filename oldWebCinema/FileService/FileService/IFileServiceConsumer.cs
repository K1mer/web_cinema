using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileService
{
    internal interface IFileServiceConsumer
    {
        public void UploadFile(byte[] data, string nameFile);

        public void DownloadFile(string fileName);

        public void GetFileNames();
    }
}
