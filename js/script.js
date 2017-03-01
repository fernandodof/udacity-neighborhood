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

function wikipediaArticles(searchTerm) {
    var url = 'https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + searchTerm + '&format=json&callback=wikiCallback';

    //If the ajax request fails
    var wikipediaRequestTimeout = setTimeout(function() {
        $wikiElem.text('Failed to get Wikipeda Articles');
    }, 8000);

    //For wikipedia we make a jasonp request
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'jsonp'
    }).success(function(result) {
        var articles = result[1];

        $wikiElem = $('#wikipedia-links');

        for (var i = 0; i < articles.length; i++) {
            var articleURL = 'http://en.wikipedia.org/wiki/' + articles[i];
            $wikiElem.append('<li><a href="' + articleURL + '">' + articles[i] + '</a></li>');
            clearTimeout(wikipediaRequestTimeout);
        }

    });
}

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
    console.log(street);
    var city = $('#city').val();
    var img = document.createElement('img');
    img.className = 'bgimg';
    img.src = googleString + street + ', ' + city;
    $body.append(img);
    //NYT articles
    nyArticles(city);

    //Wikipedia articles
    wikipediaArticles(city);

    return false;
};

$('#form-container').submit(loadData);
