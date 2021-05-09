Feature: Basic posts CRUD

    User can create, read, update and delete posts to/from the server

    Scenario: Create new post
    Given Bob wrote a post
    When he sends it to the server
    Then server should add it to the blog

    Scenario: Read published post
    Given Bob wrote a post
    And he published it to the blog
    When Mark wants to read Bob's post
    Then server should return it

    Scenario: Delete published post
    Given Bob published a post to the blog
    When he sends delete request to the server
    Then server should delete it and return success status