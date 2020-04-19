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
articleApp.getArticles = (value, filter) => {
    if (filter != `none` ) {
        articleApp.filter = `news_desk:${filter}`;
    } else {
        articleApp.filter = ``;
    }

    $.ajax({
        url: articleApp.apiUrl,
        method: `GET`,
        dataType: `json`,
        data: {
            // Use userInput variable to search NYTimes API
            q: value,
            fq: articleApp.filter,
            "api-key": articleApp.apiKey,
        }
    }).then((res) => {
        articleApp.displayArticle(res);
    })
}

articleApp.userInput = () => {
    $searchForm.submit((event) => {
        
        $(`.articlePost`).empty();
        // alert("Handler for .submit() called.");
        event.preventDefault();
        // Create a variable to accept user input from search bar
        const value = $searchInput.val();
        const filter = $(`option:selected`).val();
        console.log(filter)
        articleApp.getArticles(value, filter);
        $(`.searchQuery`).html(`<h2>Your search for "${value}"...</h2>`);
        $searchInput.val(``);
    });

}

articleApp.formatDate = (date) => {
    const parsedDate = new Date(date);
    console.log(parsedDate);
    return finalDate = parsedDate.toLocaleDateString(); 
}

// Display results (Header / Description / Photo)
articleApp.displayArticle = (response) => {
    let articleInfo = response.response.docs;
    // console.log(articleInfo)
    articleInfo.forEach((article)=>{

        
        if (article.multimedia.length > 0) {
            articleApp.image = `https://www.nytimes.com/${article.multimedia[0].url}`
        } else { 
            articleApp.image = `./assets/placeholder.png`
        }

        if (article.byline.original != null) {
            articleApp.author = article.byline.original
        } else {
            articleApp.author = `No Listed Author`
        }

        if (article.word_count = 0) {
            articleApp.WordCount = article.word_count
        } else {
            articleApp.WordCount = `Not Listed`
        }

        let date = articleApp.formatDate(`${article.pub_date}`)

        const htmlToAppend = `
            <div class="articleContainer">
                <div class="image">
                    <img src="${articleApp.image}" alt="">
                </div>
                <div class="details">
                    <h3>${article.headline.main}</h3>
                    <p>${articleApp.author}</p>
                    <p><strong>Date Published:</strong> ${date}</p>
                    <p><strong>Word Count:</strong> ${articleApp.WordCount}</p>
                    <p>${article.abstract}</p>
                    <p><a href="${article.web_url}">Read More</a></p>
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
