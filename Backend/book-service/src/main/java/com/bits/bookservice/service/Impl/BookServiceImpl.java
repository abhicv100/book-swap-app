package com.bits.bookservice.service.Impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.bits.bookservice.Dao.BookDao;
import com.bits.bookservice.model.Book;

@Service
public class BookServiceImpl {

	@Autowired
	BookDao bookDao;

	// public Book findBookBybookData(String book_data) {
	// 	Book book = bookDao.findBySearch(book_data.toUpperCase());
	// 	return book;
	// }

	public Book findBookById(String bookId) {
		Optional<Book> maybeBook = bookDao.findById(bookId);
		if(maybeBook.isPresent()) return maybeBook.get();
		else return null;
	}

	public List<Book> findBooksContributedByUser(String userId) {
		return bookDao.findByContributedBy(userId);
	}

	public List<Book> search(String searchQuery) {
		return bookDao.findBySearch(searchQuery);
	}

	public Iterable<Book> findAllData() {
		return bookDao.findAll();
	}

	public Book saveBook(Book book) {
		String bookId = UUID.randomUUID().toString().replace("-", "");
		book.setId(bookId);
		book.setSearch(book.getName() + "#" + book.getAuthor() + "#" + book.getRelease_year());
		return bookDao.save(book);
	}
}
