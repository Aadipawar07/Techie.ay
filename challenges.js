// Pagination and Search Functionality Combined

document.addEventListener("DOMContentLoaded", function () {
    const resourceList = document.querySelector(".challenge-list");
    const cards = Array.from(resourceList.children);
    const featuredSection = document.querySelector(".challenge-section");
    const searchInput = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-btn');

    function performSearch(searchTerm) {
        if (searchTerm.trim() === '') {
            // If the search term is empty, show all cards
            cards.forEach(card => card.style.display = 'block');
        } else {
            // Otherwise, perform the search
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Filter the cards based on visibility
        const visibleCards = cards.filter(card => card.style.display === 'block');

        // Update pagination with visible cards
        updatePagination(visibleCards);
    }

    function updatePagination(filteredCards) {
        const itemsPerPage = 9;
        let currentPage = 1;

        function displayPage(page) {
            resourceList.innerHTML = "";
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedItems = filteredCards.slice(start, end);

            paginatedItems.forEach(item => resourceList.appendChild(item));
            updatePaginationControls();

            if (featuredSection) {
                if (page === 1) {
                    featuredSection.style.display = "block";
                } else {
                    featuredSection.style.display = "none";
                }
            }
        }

        function updatePaginationControls() {
            const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
            document.getElementById("prevPage").disabled = currentPage === 1;
            document.getElementById("nextPage").disabled = currentPage === totalPages;
            document.getElementById("pageNumbers").textContent = `Page ${currentPage} of ${totalPages}`;
        }

        document.getElementById("prevPage").addEventListener("click", function () {
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
            }
        });

        document.getElementById("nextPage").addEventListener("click", function () {
            if (currentPage < Math.ceil(filteredCards.length / itemsPerPage)) {
                currentPage++;
                displayPage(currentPage);
            }
        });

        displayPage(currentPage);
    }

    // Immediate search on input
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        performSearch(searchTerm);
    });

    // Search on button click or Enter key press
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        performSearch(searchTerm);
    }

    searchButton.addEventListener('click', handleSearch);

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    updatePagination(cards); // Initial display with all cards
});