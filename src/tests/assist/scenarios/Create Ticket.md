Usecase: Create Ticket
Scenario: A ticket should be created if the ticket is valid
Given a valid ticket
When the ticket is created
Then the ticket is created on the repository

Scenario: A ticket should not be created if the ticket does not have a title
Given a ticket without a title
When the ticket is created
Then the ticket is not created on the repository

Scenario: A ticket should not be created if the ticket does not have a user
Given a ticket without a user
When the ticket is created
Then the ticket is not created on the repository

Scenario: A ticket should not be created if the ticket does not have a description
Given a ticket without a description
When the ticket is created
Then the ticket is not created on the repository

Scenario: A ticket should not be created if the ticket does not have a priority
Given a ticket without a priority
When the ticket is created
Then the ticket is not created on the repository

Scenario: A ticket should not be created if the ticket does not have a status
Given a ticket without a status
When the ticket is created
Then the ticket is not created on the repository
