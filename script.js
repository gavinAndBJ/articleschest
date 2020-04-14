// Create namespace
const articleApp = {};

articleApp.apiKey = `uXiSZXYADR9VvLuUkUqDWxnFIzAtZpy6`;

articleApp.apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';

articleApp.getArticles = () => {
    $.ajax({
        url: articleApp.apiUrl,
        method: `GET`,
        dataType: `json`,
        data: {
            q: 'food',
            key: articleApp.apiKey,
        }
    }).then((res) => {
        console.log(res);
        // articleApp.addDetails(res);
    })
}


// Create document ready
// Create init
// Create namespace variable  for API url and API key
// Connect to API using AJAX
// Create a variable to accept user input from search bar
// Use userInput variable to search NYTimes API
// Display results (Header / Description / Photo)

$(function(){
    articleApp.getArticles();
})
