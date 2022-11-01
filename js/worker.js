let recorder;

navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(stream => {
    if(stream.getAudioTracks().length == 0) return alert('You must share your tab with audio. Refresh the page.')
    recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })

    while (true) {
        if (tab.audible) {
            recorder.requestData();
        }
    }
});

addEventListener("dataavailable", (event) => {
    event.data;
})

chrome.runtime.onMessage.addListener(({ message }) => {
    if(message == 'stopStreaming') {
        stopAudioListener();
    }
})

function stopAudioListener() {
    recorder.stop();
}

async function getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
  
    return tab
}