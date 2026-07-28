// Mobile navigation drawer toggle
const hamburgerBtn = document.getElementById('js-hamburger');
const navigationMenu = document.getElementById('js-nav-menu');

if (hamburgerBtn && navigationMenu) {
    hamburgerBtn.addEventListener('click', () => {
        navigationMenu.classList.toggle('is-active');
        
        // Accessibility helper
        const isOpen = navigationMenu.classList.contains('is-active');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
}

function toggleMenu() {
    var nav = document.getElementById("navMenu");

    if (nav) {
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
        } else {
            nav.classList.add("active");
        }
    }
}

// BMI calculator
function calculateHealth() {
    const heightInput = parseFloat(document.getElementById('bmi-height').value);
    const weightInput = parseFloat(document.getElementById('bmi-weight').value);
    const resultBox = document.getElementById('bmi-result-box');

    if(isNaN(heightInput) || isNaN(weightInput) || heightInput <= 0 || weightInput <= 0) {
        alert('Please enter valid height and weight values!');
        return;
    }

    let heightInMeters;
    if (heightInput < 10) { 
        let feet = Math.floor(heightInput);
        let inches = Math.round((heightInput - feet) * 10);
        let totalInches = (feet * 12) + inches;
        heightInMeters = totalInches * 0.0254; // Inches to meters
    } else {
        heightInMeters = heightInput / 100;
    }

    const weight = weightInput;

    // BMI Calculation
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    
    // Status Determination
    let status = '';
    if(bmi < 18.5) {
        status = 'Underweight';
    } else if(bmi >= 18.5 && bmi <= 24.9) {
        status = 'Normal weight';
    } else if(bmi >= 25 && bmi <= 29.9) {
        status = 'Overweight';
    } else {
        status = 'Obese';
    }

    // Ideal Weight Range Calculation
    const minIdealWeight = (18.5 * (heightInMeters * heightInMeters)).toFixed(1);
    const maxIdealWeight = (24.9 * (heightInMeters * heightInMeters)).toFixed(1);

    const waterIntakeLiters = (weight * 0.035).toFixed(1);

    // Displaying Results
    document.getElementById('res-bmi').innerText = bmi;
    document.getElementById('res-status').innerText = status;
    document.getElementById('res-ideal').innerText = `${minIdealWeight} kg - ${maxIdealWeight} kg`;
    document.getElementById('res-water').innerText = `Approx. ${waterIntakeLiters} Liters/day`;

    // Show result box
    resultBox.style.display = 'flex';
}
// statbar
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
});


// 2. DOM LOADED EVENTS & TOGGLES

document.addEventListener("DOMContentLoaded", function() {
    // Enter key support for AI input
    const inputField = document.getElementById("userInput");
    if (inputField) {
        inputField.addEventListener("keypress", function(e) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (typeof askAI === "function") {
                    askAI();
                }
            }
        });
    }

    // Health Tips Toggle Feature inside DOMContentLoaded
    const toggleBtn = document.getElementById("hv-toggle-btn");
    const moreContent = document.getElementById("hv-more-content");

    if (toggleBtn && moreContent) {
        toggleBtn.addEventListener("click", function() {
            if (moreContent.style.display === "none" || moreContent.style.display === "") {
                moreContent.style.display = "block";
                toggleBtn.textContent = "Show Less";
            } else {
                moreContent.style.display = "none";
                toggleBtn.textContent = "Show More";
            }
        });
    }

    console.log("✅ HealthVibe AI Loaded Successfully!");
});


// 3. DERMATOLOGIST PAGE - SHOW MORE CARDS

function showMore() {
    const hiddenCards = document.querySelectorAll('.more-card');
    
    hiddenCards.forEach(card => {
        card.style.display = 'block';
    });
    
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}
// FAQ Accordion Toggle Logic
document.addEventListener("DOMContentLoaded", function() {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function() {
            const currentItem = this.parentElement;
            
            // Optional: Close other open items
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove("active");
                }
            });

            // Toggle current item active state
            currentItem.classList.toggle("active");
        });
    });
});


