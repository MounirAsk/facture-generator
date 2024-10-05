import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

window.generatePDF = function() {
    const doc = new jsPDF("p", "mm", "a4");

    // Sélectionner tous les boutons de suppression
    const deleteButtons = document.querySelectorAll('.deleteArticleBtn');

    // Masquer tous les boutons de suppression avant la capture
    deleteButtons.forEach(button => {
        button.style.visibility = 'hidden';
    });

    // Attendre que le DOM soit mis à jour avant de capturer
    setTimeout(() => {
        // Sélectionner la section d'aperçu
        const previewElement = document.querySelector('.preview-section');

        // Utiliser html2canvas pour capturer la section
        html2canvas(previewElement, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            // Calculer le ratio de l'image pour garder les proportions correctes
            const imgWidth = 190; // Largeur de l'image dans le PDF (en mm)
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let position = 10; // Position de départ

            // Ajouter l'image capturée au PDF
            doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);

            // Enregistrer le fichier PDF
            doc.save("facture.pdf");

            // Réafficher les boutons de suppression après la capture
            deleteButtons.forEach(button => {
                button.style.visibility = 'visible';
            });
        });
    }, 200); // Attendre 200ms pour s'assurer que le DOM est mis à jour
};


