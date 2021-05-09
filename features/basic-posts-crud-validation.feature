Feature: Baisc posts CRUD validation

    Server handles incorrect user input data or behaviour

    Scenario: Read non-existent post
    When Bob reads non-existent post
    Then server should return fail status and inform user that it didn't found a resource