function searchAndScrollHospital() {
    let input = document.getElementById('hospitalSearch').value.toLowerCase().trim();
    let container = document.querySelector('.hospitals-container');
    let boxes = container.getElementsByClassName('hospital-box');

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove('highlight-card');
    }

    if (input === "") return;

    for (let i = 0; i < boxes.length; i++) {
        let textValue = boxes[i].textContent || boxes[i].innerText;
        
        if (textValue.toLowerCase().indexOf(input) > -1) {
            let targetScrollTop = boxes[i].offsetTop - container.offsetTop;
            container.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
            });
            
            boxes[i].classList.add('highlight-card');
            break;
        }
    }
}


// ai chat-bot

async function askGroqAI() {
    let userInput = document.getElementById('aiUserInput').value.trim();
    let outputBox = document.getElementById('aiChatOutput');

    if (userInput === "") {
        outputBox.innerText = "Please type something first!";
        return;
    }

    outputBox.innerText = "Generating response.....";

    const apiKey = "your api key here";
    const url = "https://api.groq.com/openai/v1/chat/completions";

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", 
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful medical directory assistant for a website called HealthVibe in Pakistan. Keep answers short, polite, and helpful."
                    },
                    {
                        role: "user",
                        content: userInput
                    }
                ]
            })
        });

        let data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            outputBox.innerText = data.choices[0].message.content;
        } else {
            outputBox.innerText = "Unable to retrieve an answer at the moment.";
        }

    } catch (error) {
        console.error("Error:", error);
        outputBox.innerText = "Network error. Please try again later.";
    }
}

function toggleAiChatWindow() {
    let chatWindow = document.getElementById('aiFloatingWindow');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'block';
        document.getElementById('aiUserInput').focus(); 
    } else {
        chatWindow.style.display = 'none';
    }
}

// midicne page


function showMoreMedicines() {
    let extraCards = document.getElementsByClassName('extra-card');
    for (let i = 0; i < extraCards.length; i++) {
        extraCards[i].style.display = "flex";
    }
    // Show More button ko hide kar dena click hone ke baad
    let showMoreContainer = document.getElementById('showMoreContainer');
    if (showMoreContainer) {
        showMoreContainer.style.display = "none";
    }
}

function searchMedicines() {
    let input = document.getElementById('medicineSearch').value.toLowerCase().trim();
    let cards = document.getElementsByClassName('medicine-card');
    let noProductMsg = document.getElementById('noProductMsg');
    let showMoreContainer = document.getElementById('showMoreContainer');
    let sectionHeading = document.getElementById('sectionHeading');
    
    if (input === "") {
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].classList.contains('extra-card')) {
                cards[i].style.display = "none";
            } else {
                cards[i].style.display = "flex";
            }
            cards[i].classList.remove('highlighted');
        }
        
        noProductMsg.style.display = "none";
        if (sectionHeading) sectionHeading.style.display = "block";
        if (showMoreContainer) showMoreContainer.style.display = "block";
        return;
    }

    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "flex";
    }

    if (showMoreContainer) {
        showMoreContainer.style.display = "none";
    }

    let foundCount = 0;

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        let brand = cards[i].getElementsByClassName('brand-tag')[0].innerText.toLowerCase();

        if (title.includes(input) || brand.includes(input)) {
            cards[i].style.display = "flex";
            cards[i].classList.add('highlighted');
            foundCount++;
        } else {
            cards[i].style.display = "none";
            cards[i].classList.remove('highlighted');
        }
    }

    // No product found message logic
    if (foundCount === 0) {
        if (sectionHeading) sectionHeading.style.display = "none";
        noProductMsg.style.display = "block";
    } else {
        if (sectionHeading) sectionHeading.style.display = "block";
        noProductMsg.style.display = "none";
    }
}

