Usecase: Create Reservation
Scenario: A reservation should be created if the reservation is valid
Given a valid reservation
When the reservation is created
Then the reservation is created on the repository

Scenario: A reservation should not be created if the reservation has an invalid initial date
Given an reservation with an invalid initial date
When the reservation is created
Then the reservation is not created on the repository

Scenario: A reservation should not be created if the reservation has an invalid final date
Given an reservation with an invalid final date
When the reservation is created
Then the reservation is not created on the repository

Scenario: A reservation should not be created if the reservation has no customer
Given an reservation with no customer
When the reservation is created
Then the reservation is not created on the repository

Scenario: A reservation should not be created if the reservation has no room
Given an reservation with no room
When the reservation is created
Then the reservation is not created on the repository