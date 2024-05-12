/**
 * 
 */
package com.bits.bookservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * 
 */
@Data
@Table(name = "Book") 
@Entity
public class Book {


	public Integer getBookid() {
		return bookid;
	}

	public void setBookid(Integer bookid) {
		this.bookid = bookid;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRelease_year() {
		return release_year;
	}

	public void setRelease_year(String release_year) {
		this.release_year = release_year;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContributed_by() {
		return contributed_by;
	}

	public void setContributed_by(String contributed_by) {
		this.contributed_by = contributed_by;
	}

	public String getImage_url() {
		return image_url;
	}

	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}

	@Id
	Integer bookid;
	
	@Column(name="author")
	String author;
	
	@Column(name="name")
	String name;
	
	@Column(name="release_year")
	String release_year;
	
	@Column(name="description")
	String description;
	
	@Column(name="contributed_by")
	String contributed_by;
	
	@Column(name="genericColumn")
	String genericColumn;
	
	@Column(name="image_url")
	String image_url;

	public String getGenericColumn() {
		return genericColumn;
	}

	public void setGenericColumn(String genericColumn) {
		this.genericColumn = genericColumn;
	}
	
	
	
	
	
	
	
	
}