// pop up shown

const form = document.querySelector('form');
const popup = document.getElementById('successPopup');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Page reload hone se rokay ga
        popup.classList.add('active'); // Popup ko screen par show karega
    });
}

function closePopup() {
    popup.classList.remove('active');
    form.reset(); 
}
// stat
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.unique-num');
    const targetValues = ["12,400+", "38+", "2.1M+", "4.8 / 5", "24/7"];
    const rawTargets = [12400, 38, 2.1, 4.8, 247];

    const runCounters = () => {
        counters.forEach((counter, index) => {
            const target = rawTargets[index];
            let count = 0;
            const speed = target / 30; 
            
            const updateCount = () => {
                count += speed;
                if (count < target) {
                    if (index === 2) {
                        counter.innerText = count.toFixed(1) + 'M+';
                    } else if (index === 3) {
                        counter.innerText = count.toFixed(1);
                    } else if (index === 4) {
                        counter.innerText = Math.floor(count);
                    } else {
                        counter.innerText = Math.floor(count).toLocaleString() + '+';
                    }
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = targetValues[index];
                }
            };
            
            updateCount();
        });
    };

    runCounters();

    setInterval(() => {
        runCounters();
    }, 4000);
});
// hero whatsapp btn
document.addEventListener("DOMContentLoaded", () => {
    const videoConsultBtn = document.querySelector('.cta-btn');

    if (videoConsultBtn) {
        videoConsultBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const phoneNumber = "+923252784435"; 
            const message = "Hello, I want to book a video consultation on Health Vibe.";
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappURL, '_blank');
        });
    }
});

// join as doctor
let doctorProfiles = [];

function handleDoctorRegistration(event) {
    event.preventDefault();

    const editIndex = document.getElementById('edit-index').value;
    const name = document.getElementById('doc-name').value;
    const speciality = document.getElementById('doc-speciality').value;
    const phone = document.getElementById('doc-phone').value;
    const email = document.getElementById('doc-email').value;

    if (editIndex === "") {
        // New Profile Create
        const newProfile = { id: Date.now(), name, speciality, phone, email };
        doctorProfiles.push(newProfile);
    } else {
        // Update Existing Profile via Popup
        doctorProfiles[editIndex] = { id: doctorProfiles[editIndex].id, name, speciality, phone, email };
        document.getElementById('edit-index').value = "";
    }

    document.getElementById('doctor-form').reset();
    
    // Show Success Initial Popup
    showSuccessPopup();
}

function showSuccessPopup() {
    const modalBox = document.getElementById('success-modal');
    const modalContent = document.getElementById('modal-box-content');

    modalContent.innerHTML = `
        <div class="success-icon">✓</div>
        <h3>Profile Created Successfully!</h3>
        <p>Your doctor profile has been created. If you want to review or manage your information, click below.</p>
        <div class="modal-btn-group">
            <button class="modal-btn-primary" onclick="openManagePopup()">Manage Your Profile</button>
        </div>
    `;

    modalBox.style.display = 'flex';
}

function openManagePopup() {
    const modalContent = document.getElementById('modal-box-content');
    const profile = doctorProfiles[doctorProfiles.length - 1]; // Latest profile

    modalContent.innerHTML = `
        <h3>Manage Your Profile</h3>
        <p>Review your information below:</p>
        <div class="popup-profile-card">
            <h4>Dr. ${profile.name}</h4>
            <p><strong>Speciality:</strong> ${profile.speciality}</p>
            <p><strong>Phone:</strong> ${profile.phone}</p>
            <p><strong>Email:</strong> ${profile.email}</p>
        </div>
        <div class="modal-btn-group">
            <button class="modal-btn-secondary" onclick="triggerPopupEdit()">Edit Profile</button>
            <button class="modal-btn-primary" onclick="finishAndLockProfile()">Finish & Lock Profile</button>
        </div>
    `;
}

