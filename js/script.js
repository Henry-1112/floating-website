
        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        // Form submission handling
        document.querySelector('.reservation-form')?.addEventListener('submit', async function(e) {
            e.preventDefault();
    
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            try {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Send to Formspree
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
        
                if (response.ok) {
                    alert('Thank you! Your reservation request has been sent. We\'ll contact you shortly.');
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('There was a problem submitting your form. Please try again or call us directly.');
                console.error('Form error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
        // Form submission
        const reservationForm = document.querySelector('.reservation-form');
        if (reservationForm) {
            reservationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your reservation request! We will contact you shortly to confirm.');
                this.reset();
            });
        }

        // Menu Search Functionality
        const menuSearch = document.getElementById('menu-search');
        const clearSearchBtn = document.getElementById('clear-search');
        const searchResultsCount = document.getElementById('search-results-count');
        const menuItems = document.querySelectorAll('.menu-item');
        
        if (menuSearch) {
            menuSearch.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                let visibleItems = 0;
                
                menuItems.forEach(item => {
                    const itemName = item.querySelector('.menu-item-name').textContent.toLowerCase();
                    const itemDesc = item.querySelector('.menu-item-desc').textContent.toLowerCase();
                    const itemCategory = item.dataset.category;
                    
                    if (itemName.includes(searchTerm) || itemDesc.includes(searchTerm) || 
                        itemCategory.includes(searchTerm)) {
                        item.style.display = 'block';
                        visibleItems++;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Update results count
                if (searchTerm.length > 0) {
                    searchResultsCount.textContent = `${visibleItems} dishes found`;
                    
                    // Show no results message if needed
                    if (visibleItems === 0) {
                        if (!document.querySelector('.no-results')) {
                            const noResults = document.createElement('div');
                            noResults.className = 'no-results';
                            noResults.innerHTML = `
                                <h3>No dishes found for "${searchTerm}"</h3>
                                <p>Try different search terms or browse our categories</p>
                            `;
                            document.getElementById('menu-grid').appendChild(noResults);
                        }
                    } else {
                        const noResults = document.querySelector('.no-results');
                        if (noResults) noResults.remove();
                    }
                } else {
                    searchResultsCount.textContent = '';
                    const noResults = document.querySelector('.no-results');
                    if (noResults) noResults.remove();
                }
            });
            
            // Clear search functionality
            clearSearchBtn.addEventListener('click', function() {
                menuSearch.value = '';
                menuSearch.dispatchEvent(new Event('input'));
                menuSearch.focus();
            });
        }

        // Menu Filter Functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const category = button.dataset.category;
                
                // Filter menu items
                menuItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // View More Button Functionality
        const viewMoreBtn = document.querySelector('.view-more-btn');
        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', () => {
                alert('This would typically load more menu items or link to a full menu page. In a real implementation, you would either:\n\n1. Load more items via AJAX\n2. Link to a separate full menu page\n3. Expand hidden items on the current page');
            });
        }

        // Dark Mode Toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
            });

            // Check for saved preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.documentElement.classList.add('dark-mode');
            }
        }

        // Logo Animation Enhancement
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mousemove', (e) => {
                const rect = logo.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                logo.style.setProperty('--mouse-x', `${x}px`);
                logo.style.setProperty('--mouse-y', `${y}px`);
            });
        }