using System.Collections.Generic;

namespace TogglToJiraSync {
	public class WorkLogEntry {
		public string timeSpent { get; set; }
		public string started { get; set; }
		//public KeyValuePair<string, string> author { get; set; }
		//public KeyValuePair<string, string> updateAuthor { get; set; }
		//data['author'] = {"name": user,
			//				  'self': self.JIRA_BASE_URL + '/rest/api/2/user?username=' + user,
			//				  'displayName': user,
			//				  'active': False
			//				  }
			//data['updateAuthor'] = data['author']
	}
}