// Function to handle editing directly inside the Popup Modal
function triggerPopupEdit() {
    const profile = doctorProfiles[doctorProfiles.length - 1];
    const modalContent = document.getElementById('modal-box-content');
    const editIndex = doctorProfiles.length - 1;

    modalContent.innerHTML = `
        <h3>Edit Your Profile</h3>
        <p>Update your details below:</p>
        <form id="popup-edit-form" onsubmit="savePopupEdit(event, ${editIndex})">
            <div class="input-group" style="margin-bottom: 12px;">
                <input type="text" id="popup-name" value="${profile.name}" placeholder="Enter full name" required style="width:100%; padding:12px; border:1.5px solid #cbd5e1; border-radius:10px; box-sizing:border-box;">
            </div>
            <div class="input-group" style="margin-bottom: 12px;">
                <select id="popup-speciality" required style="width:100%; padding:12px; border:1.5px solid #cbd5e1; border-radius:10px; box-sizing:border-box; background:#fff;">
                    <option value="Cardiologist" ${profile.speciality === 'Cardiologist' ? 'selected' : ''}>Cardiologist</option>
                    <option value="Dermatologist" ${profile.speciality === 'Dermatologist' ? 'selected' : ''}>Dermatologist</option>
                    <option value="Neurologist" ${profile.speciality === 'Neurologist' ? 'selected' : ''}>Neurologist</option>
                    <option value="General Physician" ${profile.speciality === 'General Physician' ? 'selected' : ''}>General Physician</option>
                </select>
            </div>
            <div class="input-group" style="margin-bottom: 12px;">
                <input type="tel" id="popup-phone" value="${profile.phone}" placeholder="Phone number" required style="width:100%; padding:12px; border:1.5px solid #cbd5e1; border-radius:10px; box-sizing:border-box;">
            </div>
            <div class="input-group" style="margin-bottom: 20px;">
                <input type="email" id="popup-email" value="${profile.email}" placeholder="Email address" required style="width:100%; padding:12px; border:1.5px solid #cbd5e1; border-radius:10px; box-sizing:border-box;">
            </div>
            <div class="modal-btn-group">
                <button type="submit" class="modal-btn-primary">Save Changes</button>
            </div>
        </form>
    `;
}

function savePopupEdit(event, index) {
    event.preventDefault();
    
    // Update profile data from popup inputs
    doctorProfiles[index] = {
        id: doctorProfiles[index].id,
        name: document.getElementById('popup-name').value,
        speciality: document.getElementById('popup-speciality').value,
        phone: document.getElementById('popup-phone').value,
        email: document.getElementById('popup-email').value
    };

    // Show updated manage view back in popup
    openManagePopup();
}

function finishAndLockProfile() {
    const modalContent = document.getElementById('modal-box-content');

    

    // Direct Final Success Lock Message
    modalContent.innerHTML = `
        <div class="success-icon">✓</div>
        <h3>Your Profile is Successfully Created!</h3>
        <p>Your profile is locked and saved permanently. Thank you for joining HealthVibe!</p>
        <div class="modal-btn-group">
            <button class="modal-btn-primary" onclick="closeAllAndReset()">Done</button>
        </div>
    `;
}

function closeAllAndReset() {
    document.getElementById('success-modal').style.display = 'none';
    doctorProfiles = []; // Reset state cleanly
}


function handleBooking(event) {
    event.preventDefault(); 

    const name = document.getElementById('userName').value;
    const doctor = document.getElementById('doctorSelect').value;
    const appointmentTime = "Today at 4:30 PM";

    const detailsElement = document.getElementById('popupDetails');
    detailsElement.innerHTML = `
        <p><i class="fa-solid fa-calendar-check" style="color: #007bff; width: 20px;"></i> <strong>Status:</strong> Appointment is Confirmed!</p>
        <p><i class="fa-solid fa-user" style="color: #007bff; width: 20px;"></i> <strong>Patient:</strong> ${name}</p>
        <p><i class="fa-solid fa-stethoscope" style="color: #007bff; width: 20px;"></i> <strong>Doctor Specialty:</strong> ${doctor}</p>
        <p><i class="fa-solid fa-clock" style="color: #007bff; width: 20px;"></i> <strong>Time:</strong> ${appointmentTime}</p>
    `;

    document.getElementById('successPopup').style.display = 'flex';
}

