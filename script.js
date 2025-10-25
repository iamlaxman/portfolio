$(document).ready(function(){
    // Use requestIdleCallback for non-critical tasks when available
    const runWhenIdle = window.requestIdleCallback || setTimeout;
    
    // Ensure we start at the top of the page
    if (window.location.hash) {
        // If there's a hash in the URL, clear it and scroll to top
        history.replaceState(null, null, ' ');
        $(window).scrollTop(0);
    } else {
        // Otherwise, just ensure we're at the top
        $(window).scrollTop(0);
    }
    
    // Defer initialization of non-critical components
    // Custom typing animation is now handled in index.html
    // Set initial text for the typing element
    runWhenIdle(function() {
        if ($(".typing").length > 0) {
            $(".typing").text("Developer");
        }
    });

    try {
        // Navbar toggle for mobile - Completely rewrite to avoid conflicts
        // Remove any existing event handlers first
        $('#mobile-menu-toggle').off('click');
        
        // Add new click handler
        $('#mobile-menu-toggle').on('click', function(e){
            // Prevent event from bubbling up
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle mobile menu with explicit show/hide logic
            if ($('.mobile-menu').is(':visible')) {
                $('.mobile-menu').slideUp(300, function() {
                    // Animation complete
                });
                // Change icon back to hamburger
                $(this).find('i').removeClass('fa-times').addClass('fa-bars');
            } else {
                $('.mobile-menu').slideDown(300, function() {
                    // Animation complete
                });
                // Change icon to close
                $(this).find('i').removeClass('fa-bars').addClass('fa-times');
            }
        });
        
        // Close mobile menu when clicking outside
        $(document).on('click touchstart', function(e) {
            // Check if mobile menu is open
            if ($('.mobile-menu').is(':visible')) {
                // Check if the click is outside the navbar
                if (!$(e.target).closest('.navbar').length) {
                    $('.mobile-menu').slideUp(300);
                    // Reset hamburger icon
                    $('#mobile-menu-toggle').find('i').removeClass('fa-times').addClass('fa-bars');
                }
            }
        });
        
        // Also close mobile menu when a mobile link is clicked
        $(document).on('click', '.mobile-link', function() {
            $('.mobile-menu').slideUp(300);
            $('#mobile-menu-toggle').find('i').removeClass('fa-times').addClass('fa-bars');
        });
        
        // Prevent closing when clicking inside the mobile menu
        $(document).on('click', '.mobile-menu', function(e) {
            e.stopPropagation();
        });
        
        // Navbar toggle functionality initialized
    } catch (error) {
        // Error handling for navbar toggle
    }

    try {
        // Scroll-up button show/hide and navbar scroll effect
        $(window).scroll(function(){
            // Scroll-up button show/hide
            if($(this).scrollTop() > 500){
                $('.scroll-up-btn').removeClass('hidden').addClass('block');
            } else {
                $('.scroll-up-btn').removeClass('block').addClass('hidden');
            }
            
            // Navbar scroll effect - only change shadow, not position since it's fixed
            if($(this).scrollTop() > 100){
                $('.navbar').addClass('scrolled');
            } else {
                $('.navbar').removeClass('scrolled');
            }
            
            // Removed parallax effect for performance optimization
            /*
            // Parallax effect
            const scrolled = $(window).scrollTop();
            const rate = scrolled * -0.5;
            const rate2 = scrolled * -0.3;
            const rate3 = scrolled * -0.1;
            
            // Apply different speeds to different layers
            $('.parallax-layer-1').css('transform', 'translate3d(0px, ' + rate + 'px, 0px)');
            $('.parallax-layer-2').css('transform', 'translate3d(0px, ' + rate2 + 'px, 0px)');
            $('.parallax-layer-3').css('transform', 'translate3d(0px, ' + rate3 + 'px, 0px)');
            */
        });

        // Scroll to top
        $('.scroll-up-btn').click(function(){
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });
        
        // Scroll effects initialized
    } catch (error) {
        // Error handling for scroll effects
    }

    try {
        // Smooth scroll for menu links, adjust for navbar height
        $('.menu-btn, .hire-btn, .portfolio-btn, .scroll-down a').click(function(e){
            // Prevent default behavior for all menu buttons
            e.preventDefault();
            
            var target = $(this).attr('href');
            var navbarHeight = $('#navbar').outerHeight() || 80;
            
            $('html, body').animate({
                scrollTop: $(target).offset().top - navbarHeight
            }, 800);
            
            // If this is a mobile link, close the mobile menu
            if ($(this).hasClass('mobile-link')) {
                $('.mobile-menu').slideUp();
                // Use the new specific selector for the hamburger icon
                $('#mobile-menu-toggle').find('i').removeClass('fa-times').addClass('fa-bars');
            }
            
            return false;
        });
    } catch (error) {
        // Error handling for smooth scroll
    }

    try {
        // Read more toggle
        $('#read-more-btn').click(function(e){
            e.preventDefault();
            var $content = $('#extra-content');
            var $button = $(this);
            
            // Toggle the content visibility with smooth animation
            if ($content.hasClass('hidden')) {
                // Remove hidden class and show with slide down animation
                $content.removeClass('hidden').hide().slideDown(300);
                $button.text('Read less');
            } else {
                // Hide with slide up animation and add hidden class when complete
                $content.slideUp(300, function() {
                    $(this).addClass('hidden');
                });
                $button.text('Read more');
            }
        });
    } catch (error) {
        // Error handling for read more toggle
    }

    try {
        // Section fade-in animations on scroll
        $('section').waypoint(function(direction) {
            if (direction === 'down') {
                $(this.element).find('.animated').each(function(index) {
                    var $this = $(this);
                    setTimeout(function() {
                        $this.addClass('visible');
                    }, index * 200);
                });
            }
        }, { offset: '75%' });
    } catch (error) {
        // Error handling for section animations
    }

    try {
        // AJAX Form Submission
        $('#contact-form').submit(function(e) {
            e.preventDefault();
            
            // Get form data
            var formData = $(this).serialize();
            var formMessage = $('#form-message');
            
            // Show loading state
            var submitBtn = $('.submit-btn');
            var originalText = submitBtn.html();
            submitBtn.html('<span>Sending...</span> <i class="fas fa-spinner fa-spin ml-2"></i>');
            submitBtn.prop('disabled', true);
            
            $.ajax({
                url: "https://formsubmit.co/ajax/ethical.laxman@gmail.com",
                method: "POST",
                data: formData,
                dataType: "json",
                success: function(response) {
                    // Show success animation
                    showSuccessAnimation();
                    $('#contact-form')[0].reset();
                },
                error: function(xhr, status, error) {
                    formMessage.removeClass('text-green-600 hidden').addClass('text-red-600').text('Error sending message. Please try again.');
                    // Hide message after 5 seconds
                    setTimeout(function() {
                        formMessage.addClass('hidden');
                    }, 5000);
                },
                complete: function() {
                    // Restore button state
                    submitBtn.html(originalText);
                    submitBtn.prop('disabled', false);
                }
            });
        });
    } catch (error) {
        // Error handling for form submission
    }

    // Removed hover effect as per user request

    // Add animation to elements when they come into view
    $('.animated').waypoint(function(direction) {
        if (direction === 'down') {
            $(this.element).addClass('visible');
        }
    }, { offset: '90%' });

    // Timeline animation
    $('.timeline-item').waypoint(function(direction) {
        if (direction === 'down') {
            $(this.element).find('.timeline-content').addClass('visible');
        }
    }, { offset: '75%' });

    // Testimonials animation
    $('.testimonial-card').waypoint(function(direction) {
        if (direction === 'down') {
            $(this.element).addClass('visible');
        }
    }, { offset: '75%' });

    // Set initial theme state based on system preference or local storage
    function setInitialTheme() {
        try {
            // Check if user has previously set a theme preference
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // Setting initial theme based on system preference or local storage
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                // Apply dark theme
                $('body').addClass('dark-mode');
                $('html').addClass('dark');
                $('.theme-checkbox').prop('checked', false); // Inverted for correct visual representation
                // Applied dark theme
            } else {
                // Apply light theme
                $('body').removeClass('dark-mode');
                $('html').removeClass('dark');
                $('.theme-checkbox').prop('checked', true); // Inverted for correct visual representation
                // Applied light theme
            }
            
            // Log current theme state
            // Current theme state logging removed
        } catch (error) {
            // Error handling for setting initial theme
        }
    }
    
    // Set initial theme
    setInitialTheme();

    // Theme Toggle Functionality - Updated for new switch design
    $('.theme-checkbox').change(function() {
        try {
            // Theme checkbox change event
            
            // Sync both checkboxes
            $('.theme-checkbox').prop('checked', $(this).prop('checked'));
            
            // Determine the new state (inverted logic for correct visual representation)
            const isLightMode = $(this).prop('checked');
            
            // Checking if light mode is enabled
            
            // Apply or remove dark mode classes (inverted logic)
            if (!isLightMode) { // If NOT light mode, then it's dark mode
                $('body').addClass('dark-mode');
                $('html').addClass('dark');
                localStorage.setItem('theme', 'dark');
                // Dark mode enabled
            } else { // If light mode
                $('body').removeClass('dark-mode');
                $('html').removeClass('dark');
                localStorage.setItem('theme', 'light');
                // Light mode enabled
            }
            
            // Dark mode classes logging removed
            
            // Force reflow to ensure styles are applied
            document.body.offsetHeight;
            
            // Log updated theme state
            // Updated theme state logging removed
        } catch (error) {
            // Error handling for theme toggle
        }
    });

    // Easter Egg Functionality
    $('#easter-egg-btn').click(function() {
        $('#easter-egg-modal').removeClass('hidden').addClass('flex');
    });

    $('#close-easter-egg').click(function() {
        $('#easter-egg-modal').removeClass('flex').addClass('hidden');
    });

    // Close modal when clicking outside
    $('#easter-egg-modal').click(function(e) {
        if (e.target === this) {
            $(this).removeClass('flex').addClass('hidden');
        }
    });

    // Initialize 3D effects
    function init3DEffects() {
        // 3D effects have been removed as per user request
        return;
    }
    
    init3DEffects();

    // Draggable Skills Implementation - Improved version
    // Removed dragging functionality as per user request - keeping only 3D hover effects

    // Add 3D hover effect to skill items
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || (window.innerWidth <= 768);
    }

    // Only apply 3D effects on desktop devices
    if (!isMobileDevice()) {
        $('.skill-item').each(function() {
            const item = $(this);
            
            item.on('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 10;
                const rotateX = (centerY - y) / 10;
                
                item.find('.skill-icon').css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
            });
            
            item.on('mouseleave', function() {
                item.find('.skill-icon').css('transform', 'perspective(1000px) rotateX(0) rotateY(0)');
            });
        });
    }
    
    // Chatbot functionality has been removed as per project requirements
    // The portfolio now uses a traditional contact form instead
    // Fallback icons for timeline items (Lottie animations were causing issues)
    $('.lottie-animation').each(function() {
        const animationType = $(this).data('animation');
        const icons = {
            'developer': 'laptop-code',
            'web-development': 'code',
            'education': 'graduation-cap',
            'design': 'paint-brush'
        };
        const icon = icons[animationType] || 'star';
        $(this).html('<i class="fas fa-' + icon + ' text-3xl text-indigo-500"></i>');
    });
    
    // Terminal Mode Toggle
    $('#terminal-toggle, #terminal-toggle-mobile').click(function() {
        // Instead of showing the old terminal interface, open the new terminal portfolio page
        window.open('terminal-portfolio.html', '_blank');
    });
    
    $('#terminal-close').click(function() {
        $('#terminal-interface').hide();
    });
    
    // Terminal Command Handling
    $('#terminal-command').keypress(function(e) {
        if (e.which == 13) { // Enter key
            const command = $(this).val().trim();
            const history = $('#terminal-history');
            
            // Add command to history
            history.append(`<div>laxman@portfolio:~$ ${command}</div>`);
            
            // Process command
            let output = '';
            switch(command.toLowerCase()) {
                case 'help':
                    output = 'Available commands: help, clear, ls, whoami, skills, projects, contact, exit';
                    break;
                case 'clear':
                    history.empty();
                    $(this).val('');
                    return;
                case 'ls':
                    output = 'about.txt    skills.txt    projects/    contact.txt    resume.pdf';
                    break;
                case 'whoami':
                    output = 'Laxman Poudel - Developer, Designer, Ethical Hacker';
                    break;
                case 'skills':
                    output = 'HTML, CSS, JavaScript, Python, React, Linux, SQL, Cybersecurity';
                    break;
                case 'projects':
                    output = 'ecommerce-website/    security-audit-tool/    fitness-app/';
                    break;
                case 'contact':
                    output = 'Email: ethical.laxman@gmail.com | Location: Ratuwamai-10, Morang, Nepal';
                    break;
                case 'exit':
                    $('#terminal-interface').hide();
                    $(this).val('');
                    return;
                case 'hack':
                    // Easter egg command
                    output = 'Initiating hack sequence...';
                    setTimeout(() => {
                        history.append(`<div>${output}</div>`);
                        output = 'Bypassing firewall...';
                        setTimeout(() => {
                            history.append(`<div>${output}</div>`);
                            output = 'Access granted! Secret mini-game unlocked!';
                            history.append(`<div>${output}</div>`);
                            // Trigger secret mini-game
                            showSecretMiniGame();
                        }, 1000);
                    }, 1000);
                    break;
                default:
                    output = `Command not found: ${command}. Type 'help' for available commands.`;
            }
            
            // Add output to history
            if (output && command.toLowerCase() !== 'hack') {
                history.append(`<div>${output}</div>`);
            }
            
            // Clear input
            $(this).val('');
            
            // Scroll to bottom
            $('.terminal-body').scrollTop($('.terminal-body')[0].scrollHeight);
        }
    });
    
    // Ctrl+K shortcut for Easter egg
    $(document).keydown(function(e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            showSecretMiniGame();
        }
    });
    
    // Secret Mini-Game Function
    function showSecretMiniGame() {
        // Show the mini-game modal that's already in the HTML
        $('#mini-game-modal').removeClass('hidden').addClass('flex');
        
        // Focus on input
        $('#hack-input').focus();
    }
    
    // Event handlers for mini-game (moved from HTML to JS for better organization)
    $(document).on('click', '#close-mini-game, #cancel-hack', function() {
        $('#mini-game-modal').removeClass('flex').addClass('hidden');
    });
    
    $(document).on('click', '#submit-hack', function() {
        const input = $('#hack-input').val().trim();
        if (input === 'ACCESS_GRANTED') {
            $('#hack-code').text('SYSTEM HACKED!').addClass('text-yellow-400');
            setTimeout(() => {
                $('#mini-game-modal').removeClass('flex').addClass('hidden');
                // Show success message
                alert('🎉 Congratulations! You hacked the system! 🎉');
                // Reset the game
                setTimeout(() => {
                    $('#hack-code').text('ACCESS_GRANTED').removeClass('text-yellow-400 text-red-500');
                    $('#hack-input').val('');
                }, 100);
            }, 1500);
        } else {
            $('#hack-code').text('ACCESS DENIED!').addClass('text-red-500');
            setTimeout(() => {
                $('#hack-code').text('ACCESS_GRANTED').removeClass('text-red-500 text-yellow-400');
            }, 1000);
        }
    });
    
    // Allow Enter key to submit in mini-game
    $(document).on('keypress', '#hack-input', function(e) {
        if (e.which == 13) {
            $('#submit-hack').click();
        }
    });
    
    // Game-like Progress System
    function initProgressSystem() {
        // Add progress indicators to sections
        const sections = ['home', 'about', 'services', 'skills', 'portfolio', 'timeline', 'contact', 'visitor-map'];
        
        sections.forEach((sectionId, index) => {
            const levelNum = index + 1;
            const section = $(`#${sectionId}`);
            
            // Add level indicator

        });
        
        // Show level indicators when in viewport

    }
    
    // Initialize progress system
    initProgressSystem();
    
    // Interactive 3D Resume Card
    function createInteractiveResume() {
        // Open resume modal
        // Removed direct download functionality - button now works via HTML download attribute
        
        // Event handlers for resume card
        $(document).on('click', '#flip-resume', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Add flipped class and ensure proper transform
            $('.resume-3d-card').addClass('flipped');
            $('.resume-3d-card').css('transform', 'rotateY(180deg)');
        });
        
        $(document).on('click', '#flip-resume-back', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Remove flipped class and reset transform
            $('.resume-3d-card').removeClass('flipped');
            $('.resume-3d-card').css('transform', 'rotateY(0deg)');
        });
        
        $(document).on('click', '#resume-close, #resume-close-back', function(e) {
            e.preventDefault();
            $('#resume-modal').addClass('hidden');
            // Re-enable body scroll when modal is closed
            $('body').removeClass('overflow-hidden');
            // Reset card to front side when closing
            $('.resume-3d-card').removeClass('flipped');
            $('.resume-3d-card').css('transform', 'rotateY(0deg)');
            
            // Reset modal scrolling
            $('#resume-modal').css('overflow-y', '');
            $('.resume-front, .resume-back').css('overflow-y', '');
        });
        
        // Close modal when clicking outside
        $(document).on('click', '#resume-modal', function(e) {
            if (e.target.id === 'resume-modal') {
                e.preventDefault();
                $(this).addClass('hidden');
                $('body').removeClass('overflow-hidden');
                // Reset card to front side when closing
                $('.resume-3d-card').removeClass('flipped');
                $('.resume-3d-card').css('transform', 'rotateY(0deg)');
                
                // Reset modal scrolling
                $('#resume-modal').css('overflow-y', '');
                $('.resume-front, .resume-back').css('overflow-y', '');
            }
        });
        
        // Add 3D effect on mouse move - only on desktop
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('.resume-3d-container').on('mousemove', function(e) {
                const card = $('.resume-3d-card');
                const rect = card[0].getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                // Only apply 3D effect when not flipped
                if (!card.hasClass('flipped')) {
                    card.css('transform', `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`);
                }
            });
            
            $('.resume-3d-container').on('mouseleave', function() {
                const card = $('.resume-3d-card');
                // Only reset transform when not flipped
                if (!card.hasClass('flipped')) {
                    card.css('transform', 'rotateY(0deg) rotateX(0deg)');
                }
            });
        }
        
        // Handle mobile touch events for better responsiveness
        $('.resume-3d-container').on('touchstart', function(e) {
            // Allow scrolling within the modal content on mobile
            e.stopPropagation();
        });
        
        // Prevent modal closing when scrolling inside the content
        $('.resume-front, .resume-back').on('touchmove', function(e) {
            e.stopPropagation();
        });
    }
    
    // Initialize interactive resume
    createInteractiveResume();
    
    // Initialize visitor map functionality when it comes into view
    initVisitorMapOnScroll();
    
    // Initialize time filter functionality - removed as per user request
    // initTimeFilters();
});

