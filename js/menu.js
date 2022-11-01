let started = false;

var checkbox = document.getElementById('checkbox1');

checkbox.addEventListener('click', async () => {
  if (checkbox.checked) {

  } else {
    const tab = await getCurrentTab()
    if(!tab) return alert('Require an active tab')
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['js/worker.js']
    });
  }
})

async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  return tab
}