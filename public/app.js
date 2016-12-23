(function() {
	let numUsers = 0;

	Vue.component('tribble-user', {
	  props: ['playerName'],
	  template: `
	  	<div class="tribble-user" v-bind:class="getUserClass()">
	  		<h2>{{playerName}}</h2>
	  		<div class="score">
	  			<ul>
	  				<li v-for="score in scoreReverse">{{score}}</li>
	  			</ul>
	  		</div>
	  		<div class="btns">
		  		<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(1)">1</button>
		  		<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(10)">10</button>
		  		<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(100)">100</button>
		  		<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(1000)">1000</button>
		  		<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(10000)">10000</button>
		  		<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(100000)">100000</button>
		  		<button class="btn-floating btn-large waves-effect waves-light" v-on:click="addMany">+ X</button>
		  		<button class="btn-floating btn-large waves-effect waves-light" v-on:click="set">Set</button>
		  	</div>
	  	</div>
	  `,
	  data: function() {
	  	return {
	  		scoreTotal: 0,
	  		scoreList: []
	  	}
	  },
	  created: function() {
	  	numUsers++;
	  	this.userId = numUsers;
	  },
	  methods: {
	  	getUserClass: function() {
	  		var obj = {};
	  		obj['user'+this.userId] = true;
	  		return obj;
	  	},
	  	add: function(num) {
	  		this.scoreTotal = this.scoreTotal + num;
	  		this.scoreList.push(this.scoreTotal);
	  	},
	  	addMany: function() {
	  		var num = prompt('How many to add?');
	  		if (!isNaN(num) && num) { this.add(Number(num)); }
	  	},
	  	set: function() {
	  		var num = prompt('Set score to...');
	  		if (!isNaN(num) && num) {
	  			this.scoreTotal = Number(num);
	  			this.scoreList.push(Number(num));
	  		}
	  	}
	  },
	  computed: {
	  	scoreReverse: function() {
	  		return this.scoreList.reverse();
	  	}
	  }
	});

	var app = new Vue({
		el: '#app',
		data: {
			players: [],
			round: 1
		},
		methods: {
			addPlayer: function() {
				var name = prompt('Player name?');
				if (name) { this.players.push(name); }
			},
			addRound: function() {
				this.round++;
				if (this.round > 5) {
					this.round = 1;
				}
			},
			reset: function() {
				if (confirm('Are You Sure?')) {
					this.players = [];
					this.round = 1;
				}
			}
		},
		computed: {
			roundRoman: function() {
				switch(this.round) {
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
}());