// Initialize visitor map functionality when it comes into view
function initVisitorMapOnScroll() {
    let initialized = false;
    
    function checkVisitorMapVisibility() {
        const visitorMapSection = document.getElementById('visitor-map');
        if (!visitorMapSection || initialized) return;
        
        const rect = visitorMapSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
        
        if (isVisible) {
            initialized = true;
            initVisitorMap();
            // Remove the scroll listener after initialization
            window.removeEventListener('scroll', checkVisitorMapVisibility);
        }
    }
    
    // Check on scroll and initially
    window.addEventListener('scroll', checkVisitorMapVisibility);
    checkVisitorMapVisibility();
}

// Visitor Map Functionality
function initVisitorMap() {
    // Initialize the interactive map
    loadInteractiveMap();
    
    // Set up map controls
    setupMapControls();
    
    // Load visitor statistics
    loadVisitorStatistics();
    
    // Load visitor chart - removed as per user request
    // loadVisitorChart();
}

// Set up map controls functionality
function setupMapControls() {
    const zoomInBtn = document.getElementById('map-zoom-in');
    const zoomOutBtn = document.getElementById('map-zoom-out');
    
    if (zoomInBtn && zoomOutBtn) {
        // Show a message when buttons are clicked since full zoom is not implemented
        zoomInBtn.addEventListener('click', function() {
            showToast('Zoom feature is not fully implemented yet', 'info');
        });
        
        zoomOutBtn.addEventListener('click', function() {
            showToast('Zoom feature is not fully implemented yet', 'info');
        });
    }
}

