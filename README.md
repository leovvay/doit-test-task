### Installation steps
in root folder run CLI command 
> cp example.env .env;

Feel free to keep those varialbles or replace with own credentials
then run 

> yarn


In order to run Migration tool you need to run 

> yarn start
this will feed the DB according to task description, and will schedule a cron jobs;

In order to run testcase you need to run

> yarn test:e2e

### Steps to implement

1. I created a project folder and created initial scructure using nest CLI tool
<img src="https://cdn.loom.com/images/originals/3e03321bb2b549fe99ba4acd4cc50a11.jpg?Expires=1627044870&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4ubG9vbS5jb20vaW1hZ2VzL29yaWdpbmFscy8zZTAzMzIxYmIyYjU0OWZlOTliYTRhY2Q0Y2M1MGExMS5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MjcwNDQ4NzB9fX1dfQ__&Signature=kBMyK2lBUgtdvYeSPBK3b0zVDT4ff5A4xCFE4BpwNHqQktynU9wR6bGX0G9bLEx3mB-iyuXhkHGwOZyaBP7I5yXDeOryTpeIj6H9CshB6la5y-AA6euiPM8iNigsnmUbOi86-AtSrrhvnyK0bThCJXQL7tHgCiX~EtwjT8q2O8uKlWByXtPhaIbOZ0OJJPc~Deo6xhXiyxzNUs-vzTmk8qohmm3T4MCebXFk6rzAII3GMFFRTKYDz66~N8EHolY1OCQSwtz4KoObbtiquQPiJYYE1prGTq3GAO3MBDMU8wvjWlsMjnBzswY7OMME~xIwbIIyUnZ6sANSjKks~SjVxw__&Key-Pair-Id=APKAJQIC5BGSW7XXK7FQ" />

2. I created anew CSVMigration module that will contait all buiseness logic of this task
<img src="https://cdn.loom.com/images/originals/ee6d2e345ee6411fb461bbcdcf4137bd.jpg?Expires=1627045034&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4ubG9vbS5jb20vaW1hZ2VzL29yaWdpbmFscy9lZTZkMmUzNDVlZTY0MTFmYjQ2MWJiY2RjZjQxMzdiZC5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MjcwNDUwMzR9fX1dfQ__&Signature=mytwgu~zfXRp58US2jQ0bLm0uPuxN1~ZYjOvBIWg8wUtATUbo8hmg000qtNVMSIxwdRLUVWVvExgYzs6pu-E2aCAcyyN5~lrEiqeb-Q9qWcq9QGNWuNerB5Nzu0ML7VkSUHfProGHr9QqBtFTkQmi4haxlaGk8Yc2UmdZU7k6exDNUIMolyc-XcAR~9NSWxrQ19Xk--pNhYESswHr~O52CGdm63n2sGqD0WzWesoUqj5j-3jkBQhCoA0FyggnPFSy2272sE2Vpnjv6-Se~ljONMiJtfkfPOCRKPYT9EyU6OP~OCN1BfrvJ83rV1Jr2mpq8-crcDpuXzNpDPN8Bqbqg__&Key-Pair-Id=APKAJQIC5BGSW7XXK7FQ" />

3. In order to read and parse CSV file i found csv module for nest, i played around with it for a bit to see if it works, and decided that this is a good fit.

4. After i successfullt read and parse the CSV in encopsulated method, I decieded that its time to feed patients collection, for that i used builtin mongoose module(for connection and schemas).

5. I wrote shcemas for patients and emails
<img src="https://cdn.loom.com/images/originals/e02cde7f91e8481b9936cfac0de226b3.jpg?Expires=1627045367&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4ubG9vbS5jb20vaW1hZ2VzL29yaWdpbmFscy9lMDJjZGU3ZjkxZTg0ODFiOTkzNmNmYWMwZGUyMjZiMy5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MjcwNDUzNjd9fX1dfQ__&Signature=uy7-s03yAdXvQsVpr1xsd5hK4o8gkanWHau6Pdc5JT93ghOOzWvt~LTD7u7xKBaayujWrl0RydsGgE7Xm2skTKhlXPFyu~~eKTsr5hEFOSjuFqFu1gLm9Eu4~u~OJiqM2weApATpCFyvMY3ZhC~4Lj4mK7nN2ae9x7XXEvblPmoFRNRXINrNgSXSEdjo6BeeiscCK4O7C8WNJdcb361EKzjydyZig9XU7jK7lg-o7OtF~Ah2xF52Y0bzzA1jZGiX~PFkesgp-4TXadP52yOiyYEX84bXL091V2ZhnAXojS~xsyxMkPKBuR4DmY8N7MKwsvSnbp1SrBXaxxTRVfpm5w__&Key-Pair-Id=APKAJQIC5BGSW7XXK7FQ" />

6. After i load and feed the DB according to task, it was time to schedule an emails sending, for that i used gmail and shcedule module for nest. Gmail gave a bit of an issue since it required to turn on permission for 3rd party apps which I totally forgot

<img src="https://cdn.loom.com/images/originals/e04cd4d0cf754424a53d56f7598909f0.jpg?Expires=1627045586&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4ubG9vbS5jb20vaW1hZ2VzL29yaWdpbmFscy9lMDRjZDRkMGNmNzU0NDI0YTUzZDU2Zjc1OTg5MDlmMC5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MjcwNDU1ODZ9fX1dfQ__&Signature=GrbciWShujczfcyd3PZAOvRRzgU36Ugt46TdwmQvkcMCcLXjqGcASJ3~Ti0D73eHol5nlPLtdKI2IYI~p~5jt6ld9c3E~f3yBAPPRkOQcDLvUKiiDbncKpqMeFl4JCYkJBMnT3q4RkZra9fa4KBbvaaslLepPEMRyWg1VTvimHRsjZPUxbhz~507W-EQg0bv5ypvJ57ZgnH7mFIdc2Fkv42tz4tu~iCJSiMbZE4b1pKGr30cPCPfT8rJczr~~xZMyvWEQ-69sIz24xPyQ56dmS~0oZx~C2rt9PjiGi1v~4SckfHf3oYOqXGPZ2~Uq8DvfKElmaLZwXrXl9JzPjyRGQ__&Key-Pair-Id=APKAJQIC5BGSW7XXK7FQ" />

7. After all points of migration service implemnted I start implementing e2e test according to rules, for that i choose the bultin solution for testing. Here most of the time I solved an issue of hanged connection of mongodb which was not closing after all test are done.

8. On the last point I gave I thought about diffrent way of testing scheduled emails. 
1) I could test the schedule date in database(which i did)
2) i could test an actuall cronjobs registry
for 2p i realized that i had to go from the diffrent direction from the begining since cron jobs not stored on system lvl(as srevices), but just in memory, i need to attach my test to the main process and get registry from there. i decided that this is unnecessary complecation and decided to go with 1 solution.

9. I wrote this readme and did a sanity check.

10. deployed to github