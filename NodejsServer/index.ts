async function getArticles() {
    return fetch("/articles")
        .then(res => res.json());
}

getArticles().then(response => {console.log(response)})