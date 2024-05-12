package com.bits.bookservice.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bits.bookservice.model.Book;
import com.bits.bookservice.service.Impl.BookServiceImpl;


@RestController
@RequestMapping("/api/book")
public class BookController {
	
	@Autowired
	BookServiceImpl bookServiceImpl;
	
	  @GetMapping("/{book_data}")
	    public Book  getBook(@PathVariable String book_data){
	        return bookServiceImpl.findBookBybookData(book_data);
	    }
	  
	  @GetMapping("/findAll")
	  public Iterable<Book>  findAllBook(){
	        return bookServiceImpl.findAllData();
	    }
	  
	  @PostMapping
	  public Book saveBook(Book book) {
		  
		  return bookServiceImpl.saveBook(book);
	  }
}
