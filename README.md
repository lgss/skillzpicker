# Skillz picker

The aim of this application is to be able to quickly identify which team members have skills in certain areas.

Database where all the data will be held
web service that inserts data into DB
web service that takes the data back out
slackbot that connects with above web services

### Example of phrases it will respond to
"I have an issue working with Wordpress"
"whos the best" (Will Wise of course)
"I have skills in (something)"
"What are my skills?"
"I don't know about (something)" perhaps bring up all skills with a remove button

### data structure
```
Person
-ID
-Name
-SlackID
```
```
Skills
-ID
-Name
```
```
PersonSkill
-SkillsID
-PersonID
```