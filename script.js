// Create namespace
const articleApp = {};

// Create namespace variable  for API url and API key
articleApp.apiKey = `uXiSZXYADR9VvLuUkUqDWxnFIzAtZpy6`;

articleApp.apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';


const $searchInput = $('#search');
const $searchForm = $('#target');
const $articleHeading = $('.heading');
const $articleAuthor = $('.author');
const $articleDescription = $('.description');
const $articleDate = $('.date');
const $articleWordCount = $('.wordCount');

console.log($searchInput)

// Connect to API using AJAX
articleApp.getArticles = (value) => {
    console.log(value);
    $.ajax({
        url: articleApp.apiUrl,
        method: `GET`,
        dataType: `json`,
        data: {
            // Use userInput variable to search NYTimes API
            q: value,
            "api-key": articleApp.apiKey,
        }
    }).then((res) => {
        console.log(res);
        // for(let i = 0; i<=2; i++ ){
            
        // }
        articleApp.displayArticle(res);


    })
}

articleApp.userInput = () => {
    $searchForm.submit((event) => {
        // alert("Handler for .submit() called.");
        event.preventDefault();
        // Create a variable to accept user input from search bar
        const value = $searchInput.val();
        console.log(value);

        articleApp.getArticles(value);
    });

}

// Display results (Header / Description / Photo)
articleApp.displayArticle = (response) => {
    $articleHeading.text(`${response.response.docs[0].headline.main}`);
    $articleAuthor.text(`${response.response.docs[0].byline.original}`)
    $articleDate.text(`${response.response.docs[0].pub_date}`)
    $articleWordCount.text(`${response.response.docs[0].word_count}`)
    $articleDescription.text(`${response.response.docs[0].abstract}`)
}


// Create init
articleApp.init = () => {
    // articleApp.getArticles();
    articleApp.userInput();
}

// Create document ready
$(function(){
    articleApp.init();
})
