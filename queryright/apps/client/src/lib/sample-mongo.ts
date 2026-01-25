export type MongoSampleData = {
  collections: Record<string, Array<unknown>>
}

// Small bookstore-style dataset mirroring the SQL sample
export const sampleMongoData: MongoSampleData = {
  collections: {
    authors: [
      { _id: 1, name: 'George Orwell', country: 'UK' },
      { _id: 2, name: 'Jane Austen', country: 'UK' },
      { _id: 3, name: 'Haruki Murakami', country: 'Japan' },
    ],
    books: [
      {
        _id: 101,
        title: '1984',
        author_id: 1,
        price: 12.99,
        publication_year: 1949,
        categories: ['Dystopian', 'Classic'],
      },
      {
        _id: 102,
        title: 'Animal Farm',
        author_id: 1,
        price: 9.99,
        publication_year: 1945,
        categories: ['Political satire', 'Classic'],
      },
      {
        _id: 201,
        title: 'Pride and Prejudice',
        author_id: 2,
        price: 11.99,
        publication_year: 1813,
        categories: ['Romance', 'Classic'],
      },
      {
        _id: 301,
        title: 'Kafka on the Shore',
        author_id: 3,
        price: 14.99,
        publication_year: 2002,
        categories: ['Magical realism', 'Literary'],
      },
    ],
    reviews: [
      { _id: 'r1', book_id: 101, rating: 5, comment: 'A masterpiece' },
      { _id: 'r2', book_id: 101, rating: 4, comment: 'Chilling and profound' },
      { _id: 'r3', book_id: 201, rating: 5, comment: 'Timeless classic' },
      {
        _id: 'r4',
        book_id: 301,
        rating: 4,
        comment: 'Surreal and captivating',
      },
    ],
    customers: [
      { _id: 'c1', first_name: 'Alice', last_name: 'Johnson' },
      { _id: 'c2', first_name: 'Bob', last_name: 'Smith' },
    ],
    orders: [
      {
        _id: 'o1',
        customer_id: 'c1',
        items: [
          { book_id: 101, qty: 1 },
          { book_id: 201, qty: 2 },
        ],
        total_amount: 36.97,
        ordered_at: '2020-06-01',
      },
      {
        _id: 'o2',
        customer_id: 'c2',
        items: [{ book_id: 301, qty: 1 }],
        total_amount: 14.99,
        ordered_at: '2021-02-15',
      },
    ],
  },
}

export const sampleCollections = Object.keys(sampleMongoData.collections)
