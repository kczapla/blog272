Feature: Basic posts CRUD

    User can create, read, update and delete posts to/from the server

    Scenario: Create new post
    Given Bob wrote a post
    When he sends it to the server
    Then server should add it to the blog