// Load interactive world map using Hexagonal Map
function loadInteractiveMap() {
    const mapContainer = $('#world-map');
    const mapPlaceholder = mapContainer.find('.map-placeholder');
    const visContainer = document.getElementById('vis');
    
    // Show loading state
    mapPlaceholder.removeClass('hidden');
    visContainer.classList.add('hidden');
    
    // Simulate map loading
    setTimeout(() => {
        // Hide placeholder and show hex map
        mapPlaceholder.addClass('hidden');
        visContainer.classList.remove('hidden');
        
        // Create and render hex map
        let chart = hexmap();
        
        // Apply chart to DOM
        d3.select('#vis')
            .call(chart);
    }, 1500);
}

// Hexagonal Map Implementation
function hexmap() {
    // GET/SET defaults
    var svg = undefined;
    var dispatch = d3.dispatch('customHover');
    
    // getter setter defaults
    var opts = {
        width: $('#vis').width() || 960,
        height: $('#vis').height() || 500,
        margin: { top: 20, right: 10, bottom: 20, left: 10 }
    };
    
    var hexbin = d3.hexbin()
        .size([opts.width, opts.height])
        .radius(5);
    
    var color = d3.scale.linear()
        .domain([1, 255])
        .range(['#4f46e5', '#c7d2fe'])
        .interpolate(d3.interpolateHcl);
    
    // RENDER
    function exports(_selection) {
        var canvas = _selection
            .append('canvas')
            .attr('width', opts.width)
            .attr('height', opts.height)
            .attr('id', 'mapCanvas')
            .style('display', 'none'); // Hide canvas as we'll use SVG for display
        
        var context = canvas
            .node()
            .getContext('2d');
        var points = [];
        var hexagons = [];
        
        var projection = d3.geo.mercator()
            .rotate([0, 0])
            .scale(100)
            .center([0, 20])
            .translate([opts.width / 2, opts.height / 2]);
        
        context.fillStyle = $('html').hasClass('dark-mode') ? '#1e293b' : '#dbeafe';
        context.strokeStyle = 'none';
        
        var path = d3.geo.path()
            .projection(projection)
            .context(context);
        
        // Load world data
        d3.json('https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-50m.json', function (error, world) {
            if (error) {
                // Error handling for loading world map data
                // Fallback to simplified map
                createFallbackMap(_selection, opts);
                return;
            }
            
            try {
                path(topojson.feature(world, world.objects.land));
                context.fill();
                
                // use the canvas as the image
                var image = document.getElementById('mapCanvas');
                
                context.drawImage(image, 0, 0, opts.width, opts.height);
                image = context.getImageData(0, 0, opts.width, opts.height);
                
                // rescale the colors
                for (var c, i = 0, n = opts.width * opts.height * 4, d = image.data; i < n; i += 4) {
                    points.push([i / 4 % opts.width, Math.floor(i / 4 / opts.width), d[i]]);
                }
                
                hexagons = hexbin(points);
                hexagons.forEach(function (d) {
                    d.mean = d3.mean(d, function (p) {
                        return p[2];
                    });
                });
                
                var svg = _selection
                    .append('svg')
                    .attr('width', opts.width)
                    .attr('height', opts.height)
                    .attr('class', 'hex-map');
                
                // Add visitor data points
                var visitorData = generateVisitorData();
                
                // Draw hexagons
                var hexagon = svg
                    .append('g')
                    .attr('class', 'hexagons')
                    .selectAll('path')
                    .data(hexagons)
                    .enter()
                    .append('path')
                    .attr('d', hexbin.hexagon(4.5))
                    .attr('transform', function (d) {
                        return 'translate(' + d.x + ',' + d.y + ')';
                    })
                    .style('fill', function (d) {
                        // Color based on land (darker) vs water (lighter)
                        return d.mean < 100 ? 
                            ($('html').hasClass('dark-mode') ? '#334155' : '#93c5fd') : 
                            ($('html').hasClass('dark-mode') ? '#1e293b' : '#dbeafe');
                    })
                    .style('stroke', $('html').hasClass('dark-mode') ? '#0f172a' : '#fff')
                    .style('stroke-width', 0.5);
                
                // Add visitor markers
                var markers = svg
                    .append('g')
                    .attr('class', 'markers')
                    .selectAll('circle')
                    .data(visitorData)
                    .enter()
                    .append('circle')
                    .attr('cx', function(d) { 
                        // Convert lat/long to x,y coordinates
                        var coords = projection([d.lon, d.lat]);
                        return coords ? coords[0] : 0;
                    })
                    .attr('cy', function(d) { 
                        // Convert lat/long to x,y coordinates
                        var coords = projection([d.lon, d.lat]);
                        return coords ? coords[1] : 0;
                    })
                    .attr('r', function(d) { return Math.sqrt(d.visitors) / 5; })
                    .attr('class', function(d) { return 'visitor-marker pulse-' + d.color; })
                    .append('title')
                    .text(function(d) { return d.city + ': ' + d.visitors + ' visitors'; });
                
            } catch (e) {
                // Error handling for rendering hex map
                // Fallback to simplified map
                createFallbackMap(_selection, opts);
            }
        });
    }
    
    // Generate sample visitor data
    function generateVisitorData() {
        return [
            {city: "New York", lat: 40.7128, lon: -74.0060, visitors: 1245, color: "blue"},
            {city: "London", lat: 51.5074, lon: -0.1278, visitors: 987, color: "green"},
            {city: "Tokyo", lat: 35.6895, lon: 139.6917, visitors: 1123, color: "yellow"},
            {city: "Sydney", lat: -33.8688, lon: 151.2093, visitors: 654, color: "red"},
            {city: "São Paulo", lat: -23.5505, lon: -46.6333, visitors: 789, color: "blue"},
            {city: "Cairo", lat: 30.0444, lon: 31.2357, visitors: 567, color: "green"},
            {city: "Mumbai", lat: 19.0760, lon: 72.8777, visitors: 1234, color: "yellow"},
            {city: "Beijing", lat: 39.9042, lon: 116.4074, visitors: 923, color: "red"},
            {city: "Moscow", lat: 55.7558, lon: 37.6173, visitors: 678, color: "blue"},
            {city: "Berlin", lat: 52.5200, lon: 13.4050, visitors: 456, color: "green"},
            {city: "Los Angeles", lat: 34.0522, lon: -118.2437, visitors: 876, color: "yellow"},
            {city: "Cape Town", lat: -33.9249, lon: 18.4241, visitors: 432, color: "red"}
        ];
    }
    
    // Fallback map in case of errors
    function createFallbackMap(_selection, opts) {
        var svg = _selection
            .append('svg')
            .attr('width', opts.width)
            .attr('height', opts.height)
            .attr('class', 'fallback-map');
        
        // Create a simple gradient background
        var gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "bg-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%");
        
        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", $('html').hasClass('dark-mode') ? '#1e293b' : '#dbeafe');
        
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", $('html').hasClass('dark-mode') ? '#0f172a' : '#c7d2fe');
        
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "url(#bg-gradient)");
        
        // Add some simple shapes to represent continents
        svg.append("circle")
            .attr("cx", opts.width * 0.2)
            .attr("cy", opts.height * 0.3)
            .attr("r", 30)
            .attr("fill", $('html').hasClass('dark-mode') ? '#334155' : '#93c5fd');
        
        svg.append("circle")
            .attr("cx", opts.width * 0.6)
            .attr("cy", opts.height * 0.4)
            .attr("r", 40)
            .attr("fill", $('html').hasClass('dark-mode') ? '#334155' : '#93c5fd');
        
        svg.append("circle")
            .attr("cx", opts.width * 0.8)
            .attr("cy", opts.height * 0.6)
            .attr("r", 25)
            .attr("fill", $('html').hasClass('dark-mode') ? '#334155' : '#93c5fd');
        
        // Add visitor markers
        var visitorData = generateVisitorData();
        
        svg.selectAll("circle.marker")
            .data(visitorData)
            .enter()
            .append("circle")
            .attr("cx", function(d, i) { return (i + 1) * (opts.width / (visitorData.length + 1)); })
            .attr("cy", function(d, i) { return opts.height / 2 + Math.sin(i) * 50; })
            .attr("r", function(d) { return Math.sqrt(d.visitors) / 5; })
            .attr("class", function(d) { return 'visitor-marker pulse-' + d.color; });
    }
    
    function getImage(path, callback) {
        var image = new Image();
        image.onload = function () {
            callback(image);
        };
        image.src = path;
    }
    
    // GET/SET 
    function getSet(option, component) {
        return function (_) {
            if (!arguments.length) {
                return this[option];
            }
            
            this[option] = _;
            
            return component;
        };
    }
    
    // api for chart, all items in `opts` object made into get-set
    for (var key in opts) {
        exports[key] = getSet(key, exports).bind(opts);
    }
    
    d3.rebind(exports, dispatch, 'on');
    return exports;
}

