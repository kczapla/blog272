Feature: Quering posts

    blog272 can filter posts

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

    Scenario: No posts posts with given title were published
    Given no posts with "Cooking" in the title were published
    When Bob searches
    Then the server should return an empty list

    Scenario: No posts published within given timeframe
    Given no posts were have been published from "2020-01-01" to "2020-01-31"
    When Bob searches
    Then the server should return an empty list

    Scenario: No posts with given categories were published
    Given no posts with "Scam" category were published on the blog
    When Bob searches
    Then the server should return an empty list

    Scenario: No posts with given tag were published
    Given no posts with "Police" tag were published on the blog
    When Bob searches
    Then the server should return an empty list

    Scenario: No posts were published by given author
    Given no posts published by "John" were published on the blog
    When Bob searches
    Then the server should return an empty list