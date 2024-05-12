/**
 * 
 */
package com.bits.bookservice.service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bits.bookservice.Dao.BookDao;
import com.bits.bookservice.model.Book;


/**
 * 
 */
@Service
public class BookServiceImpl {

	@Autowired
	BookDao bookDao;
	
	
	public Book findBookBybookData(String book_data) {
        Book book = bookDao.findBygenericColumn(book_data.toUpperCase());
		return book;
	}


	public Iterable<Book> findAllData() {
		Iterable<Book> books=new ArrayList<>();
		books= bookDao.findAll();
		return books;
	}


	public Book saveBook(Book book) {
		book.setGenericColumn( book.getName()+"##"+	book.getAuthor()+"##"+book.getRelease_year());
		Book book1=bookDao.save(book);
		return book1;
	}
	
	

}
