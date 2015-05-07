using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Forms;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TogglToJiraSync {
	public class JiraConnector {
		private const string UserName = "rvest";
		private const string Password = "Re&99ba1-2/15";

		public void InsertWorkLogEntry(TimeEntry timeEntry) {
            RestClient client = new RestClient(UserName, Password);
			client.EndPoint = string.Format("https://jira.navexglobal.com/rest/api/2/issue/{0}/worklog", GetIssueFromTogglDescription(timeEntry.Description));

		    if (IsSaved(client, timeEntry)) {
		       MessageBox.Show(timeEntry.DisplayText, "Already Saved");
		    } else {
                client.Method = HttpVerb.POST;
                client.PostData = JsonConvert.SerializeObject(
                    new WorkLogEntry { timeSpent = GetTimeSpent(timeEntry.Duration), started = GetStartedDateTime(timeEntry.Started) });

                client.MakeRequest();

                MessageBox.Show(timeEntry.DisplayText, "Saved");
		    }
		}

	    private bool IsSaved(RestClient client, TimeEntry timeEntry) {
	        client.Method = HttpVerb.GET;
	        string response = client.MakeRequest();

	        JObject deserializeObject = (JObject) JsonConvert.DeserializeObject(response);
	        foreach (JToken worklog in deserializeObject["worklogs"]) {
	            JToken started = worklog["started"];
	            JToken timeSpent = worklog["timeSpent"];
	            if (started.ToObject<DateTime>() == timeEntry.Started && GetTimeSpent(timeEntry.Duration) == timeSpent.ToObject<string>()) {
	                return true;
	            }
	        }
            return false;
	    }

		private string GetStartedDateTime(DateTime started) {
			string timezone = started.ToString("zzz").Replace(":","");
			return started.ToString("yyyy-MM-ddTHH:mm:ss.fff") + timezone;
		}

		private string GetTimeSpent(int duration) {
			TimeSpan durationTimeSpan = TimeSpan.FromSeconds(duration);
		    if (durationTimeSpan.Hours == 0) {
		        return durationTimeSpan .Minutes + "m";
		    }
			return durationTimeSpan.Hours + "h " + durationTimeSpan .Minutes + "m";
		}

		private string GetIssueFromTogglDescription(string description) {
			return description.Split(' ')[0];
		}
	}
}