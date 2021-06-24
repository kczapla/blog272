Feature: Delete post

    User can delete posts from the server

    Scenario: Delete published post
        Given Bob is logged in
        When he deletes post from the blog
        Then server should delete it