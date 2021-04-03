Feature: Quering posts


    blog272 can filter posts

    # Background: Setup data
    # Given there are 50 posts on the blog
    # And 10 are posted by John
    # And 5 has "Building" in their title
    # And 10 has one or more categories from [home, plants]
    # And 5 has one or more tag from [cmake, markdown]
    # And 20 were posts in January 2021

    Scenario: List all posts on the blog
    When users want to get all posts
    Then the server should return posts

    Scenario: List all posts published by John
    When users want to get all posts published by John
    Then the server should return posts published by John

    Scenario: List all posts that contain ABC in their title
    When users want get all posts with 'Building' in their title
    Then the server should return posts that have 'Building' in their title

    Scenario: List all posts that have one or more category
    When users want to get all posts with one or more category from [home, plants]
    Then the server should return posts that have one or more of this categories
    
    Scenario: List all posts that have one or more tag
    When user wants to get posts tagged as [cmake, markdown]
    Then the server should return only posts with these tags

    Scenario: List all posts published in time range
    When users want to get all posts published in January 2021
    Then the server should return posts published in that range