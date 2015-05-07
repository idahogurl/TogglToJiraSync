using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace TogglToJiraSync {
	public class TimeEntry {
		[JsonProperty(PropertyName = "start")]
		[JsonConverter(typeof(IsoDateTimeConverter))]
		public DateTime Started { get; set; }

		[JsonProperty(PropertyName = "duration")]
		public int Duration { get; set; }

		[JsonProperty(PropertyName = "description")]
		public string Description { get; set; }

		[JsonProperty(PropertyName = "id")]
		public string Id { get; set; }

		public string DisplayText {
			get {
				TimeSpan durationTimeSpan = TimeSpan.FromSeconds(Duration);
				
				return Description + " (" + Started + ", " + durationTimeSpan.Hours + "h " + durationTimeSpan.Minutes + "m)";
			}
		}
	}
}