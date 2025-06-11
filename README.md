# GS-Main-Page
# Personal Link Sharing Website

A customizable link sharing website similar to Linktree, built with HTML, CSS, and vanilla JavaScript. The project features a clean design with categorized links and a profile section.

## Features

- Profile section with name, number, and profile image
- Categorized links with customizable order
- Responsive design for all devices
- Gradient background with customizable colors
- Links open in new tabs
- Data-driven content management through JSON
- **Docker support for easy deployment**

## Project Structure

```
├── index.html
├── styles.css
├── script.js
├── data.json
├── favicon.png
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Setup

1. Clone the repository
2. Place all files in a web server directory or use Docker (see below)
3. Customize `data.json` with your own:
   - Profile information
   - Links
   - Categories
   - Background colors

## Running with Docker

You can run the project easily using Docker or Docker Compose.

### Using Docker only

```sh
docker build -t gs-main-page .
docker run -d -p 1414:80 gs-main-page
```

Then open [http://localhost:1414](http://localhost:1414) in your browser.

### Using Docker Compose

```sh
docker-compose up --build
```

This will build and start the service at [http://localhost:1414](http://localhost:1414).

## Customizing data.json

The `data.json` file contains all the content for the website:

```json
{
    "profile": {
        "name": "Your Name",
        "number": "Your Number",
        "image": "URL to your profile image"
    },
    "settings": {
        "backgroundColorLeft": "#FDB912",
        "backgroundColorRight": "#A90432",
        "categoryOrder": [
            "Personal",
            "Social Media",
            "Business",
            "AI"
        ]
    },
    "links": [
        {
            "category": "Category Name",
            "name": "Link Name",
            "url": "https://your-url.com"
        }
    ]
}
```

## Styling

The website uses a responsive design that adapts to different screen sizes. The main styling features include:

- Gradient background
- Semi-transparent container
- Hover effects on links
- Mobile-first responsive design
- Clean typography using system fonts

## Browser Support

The website works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Development

To modify the website:

1. Edit `data.json` to update content
2. Modify `styles.css` to change the appearance
3. Update `script.js` to add new functionality
4. Edit `index.html` to change the structure

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## Author

Emre AKAYOGLU

---