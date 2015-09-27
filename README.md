We have made an extension for identity providers. An identity provider can be any
service that has information about you.
Good examples would be Facebook, Rogers or even Service Canada.

Let me give you a couple of use-cases:

> Jim is registered on Facebook, and wants to securely change his password. Facebook can double-check Jim's identity using phone.

Imagine if I was Jim and check out this demo... `demoing...`

- I log in with my username and password
- Facebook knows my phone number
- I want to change my password
- Facebook gives me a number to call
- I call Facebook
- I need to hang on until I'm done changing the password
- *I change my password*
- I'm done, and I hang up

** What to do **

1. Login page
2. Profile page (with change password popup and our auth service)
3. Auth API, update password API

Jim wants to use IMDB (or any other third-party service),
and IMDB needs Jim's identity to give him better recommendations.
Jim should be able to login to IMDB using Facebook.

- IMDB doesn't and shouldn't know my number
- I want to login into IMDB
- I click login with Facebook
- I call Facebook
- Get back a code for a short session
- Enter it on IMDB
- IMDB now can fetch my Facebook info using that token and give me better recommendations

** What to do **

1. IMDB mock
2. Login page
3. Recommendations page
