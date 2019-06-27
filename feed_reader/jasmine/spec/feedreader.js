/* feedreader.js
 *
 * Spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* Tests are place within the $() function,
 * since some of these tests require DOM elements and we want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {


    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */

    describe('RSS Feeds', function() {
        
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object checks  that it has a URL defined
         * and that the URL is not empty.
         */

        it('URLs are defined and non-empty', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            };
        });
        
        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('Names are defined and non-empty', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            };
        });
    });
    
    /* Test suite named "The menu" */

    describe('The Menu', function () {
        
        /* Test that ensures the menu element is
         * hidden by default by assessing HTML elements
         */

        it('is hidden by default when page loads', function () {
            expect(document.body.classList.value).toContain('menu-hidden');
        });
        
        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * Menu appears when clicked the first time
         * and disappears when clicked again.
         */

        it('changes visibility when the menu icon is clicked', function() {
            const menuIcon = $('.menu-icon-link');
            
            //menu clicked the first time
            menuIcon.click();
            expect(document.body.classList.value).not.toContain('menu-hidden');
            
            //menu clicked the second time
            menuIcon.click();
            expect(document.body.classList.value).toContain('menu-hidden');
        });
    });
    
    /* Test suite named "Initial Entries" */

    describe('Initial Entries', function() {
        const container = $('.feed');

        // asynchronous method
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            }); 
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        it('there is at least a single .entry element within the .feed container', function(done) {
            let entryElement = container.find('.entry');
            expect(entryElement.length).not.toBe(0);
            done();
        });

    }); 

/* Test that ensures when a new feed is loaded
 * by the loadFeed function that the content actually changes.
 * loadFeed() is asynchronous.
 */

    describe('New Feed Selection', function () {
        const feed = document.querySelector('.feed');
        let feedOne;
        let feedTwo;

        // asynchronous method
        beforeEach(function (done) {

            // loading the initial feed
            loadFeed(0, function () {
                feedOne = feed.innerHTML;

                // loading the new feed to compare with the initial one
                loadFeed(1, function () {
                    feedTwo = feed.innerHTML;
                    done();
                });
            });
        });

        it('content changes for every new feed', function() {

            // comparison of HTML content between both feeds and if 
            // equal, then feed hasn't changed
            expect(feedOne).not.toEqual(feedTwo);
        });
    }); 
}());
