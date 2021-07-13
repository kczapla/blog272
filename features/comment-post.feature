Feature: Comment post

    Comment post

    Scenario: Logged in user comments post
        Given Mark wrote a post
        When Bob comments on it
        Then the server should add Bob's comment to Mark's post
