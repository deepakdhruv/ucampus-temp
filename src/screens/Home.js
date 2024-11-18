import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import burgerimg from '../components/burger.png';
import momosimg from '../components/momos.jpg';
import pizzaimg from '../components/pizza.jpg';


function Home() {
  const [search, setSearch] = useState(''); // Track the search query
  const [foodItem, setFoodItem] = useState([]); // Initialize as an empty array
  const [foodCat, setFoodCat] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Track loading state

  // Function to load data from the backend
  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setFoodItem(data[0]);  // FoodItems
        setFoodCat(data[1]);   // FoodCategory
        setLoading(false); // Data loaded, set loading to false
      } else {
        console.error("Error fetching data:", data.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <Navbar />
      <div>
        <div id="carouselExampleCaptions" style={{ zIndex: "1020" }} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            {/* Carousel Items */}
            <div className="carousel-item active">
            <img src={burgerimg} className="d-block w-100 img-fluid" alt="Burger" />

              <div className="carousel-caption d-none d-md-block">
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Update search on input change
                  />
                </div>
              </div>
            </div>
            {/* Other carousel items */}
            <div className="carousel-item">
              <img src={momosimg} className="d-block w-100" alt="Momos" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Momos</h5>
                <p>Steamed or fried dumplings filled with goodness.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={pizzaimg} className="d-block w-100" alt="Pizza" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Pizza</h5>
                <p>Cheesy and flavorful pizza with a crispy crust.</p>
              </div>
            </div>
          </div>
          {/* Carousel controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <p>Loading data...</p> // Show loading message while data is being fetched
        ) : (
          foodCat?.map((category) => (
            <div className="row mb-3" key={category._id}>
              <div className="fs-3 m-3">
                <h3>{category.CategoryName}</h3>
              </div>
              <hr />
              <div className="d-flex flex-wrap">
                {foodItem
                  .filter((item) =>
                    item.CategoryName === category.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase()) // Filter by search term
                  )
                  .map((item) => (
                    <div key={item._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem={item}
                      options={item.options[0]}
                        
                      />
                    </div>
                  ))}
                {foodItem.filter((item) =>
                  item.CategoryName === category.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
                ).length === 0 && (
                  <p>No items found.</p> // Display message when no items match search
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
