Feature: Delete user

    Account owner deletes his profile completly

    Scenario: Authenticated user deletes his account
        Given Bob is logged in
        When he deletes his account
        Then he can't login using his credentials

    Scenario: Unauthenticated user can't delete an account
        Given Bob is not logged in
        When he tries to delete his account
        Then the server rejescts his request and returns an error

    Scenario: Only owner can delete his account
        Given Bob and Mark have an accounts on the blog
        When Bob tries to delete Mark's account
        Then the server rejects his request and returns an error