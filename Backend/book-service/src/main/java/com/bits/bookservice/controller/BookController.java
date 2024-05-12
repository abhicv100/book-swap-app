package com.bits.bookservice.controller;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bits.bookservice.model.Book;
import com.bits.bookservice.service.Impl.BookServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("/api/book")
public class BookController {

	@Autowired
	BookServiceImpl bookServiceImpl;

	// @GetMapping("/{book_data}")
	// public Book getBook(@PathVariable String book_data) {
	// 	return bookServiceImpl.findBookBybookData(book_data);
	// }

	@GetMapping("/{bookId}")
	public Book getBookbyId(@PathVariable String bookId) {
		return bookServiceImpl.findBookById(bookId);
	}

	@GetMapping
	public Iterable<Book> findAllBook(@RequestParam(value = "userId", required = false) String userId,
									@RequestParam(value = "search", required = false) String searchQuery) {
		if(userId != null) {
			return bookServiceImpl.findBooksContributedByUser(userId);
		} 
		else if(searchQuery != null) {
			return bookServiceImpl.search(searchQuery);
		} else {
			return bookServiceImpl.findAllData();
		}
	}

	@PostMapping
	public Book saveBook(@RequestBody Book book) {
		return bookServiceImpl.saveBook(book);
	}
}
