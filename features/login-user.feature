Feature: Login user

    Login user the system and grant him an access to protected resources.

    Scenario: Login user
        Given Bob has an account on the blog
        When he logs in using his crdentials
        Then server returns authorizes him successfully