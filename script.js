import { initTabs } from "./tabs.js";
import Member from './member.js';
import Result from './results.js';

window.addEventListener("load", initApp);

const activeFilters = {
    members: {},
    results: {}
};

async function initApp() {
    try {
        const membersData = await fetchData('./data/members.json');
        const resultsData = await fetchData('./data/results.json');

        const members = membersData.map(data => new Member(data));
        const results = resultsData.map(data => new Result(data, members));
        
        populateTable('members', members);
        populateTable('results', results);

        initTabs();

        populateDisciplineAndTypeFilters(resultsData); // Call the new function here
    } catch (error) {
        console.error('Error initializing the application:', error);
    }
}

function populateDisciplineAndTypeFilters(data) {
    const disciplineSet = new Set();
    const typeSet = new Set();

    // Mapping English to Danish for the select dropdown
    const typeMapping = {
        'competition': 'stævne',
        'training': 'træning'
    };

    data.forEach(item => {
        disciplineSet.add(item.discipline);
        typeSet.add(typeMapping[item.resultType] || item.resultType); 
    });

    const disciplineSelect = document.querySelector('#results select[data-filter="discipline"]');
    const typeSelect = document.querySelector('#results select[data-filter="type"]');

    disciplineSet.forEach(discipline => {
        const option = document.createElement('option');
        option.value = discipline;
        option.textContent = discipline; 
        disciplineSelect.appendChild(option);
    });

    typeSet.forEach(type => {
        const option = document.createElement('option');
        option.value = type; 
        option.textContent = type; 
        typeSelect.appendChild(option);
    });
}


async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    return await response.json();
}

function populateTable(tableId, data) {
    const table = document.getElementById(tableId);
    if (!table) {
        console.error(`Table with ID '${tableId}' not found.`);
        return;
    }

    const tbody = table.querySelector('tbody');
    if (!tbody) {
        console.error(`Tbody not found in table with ID '${tableId}'.`);
        return;
    }

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = item.toTableRow();
        tbody.appendChild(row);
    });
}


function filterTable(tableId, column, value) {
    // Update active filters
    if (value === 'all') {
        delete activeFilters[tableId][column];
    } else {
        activeFilters[tableId][column] = value;
    }

    // Get table and rows
    const table = document.getElementById(tableId);
    if (!table) return;
    const rows = table.querySelectorAll('tbody tr');

    // Apply all active filters
    rows.forEach(row => {
        let shouldBeVisible = true;
        for (const [filterColumn, filterValue] of Object.entries(activeFilters[tableId])) {
            const cell = row.querySelector(`td[data-${filterColumn}]`);
            if (!cell) continue;

            const cellValue = cell.getAttribute(`data-${filterColumn}`).toLowerCase();
            if (cellValue !== filterValue.toLowerCase()) {
                shouldBeVisible = false;
                break;
            }
        }
        row.style.display = shouldBeVisible ? '' : 'none';
    });
}


// Object to keep track of the sort order for each column of each table
const sortOrders = {};

function sortTable(tableId, column) {
    console.log(`Sorting table '${tableId}' by column '${column}'`); // Log which table and column are being sorted

    const table = document.getElementById(tableId);
    if (!table) {
        console.error(`Table with ID '${tableId}' not found.`);
        return;
    }

    // Initialize sort order for the column if not already set
    if (!sortOrders[tableId]) {
        sortOrders[tableId] = {};
    }
    if (!sortOrders[tableId][column]) {
        sortOrders[tableId][column] = 'asc';
    }

    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const sortedRows = rows.sort((a, b) => {
        const aValue = a.querySelector(`td[data-${column}]`).getAttribute(`data-${column}`);
        const bValue = b.querySelector(`td[data-${column}]`).getAttribute(`data-${column}`);

        console.log(`Comparing aValue: ${aValue}, bValue: ${bValue}`); // Log the values being compared

        let comparison = 0;
        if (column === 'age' || column === 'time') {
            // For numeric values
            console.log('Sorting as numbers'); // Log the type of sorting being used
            comparison = parseFloat(aValue) - parseFloat(bValue);
        } else if (column === 'birthdate' || column === 'date') {
            // For date values
            console.log('Sorting as dates'); // Log the type of sorting being used
            comparison = new Date(aValue) - new Date(bValue);
        } else {
            // For string values
            console.log('Sorting as strings'); // Log the type of sorting being used
            comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        }

        // Reverse the comparison if the sort order is descending
        if (sortOrders[tableId][column] === 'desc') {
            comparison = -comparison;
        }
        return comparison;
    });

    const tbody = table.querySelector('tbody');
    sortedRows.forEach(row => tbody.appendChild(row));

    // Toggle the sort order for the next click
    sortOrders[tableId][column] = sortOrders[tableId][column] === 'asc' ? 'desc' : 'asc';
}



window.filterTable = filterTable;
window.sortTable = sortTable;

export { populateTable };

