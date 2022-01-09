// const Product=require('../models/productModel');
class Features {
  constructor(query, queryStr) {
    ; (this.query=query), (this.queryStr=queryStr)
  }
  search() {
    const keyword=this.queryStr.keyword
      ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: 'i',
        },
      }
      :{}

    this.query=this.query.find({ ...keyword })
    return this
  }
  filter() {
    let max=Number(this.queryStr.lte||10000);
    let min=Number(this.queryStr.gte||0);
    // console.log(max)
    let category=[];
    if (Array.isArray(this.queryStr.category)==true) {
      category=this.queryStr.category;
    }
    else if (this.queryStr.category!=undefined) {
      if ((this.queryStr.category).includes('Laptops')) {
        category.push('Laptops & Mobiles');
      }
      if (this.queryStr.category.includes('Books')) {
        category.push('Books');
      }
      if (this.queryStr.category.includes('Electrical devices')) {
        category.push('Electrical devices');
      }
      if (this.queryStr.category.includes('Furniture')) {
        category.push('Furniture');
      }
      if (this.queryStr.category.includes('Fashion')) {
        category.push('Fashion');
      }
      if (this.queryStr.category.includes('Sports gear')) {
        category.push('Sports gear');
      }
    }
    let keyword=this.queryStr.keyword
      ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: 'i',
        },
      }
      :{}
    if (category==[]||category=='') {
      category=undefined;
    }
    let type=[];
    if (Array.isArray(this.queryStr.type)==true) {
      type=this.queryStr.type;
    }
    else if (this.queryStr.type!=undefined) {
      if ((this.queryStr.type).includes('sell')==true) {
        type.push('sell');
      }
      if ((this.queryStr.type).includes('rent')==true) {
        type.push('rent');
      }
    }

    if (type==[]||type=='') {
      type=undefined;
    }
    
    if (category!=undefined&&type!=undefined) {
      this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }, { type: type }, { category: category }, { ...keyword }] });
    }
    else if (category!=undefined) {
      this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }, { category: category }, { ...keyword }] });
    }
    else if (type!=undefined) {
      this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }, { type: type }, { ...keyword }] });
    }
    else {
      this.query=this.query.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }, { ...keyword }] });
    }
    return this;
  }
  pagination(resultperpage) {
    let currentpage;
    if (this.queryStr.page==undefined||this.queryStr.page=='') {
      currentpage=Number(1);
    }
    else {
      currentpage=Number(this.queryStr.page);
    }
    
    let skip=resultperpage*(currentpage-1);

    this.query=this.query.limit(resultperpage).skip(skip)

    return this;
  }
}

module.exports=Features
