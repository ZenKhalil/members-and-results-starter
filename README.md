# Medlemmer og Resultater Application

## Overview
This application is designed to manage and display members and their results. It provides functionalities such as sorting and filtering to easily navigate through the data.

## Features
- **Sorting**: Users can sort data in both the Members and Results tables by clicking on the column headers.
- **Filtering**: Users can filter data based on specific criteria using dropdown selectors.
- **Dynamic Data Population**: The application dynamically populates data from JSON files into the tables.

## How to Use
1. **Sorting**: Click on the column headers to sort the data in ascending or descending order.
2. **Filtering**: Use the dropdown selectors to filter data in the tables.

## Code Structure

### Members
- `Member` class: Represents a member with properties such as name, date of birth, active status, and group (Junior or Senior).
- `toTableRow` method: Converts a `Member` object into a table row for display.

### Results
- `Result` class: Represents a result with properties such as date, discipline, result type, time, and associated member.
- `toTableRow` method: Converts a `Result` object into a table row for display.

### Filtering and Sorting
- `filterTable` function: Filters table data based on active filters.
- `sortTable` function: Sorts table data based on the selected column and sort order.

### Data Population
- `populateTable` function: Populates table data from the provided JSON files.
- `populateDisciplineAndTypeFilters` function: Dynamically populates the discipline and type filters based on the data.

## Setup and Initialization
- The `initApp` function initializes the application by fetching data, creating objects, and populating the tables.
- The `fetchData` function fetches data from the specified URL and returns it as a JSON object.

## Usage
Include the main script in your HTML file and ensure the data files are located in the correct path.

<script src="script.js" type="module"></script>

## Contributing
Feel free to contribute to this project by creating issues or pull requests.

## License
This project is open source and available under the MIT License.

### Instructions:
- Save this text into a file named `README.md` in the root of your GitHub repository.
- Adjust the content as needed to better fit your project's details and requirements.
- The `LICENSE` link at the bottom assumes you have a `LICENSE` file in your repo. Adjust the link as necessary based on your project's license.
