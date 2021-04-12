Feature: Update post

    Post's author can update its content all at once

Scenario: Update post
Given Bob is logged in
And he created post sometime ago
And now he wants to update it
When sending updated content to the server
Then the server should handle it and return success status

Scenario Outline: Do not update post if required property is missing
Given Bob is logged in
And he created post sometime ago
And now he wants to update it
But he forgot to put <PropertyName> in request body
When sending update content to the server
Then the server should reject the request and return failure status

Examples:

    | PropertyName |
    | author       |
    | title        | 
    | categories   |
    | tags         | 
    | content      |