﻿using BackendAPIProject.DTOs;
using System.Text.Json;

namespace BackendAPIProject.Services
{
    public class PostService:IPostService
    {
        private HttpClient _httpClient;

        public PostService(HttpClient httpClient) 
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<PostDTO>> Get()
        {
            
            var result = await _httpClient.GetAsync(_httpClient.BaseAddress);
            var body = await result.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var post = JsonSerializer.Deserialize<IEnumerable<PostDTO>>(body,options);
            return post;
        }
    }
}
