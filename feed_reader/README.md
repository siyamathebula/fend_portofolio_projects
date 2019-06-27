# Feed Reader Testing Project

This is a web-based application that reads RSS feeds and contains a Jasmine feed reader tester

## To run the programme

- Download the zip file of this project (it contains all the files you need)
- Open index.html in your browser
- It will render the page and the results should be on the very botton

## Test Coverage

- A test that loops through each feed in the object and ensures it has a URL defined and that the URL is not empty
- A test that loops through each feed in the object and ensures it has a name defined and that the name is not empty
- A test that ensures the menu element is hidden by default
- A test that ensures the menu changes visibility when the menu icon is clicked
- A test that ensures when an asynchronous function is complete there is at least item inside the feed
- A test that ensures when a new feed is loaded the content actually changes

## Things to note

- No test is dependent on the results of another
- All tests should pass when environment is fully operational
