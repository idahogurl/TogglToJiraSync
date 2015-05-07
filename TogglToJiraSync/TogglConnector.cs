using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using Newtonsoft.Json;

namespace TogglToJiraSync {
	public class TogglConnector {
		
		
		public TimeEntry[] GetTimeEntries(DateTime startDateTime, DateTime endDateTime) {
			
			HttpWebRequest authRequest = GetRequest(GetDateFilterString(startDateTime, endDateTime));

			string result;
			
			using (HttpWebResponse response = (HttpWebResponse) authRequest.GetResponse()) {

				using (Stream stream = response.GetResponseStream()) {
					StreamReader sr = new StreamReader(stream);
					result = sr.ReadToEnd();
					sr.Close();
				}
			}

			return JsonConvert.DeserializeObject<TimeEntry[]>(result);
		}

		private string FormatDateTime(DateTime dateTime) {
			return dateTime.ToString("yyyy-MM-ddTHH:mm:sszzz"); // 2013-03-10T15:42:46+02:00
		}

		private string GetDateFilterString(DateTime startDateTime, DateTime endDateTime) {
			return "?start_date=" + HttpUtility.UrlEncode(FormatDateTime(startDateTime)) + "&end_date=" + FormatDateTime(endDateTime);
		}

		private HttpWebRequest GetRequest(string filterString) {
			
			const string url = "https://www.toggl.com/api/v8/time_entries";
			
			HttpWebRequest authRequest = (HttpWebRequest) WebRequest.Create(url + filterString);
			authRequest.Headers.Add("Authorization", GetAuthHeader());
			authRequest.Method = "GET";
			authRequest.ContentType = "application/json";
			return authRequest;
		}

		private string GetAuthHeader() {
			const string apiToken = "94076557811222111c863f33cbfe87ab";
			const string userpass = apiToken + ":api_token";

			string userpassB64 = Convert.ToBase64String(Encoding.Default.GetBytes(userpass.Trim()));
			string authHeader = "Basic " + userpassB64;
			return authHeader;
		}

		//public TimeEntry GetTimeEntry(string id) {
		//	HttpWebRequest authRequest = GetRequest("/" + id);

		//	string result;

		//	using (HttpWebResponse response = (HttpWebResponse)authRequest.GetResponse()) {

		//		using (Stream stream = response.GetResponseStream()) {
		//			StreamReader sr = new StreamReader(stream);
		//			result = sr.ReadToEnd();
		//			sr.Close();
		//		}
		//	}
		//	result = result.Replace("{\"data\":", "");
		//	result = result.Substring(0, result.Length - 1);
		//	return JsonConvert.DeserializeObject<TimeEntry>(result);
		//}
	}
}

