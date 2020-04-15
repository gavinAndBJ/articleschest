// Create namespace
const articleApp = {};

// Create namespace variable  for API url and API key
articleApp.apiKey = `uXiSZXYADR9VvLuUkUqDWxnFIzAtZpy6`;

articleApp.apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';



// Connect to API using AJAX
articleApp.getArticles = () => {
    $.ajax({
        url: articleApp.apiUrl,
        method: `GET`,
        dataType: `json`,
        data: {
            q: 'food',
            "api-key": articleApp.apiKey,
        }
    }).then((res) => {
        console.log(res);
        // articleApp.addDetails(res);
    })
}



// Create a variable to accept user input from search bar
// Use userInput variable to search NYTimes API
// Display results (Header / Description / Photo)


// Create init
articleApp.init = () => {
    articleApp.getArticles();
}

// Create document ready
$(function(){
    articleApp.init();
})
