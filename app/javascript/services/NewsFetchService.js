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
    this.hasMore = false;
    this.parsePagniation = null;
    this.abortController = new AbortController();
  }

  /* function for retrieving the list of news */
  async fetchNews(searchString, categoryId, agencyId, requestingMore) {

    // abort the previous fetch and do a brand new.
    this.abortController.abort();
    this.abortController = new AbortController();

    let url = null;
    let param = {};
    // Initial request shoud use API, follow up request use nextUrl
    if (this.hasMore && requestingMore) {
      url = this.parsePagniation.nextUrl;
    } else if (!this.hasMore && requestingMore) {
      debugger;
      // since there is no more records.
      return [];
    } else {
      // prepare for the brand new fetch
      url = API;
      // prepare query param.
      if (categoryId !== 0) {
        param.category = categoryId;
      }
      if (searchString) {
        param.find = searchString
      } categoryId
      if (agencyId !== 0) {
        param.agency = agencyId;
      }
    }
    // Attach the prepared queryparam.
    url += '?' + new URLSearchParams(param).toString();
    // make reqeust and fetch data.
    try {
      const newsItems = await fetch(url, { signal: this.abortController.signal })
        .then(response => {
          if (response.headers.has('Link')) {
            this.parsePagniation = new ParsePaginationRespnseHeaders(response.headers.get('Link'));
            this.hasMore = (this.parsePagniation.nextUrl) ? true : false;
          }
          return response.json();
        })
      // provide the fetched records.
      return newsItems;
    } catch (exception) {
      // when fetch aborted exception gets raised.
      if (exception.name === 'AbortError') {
        return null;
      }
    }
  }

  clear() {
    // clear all the states so that intermediate search can be done.
    this.parsePagniation = null;
    this.hasMore = false
  }
}

export default new NewsFetchService();