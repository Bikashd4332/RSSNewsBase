const API = '/api/v1/news.json';


class ParsePaginationRespnseHeaders {

  constructor(linkResponseStr) {
    // Init
    this.linkResponseStr = linkResponseStr;

    this.nextUrl = null;
    this.prevUrl = null;
    this.firstUrl = null;

    // Each url portion has a rel which points what the url is for.
    this.linkResponseStr.split(', ')
      .forEach(urlPart => {
          const [url, rel] = urlPart.split('; ');
          if (rel === 'rel="next"')
            this.nextUrl = this.cleanseUrl(url)
          else if (rel === 'rel="prev"')
            this.prevUrl = this.cleanseUrl(url)
          else
            this.firstUrl = this.cleanseUrl(url)
      });
  }
  // Each url in the format <url>. Need to get those '<' stripped out.
  cleanseUrl(url) {
    return url.replace('<', '').replace('>', '');
  }
}

class NewsFetchService {

  constructor() {
    // Setting variables up for pagination
    this.newsData = [];
    this.hasMore = false;
    this.parsePagniation = null;
  }

  /* function for retrieving the list of news */
  async fetchNews(searchString, categoryId) {
    let url = null;
    let param = {};
    // Initial request shoud use API, follow up request use nextUrl
    if (this.parsePagniation) {
      url = this.parsePagniation.nextUrl;
    } else {
      url = API;
      // prepare query param.
      if (categoryId !== 0) {
        param.category = categoryId;
      }
      if (searchString) {
        param.find = searchString
      }
    }
    // Attach the prepared queryparam.
    url += '?' + new URLSearchParams(param).toString();
    // make reqeust and fetch data.
    const newsItems = await fetch(url)
      .then(response => {
        if (response.headers.has('Link')) {
          this.parsePagniation = new ParsePaginationRespnseHeaders(response.headers.get('Link'));
          this.hasMore = (this.parsePagniation.nextUrl)? true : false;
        }
        return response.json();
      })
    // Remeber already fetched records for caching.
    this.newsData.push(...newsItems)
    return this.newsData;
  }

  clear() {
    // clear all the states so that intermediate search can be done.
    this.parsePagniation = null;
    this.hasMore = false
    this.newsData = [];
  }
}

export default new NewsFetchService();