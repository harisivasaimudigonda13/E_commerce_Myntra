
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.querySelector('.row.row-cols-md-4.g-4'); 

            productContainer.innerHTML = '';
            products.forEach(product => {
                const productCard = `
                    <div class="col">
                        <div class="card h-100">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain;">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">$${product.price.toFixed(2)}</p>
                                <div class="rating">
                                    ${getRatingStars(product.rating.rate)} 
                                </div>
                                <p class="card-text mt-2">${product.description.substring(0, 100)}...</p>
                                <a href="#!" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal${product.id}">More Info</a>
                            </div>
                        </div>
                    </div>
    
                    <!-- Modal for detailed product info -->
                    <div class="modal fade" id="productModal${product.id}" tabindex="-1" aria-labelledby="productModalLabel${product.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="productModalLabel${product.id}">${product.title} - Detailed Info</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}">
                                    <p>${product.description}</p>
                                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                                    <p><strong>Ratings:</strong> ${product.rating.rate} / 5 (${product.rating.count} reviews)</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                productContainer.innerHTML += productCard;
            });
        })
        .catch(error => console.error('Error fetching products:', error));
    function getRatingStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i - rating < 1) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }