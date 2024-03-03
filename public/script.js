
// script.js
document.addEventListener('DOMContentLoaded', () => {
  const providers = ['aws', 'azurerm', 'google'];
  providers.forEach(provider => {
      fetchModules(provider);
  });
  setupCollapsibles();
  setupModalHandlers();
});

function searchModules() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  ['aws', 'azurerm', 'google'].forEach(provider => {
      fetchModules(provider, searchTerm);
  });
}

function fetchModules(provider, searchTerm = '') {
  fetch(`/api/modules/${provider}`)
      .then(response => response.json())
      .then(data => {
          let modules = data;
          if (searchTerm) {
              modules = modules.filter(module => module.name.toLowerCase().includes(searchTerm));
          }
          const moduleList = document.getElementById(`${provider}-modules`);
          moduleList.innerHTML = '';
          modules.forEach(module => {
              const moduleElement = createModuleElement(module);
              moduleList.appendChild(moduleElement);
          });
      })
      .catch(error => {
          console.error(`Error fetching ${provider} modules:`, error);
      });
}


function createModuleElement(module) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = module.source;
  a.textContent = module.name;
  a.target = "_blank";
  li.appendChild(a);
  return li;
}

function setupCollapsibles() {
  document.querySelectorAll('.collapsible').forEach(collapsible => {
      collapsible.addEventListener('click', () => {
          collapsible.classList.toggle('active');
          const content = collapsible.nextElementSibling;
          content.style.display = content.style.display === 'block' ? 'none' : 'block';
      });
  });
}

function setupModalHandlers() {
  setupModal("aboutModal", "aboutBtn");
  setupModal("docModal", "docBtn");
  setupModal("contactModal", "contactBtn");
}

function setupModal(modalId, triggerBtnId) {
  var modal = document.getElementById(modalId);
  var btn = document.getElementById(triggerBtnId);
  var span = modal.getElementsByClassName("close")[0];

  btn.onclick = function() {
      modal.style.display = "block";
  };

  span.onclick = function() {
      modal.style.display = "none";
  };

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  };
}
