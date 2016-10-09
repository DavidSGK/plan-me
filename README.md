## Challenges we ran into
One challenge that we ran into is in balancing the accuracy of the calendar scheduling. As the scheduling is based upon the user profile, it is vital that the profile is very accurate. However, accuracy comes at a cost. The more accurate the profile, the more data we need to compute it. We needed to find a balance where the profile is accurate most of the time, without forcing the user to spend too long answering personality questions. Our plan to resolve this issue is to use machine learning to generate a user profile for several categories of users (such as "finishes tasks first", "does not like doing work", etc.). This allows us to quickly narrow down the type of user, and then further customize with a higher degree of accuracy. 

## Accomplishments that we're proud of
We were most proud when we were able to successfully convert the event data into a properly scheduled calendar. The problem with creating the calendar was that if there was even any small mistake in the data processing, it would give the completely wrong output. Especially with all the edge cases, we were very happy when the algorithm was finally able to efficiently calculate the most efficient schedule.

## What we learned
One thing we learned was how to effectively combine code together together to create the web application. We learned how to effectively combine Firebase with our React DOM, along with getting that all to run properly with our own scripts. With all of us coming from a different CS background, everyone was able to fill a different role that was required for our site to work effectively. 

## What's next for Plan Me
As previously stated, the next plan for Plan Me is to increase the accuracy of the user profile through machine learning. This would allow us to develop general templates for different types of people, which would allow for a questionnaire to easily narrow down to a template, then customize further to suit the user. We would collect user data through the initial questionnaire (several thousand is required for accuracy), and the user satisfaction about the calendar, and feed it in through machine learning to accurately predict results. 

Additionally, we plan on adding much more options into the website, that would allow users to specify exactly what they want in more detail. This would include options such as more specific categories, and an additional questions option for the questionnaire. The goal of this would be to increase the user satisfaction, and allow for users to use the site to its full potential. 
