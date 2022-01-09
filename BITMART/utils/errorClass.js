const express=require('express');

class Apperror extends Error {
    constructor(message, status) {
        super();
        this.message=message;
        this.status=status;
    }
};

module.exports=Apperror;