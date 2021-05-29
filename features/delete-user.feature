Feature: Delete user

    Account owner deletes his profile completly

    Scenario: Authenticated user deletes his account
        Given Bob is logged in
        When he deletes his account
        Then he can't login using his credentials