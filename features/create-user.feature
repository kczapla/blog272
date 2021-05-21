Feature: Create user

    Create user on the blog.

    Scenario: Create user
        Given Bob doesn't have an account on the blog
        When he sends filled form to the server
        Then server should process the request successfully

    Scenario: User already exists
        Given Bob created an account in the past
        But he forgot about it
        When he sends form again
        Then the server should reject his request

    Scenario: Invalid form
        Given Bob wants to create an account
        When he sends form with invalid data
        Then the server should his request