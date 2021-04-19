Feature: Update post

    Post's author can update its content all at once or just single field

Scenario: Update post
Given Bob is logged in
And he created post sometime ago
And he wants to update it
When he sends an updated content to the server
Then the server should handle it and return success status

Scenario Outline: Update post's single field
Given Bob is logged in
And he published a post
And he wants to update its <PropertyName>
When he sends an updated title to the server 
Then the server should handle it and return success status

Examples:
    | PropertyName |
    | title        |
    | categories   |
    | tags         |
    | content      |

Scenario Outline: Do not update post if required property is missing
Given Bob is logged in
And he created post sometime ago
And he wants to update it
But he forgot to put <PropertyName> in request body
When he sends an update content to the server
Then the server should reject the request and return failure status

Examples:

    | PropertyName |
    | author       |
    | title        | 
    | categories   |
    | tags         | 
    | content      |

Scenario: Reject update request if post doesn't exist
Given Bob is logged in
And he wants to update a post
But the post doesn't exist
When he sends an update request to the server
Then the server should reject the request and return failure status

Scenario: Reject an update request if not send by post author
Given Mark published a post
But Bob wants to update it
When he sends an update request to the server
Then the server should reject the request and return failure status