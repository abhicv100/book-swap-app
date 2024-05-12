package com.bits.bookservice.Dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bits.bookservice.model.Book;


@Repository
public interface BookDao extends  CrudRepository<Book, Integer>{

	Book findBygenericColumn(String book_data);

}
