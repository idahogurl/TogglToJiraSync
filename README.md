
# Jira Worklogs

 Takes time entries from [Toggl Track](https://toggl.com/track/) (Task Timer) and adds a corresponding work log in the matching [Jira](https://www.atlassian.com/software/jira) issue.

  ## Installers
- Windows (Coming Soon)
- [MacOS](https://app.box.com/s/fjy56xmcjorgm4d951tm8hdugc9juk3b)
- Linux (Coming Soon)

## Setup

### Toggl Track

1. Create a [Toggl Track](https://toggl.com/track/signup/) account

2. Click on your profile (bottom left)

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/toggl-profile-menu.png)

3. Click `Profile Settings`

4. Scroll down to find `API Token`

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/toggl-api-token.png)

5. Copy and paste this value to safe location

6. Install a `Toggl Track` app

    -  [Mobile](https://toggl.com/track/mobile-time-tracking-app/)

    -  [Desktop](https://toggl.com/track/toggl-desktop/)

    -  [Integrations](https://toggl.com/track/integrations/)

### Jira

1. Click on your profile (top right)

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/jira-profile-menu.png)

2. Click `Account settings`

3. Click `Security` 

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/jira-profile-settings-sidebar.png)

4. Click `Create and manage API tokens` (last section)

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/jira-security-settings.png)

5. Click `Create API Token`

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/jira-token-create-1.png)

6.Enter a value to label the token (Example: *Toggl-To-Jira*)

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/jira-token-create-2.png)

7. Click `Create`

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/jira-token-create-3.png)

8. Copy this value to safe location

### Jira Worklogs
1. After installation, open `Jira Worklogs`

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/initial-screen.png)

2. Click the `Settings` icon in the left side menu to open the settings panel

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/settings-panel.png)

3.  Copy and paste the API tokens you obtained from `Toggl` and `Jira`

4.  Enter the name shown in the Jira profile menu for the `User Display Name`

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/jira-display-name.png)

5. Click `Save`

## How To Use

### Toggl Track
The input and button locations are dependant on the `Toggl Track` app you choose. The core steps below are the same. Further instructions for using Toggl Track are found in its [help guide](https://support.toggl.com/en/collections/1461333-tracking-time)

1. When you begin work on a Jira issue, open your `Toggl Track` app.

2. Enter the `Jira issue key` as the entry title. Without this value `Jira Worklogs` will not work properly.

3. Click the `Start` button (arrow icon) 

4. Click the `Stop` button (square icon)

5. Now you have created a time entry.


![Toggl for MacOs screenshot](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/toggl-track.png)
_Screenshot of Toggl for MacOS_

### Jira Worklogs

 1. Once you save the settings, click on the `Date Range` input.
  
 2. Click on one date for the `Start date` and then later date for the `End date`.  You can manually enter the dates (`YYYY-MM-DD`) instead.

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/date-range-pick.png)


3. Click `View Entries` 

4. If you get an error, first check you have entered the correct setting values. Most likely your Jira connection settings are incorrect. Contact your Jira administrator for help. 

![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/error-screen.png)

5. If any entries in `Toggl` exist for that date range, you will see a list of entries.
 
![enter image description here](https://github.com/idahogurl/TogglToJiraSync/raw/master/web/images/time-entries.png)

6. Entries already saved in Jira will have the `Sync` field show `Yes`

7. You have the option to Check All or Check each entry you wish to save to Jira.

8. Click `Sync`

## Contributing

If you have suggestions for how this program could be improved, or want to report a bug, open an issue! I'd love all and any contributions. If you are interested in contributing to the project, check out the Contributing Guide.

## Credits
Setting icon provided by <a  href="https://www.vecteezy.com/free-vector/365">365 Vectors by Vecteezy</a>
