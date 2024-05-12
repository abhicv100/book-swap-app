package com.bits.bookservice.Dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bits.bookservice.model.Book;
import java.util.List;


@Repository
public interface BookDao extends CrudRepository<Book, String> {

	List<Book> findByContributedBy(String userId);

	@Query("SELECT b FROM Book b WHERE LOWER(b.search) LIKE '%' || LOWER(?1) || '%'")
	List<Book> findBySearch(String search);
}
