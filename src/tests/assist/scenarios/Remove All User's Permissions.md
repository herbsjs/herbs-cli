Usecase: Remove All User's Permissions
Scenario: All user's permissions should be removed if user is active
Given an active user
When all user's permissions are removed
Then all user's permissions are removed on the repository

Scenario: All user's permissions should not be removed if user is inactive
Given an inactive user
When all user's permissions are removed
Then all user's permissions are not removed on the repository

Scenario: All user's permissions should not be removed if user has no permissions
Given an active user with no permissions
When all user's permissions are removed
Then all user's permissions are not removed on the repository

Scenario: All user's permissions should not be removed if user is owner
Given an active user with owner permissions
When all user's permissions are removed
Then all user's permissions are not removed on the repository