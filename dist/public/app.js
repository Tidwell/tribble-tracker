'use strict';

(function () {
	var numUsers = 0;

	Vue.component('tribble-user', {
		props: ['playerName'],
		template: '\n\t  \t<div class="tribble-user" v-bind:class="getUserClass()">\n\t  \t\t<h2>{{playerName}}</h2>\n\t  \t\t<div class="score">\n\t  \t\t\t<ul>\n\t  \t\t\t\t<li v-for="score in scoreReverse">{{score}}</li>\n\t  \t\t\t</ul>\n\t  \t\t</div>\n\t  \t\t<div class="btns">\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(1)">1</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(10)">10</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(100)">100</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(1000)">1000</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(10000)">10000</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(100000)">100000</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="addMany">+ X</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="subtractMany">- X</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="set">Set</button>\n\t\t  \t</div>\n\t  \t</div>\n\t  ',
		data: function data() {
			return {
				scoreTotal: 0,
				scoreList: []
			};
		},
		created: function created() {
			numUsers++;
			this.userId = numUsers;
		},
		mounted: function mounted() {
			var self = this;
			var myElement = document.getElementsByClassName('user' + this.userId)[0];

			var mc = new Hammer(myElement);

			// listen to events...
			mc.on("swipe", function (ev) {
				if (ev.target.nodeName === 'LI') {
					var arrayIndex = $(ev.target).index();
					self.remove(self.scoreList.length - 1 - arrayIndex);
				}
			});

			var data = localStorage.getItem('TRIBBLE_PLAYERS' + this.userId);
			if (data) {
				data = JSON.parse(data);
			}
			for (var prop in data) {
				this[prop] = data[prop];
			}
		},
		methods: {
			persist: function persist() {
				var data = JSON.stringify({
					scoreTotal: this.scoreTotal,
					scoreList: this.scoreList
				});
				localStorage.setItem('TRIBBLE_PLAYERS' + this.userId, data);
			},
			getUserClass: function getUserClass() {
				var obj = {};
				obj['user' + this.userId] = true;
				return obj;
			},
			add: function add(num) {
				this.scoreTotal = this.scoreTotal + num;
				this.scoreList.push(this.scoreTotal);
				this.persist();
			},
			subtract: function subtract(num) {
				this.scoreTotal = this.scoreTotal - num;
				this.scoreList.push(this.scoreTotal);
				this.persist();
			},
			addMany: function addMany() {
				var num = prompt('How many to add?');
				if (!isNaN(num) && num) {
					this.add(Number(num));
				}
			},
			subtractMany: function subtractMany() {
				var num = prompt('How many to subtract?');
				if (!isNaN(num) && num) {
					this.subtract(Number(num));
				}
			},
			set: function set() {
				var num = prompt('Set score to...');
				if (!isNaN(num) && num) {
					this.scoreTotal = Number(num);
					this.scoreList.push(Number(num));
				}
				this.persist();
			},
			remove: function remove(arrayIndex) {
				this.scoreList.splice(arrayIndex, 1);
				if (this.scoreList.length) {
					this.scoreTotal = Number(this.scoreList[this.scoreList.length - 1]);
				} else {
					this.scoreTotal = 0;
				}
				this.persist();
			}
		},
		computed: {
			scoreReverse: function scoreReverse() {
				return this.scoreList.slice().reverse();
			}
		}
	});

	var app = new Vue({
		el: '#app',
		data: {
			players: [],
			round: 1
		},
		created: function created() {
			var data = localStorage.getItem('TRIBBLE_APP');
			if (data) {
				data = JSON.parse(data);
			}
			for (var prop in data) {
				this[prop] = data[prop];
			}
		},
		methods: {
			persist: function persist() {
				var data = JSON.stringify({
					players: this.players,
					round: this.round
				});
				localStorage.setItem('TRIBBLE_APP', data);
			},
			addPlayer: function addPlayer() {
				var name = prompt('Player name?');
				if (name) {
					this.players.push(name);
				}
				this.persist();
			},
			addRound: function addRound() {
				this.round++;
				if (this.round > 5) {
					this.round = 1;
				}
				this.persist();
			},
			reset: function reset() {
				if (confirm('Are You Sure?')) {
					this.players = [];
					this.round = 1;

					var i = 0;
					while (i < 6) {
						localStorage.removeItem('TRIBBLE_PLAYERS' + i);
						i++;
					}
					this.persist();
				}
			}
		},
		computed: {
			roundRoman: function roundRoman() {
				switch (this.round) {
					case 1:
						return 'I';
					case 2:
						return 'II';
					case 3:
						return 'III';
					case 4:
						return 'IV';
					case 5:
						return 'V';
				}
			}
		}
	});
})();

if (!window.localStorage) {
	Object.defineProperty(window, "localStorage", new function () {
		var aKeys = [],
		    oStorage = {};
		Object.defineProperty(oStorage, "getItem", {
			value: function value(sKey) {
				return sKey ? this[sKey] : null;
			},
			writable: false,
			configurable: false,
			enumerable: false
		});
		Object.defineProperty(oStorage, "key", {
			value: function value(nKeyId) {
				return aKeys[nKeyId];
			},
			writable: false,
			configurable: false,
			enumerable: false
		});
		Object.defineProperty(oStorage, "setItem", {
			value: function value(sKey, sValue) {
				if (!sKey) {
					return;
				}
				document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
			},
			writable: false,
			configurable: false,
			enumerable: false
		});
		Object.defineProperty(oStorage, "length", {
			get: function get() {
				return aKeys.length;
			},
			configurable: false,
			enumerable: false
		});
		Object.defineProperty(oStorage, "removeItem", {
			value: function value(sKey) {
				if (!sKey) {
					return;
				}
				document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
			},
			writable: false,
			configurable: false,
			enumerable: false
		});
		this.get = function () {
			var iThisIndx;
			for (var sKey in oStorage) {
				iThisIndx = aKeys.indexOf(sKey);
				if (iThisIndx === -1) {
					oStorage.setItem(sKey, oStorage[sKey]);
				} else {
					aKeys.splice(iThisIndx, 1);
				}
				delete oStorage[sKey];
			}
			for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {
				oStorage.removeItem(aKeys[0]);
			}
			for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
				aCouple = aCouples[nIdx].split(/\s*=\s*/);
				if (aCouple.length > 1) {
					oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
					aKeys.push(iKey);
				}
			}
			return oStorage;
		};
		this.configurable = false;
		this.enumerable = true;
	}());
}