# Jira Manager Tool

This tool is created to help acquire and visualize data based on the assignees of Jira tasks.

### This Tool is Useful for:
* Finding and calculating velocity
* Determining estimation accuracy
* Visualizing trends
* Developing performance goals
* Identifying areas to focus on for improvement

![](https://github.com/mattstates/jiramanagertool/raw/master/screenshots/Screen%20Shot%202019-09-26%20at%2010.25.26%20AM.png)

### Usage:
1. Configure/connect to your Jira API
2. Pass in an assignee
3. Check/uncheck different metrics to visualize
4. Select a date range
5. Choose an interval
6. Submit

![](https://github.com/mattstates/jiramanagertool/raw/master/screenshots/Sep-27-2019%2008-10-57.gif)


### Installation
1. Clone the repo into your working directory
2. Edit the `appconfig.json` file to suit your Jira installation
3. CD into your working directory and run:
```
npm install
```
### Scripts
```
# run main dev environment
npm start
```
```
# run secondary dev environment (for my purposes this allows me to run the app in a Confluence page)
npm run start-local
```
```
# run unit tests
npm test
```
```
# run webpack build
npm run build
```

### Core Features:
* Configurable
* Assignee autosuggestion
* Accepts comma separated list of assignees
* Each date interval has a chart node with a hover tooltip
___

### Built with:
* *Typescript*
* *React*
* *D3*
* *Webpack*
* *Jest*
* *CI / Github Actions*


![](https://github.com/mattstates/jiramanagertool/workflows/Build%20and%20Test/badge.svg)

