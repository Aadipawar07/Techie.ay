document.addEventListener("DOMContentLoaded", function () {
    const resourceList = document.querySelector(".resource-list");
    const allCards = Array.from(resourceList.children);
    const searchInput = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-btn');
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");
    const pageNumbers = document.getElementById("pageNumbers");

    let itemsPerPage = 12;
    let currentPage = 1;
    let filteredCards = [...allCards]; // Default: all cards

    // Function to display the correct page of results
    function displayPage(page) {
        resourceList.innerHTML = "";
        let start = (page - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedItems = filteredCards.slice(start, end);

        paginatedItems.forEach(item => resourceList.appendChild(item));

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === Math.ceil(filteredCards.length / itemsPerPage);
        pageNumbers.textContent = `Page ${currentPage} of ${Math.max(1, Math.ceil(filteredCards.length / itemsPerPage))}`;
    }

    // Pagination controls
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < Math.ceil(filteredCards.length / itemsPerPage)) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    // Search function
    function searchResources(searchTerm) {
        searchTerm = searchTerm.toLowerCase();

        if (searchTerm.trim() === '') {
            filteredCards = [...allCards]; // Reset to all cards
        } else {
            filteredCards = allCards.filter(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                return title.includes(searchTerm) || description.includes(searchTerm);
            });
        }

        currentPage = 1; // Reset to first page after search
        displayPage(currentPage);
    }

    // Event listeners for search functionality
    searchInput.addEventListener('input', function () {
        searchResources(searchInput.value);
    });

    searchButton.addEventListener('click', function () {
        searchResources(searchInput.value);
    });

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            searchResources(searchInput.value);
        }
    });

    // Initialize pagination
    displayPage(currentPage);
});