// Toast message function
function showToast(message, type) {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle'} mr-2"></i>
        ${message}
    `;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Remove after animation
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Load visitor statistics
function loadVisitorStatistics() {
    // Simulate API call delay
    setTimeout(() => {
        // Update visitor statistics with realistic data
        const totalVisitors = 12543;
        const totalCountries = 87;
        const activeVisitors = 24;
        
        $('#total-visitors').text(totalVisitors.toLocaleString());
        $('#total-countries').text(totalCountries);
        $('#active-visitors').text(activeVisitors);
        
        // Update top countries
        const topCountries = [
            {name: "United States", code: "US", visitors: 3245},
            {name: "India", code: "IN", visitors: 2102},
            {name: "United Kingdom", code: "GB", visitors: 1876},
            {name: "Germany", code: "DE", visitors: 1432},
            {name: "Canada", code: "CA", visitors: 987}
        ];
        
        const topCountriesContainer = $('#top-countries');
        topCountriesContainer.empty();
        
        topCountries.forEach(country => {
            const countryEl = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
                            <span class="text-xs font-bold">${country.code}</span>
                        </div>
                        <span class="text-gray-700 dark:text-gray-300">${country.name}</span>
                    </div>
                    <span class="text-gray-600 dark:text-gray-400">${country.visitors.toLocaleString()}</span>
                </div>
            `;
            topCountriesContainer.append(countryEl);
        });
    }, 1000);
}

