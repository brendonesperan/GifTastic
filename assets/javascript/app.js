var topics = ["cats", "dogs", "trains", "tanks", "boats", "cars"];

window.onload = makeTopicButtons();

function makeTopicButtons () {
    $("#button-list").empty();
    for (i=0; i<topics.length; i++) {
        var $button = $("<button/>", {
            type: "button",
            "class": "topic-button",
            id: topics[i],
            text: topics[i],
        });
        $button.appendTo("#button-list");
    }
}

$("#add-topic-button").on("click", function () {
    event.preventDefault();
    
    var newTopic = $("#topic-input").val().trim();

    topics.push(newTopic);
    makeTopicButtons();

})

// =====================================================================================================================================================
// BEGIN CLICK TO ANIMATE/FREEZE
$(".gif").on("click", function () {
    console.log("Animate click");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image"s state is still, update its src attribute to what its data-animate value is.
    // Then, set the image"s data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
// END CLICK TO ANIMATE/FREEZE
// =====================================================================================================================================================





// =====================================================================================================================================================
// BEGIN CLICK BUTTON TO GENERATE 10 GIFS

// Adding click event listen listener to all buttons
$(".topic-button").on("click", function() {
    $("#gif-display").empty();
    console.log("Click reads");
    console.log($(this));
    console.log($(this).attr("id"));
    // Grabbing and storing the data-topic property value from the button
    var topic = $(this).attr("id");

    // Constructing a queryURL using the topic name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=K6iZC4QkCBOsBrvh7VWaVpSNVysKU398&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var topicDiv = $("<div>");
            topicDiv.attr("class", "gif");

            // Creating a paragraph tag with the result item"s rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var topicImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-state", "still");
            topicImage.attr("class", "gif");

            // Appending the paragraph and image tag to the topicDiv
            topicDiv.append(p);
            topicDiv.append(topicImage);

            // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
            $("#gif-display").prepend(topicDiv);
        }
    });
});
// END CLICK BUTTON TO GENERATE 10 GIFS
// =====================================================================================================================================================

