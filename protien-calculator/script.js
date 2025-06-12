// Enhanced selection script
document.querySelectorAll('.option-card').forEach(card => {
    const radio = card.querySelector('input[type="radio"]');
    
    // Update visual state on change
    radio.addEventListener('change', function() {
        // Clear all selections in the group
        const group = card.closest('.option-group');
        group.querySelectorAll('.option-card').forEach(c => 
            c.classList.remove('selected'));
        
        // Add selection to clicked card
        if(this.checked) {
            card.classList.add('selected');
        }
    });

    // Initial check for pre-selected values
    if(radio.checked) card.classList.add('selected');
});


// Fixed protein calculation 
const PROTEIN_FACTORS = {
    activity: {
        'Sedentary': 0.8,
        'Moderate': 1.2,
        'Active': 1.6
    },
    bodyType: {
        'skinny': 1.2,
        'skinny-fat': 1.0,
        'athletic': 1.5,
        'overweight': 0.8
    },
    gender: {
        'male': 1.1,
        'female': 1.0,
        'other': 1.0
    },
    diet: {
        'vegetarian': 0.9,
        'eggetarian': 1.0,
        'non-vegetarian': 1.1
    }
};

function calculateProtein(data) {
    // Convert all values to numbers
    const weight = Number(data.weight);
    const age = Number(data.age);
    const height = Number(data.height);
    
    // Base calculation using WHO recommendation
    let base = weight * PROTEIN_FACTORS.activity[data.activity];
    
    // Apply modifiers
    base *= PROTEIN_FACTORS.bodyType[data.bodyType] * 
           PROTEIN_FACTORS.gender[data.gender] * 
           PROTEIN_FACTORS.diet[data.diet];
    
    // Age adjustment
    if (age > 65) base *= 1.2;
    if (age < 25) base *= 1.1;
    
    // Height adjustment (cm/100 gives meter)
    base *= Math.sqrt(height/100);
    
    return Math.max(Math.round(base), 50);
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get all form values properly
    const formData = {
        age: document.querySelector('input[placeholder="Age (years)"]').value,
        weight: document.querySelector('input[placeholder="Weight (kg)"]').value,
        height: document.querySelector('input[placeholder="Height (cm)"]').value,
        activity: document.querySelector('select').value,
        bodyType: document.querySelector('input[name="body-type"]:checked')?.value,
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        diet: document.querySelector('input[name="diet"]:checked')?.value
    };

    // Validate all fields
    if (!Object.values(formData).every(Boolean)) {
        alert('Please fill all fields correctly!');
        return;
    }

    // Convert to numbers and validate
    if ([formData.age, formData.weight, formData.height].some(isNaN)) {
        alert('Please enter valid numbers for age, weight, and height!');
        return;
    }

    // Check valid selections
    const validActivity = Object.keys(PROTEIN_FACTORS.activity).includes(formData.activity);
    const validBodyType = Object.keys(PROTEIN_FACTORS.bodyType).includes(formData.bodyType);
    const validGender = Object.keys(PROTEIN_FACTORS.gender).includes(formData.gender);
    const validDiet = Object.keys(PROTEIN_FACTORS.diet).includes(formData.diet);
    
    if (!validActivity || !validBodyType || !validGender || !validDiet) {
        alert('Invalid selection detected! Please check your choices.');
        return;
    }

    // Calculate and display
    const protein = calculateProtein(formData);
    
    // Create the result modal
    const modalHTML = `
        <div class="result-modal-overlay">
            <div class="result-modal">
                <h3>Recommended Daily Protein Intake</h3>
                <div class="protein-result">${protein}g</div>
                <p>Based on your profile:</p>
                <ul>
                    <li>Activity Level: ${formData.activity}</li>
                    <li>Body Type: ${formData.bodyType}</li>
                    <li>Diet: ${formData.diet}</li>
                </ul>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        </div>
    `;
    
    // Insert the modal at the end of the body (centered)
    document.body.insertAdjacentHTML('beforeend', modalHTML);
});
