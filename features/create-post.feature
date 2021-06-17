Feature: Create post

    Create new post

    Scenario: Create post
        Given Bob is logged in
        When he writes new post
        Then server should add it to the blog