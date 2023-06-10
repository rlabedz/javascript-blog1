'use strict';

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    //console.log('Link was clicked!');
  
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a')

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
  
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    //console.log('clickedElement:', clickedElement);
  
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');

    //console.log(activeArticles);
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
  
    /* get 'href' attribute from the clicked link */
    const clickedAttribute = clickedElement.getAttribute('href');
    //console.log(clickedAttribute);
  
    /* find the correct article using the selector (value of 'href' attribute) */
    const clickedArticle = document.querySelector(clickedAttribute);
    //console.log(clickedArticle);

    /* add class 'active' to the correct article */
    clickedArticle.classList.add('active');
}
  
const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks(){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //console.log('1', titleList);

    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log('2', articles);

    let html = '';

    for(let article of articles){

        /* get the article id */
        const articleId = article.getAttribute('id');
        //console.log('3', articleId);

        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        //console.log('4', articleTitle);

        /* get the title from the title element */

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        //console.log('5', linkHTML);

        /* insert link into titleList */
        html = html + linkHTML;
        //console.log('6',titleList)
    }
    titleList.innerHTML = html;
    //console.log('7', html);


const links = document.querySelectorAll('.titles a');
    console.log(links);
  
    for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
}
generateTitleLinks();



