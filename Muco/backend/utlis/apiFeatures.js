class APIFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedField = ["sort", "fields", "limit", "page"];
    excludedFields.forEach((el) => delete queryObj[el]);

    this.query = this.query.find(JSON.parse(queryObj));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query.sort(sortBy);
    } else this.query.sort("-createdAt");
    return this;
  }
  pagination() {
    const limit = this.queryString.limit * 1 || 10;
    const page = this.queryString.page * 1 || 1;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeature;
