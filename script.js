
    
function fetchCandidatesData(callback) {
    fetch('jobs.json')
      .then(response => response.json())
      .then(data => callback(data));
  }
  
  
  function displayCandidates(candidates) {
    const table = document.getElementById('candidatesTable');
    table.innerHTML = `
      <tr>
        <th>Name</th>
        <th>Job Title</th>
        <th>Location</th>
        <th></th>
      </tr>
    `;
    if (candidates.length === 0) {
        const row = table.insertRow();
        const noDataCell = row.insertCell();
        noDataCell.colSpan = 4;
        noDataCell.style.textAlign = "center";
        noDataCell.innerText = "Data not found";
        return;
      }

  
    candidates.forEach(candidate => {
      const row = table.insertRow();
  
      
      const nameCell = row.insertCell();
      const highlightedName = highlightSearchTerm(candidate.name);
      nameCell.innerHTML = highlightedName;
  
      const jobTitleCell = row.insertCell();
      const highlightedJobTitle = highlightSearchTerm(candidate.jobTitle);
      jobTitleCell.innerHTML = highlightedJobTitle;
  
      const locationCell = row.insertCell();
      const highlightedLocation = highlightSearchTerm(candidate.location);
      locationCell.innerHTML = highlightedLocation;
  
      const downloadCell = row.insertCell();
      downloadCell.innerHTML = `<button class="download-button">Download Resume</button>`;
    });
  }
  
  
  function highlightSearchTerm(text) {
    const searchLocation = document.getElementById('searchLocation').value;
    const searchJobProfile = document.getElementById('searchJobProfile').value;
    const searchName = document.getElementById('searchName').value;
  
    const regex = new RegExp(`(${searchLocation}|${searchJobProfile}|${searchName})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
  
  
  function searchCandidates() {
    const searchLocation = document.getElementById('searchLocation').value;
    const searchJobProfile = document.getElementById('searchJobProfile').value;
    const searchName = document.getElementById('searchName').value;
  
    fetchCandidatesData(candidates => {
      const filteredCandidates = candidates.filter(candidate => {
        return (
          candidate.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
          candidate.jobTitle.toLowerCase().includes(searchJobProfile.toLowerCase()) &&
          candidate.name.toLowerCase().includes(searchName.toLowerCase())
        );
      });
  
      displayCandidates(filteredCandidates);
    });
  }
  
  
  function clearSearch() {
    document.getElementById('searchLocation').value = '';
    document.getElementById('searchJobProfile').value = '';
    document.getElementById('searchName').value = '';
  
    fetchCandidatesData(candidates => {
      displayCandidates(candidates);
    });
  }
  
  
  fetchCandidatesData(candidates => {
    displayCandidates(candidates);
  });
  