window.addEventListener('DOMContentLoaded', () => {
    // === Smooth Scroll with Offset ===
    const navItems = document.querySelectorAll(".nav-item");
    const dropdownItems = document.querySelectorAll(".dropdown-li");
    const allTargetButtons = document.querySelectorAll("[data-target]");
    const checkbox = document.getElementById('checkbox'); // hamburger checkbox
    const header = document.querySelector('.header');
    const body = document.body;

    let lastScrollY = window.scrollY;

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

    themeSelector.addEventListener("change", () => {
        // Remove all theme classes
        rootElement.classList.remove("theme-dark", "theme-light", "theme-blue");

        // Add the selected theme class
        rootElement.classList.add(themeSelector.value);
    });

    // Optional: Load saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        rootElement.classList.add(savedTheme);
        themeSelector.value = savedTheme;
    }

    // Save selection
    themeSelector.addEventListener("change", () => {
        localStorage.setItem("theme", themeSelector.value);
    });

    // ------------- SECTION 4: Skill Boxes -------------

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
        rootMargin: "0px 0px -20% 0px", // Trigger when 30% of the skills-box is visible
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

    const titleTargets = document.querySelectorAll(
        ".section-title-experience, .section-title-projects, .section-title-contact"
    );

    const titleObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                if (el.classList.contains("section-title-experience")) {
                    el.classList.add("animate");
                } else if (el.classList.contains("section-title-projects")) {
                    el.classList.add("animate");
                } else if (el.classList.contains("section-title-contact")) {
                    el.classList.add("animate-contact");
                }

                titleObserver.unobserve(el); // Animate once
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0
    });

    titleTargets.forEach(target => titleObserver.observe(target));


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