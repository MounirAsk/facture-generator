# Invoice Generator

This is an open-source project for generating professional invoices in PDF format. Users can input company and client information, add invoice details, and generate a visually appealing invoice. The generated invoices include company details, client information, article lists, and automatic calculation of taxes (TVA).

# Features

- Company Information Saving : Users need to enter their company details only once. The next time the website is visited, the information is pre-filled using local storage.

- Dynamic Invoice Preview : The invoice preview updates in real-time as the user fills in information.

- Add/Remove Articles : Users can add multiple items to the invoice, and easily remove them if needed.

- PDF Generation : Generates a downloadable PDF version of the invoice using HTML2Canvas and jsPDF libraries.

- User-Friendly Design : The web app is easy to use and well-suited for small business owners.

  **!There are still a few features to implement. I'm working on this project when my free time allows!**

# Demo 
If you want to test or to use the website : [facture-generator](https://mounirask.github.io/facture-generator/)

![](https://github.com/MounirAsk/facture-generator/blob/main/Demo_GIF.gif)



# Getting Started

1) Prerequisites

To run this project locally, you'll need the following :

Node.js and npm (Node Package Manager) installed on your machine.

2) Installation

Clone the repository : 

```bash
git clone https://github.com/MounirAsk/facture-generator.git
```

Navigate to the project folder :
```bash
cd facture-generator
```

Install dependencies :
- Webpack
```bash
npm install --save-dev webpack webpack-cli
```
- Babel
```bash
npm install --save-dev @babel/core @babel/preset-env babel-loader
```
- html2canvas
```bash
npm install html2canvas
```
- jsPDF
```bash
npm install jspdf jspdf-autotable
```

Running the Project

After installing the dependencies, you can run the project by opening the index.html with live server for example.

# Buy Me a Coffee

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/mounirask)


# Contributions

Contributions are welcome!


# License

This project is licensed under the MIT License - see the LICENSE file for details.