function triggerSprinklesAndClose() {
    setTimeout(() => {
        document.getElementById('successPopup').style.display = 'none';
        document.querySelector('form').reset();
    }, 100);
}

// bmi section
document.addEventListener("DOMContentLoaded", function () {
  const bmiSection = document.querySelector(".bmi-section-animate");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, observerOptions);

  if (bmiSection) {
    observer.observe(bmiSection);
  }
});

// add to cart

document.addEventListener('DOMContentLoaded', () => {
    
    const style = document.createElement('style');
    style.innerHTML = `
        .hv-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .hv-modal-box {
            background: #ffffff;
            padding: 25px;
            border-radius: 12px;
            width: 400px;
            max-width: 90%;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            text-align: center;
            animation: hvScaleIn 0.3s ease-in-out;
        }
        @keyframes hvScaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .hv-modal-box h3 {
            margin-bottom: 15px;
            color: #2c3e50;
        }
        .hv-item-details {
            display: flex;
            align-items: center;
            gap: 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
            margin-bottom: 15px;
        }
        .hv-item-details img {
            width: 60px;
            height: 60px;
            object-fit: contain;
            border-radius: 8px;
            background: #f9f9f9;
            padding: 5px;
        }
        .hv-summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 15px;
            color: #555;
        }
        .hv-summary-row.total {
            font-weight: bold;
            color: #27ae60;
            font-size: 18px;
            border-top: 1px solid #eee;
            padding-top: 10px;
            margin-top: 10px;
        }
        .hv-btn-group {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        .hv-btn {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
        }
        .hv-btn-primary {
            background: #27ae60;
            color: white;
        }
        .hv-btn-secondary {
            background: #e74c3c;
            color: white;
        }
        .hv-success-icon {
            font-size: 50px;
            color: #27ae60;
            margin-bottom: 10px;
        }
    `;
    document.head.appendChild(style);

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const card = event.target.closest('.medicine-card');

            const title = card.querySelector('h3').innerText;
            const priceText = card.querySelector('.price').innerText;
            const price = parseFloat(priceText.replace('Rs. ', '').trim());
            const imageSrc = card.querySelector('.medicine-img-box img').src;
            const dosage = card.querySelector('p.dosage').innerText;

            const shippingFee = 150;
            const totalAmount = price + shippingFee;

            showCartModal(title, price, imageSrc, dosage, shippingFee, totalAmount);
        });
    });

    function showCartModal(title, price, imageSrc, dosage, shippingFee, totalAmount) {
        removeExistingModals();

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'hv-modal-overlay';
        modalOverlay.id = 'hvActiveModal';

        modalOverlay.innerHTML = `
            <div class="hv-modal-box">
                <h3>Your Shopping Cart</h3>
                <div class="hv-item-details">
                    <img src="${imageSrc}" alt="${title}">
                    <div>
                        <h4 style="margin: 0 0 5px 0; color: #333;">${title}</h4>
                        <p style="margin: 0; font-size: 13px; color: #777;">${dosage}</p>
                    </div>
                </div>
                <div class="hv-summary-row">
                    <span>Price:</span>
                    <span>Rs. ${price}</span>
                </div>
                <div class="hv-summary-row">
                    <span>Shipping Fee:</span>
                    <span>Rs. ${shippingFee}</span>
                </div>
                <div class="hv-summary-row total">
                    <span>Total Amount:</span>
                    <span>Rs. ${totalAmount}</span>
                </div>
                <div class="hv-btn-group">
                    <button class="hv-btn hv-btn-secondary" id="hvCloseModal">Cancel</button>
                    <button class="hv-btn hv-btn-primary" id="hvPlaceOrder">Place Order</button>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        document.getElementById('hvCloseModal').addEventListener('click', () => {
            modalOverlay.remove();
        });

        document.getElementById('hvPlaceOrder').addEventListener('click', () => {
            modalOverlay.remove();
            showSuccessModal();
        });
    }

    function showSuccessModal() {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'hv-modal-overlay';

        modalOverlay.innerHTML = `
            <div class="hv-modal-box">
                <div class="hv-success-icon">✓</div>
                <h3 style="color: #27ae60;">Order Placed Successfully!</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 20px;">Thank you for choosing HealthVibe. Your order has been placed and is on its way.</p>
                <button class="hv-btn hv-btn-primary" id="hvSuccessOk" style="width: 100%;">OK</button>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        document.getElementById('hvSuccessOk').addEventListener('click', () => {
            modalOverlay.remove();
        });
    }

    function removeExistingModals() {
        const existing = document.getElementById('hvActiveModal');
        if (existing) {
            existing.remove();
        }
    }
});

