var nyArticles = function(searchTerm) {

    //Get Nyw york times api key from config file
    $.getJSON('config.json')
        .done(function serachArttiles(config) {
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            var params = {
                'api-key': config.nytApiKey,
                'q': searchTerm
            };

            url += '?' + $.param(params);

            $.ajax({
                url: url,
                method: 'GET',
            }).done(function(result) {
                console.log(result);
                var $nytElem = $('#nytimes-articles');

                for (var i = 0; i < result.response.docs.length; i++) {

                    var article = document.createElement('li');
                    article.className = 'article';

                    var articleLink = document.createElement('a');

                    var articleP = document.createElement('p');

                    articleLink.href = result.response.docs[i].web_url;
                    articleLink.innerHTML = result.response.docs[i].headline.main;
                    articleP.innerHTML = result.response.docs[i].snippet;

                    article.appendChild(articleLink);
                    article.appendChild(articleP);

                    $nytElem.append(article);
                }


            }).fail(function(err) {
                $('#nytimes-header').text('New York Times Could Not Be Loaded');
            });
        });



};

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');

    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    // load streetview

    // YOUR CODE GOES HERE!
    var googleString = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="
    var street = $('#street').val();
    var city = $('#city').val();
    var img = document.createElement('img');
    img.className = 'bgimg';
    img.src = googleString + street + ', ' + city;
    console.log(img);
    $body.append(img);

    //NYT
    nyArticles(city);

    return false;
};

$('#form-container').submit(loadData);
