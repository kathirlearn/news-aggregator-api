# News Aggregator API

-- Build a RESTful API that allows users to fetch news articles from multiple sources based on their preferences.

### Endpoints:
  - `POST /register` --> Register a new user
  - `POST /login` -->  Login a user
  - `GET /preferences` --> Retrieve the news preferences for the logged-in user
  - `PUT /preferences` --> Update the news preferences for the logged-in user
  - `GET /news` --> Fetch news articles based on the logged-in user's preferences


### User object:
```js
{
  fullname: "string",
  username: "string",
  password: "string",
  preferences: {  country : "in"},
  email: "string"
}
```
