// Récupérer les éléments du DOM
const companyFields = {
    name: document.getElementById('companyName'),
    street: document.getElementById('companyStreet'),
    town: document.getElementById('companyTown'),
    zip: document.getElementById('companyZip'),
    tva: document.getElementById('companyTVA'),
    mail: document.getElementById('companyMail'),
    iban: document.getElementById('companyIBAN'),
    bic: document.getElementById('companyBIC')
};

const clientFields = {
    company: document.getElementById('clientCompany'),
    street: document.getElementById('clientStreet'),
    town: document.getElementById('clientTown'),
    zip: document.getElementById('clientZip'),
    tva: document.getElementById('clientTVA')
};

const invoiceFields = {
    date: document.getElementById('invoiceDate'),
    number: document.getElementById('invoiceNumber'),
    vatRate: document.getElementById('vatRate')
};

const articleFields = {
    description: document.getElementById('articleDescription'),
    quantity: document.getElementById('articleQuantity'),
    unitPrice: document.getElementById('articleUnitPrice')
};

const previewFields = {
    company: {
        name: document.getElementById('previewCompanyName'),
        street: document.getElementById('previewCompanyStreet'),
        town: document.getElementById('previewCompanyTown'),
        zip: document.getElementById('previewCompanyZip'),
        tva: document.getElementById('previewCompanyTVA'),
        mail: document.getElementById('previewCompanyMail'),
        iban: document.getElementById('previewCompanyIBAN'),
        bic: document.getElementById('previewCompanyBIC')
    },
    client: {
        company: document.getElementById('previewClientCompany'),
        street: document.getElementById('previewClientStreet'),
        town: document.getElementById('previewClientTown'),
        zip: document.getElementById('previewClientZip'),
        tva: document.getElementById('previewClientTVA')
    },
    invoice: {
        number: document.getElementById('previewInvoiceNumber'),
        date: document.getElementById('previewInvoiceDate')
    },
    total: {
        ht: document.getElementById('totalHT'),
        tva: document.getElementById('TVA'),
        ttc: document.getElementById('totalTTC'),
        vatRateDisplay: document.getElementById('vatRateDisplay')
    }
};

const addArticleBtn = document.getElementById('addArticleBtn');
const articleTableBody = document.getElementById('articleTableBody');
const articleList = document.getElementById('articleList');
const downloadBtn = document.getElementById('downloadBtn');

// Fonction pour formater la date
function formatDate(dateInput) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateInput.value).toLocaleDateString('fr-FR', options);
}

// Ajouter un écouteur d'événement pour formater la date lors du changement
invoiceFields.date.addEventListener('change', () => {
    previewFields.invoice.date.textContent = formatDate(invoiceFields.date);
});

addArticleBtn.addEventListener('click', () => {
    const description = articleFields.description.value;
    const quantity = parseFloat(articleFields.quantity.value) || 0;
    const unitPrice = parseFloat(articleFields.unitPrice.value) || 0;
    const total = (quantity * unitPrice).toFixed(2);

    if (description && quantity > 0 && unitPrice > 0) {
        // Créer une nouvelle ligne d'article à afficher dans la prévisualisation
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${description}</td>
            <td>${quantity}</td>
            <td>${unitPrice.toFixed(2)}</td>
            <td>${total}</td>
        `;

        // Ajouter la nouvelle ligne au tableau de prévisualisation
        articleTableBody.appendChild(newRow);

        // Créer une entrée d'article pour la section de saisie, avec un bouton de suppression
        const articleEntry = document.createElement('div');
        articleEntry.classList.add('article-entry');
        articleEntry.innerHTML = `
            <p>Description : ${description}</p>
            <p>Quantité : ${quantity}</p>
            <p>Prix unitaire : ${unitPrice.toFixed(2)}</p>
            <button class="deleteArticleBtn">Supprimer</button>
        `;

        // Ajouter un événement au bouton de suppression
        articleEntry.querySelector('.deleteArticleBtn').addEventListener('click', () => {
            // Supprimer l'article de la prévisualisation
            articleTableBody.removeChild(newRow);
            // Supprimer l'article de la liste d'articles encodés par l'utilisateur
            articleList.removeChild(articleEntry);
            // Mettre à jour les totaux
            updateTotals();
        });

        // Ajouter l'article à la liste d'articles encodés par l'utilisateur
        articleList.appendChild(articleEntry);

        // Réinitialiser les champs de saisie
        articleFields.description.value = '';
        articleFields.quantity.value = '';
        articleFields.unitPrice.value = '';

        // Mettre à jour les totaux
        updateTotals();
    } else {
        alert("Veuillez remplir correctement tous les champs de l'article.");
    }
});

// Mettre à jour les totaux pour l'ensemble des articles
function updateTotals() {
    let totalHT = 0;

    // Parcourir toutes les lignes du tableau et calculer le total HT
    document.querySelectorAll('#articleTableBody tr').forEach(row => {
        const totalCell = row.children[3];
        totalHT += parseFloat(totalCell.textContent) || 0;
    });

    // Récupérer le taux de TVA sélectionné
    const vatRate = parseFloat(invoiceFields.vatRate.value);

    // Mettre à jour l'affichage du taux de TVA
    previewFields.total.vatRateDisplay.textContent = vatRate.toString();

    // Calculer la TVA et le total TTC
    const tva = totalHT * (vatRate / 100);
    const totalTTC = totalHT + tva;

    // Mettre à jour l'affichage des totaux
    previewFields.total.ht.textContent = `${totalHT.toFixed(2)} €`;
    previewFields.total.tva.textContent = `${tva.toFixed(2)} €`;
    previewFields.total.ttc.textContent = `${totalTTC.toFixed(2)} €`;
}

// Ajouter des écouteurs d'événements pour mettre à jour les totaux en temps réel
Object.values(articleFields).forEach(field => field.addEventListener('input', updateTotals));
invoiceFields.vatRate.addEventListener('change', updateTotals);

// Ajouter des écouteurs d'événements pour mettre à jour l'aperçu en temps réel
Object.entries(companyFields).forEach(([key, field]) => {
    field.addEventListener('input', () => {
        previewFields.company[key].textContent = field.value;
    });
});

Object.entries(clientFields).forEach(([key, field]) => {
    field.addEventListener('input', () => {
        previewFields.client[key].textContent = field.value;
    });
});

invoiceFields.number.addEventListener('input', () => {
    previewFields.invoice.number.textContent = invoiceFields.number.value;
});

// Sauvegarder les informations de l'entreprise dans le local storage
function saveCompanyInfoToLocalStorage() {
    const companyInfo = {};
    Object.entries(companyFields).forEach(([key, field]) => {
        companyInfo[key] = field.value;
    });
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
}

Object.values(companyFields).forEach(field => field.addEventListener('input', saveCompanyInfoToLocalStorage));

// Charger les informations de l'entreprise depuis le local storage
function loadCompanyInfoFromLocalStorage() {
    const companyInfo = JSON.parse(localStorage.getItem('companyInfo'));
    if (companyInfo) {
        Object.entries(companyFields).forEach(([key, field]) => {
            field.value = companyInfo[key] || '';
            previewFields.company[key].textContent = companyInfo[key] || '';
        });
    }
}

// Charger les informations lors du chargement de la page
window.addEventListener('load', loadCompanyInfoFromLocalStorage);