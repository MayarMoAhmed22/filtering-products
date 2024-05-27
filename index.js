const dataEndpoint = "https://dummyjson.com/products";
const display = document.querySelector("#display-data");
const input = document.querySelector("#input");
const getData = async () => {
  try {
    const res = await fetch(dataEndpoint);
    if (!res.ok) {
      throw new Error(`HTTP error status: ${res.status}`);
    }
    const data = await res.json();
    return data.products || []; // Ensure that we return an array of products
  } catch (error) {
    console.error("Fetching data failed:", error);
    return []; // Return an empty array if there's an error
  }
};

const displayProducts = async () => {
  try {
    const products = await getData(); // Fetch data
    const query = input.value.toLowerCase();
    const dataDisplay = products
      .filter((eventData) => {
        if (query === "") {
          return eventData;
        } else if (eventData.category.toLowerCase().includes(query)) {
          return eventData;
        }
      })
      .map(
        (item) => `
      <div class="item" data-aos="fade-up"  data-aos-delay="300">
        <p>Title: ${item.title}</p>
        <p>Description: ${item.description}</p>
        <p>Category: ${item.category}</p>
        <p>Price: ${item.price}</p>
        <p>Rating: ${item.rating}</p>
        <p>Stock: ${item.stock}</p>
      </div>
    `
      )
      .join("");
    display.innerHTML = dataDisplay; // Display the products
  } catch (error) {
    console.error("Displaying products failed:", error);
    display.innerHTML = "<p>Error: Failed to display products</p>"; // Display error message
  }
};

// Call the displayProducts function
displayProducts();
input.addEventListener("input", displayProducts);

AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});
