import React, {useState, useEffect} from "react";
import styles from "./bookList.module.css";
import mockBookList from "./mockBookList";

const BookList = () => {

    const[books, setBooks] = useState([]);
    const[allBooks, setAllBooks] = useState([]);
	const[newBook, setNewBook] = useState("");
    const[searchTerm, setSearchTerm] = useState("");

    const handleDelete = (clickedBook) => {
        setAllBooks((prev) => prev.filter((book) => book !== clickedBook));
        setBooks((prev) => prev.filter((book) => book !== clickedBook));
    };

    const handleChange = (event) => {
        setNewBook(event.target.value);
    }
	
    const handleAddBook = (event) =>{
        event.preventDefault();
        const trimmed = newBook.trim();
        if(trimmed){
            setAllBooks((prev)=>([...prev, trimmed]));
            setBooks((prev)=>([...prev, trimmed]));
        }
        setNewBook("");
    }

    const handleSearch = (event) => {
        const term = event.target.value || "";
        setSearchTerm(term);
        if (!term) {
            setBooks(allBooks);
            return;
        }
        const lowered = term.toLowerCase();
        const filteredBooks = allBooks.filter((book) =>
            book.toLowerCase().includes(lowered)
        );
        setBooks(filteredBooks);
    }

    useEffect(()=> {
         const fetchBookList = async()=>{
        try{
         const listOfBooks = await mockBookList()
         setAllBooks(listOfBooks.books);
         setBooks(listOfBooks.books);
        } catch (error) {
            console.error(error)
        }
    }
    fetchBookList()
    }, []);
    
    return(
        <div className={styles.wrapper}>
	    <header>
	    	<div className={styles.pageBanner}>
                <h1 className={styles.title}> Book Collections</h1>
          <p>Books</p>
                    <form className= {styles.searchBooks}>
                        <input type="text" placeholder="Search books..." value={searchTerm} onChange={handleSearch} />
                    </form>
	    	</div>
	    </header>
	    <div className={styles.bookList}>
	    	<h2 className={styles.title}>Books to Read</h2>
	    	<ul>
                {
                    books.map((book, index)=> (
                    <li key={index}>
                        <span className={styles.name}>{book}</span>
                        <span onClick ={() => handleDelete(book)} className={styles.delete}>delete</span>
                    </li>
                    ))
				
			    }

	    		
	    	</ul>
	    </div>
        <form onSubmit = {handleAddBook}className={styles.addBook}>
        	<input type="text" onChange ={handleChange} value={newBook} placeholder="Add a book..." />
	    	<button>Add</button>
	    </form>

    </div>
    );
}

export default BookList;