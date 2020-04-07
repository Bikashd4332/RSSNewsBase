const API = '/api/v1/news.json'


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
    this.hasMore = false;
    this.parsePagniation = null;
  }

  /* function for retrieving the list of news */
  fetchNews() {

    // if we have nextUrl use it else API
    const url = (this.parsePagniation)? this.parsePagniation.nextUrl : API;
    return(
      fetch(url)
        .then(response => {
          if (response.headers.has('Link'))
            this.parsePagniation = new ParsePaginationRespnseHeaders(response.headers.get('Link'));
            this.hasMore = (this.parsePagniation.nextUrl)? true : false;
          return response.json();
        })
    );
  }
}

export default new NewsFetchService();