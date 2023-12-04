const boom = require('@hapi/boom');

// This function is used to paginate the results of a query.
// It takes the limit and page as parameters and returns an object with the results and pagination information.
// The results are the results of the query.
function paginator(limit, page, results) {
  try {
    limit = Number(limit) || 20;
    page = Number(page) || 0;

    const result = {}
    const length = results.length;


    // Calculate pagination details
    const begin = page * limit;
    const end = Math.min((limit * (page + 1)), length);
    const lastPage = Math.max(Math.ceil(length / limit), 1);

    result.results = results.slice(begin, end);
    result.pagination = {};
    if (page > lastPage) {
      result.pagination = {
        lastPage: lastPage
      };
    } else {
      result.pagination = {
        length: length,
        size: limit,
        page: page,
        lastPage: lastPage,
        startIndex: begin + 1,
        endIndex: end - 1
      };
    }
    return result;
  } catch (error) {
    throw boom.badRequest(error);
  }
}

function paginatorAndSearcher(paginator, results) {
  try {
    paginator.limit = paginator.limit || 20;
    paginator.page = paginator.page || 0;

    const result = {}
    const length = results.length;

    // Calculate pagination details
    const begin = paginator.page * paginator.limit;
    const end = Math.min((paginator.limit * (paginator.page + 1)), length);
    const lastPage = Math.max(Math.ceil(length / paginator.limit), 1);

    // Search and filter results
    result.results = results.slice(begin, end);

    if (paginator.search && paginator.search !== '') {
      result.results = result.results.filter(result => {
        if (result.title) {
          return result.title.toLowerCase().includes(paginator.search.toLowerCase());
        } else if (result.quotation) {
          if (result.quotation.customer) {
            return result.quotation.customer.fullName.toLowerCase().includes(paginator.search.toLowerCase());
          }
        } else if (result.customer.fullName) {
          return result.customer.fullName.toLowerCase().includes(paginator.search.toLowerCase());
        } else if (result.property.title) {
          return result.property.title.toLowerCase().includes(paginator.search.toLowerCase());
        } else {
          return false;
        }
      });
    }

    // Pagination

    result.pagination = {};
    if (paginator.page > lastPage) {
      result.pagination = {
        lastPage: lastPage
      };
    } else {
      result.pagination = {
        length: length,
        size: paginator.limit,
        page: paginator.page,
        lastPage: lastPage,
        startIndex: begin + 1,
        endIndex: end - 1
      };
    }
    return result;
  } catch (error) {
    throw boom.badRequest(error);
  }
}

module.exports = { paginator, paginatorAndSearcher };
