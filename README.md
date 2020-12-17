# Toggl Worklog

Takes time entries from [Toggl Track](https://toggl.com/track/) (Task Timer) and adds a corresponding work log in the matching [Jira](https://www.atlassian.com/software/jira) issue.

## Installers

 - Windows
 - Mac
 - Linux

## Setup
### Leg Work
#### Toggl Track
 1. Create a [Toggl Track](https://toggl.com/track/signup/) account 
 2. Click on your profile (bottom left)

 3. Select "Profile Settings"
 4. Scroll
    down to find API Token
1. Copy this value to safe location
2. Install a Toggl Track app
	 - [Mobile](https://toggl.com/track/mobile-time-tracking-app/)
     - [Desktop](https://toggl.com/track/toggl-desktop/)
     - [Integrations](https://toggl.com/track/integrations/)
#### Jira
1. Access the API Token Authentication menu in Jira
2.  After installation, the API Token Authentication menu will be accessible from the Jira user profile menu.
3. Create the token
4. Once you navigate there, click the button to generate a new API Token.
5. As an end user, you can create an API Token for yourself. You will only have to name it and give it an expiration date.
6. Copy this value to safe location

After installation, open Jira Toggler 
Click on the Settings cog.
This will be your name as shown in Jira

## How To Use
Once you get the settings saved. 
Click on the Start date and then the end date.
Click View Entries
If you get an error check your settings

If any entries in Toggl exist for that time span then you will see a list of entries.
Those already in Jira will have the  **Sync** field set to show "Yes"
You have the option to Check All or Check each entry you wish to save to Jira.
Click "Sync"

Setting icon provided by <a  href="https://www.vecteezy.com/free-vector/365">365 Vectors by Vecteezy</a>
