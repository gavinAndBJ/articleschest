// Create namespace
const articleApp = {};

// Create namespace variable  for API url and API key
articleApp.apiKey = `uXiSZXYADR9VvLuUkUqDWxnFIzAtZpy6`;
articleApp.apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';

// articleApp.weatherApiKey = 'dfJjybJeDcPT23mZu3FWpoLdZcdQh0td';
const proxy = 'https://cors-anywhere.herokuapp.com/';
// articleApp.weatherApiUrl = `${proxy}https://www.metaweather.com/api/location/search/?query=london`;
articleApp.weatherApiUrl = `${proxy}https://api.darksky.net/forecast/93463444821e6e23f93583478eef6301/43.651070,-79.347015`;


const $searchInput = $('#search');
const $searchForm = $('#target');
const $articleHeading = $('.heading');
const $articleAuthor = $('.author');
const $articleDescription = $('.description');
const $articleDate = $('.date');
const $articleWordCount = $('.wordCount');

const $temperatureDescription = $('.temperature-description');
const $temperatureDegree = $('.temperature-degree');

// Connect to Weather API using AJAX
articleApp.getWeather = () => {
    $.ajax({
        url: articleApp.weatherApiUrl,
        method: `GET`,
        dataType: `json`
    }).then((res) => {
        console.log(res);
        const { temperature, summary } = res.currently;
        console.log(temperature, summary);
        articleApp.displayWeather(res);
    })
}

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
            <div class="articleContainer hoverEffect">
                <div class="image">
                    <a href="${article.web_url}"><img src="${articleApp.image}" alt=""></a>
                </div>
                <div class="details">
                    <a href="${article.web_url}"><h3>${article.headline.main}</h3></a>
                    <div class="grey">
                    <p>${articleApp.author}</p>
                    <p>Date Published: ${date}</p>
                    <p>Word Count: ${articleApp.WordCount}</p>
                    </div>
                    <p class="abstract">${article.abstract}</p>
                    <p><a class="readMore" href="${article.web_url}">Read More</a></p>
                </div>
            </div>
        `;

        $(`.articlePost`).append(htmlToAppend)
    });  
}

// Display results (weather)
articleApp.displayWeather = (response) => {
    const { temperature, summary } = response.currently;
    $temperatureDescription.text(`${summary}`);
    $temperatureDegree.text(`${temperature}`);
}


// Create init
articleApp.init = () => {
    articleApp.getWeather();
    articleApp.userInput();
}

// Create document ready
$(function(){
    articleApp.init();
})
