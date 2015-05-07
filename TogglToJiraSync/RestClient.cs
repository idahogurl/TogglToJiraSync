using System;
using System.IO;
using System.Net;
using System.Text;

namespace TogglToJiraSync {
    public enum HttpVerb {
        GET,
        POST,
        PUT,
        DELETE
    }

    public class RestClient {
        public RestClient() {
            EndPoint = "";
            Method = HttpVerb.GET;
            ContentType = "application/json";
            PostData = "";
        }

        public RestClient(string endpoint) {
            EndPoint = endpoint;
            Method = HttpVerb.GET;
            ContentType = "application/json";
            PostData = "";
        }

        public RestClient(string endpoint, HttpVerb method) {
            EndPoint = endpoint;
            Method = method;
            ContentType = "application/json";
            PostData = "";
        }

        public RestClient(string endpoint, HttpVerb method, string postData) {
            EndPoint = endpoint;
            Method = method;
            ContentType = "application/json";
            PostData = postData;
        }

        public RestClient(string userName, string password) {
            UserName = userName;
            Password = password;
            ContentType = "application/json";
        }

        public string EndPoint { get; set; }
        public HttpVerb Method { get; set; }
        public string ContentType { get; set; }
        public string PostData { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public string MakeRequest() {
            return MakeRequest("");
        }

        public string MakeRequest(string parameters) {
            HttpWebRequest request = (HttpWebRequest) WebRequest.Create(EndPoint + parameters);
            request.Headers["Authorization"] = "Basic " + Convert.ToBase64String(Encoding.Default.GetBytes(UserName + ":" + Password));

            request.Method = Method.ToString();
            request.ContentLength = 0;
            request.ContentType = ContentType;

            if (!string.IsNullOrEmpty(PostData) && Method == HttpVerb.POST) {
                UTF8Encoding encoding = new UTF8Encoding();
                byte[] bytes = encoding.GetBytes(PostData);
                request.ContentLength = bytes.Length;

                using (Stream writeStream = request.GetRequestStream()) {
                    writeStream.Write(bytes, 0, bytes.Length);
                }
            }

            using (HttpWebResponse response = (HttpWebResponse) request.GetResponse()) {
                string responseValue = string.Empty;

                // grab the response
                using (Stream responseStream = response.GetResponseStream()) {
                    if (responseStream != null) {
                        using (StreamReader reader = new StreamReader(responseStream)) {
                            responseValue = reader.ReadToEnd();
                        }
                    }
                }

                return responseValue;
            }
        }
    }
}