﻿using ContactPro.Services.Interfaces;

namespace ContactPro.Services
{
    public class ImageService : IImageService
    {
        private readonly string[] suffixes = { "Bytes", "KB", "MB", "GB", "TB", "PB" };
        private readonly string defaultImage = "img/DefaultContactImage.png";
        //Outbound file conversion
        public string ConvertByteArrayToFile(byte[] fileData, string extension)
        {
            if (fileData is null)
            {
                return defaultImage;
            }
            try 
            {
                string imageBase64Data = Convert.ToBase64String(fileData);
                return string.Format($"data:{extension};base64,{imageBase64Data}");
            }
            catch(Exception ex) 
            {
                throw;
            }
        }

        //Inbound file  conversion

        public async Task<byte[]> ConvertFileToByteArrayAsync(IFormFile file)
        {
            try 
            {
                using MemoryStream memoryStream = new();
                await file.CopyToAsync(memoryStream);
                byte[] byteFile = memoryStream.ToArray();
                return byteFile;
            }
            catch (Exception) 
            {
                throw; 
            }
        }
    }
}
