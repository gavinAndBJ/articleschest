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

// Connect to API using AJAX
articleApp.getArticles = (value) => {
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
        articleApp.displayArticle(res);


    })
}

articleApp.userInput = () => {
    $searchForm.submit((event) => {
        // alert("Handler for .submit() called.");
        event.preventDefault();
        // Create a variable to accept user input from search bar
        const value = $searchInput.val();
        articleApp.getArticles(value);
    });

}

// Display results (Header / Description / Photo)
articleApp.displayArticle = (response) => {
    let articleInfo = response.response.docs;
    // console.log(articleInfo)
    articleInfo.forEach((article)=>{
        console.log(article)
        const htmlToAppend = `
        <div class="wrapper">
            <div class="articleContainer">
                <div class="image">
                    <img src="https://www.nytimes.com/${article.multimedia[19].url}" alt="">
                </div>
                <div class="details">
                    <h2>${article.headline.main}</h2>
                    <p>${article.byline.original}</p>
                    <p>${article.pub_date}</p>
                    <p>${article.word_count}</p>
                    <p>${article.abstract}</p>
                </div>
            </div>
        </div>
        `;

        $(`.articlePost`).append(htmlToAppend)
    });  
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
