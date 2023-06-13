'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = '5';
const optCloudClassPrefix = 'tag-size-';
  //optArticleTags = '.data-tags';
  //console.log(optArticleTags);

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

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  //console.log('1', titleList);

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log('2', customSelector);

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
  //console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags){
  const parms = {
    max: 0,
    min: 999999,
  }
  for(let tag in tags){
    //console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > parms.max){
      parms.max = tags[tag];
    }
    if(tags[tag] < parms.min){
      parms.min = tags[tag];
    }
  }
  return(parms);
}

function calculateTagClass(count, parms){
  const normalizedCount = count - parms.min;
  const normalizedMax = parms.max - parms.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('1', articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    //console.log('2A', tagsList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log('3', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log('4', articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    //console.log('5', tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      //console.log('6', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log('7', html);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
    //console.log('8', tagsList.innerHTML);
  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  //console.log('tagsParams:', tagsParams)
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += '<li><a class="' + tagLinkHTML + '" href="#tag-' + tag + '">' + tag + '</a></li>';
  }

  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  //console.log(allTagsHTML);
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('1', event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log('2', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log('3', tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log('4', activeTagLinks);

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log('5', tagLinks);
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.list a');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

function generateAuthors(){
  /* find all authors */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('1', articles);
  /* START LOOP: for every author: */
  for (let article of articles){
    /* find author wrapper */
    const authorList = article.querySelector(optArticleAuthorSelector);
    //console.log('2', authorList);
    /* make html variable with empty string */
    let html = '';
    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log('3', articleAuthor);
    /* generate HTLM of the link */
    const linkHTML = '<a href="' + articleAuthor + '">' + articleAuthor + '</a>';
    //console.log('4', linkHTML);
    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('1', event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log('2', href);
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  //console.log('3', author);
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="author"]');
  //console.log('4', activeAuthorLinks);
  /* START LOOP: for each active author link */
  for(let activeAuthorLink of activeAuthorLinks){
    /* remove class active */
    activeAuthorLink.classList.remove('active');
  /* END LOOP: for each active author link */
  }
  /* find all authors links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log('5', authorLinks);
  /* START LOOP: for each found auhor link */
  for(let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');
  /* END LOOP: for each found auhor link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('.post-author a');
  /* START LOOP: for each link */
    for(let authorLink of authorLinks){
    /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}


