// Global Variables
let selectedJournals = [];
let totalPrice = 0;
let totalCount = 0;

// Function to Toggle Journal List Visibility
function toggleJournalList(subjectId) {
    const journalList = document.getElementById(subjectId);
    journalList.classList.toggle('hidden');
}

// Function to Update Selection (Qty, Price, and Journal Count)
function updateSelection() {
    selectedJournals = [];
    totalPrice = 0;
    totalCount = 0;

    const journals = document.querySelectorAll('.journal-checkbox:checked');
    journals.forEach((checkbox) => {
        const qty = parseInt(checkbox.parentElement.querySelector('.qty').value);
        const price = parseFloat(checkbox.getAttribute('data-price'));
        const journalName = checkbox.getAttribute('data-name');
        
        selectedJournals.push({ journalName, qty, price });
        totalPrice += price * qty;
        totalCount += qty;
    });

    document.getElementById('selected-count').textContent = `Total Journals: ${totalCount}`;
    document.getElementById('selected-price').textContent = `Total Price: ₹${totalPrice}`;
}

// Function to Open the Subscription Form
function openForm() {
    document.getElementById('subscription-form').classList.remove('hidden');
}

// Function to Close the Subscription Form
function closeForm() {
    document.getElementById('subscription-form').classList.add('hidden');
}

// Function to Submit the Form (Store in Review Section)
function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    let formDetails = `
        <p><strong>Name:</strong> ${formData.get('name')}</p>
        <p><strong>Email:</strong> ${formData.get('email')}</p>
        <p><strong>Address:</strong> ${formData.get('address1')} ${formData.get('address2')}</p>
        <p><strong>City:</strong> ${formData.get('city')}</p>
        <p><strong>State:</strong> ${formData.get('state')}</p>
    `;
    
    let journalDetails = '';
    selectedJournals.forEach((journal, index) => {
        journalDetails += `
            <p><strong>Journal ${index + 1}:</strong> ${journal.journalName} - ₹${journal.price} x ${journal.qty} = ₹${journal.price * journal.qty}</p>
        `;
    });

    document.getElementById('review-details').innerHTML = formDetails + journalDetails;
    document.getElementById('review-total').textContent = `Total Price: ₹${totalPrice}`;
    document.getElementById('perform-id').textContent = 'PERFORMA-' + new Date().getTime(); // Unique Perform ID
    document.getElementById('subscription-form').classList.add('hidden');
    document.getElementById('review-form').classList.remove('hidden');
}

// Function to Close the Review Form
function closeReviewForm() {
    document.getElementById('review-form').classList.add('hidden');
}

// Function to Confirm Subscription (Submit Data to Email & Database)
function confirmSubscription() {
    // You can add email sending and database storage logic here.
    alert('Subscription confirmed! Thank you.');
    closeReviewForm();
}