// Load visitor chart - removed as per user request
// function loadVisitorChart() {
//     const chartContainer = $('#visitor-chart');
//     const chartPlaceholder = chartContainer.find('.chart-placeholder');
//     
//     // Simulate loading delay
//     setTimeout(() => {
//         // Hide placeholder
//         chartPlaceholder.addClass('hidden');
//         
//         // Clear any existing content
//         chartContainer.find('svg').remove();
//         
//         // Create SVG element using vanilla JS for better compatibility
//         const svgNS = "http://www.w3.org/2000/svg";
//         const svg = document.createElementNS(svgNS, "svg");
//         svg.setAttribute("width", "100%");
//         svg.setAttribute("height", "100%");
//         svg.setAttribute("viewBox", "0 0 600 200");
//         svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
//         svg.classList.add("absolute", "top-0", "left-0");
//         
//         // Add chart grid lines
//         for (let i = 0; i <= 5; i++) {
//             const y = 40 + i * 30;
//             
//             // Horizontal grid line
//             const line = document.createElementNS(svgNS, "line");
//             line.setAttribute("x1", "50");
//             line.setAttribute("y1", y.toString());
//             line.setAttribute("x2", "550");
//             line.setAttribute("y2", y.toString());
//             line.setAttribute("stroke", "#e2e8f0");
//             line.setAttribute("stroke-width", "1");
//             line.setAttribute("stroke-dasharray", "2,2");
//             svg.appendChild(line);
//             
//             // Y-axis labels
//             const value = (5 - i) * 200;
//             const text = document.createElementNS(svgNS, "text");
//             text.setAttribute("x", "40");
//             text.setAttribute("y", (y + 4).toString());
//             text.setAttribute("font-size", "10");
//             text.setAttribute("fill", "#94a3b8");
//             text.setAttribute("text-anchor", "end");
//             text.textContent = value.toString();
//             svg.appendChild(text);
//         }
//         
//         // Add chart data (simulated)
//         const dataPoints = [150, 220, 180, 300, 270, 400, 350, 500, 480, 620, 580, 750];
//         let pathData = "M50,190 ";
//         
//         dataPoints.forEach((point, index) => {
//             const x = 50 + index * 45;
//             const y = 190 - (point / 800) * 150;
//             pathData += `L${x},${y} `;
//         });
//         
//         // Add gradient definition
//         const defs = document.createElementNS(svgNS, "defs");
//         const linearGradient = document.createElementNS(svgNS, "linearGradient");
//         linearGradient.setAttribute("id", "areaGradient");
//         linearGradient.setAttribute("x1", "0%");
//         linearGradient.setAttribute("y1", "0%");
//         linearGradient.setAttribute("x2", "0%");
//         linearGradient.setAttribute("y2", "100%");
//         
//         const stop1 = document.createElementNS(svgNS, "stop");
//         stop1.setAttribute("offset", "0%");
//         stop1.setAttribute("stop-color", "#4f46e5");
//         stop1.setAttribute("stop-opacity", "0.5");
//         
//         const stop2 = document.createElementNS(svgNS, "stop");
//         stop2.setAttribute("offset", "100%");
//         stop2.setAttribute("stop-color", "#4f46e5");
//         stop2.setAttribute("stop-opacity", "0");
//         
//         linearGradient.appendChild(stop1);
//         linearGradient.appendChild(stop2);
//         defs.appendChild(linearGradient);
//         svg.appendChild(defs);
//         
//         // Add area under the curve
//         const areaPath = document.createElementNS(svgNS, "path");
//         areaPath.setAttribute("d", `${pathData} L550,190 L50,190 Z`);
//         areaPath.setAttribute("fill", "url(#areaGradient)");
//         areaPath.setAttribute("opacity", "0.3");
//         svg.appendChild(areaPath);
//         
//         // Add line
//         const linePath = document.createElementNS(svgNS, "path");
//         linePath.setAttribute("d", pathData);
//         linePath.setAttribute("fill", "none");
//         linePath.setAttribute("stroke", "#4f46e5");
//         linePath.setAttribute("stroke-width", "2");
//         svg.appendChild(linePath);
//         
//         // Add data points
//         dataPoints.forEach((point, index) => {
//             const x = 50 + index * 45;
//             const y = 190 - (point / 800) * 150;
//             
//             const circle = document.createElementNS(svgNS, "circle");
//             circle.setAttribute("cx", x.toString());
//             circle.setAttribute("cy", y.toString());
//             circle.setAttribute("r", "4");
//             circle.setAttribute("fill", "#4f46e5");
//             circle.setAttribute("stroke", "white");
//             circle.setAttribute("stroke-width", "2");
//             svg.appendChild(circle);
//         });
//         
//         // Add X-axis labels
//         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//         months.forEach((month, index) => {
//             const x = 50 + index * 45;
//             
//             const text = document.createElementNS(svgNS, "text");
//             text.setAttribute("x", x.toString());
//             text.setAttribute("y", "195");
//             text.setAttribute("font-size", "10");
//             text.setAttribute("fill", "#94a3b8");
//             text.setAttribute("text-anchor", "middle");
//             text.textContent = month;
//             svg.appendChild(text);
//         });
//         
//         // Append SVG to container
//         document.getElementById('visitor-chart').appendChild(svg);
//     }, 2000);
// }

// Initialize time filter functionality - removed as per user request
// function initTimeFilters() {
//     $('.time-filter').on('click', function() {
//         // Remove active class from all filters
//         $('.time-filter').removeClass('bg-gradient-to-r from-indigo-500 to-purple-500 text-white')
//                          .addClass('bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300');
//         
//         // Add active class to clicked filter
//         $(this).removeClass('bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300')
//                .addClass('bg-gradient-to-r from-indigo-500 to-purple-500 text-white');
//         
//         // Reload chart with new data (in a real implementation, this would fetch new data)
//         loadVisitorChart();
//     });
// }
