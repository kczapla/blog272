Feature: Posts queries validation

    Validate posts queries compliance with API doc

Scenario Outline: Invalid author query
Given author's name is <Author>
When user queries posts
Then the server should return an error

Examples:

    | Author                                |
    | -john                                 |
    | _john                                 |
    | j!ohn                                 |
    | joooooooooooooooooooooohnnnnnnnnnnnnn |
    | author1,author2                       |

Scenario Outline: Invalid title query
Given title is <Title>
When user queries posts
Then the server should return an error

Examples:

    | Title                                                                                                |
    | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
    | aa                                                                                                   |
    | title1,title2                                                                                        |

Scenario Outline: Invalid categories query
Given query categories are <Categories>
When user queries posts
Then the server should return an error

Examples:

    | Categories            |
    |                       |
    | aaaaaaaaaaaaaaaaaaaaa |
    | a                     |
    | #?!                   |

Scenario Outline: Invalid tags query
Given query tags are <Tags>
When user queries posts
Then the server should return an error

Examples:

    | Tags                  |
    |                       |
    | aaaaaaaaaaaaaaaaaaaaa |
    | a                     |
    | #?!                   |