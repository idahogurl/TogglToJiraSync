using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace TogglToJiraSync {
    public partial class Form1 : Form {
        public Form1() {
            InitializeComponent();
        }

        private void Button_GetEntries_Click(object sender, EventArgs e) {
            TogglConnector connector = new TogglConnector();
            List<TimeEntry> timeEntries = connector.GetTimeEntries(DateTimePicker_StartDate.Value, DateTimePicker_EndDate.Value).ToList();

            CheckedListBox_TimeEntries.DataSource = timeEntries;
            CheckedListBox_TimeEntries.ValueMember = "Id";
            CheckedListBox_TimeEntries.DisplayMember = "DisplayText";
        }

        private void Button_SaveToJira_Click(object sender, EventArgs e) {
            JiraConnector jiraConnector = new JiraConnector();
            TogglConnector connector = new TogglConnector();

            List<TimeEntry> timeEntryList = connector.GetTimeEntries(DateTimePicker_StartDate.Value, DateTimePicker_EndDate.Value).ToList();
            Dictionary<string, TimeEntry> timeEntries = timeEntryList.Distinct().ToDictionary(t => t.Id, t => t);

            foreach (TimeEntry checkedItem in CheckedListBox_TimeEntries.CheckedItems) {

                jiraConnector.InsertWorkLogEntry(timeEntries[checkedItem.Id]);

            }
        }
    }
}