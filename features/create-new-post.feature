Feature: Create new post

    Logged in user should be able to submit POST request to the server.

Scenario: Create new post by logged in user
Given user is logged-in as Bob
When user want to publish a new post
Then the server should handle it and return success status

Scenario Outline: Do not create post if required property is missing
Given user is logged-in as Bob
And he wrote a post
But he forgot to put <PropertyName> in request body
When he wants to publish a new post
Then the server should reject the reuqest and return failure status

Examples:

    | PropertyName |
    | author       |
    | title        | 
    | categories   |
    | tags         | 
    | content      |
    