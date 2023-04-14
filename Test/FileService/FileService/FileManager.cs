using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FileService
{
    internal class FileManager
    {
        private readonly string _dirFiles;
        private readonly IFileServiceProducer _fileServiceProducer;

        public FileManager(IFileServiceProducer fileServiceProducer)
        {
            _fileServiceProducer = fileServiceProducer;

            var currentDir = Directory.GetCurrentDirectory();
            _dirFiles = Path.Combine(currentDir, "Files");
            if (!Directory.Exists(_dirFiles))
                Directory.CreateDirectory(_dirFiles);
        }

        public void UploadFile(byte[] data, string fileName)
        {
            var newFileDir = Path.Combine(_dirFiles, fileName);
            using var stream = File.Create(newFileDir);
            stream.Write(data, 0, data.Length);
        }

        public void DownloadFile(string fileName)
        {
            var fileDir = Path.Combine(_dirFiles, fileName);
            const int sizeChunk = 1024 * 1024 * 4; // 4mb
            using (FileStream fs = new FileStream(fileDir, FileMode.Open, FileAccess.Read, FileShare.Read, sizeChunk))
            {
                using (BufferedStream bs = new BufferedStream(fs, sizeChunk))
                {
                    byte[] buffer = new byte[sizeChunk];
                    int byteRead;
                    while ((byteRead = bs.Read(buffer, 0, sizeChunk)) > 0)
                    {
                        byte[] originalBytes;
                        using (MemoryStream mStream = new MemoryStream())
                        {
                            mStream.Write(buffer, 0, byteRead);
                            originalBytes = mStream.ToArray();
                        }
                        _fileServiceProducer.SendChunk(originalBytes);
                    }
                }
            }
        }

        public void GetFileNames()
        {
            var fileNames = Directory.GetFiles(_dirFiles);
           _fileServiceProducer.SendFileNames(fileNames);
        }
    }
}
