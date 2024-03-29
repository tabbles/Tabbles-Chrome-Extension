// chrome.runtime.onInstalled.addListener(() => {
  // //chrome.storage.sync.set({ color });
  // // console.log('installed');
// });

chrome.action.onClicked.addListener(function (tab) {
	// console.log('clicked');
	runApp('0');
});

chrome.bookmarks.onCreated.addListener(function (id_, bookmark) {
	chrome.storage.local.get('isEnabled', function (result) {
		if (result && result.hasOwnProperty('isEnabled') && result.isEnabled) {
			runApp('1');
		}
	});
});

chrome.contextMenus.create({
	id: 'isEnabledToggle',
	type: "checkbox",
	title: 'Tag all new bookmarks with Tabbles',
	contexts: ["browser_action"],
	checked: false
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId == 'isEnabledToggle') {
		chrome.storage.local.set({ 'isEnabled': info.checked });
	}
});
chrome.storage.local.set({ 'isEnabled': true });

// C:\Users\Main\Desktop\Программирование\UpworkExtension\c\Chrome Extension 1.31
// C:\Users\Main\Desktop\Программирование\UpworkExtension\c\Chrome Extension 1.31.pem
function runApp(n  /* 1 means addlistener, 0 means clicked*/ ) {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		// console.log('d0');
		if (tabs && tabs[0]) {
			
			// console.log('d1');
			var tbblURL = 'tabbles:tag_url' + ';' + encodeURIComponent(tabs[0].title) + ';' + encodeURIComponent(tabs[0].url);
			
			console.log(tbblURL);
			// n exists
			if (n) {
				// console.log('d2');
				// chrome.browserAction.onClicked
				if (n == '0') {
					// console.log('d3');
					chrome.tabs.update(null, { url: tbblURL });
				}
				// chrome.bookmarks.onCreated.addListener
				if (n == '1') {
					// new tab
					// chrome.tabs.create({ url: 'chrome://newtab' });
					// console.log('tabs update');
					chrome.tabs.update(null, { url: tabs[0].url });
					chrome.tabs.update(null, { url: tbblURL });					
				}
			}
		}
	});
}
