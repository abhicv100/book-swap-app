package com.bits.bookservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Table(name = "Book", schema = "public") 
@Entity
@Getter @Setter
public class Book {

	@Id
	String id;
	
	@Column(name="author")
	String author;
	
	@Column(name="name")
	String name;
	
	@Column(name="release_year")
	String release_year;

	@Column(name="genre")
	String genre;

	@Column(name="description")
	String description;
	
	@Column(name="contributedBy")
	String contributedBy;

	@Column(name="condition")
	String condition;

	@Column(name="search")
	String search;
	
	@Column(name="image_url")
	String image_url;
}
