Feature: Delete post

    User can delete posts from the server

    Scenario: Delete published post
        Given Bob is logged in
        When he deletes post from the blog
        Then server should delete it

    Scenario: Only post's author can delete his post
        Given Bob is logged in
        When he deletes Mark's post
        Then the server should reject his request