import Style from "./home.module.css"
import { useState } from "react";
import data from "../../data/data";
import { NavLink, useNavigate } from "react-router-dom";
import { useValue } from "../../components/context";
import Loader from "../../components/loader/Loader"

function Home() {
  const {
    priceRange,
    setPriceRange,
    handleAdd,
    searchTerm,
    setSearchTerm,
    isLoading,
    setIsLoading,
  } = useValue();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const arrayOfData = Object.values(data);
  setIsLoading(true)

  // searching handle
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const dataArray = arrayOfData;
  // filter pending
  const handleChangecategory = (event) => {
    const itemCat = event.target.value;
    if (selectedCategories.includes(itemCat)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== itemCat)
      );
    } else {
      setSelectedCategories([...selectedCategory, itemCat]);
    }
  };
  const history = useNavigate();
  const navigateToLogin = () => {
    history("/SignIn");
    console.log("cliekced");
  };

  const filteredProducts = dataArray.filter((item) => {
    const isInRange = priceRange > 0 ? item.price <= priceRange : true;
    const isSearchMatched = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isCategoryMatched =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    return isInRange && isSearchMatched && isCategoryMatched;
  });

  // /stop loading
  // useEffect(() => {
  //   let isMounted = true;

  //   // Simulate a loading delay of 3 seconds
  //   const loadingTimeout = setTimeout(() => {
  //       setIsLoading(false);
  //   }, 3000);

  //   // Cleanup the timeout to avoid memory leaks
  //   return () => {
  //     isMounted = false;
  //     clearTimeout(loadingTimeout);
  //   };
  // }, [setIsLoading]);

  return (
    <div className={Style.container}>
      {/* {isLoading ? (<Loader />) : (<> */}
      <div className={Style.filterContainer}>
        <h2>Filter</h2> <br />
        <div>
          <label style={{ fontWeight: "bold" }}>
            Price Range: ₹{priceRange}
          </label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="15000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <div className={Style.categoryDiv}>
          <h4>Categories:</h4>
          <label>
            {/* <input type="checkbox" name="men"
             /> */}
            <input
              type="checkbox"
              name="category"
              id="Men"
              value="Men"
              onChange={handleChangecategory}
            />
            Men
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              id="Women"
              value="Women"
              onChange={handleChangecategory}
            />
            Women
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              id="Kids"
              value="Kids"
              onChange={handleChangecategory}
            />
            Kids
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              id="Electronics"
              value="Electronics"
              onChange={handleChangecategory}
            />
            Electronics
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              id="Accessories"
              value="Accessories"
              onChange={handleChangecategory}
            />
            Accessories
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              id="Stationery"
              value="Stationery"
              onChange={handleChangecategory}
            />{" "}
            Stationery
          </label>
        </div>
      </div>
      <div className={Style.divContainer}>
        <div className={Style.searchBar}>
          <input
            type="text"
            placeholder="Search By Name"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <div className={Style.itemContainer}>
          {filteredProducts.map((item, id) => (
            <div key={id} className={Style.product}>
              <img src={item.img} alt="Product" />
              <h2>{item.title}</h2>
              <h3>₹ {item.price}</h3>
              <NavLink>
                <button onClick={() => handleAdd(item, navigateToLogin)}>
                  Add To Cart
                </button>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      {/* </>)} */}
    </div>
  );
}

export default Home;