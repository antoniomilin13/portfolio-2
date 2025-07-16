window.addEventListener('DOMContentLoaded', () => {
    // === LOADER ===

    const loader = document.querySelector(".loader-content");
    const content = document.querySelector(".site-content");

    setTimeout(() => {
        loader.classList.add("hidden");
        setTimeout(() => {
            loader.style.display = "none";
            content.style.display = "block";
        }, 400); // allow fade transition to complete
    }, 2000);


    // === Smooth Scroll with Offset ===
    const navItems = document.querySelectorAll(".nav-item");
    const dropdownItems = document.querySelectorAll(".dropdown-li");
    const allTargetButtons = document.querySelectorAll("[data-target]");
    const checkbox = document.getElementById('checkbox'); // hamburger checkbox
    const body = document.body;

    // Function to handle smooth scroll and active class toggling
    function setupClickScroll(items, closeDropdown = false) {
        items.forEach(item => {
            item.addEventListener("click", () => {
                const sectionID = item.getAttribute("data-target");
                const section = document.getElementById(sectionID);

                if (section) {
                    const offset = 70;
                    const top = section.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top,
                        behavior: "smooth"
                    });
                }

                // Remove active from all items in this group, add to clicked
                items.forEach(i => i.classList.remove("active"));
                item.classList.add("active");

                // If this is a dropdown item, close dropdown and enable scrolling
                if (closeDropdown) {
                    checkbox.checked = false;
                    body.classList.remove('no-scroll');
                }
            });
        });
    }

    setupClickScroll(navItems);
    setupClickScroll(dropdownItems, true); // true to close dropdown and enable scroll
    setupClickScroll(allTargetButtons);
    // ------------- SECTION home page: Animate .item elements on scroll -------------

    const fname = document.querySelector('.fname');
    const lname = document.querySelector('.lname');
    const contactBtn = document.querySelector('.contact-btn');
    const scrollIcon = document.querySelector('.scrolldown');

    fname.classList.add('animate');
    lname.classList.add('animate');
    contactBtn.classList.add('animate');
    scrollIcon.classList.add('animate');

    // -----------------------------------------------
    // 
    // --- SLIDER ABOUT ME ---
    let slideItems = document.querySelectorAll('.slide-wrap .slide-item');
    let nextBtn = document.getElementById('nextBtn');
    let prevBtn = document.getElementById('prevBtn');

    let visibleItems = 2;

    function loadShow() {
        let stt = 0;
        slideItems[visibleItems].style.transform = `none`;
        slideItems[visibleItems].style.zIndex = 101;
        slideItems[visibleItems].style.filter = 'none';
        slideItems[visibleItems].style.opacity = 1;

        for (var i = visibleItems + 1; i < slideItems.length; i++) {
            stt++;
            slideItems[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
            slideItems[i].style.zIndex = 100-stt;
            slideItems[i].style.filter = 'blur(5px)';
            slideItems[i].style.opacity = stt > 2 ? 0 : 0.6;
        }

        stt = 0;

        for (var i = visibleItems - 1; i >= 0; i--) {
            stt++;
            slideItems[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
            slideItems[i].style.zIndex = 100-stt;
            slideItems[i].style.filter = 'blur(5px)';
            slideItems[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
    }

    loadShow();

    // next & prev clicking functionality
    nextBtn.onclick = function () {
        visibleItems = visibleItems + 1 < slideItems.length ? visibleItems + 1 : visibleItems;
        loadShow();
    }

    prevBtn.onclick = function () {
        visibleItems = visibleItems - 1 >= 0 ? visibleItems - 1 : visibleItems;
        loadShow();
    }

    // ------------- SECTION experience: Animate .item elements on scroll -------------

    const items = document.querySelectorAll(".item");

    // Select all elements with class "item"

    // Create an IntersectionObserver to watch when items enter the viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the item is visible in the viewport:

                if (window.innerWidth <= 840) {
                    // On small screens, apply the slideUp animation
                    entry.target.classList.add("slideUp");
                } else {
                    // On wider screens, apply left/right slide animation
                    entry.target.classList.add("animate");
                }
            }
        });
    },
        // Observer options change based on screen width
        window.innerWidth <= 840
            ? { threshold: 0 } // Trigger as soon as any part is visible (mobile)
            : {
                root: null,
                rootMargin: "0px 0px -35% 0px", // Trigger when 35% from bottom
                threshold: 0
            }
    );

    // Start observing each item
    items.forEach(item => observer.observe(item));


    // ------------- SECTION 2: Split text into span elements for hover effect -------------

    // --------- LETTER SPLITTING FOR fname & lname ---------
    // --------- LETTER SPLITTING FOR fname & lname ---------
    const splitLetters = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return;

        const text = el.textContent;
        el.innerHTML = ''; // Clear original text

        [...text].forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('letter');
            el.appendChild(span);
        });
    };

    // Apply to both elements
    splitLetters('.fname');
    splitLetters('.lname');

    // --------- RANDOM HOVER SIMULATION ---------
    const allLetters = document.querySelectorAll('.letter');
    let intervalId;

    const startRandomHover = () => {
        intervalId = setInterval(() => {
            const index = Math.floor(Math.random() * allLetters.length);
            const letter = allLetters[index];
            letter.classList.add('hover-effect');
            setTimeout(() => {
                letter.classList.remove('hover-effect');
            }, 1000); // how long the effect lasts
        }, 2000); // trigger every 3s
    };

    const stopRandomHover = () => clearInterval(intervalId);

    // --------- STOP ANIMATION ON HOVER ---------
    allLetters.forEach(letter => {
        letter.addEventListener('mouseenter', stopRandomHover);
        letter.addEventListener('mouseleave', startRandomHover);
    });

    // Start the hover animation
    startRandomHover();



    // ------------- SECTION 3: Color themes -------------

    // ---------  ---------

    const themeSelector = document.getElementById("themeSelector");
    const rootElement = document.documentElement; // <html> element

    // Load saved theme or set default to 'theme-light'
    const savedTheme = localStorage.getItem("theme");
    const defaultTheme = "theme-light";
    const initialTheme = savedTheme || defaultTheme;

    rootElement.classList.add(initialTheme);
    themeSelector.value = initialTheme;

    // Change theme on selection
    themeSelector.addEventListener("change", () => {
        // Remove existing theme classes
        rootElement.classList.remove("theme-dark", "theme-light");

        // Add selected theme
        const selectedTheme = themeSelector.value;
        rootElement.classList.add(selectedTheme);

        // Save to localStorage
        localStorage.setItem("theme", selectedTheme);
    });

    // ------------- SECTION 4: Skill Boxes -------------
    // --- skills ection slide right ---
    const skillsSection = document.querySelectorAll('.skills-section');

    const skillsSectionObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                skillsSectionObs.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -30% 0px", // Trigger when 30% of the skills-box is visible
        threshold: 0
    });

    skillsSection.forEach(box => skillsSectionObs.observe(box));

    // ---------  ---------
    const skillBoxes = document.querySelectorAll('.skills-box');

    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                skillObserver.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: 0
    });

    skillBoxes.forEach(box => skillObserver.observe(box));

    // ------------- SECTION 5: Project Boxes -------------

    // ---------  ---------
    const projectBox = document.querySelectorAll('.box-1, .box-2, .box-3');

    const projectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-project-box');
                projectObserver.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -30% 0px", // Trigger when 30% of the project-box is visible
        threshold: 0
    });

    projectBox.forEach(box => projectObserver.observe(box));

    // ------------------------------------------------------------
    // Font Family animation -> when you scroll to its intersection

    const wrappers = document.querySelectorAll(".title-wrapper");

    const titleObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const wrapper = entry.target;

                // Find the child section title inside the wrapper
                const el = wrapper.querySelector(
                    ".section-title-experience, .section-title-projects, .section-title-contact"
                );

                if (el) {
                    if (el.classList.contains("section-title-experience")) {
                        el.classList.add("animate-exp");
                    } else if (el.classList.contains("section-title-projects")) {
                        el.classList.add("animate-projects");
                    } else if (el.classList.contains("section-title-contact")) {
                        el.classList.add("animate-contact");
                    }
                }

                titleObserver.unobserve(wrapper); // Animate once per wrapper
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0
    });

    // Observe all wrappers
    wrappers.forEach(wrapper => titleObserver.observe(wrapper));

    // ------------------------------------------------------------
    // POP UP BOX
    // === Popup Experience DB ===
    const experiences = {
        exp1: {
            title: "Millini Olive Oil Company",
            description: [
                "Designed and launched a fully functional eCommerce platform from scratch, resulting in a 40% increase in online orders within the first three months.",
                "Built secure authentication, account management, and order tracking features using modern web technologies (React, Node.js, MongoDB).",
                "Integrated Stripe payment gateway, facilitating seamless transactions and reducing cart abandonment by 25%.",
                "Implemented responsive UI/UX with HTML, CSS, and JavaScript, ensuring 100% mobile compatibility and improved user engagement.",
                "Conducted SEO optimization, boosting website performance and driving a 65% increase in organic traffic."
            ],
        },
        exp2: {
            title: "CSUB",
            description: [
                "Studied Computer Science at CSUB. Led multiple projects, participated in hackathons, and developed software in collaborative teams."
            ],
        },
        exp3: {
            title: "Croatian Swimming Federation",
            description: [
                "Earned a place at 4 semi-finals at the 2023 European Swimming Championships competing for Croatia",
                "10+ time Croatian National Champion across various swimming events",
                "Broke multiple national records",
                "Assisted in coaching and performance analysis, implementing physics-based insights and real-time data programs to optimize training",
                "Mentored six teammates, guiding them to achieve record-breaking swims at the 2024 Croatian National Championships"
            ]
        },
        exp4: {
            title: "CSUB Collegiate Athlete",
            description: [
                "Awarded with an athletic scholarship as a key member of the Division 1 collegiate swimming team",
                "Set multiple school records and achieved top-3 finishes at U.S. National Championships",
                "Established a record-breaking performance at Princeton University swim meet (December 2022)",
                "Mentored teammates on nutrition, workout planning, mental strength, and recovery strategies"
            ]
        }
    };

    // === Popup Logic ===
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
    const popupTitle = document.getElementById("popup-title");
    const popupDescription = document.getElementById("popup-description");

    const viewMoreLinks = document.querySelectorAll(".exp-button");

    viewMoreLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const expID = link.getAttribute("data-id");
            const data = experiences[expID];

            if (data) {
                popupTitle.textContent = data.title;

                // Clear previous content
                popupDescription.innerHTML = "";

                // Check if description is an array (for bullet points)
                if (Array.isArray(data.description)) {
                    const ul = document.createElement("ul");
                    data.description.forEach(sentence => {
                        const li = document.createElement("li");
                        li.textContent = sentence;
                        ul.appendChild(li);
                    });
                    popupDescription.appendChild(ul);
                } else {
                    popupDescription.textContent = data.description;
                }

                popup.style.display = "flex";
            }
        });
    });

    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});