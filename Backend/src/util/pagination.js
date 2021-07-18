/* eslint-disable require-jsdoc */
/**
 *  Clase para representar un error operacional de usuario no autorizado
 */
class Pagination {
  /**
   *
   * @param {int} limit
   * @param {int} page
   */
  constructor(limit, page) {
    this.limit = parseInt(limit) ? parseInt(limit) : 6;
    this.page = parseInt(page) && parseInt(page) > 0 ? parseInt(page) : 1;
  }

  queryOptions() {
    const queryOptions = {};
    queryOptions.limit = this.limit;
    queryOptions.offset = (this.page - 1) * this.limit;
    return queryOptions;
  }

  paginationResponse(count) {
    const paginationResponse = {};
    paginationResponse.total = count;
    paginationResponse.pages = Math.ceil(count / this.limit);
    paginationResponse.page = this.page;
    paginationResponse.limit = this.limit;
    return paginationResponse;
  }
}

module.exports = Pagination;