// dermatologist

function searchDoctor() {
    const value = document.getElementById('doctorInput').value;
    const routes = {
        "Dermatologist": "dermatologist.html",
        "Dentist": "dentist.html",
        "Cardiologist": "cardiologist.html"
    };

    if (routes[value]) {
        window.location.href = routes[value];
    } else {
        alert("Please select a valid category from the list.");
    }
}

function handleDoctorFilter(type, buttonElement) {
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');

    const container = document.querySelector('.doctors-grid-container');
    const doctorCards = Array.from(document.querySelectorAll('.doctor-card'));

    doctorCards.forEach(card => {
        const cardExp = parseInt(card.getAttribute('data-experience'));

        if (type === 'all' || type === 'fee-low' || type === 'rating') {
            card.style.display = 'block';
        } else if (type === 'experienced' && cardExp >= 12) {
            card.style.display = 'block';
        } else if (type === 'experienced' && cardExp < 12) {
            card.style.display = 'none';
        }
    });

    if (type === 'fee-low' || type === 'rating') {
        doctorCards.sort((a, b) => {
            if (type === 'fee-low') {
                let feeA = parseInt(a.getAttribute('data-fee'));
                let feeB = parseInt(b.getAttribute('data-fee'));
                return feeA - feeB;
            } else if (type === 'rating') {
                let ratingA = parseFloat(a.getAttribute('data-rating'));
                let ratingB = parseFloat(b.getAttribute('data-rating'));
                return ratingB - ratingA;
            }
            return 0;
        });

        doctorCards.forEach(card => container.appendChild(card));
    }
}


function handleDoctorFilter(type, buttonElement) {
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    buttonElement.classList.add('active');

    const container = document.querySelector('.doctors-grid-container');
    const doctorCards = Array.from(document.querySelectorAll('.doctor-card'));

    doctorCards.forEach(card => {
        const cardExp = parseInt(card.getAttribute('data-experience'));

        if (type === 'all' || type === 'fee-low' || type === 'rating') {
            card.style.display = 'block';
        } else if (type === 'experienced' && cardExp >= 12) {
            card.style.display = 'block';
        } else if (type === 'experienced' && cardExp < 12) {
            card.style.display = 'none';
        }
    });

    if (type === 'fee-low' || type === 'rating') {
        doctorCards.sort((a, b) => {
            if (type === 'fee-low') {
                let feeA = parseInt(a.getAttribute('data-fee'));
                let feeB = parseInt(b.getAttribute('data-fee'));
                return feeA - feeB;
            } else if (type === 'rating') {
                let ratingA = parseFloat(a.getAttribute('data-rating'));
                let ratingB = parseFloat(b.getAttribute('data-rating'));
                return ratingB - ratingA;
            }
            return 0;
        });

        doctorCards.forEach(card => container.appendChild(card));
    }
}