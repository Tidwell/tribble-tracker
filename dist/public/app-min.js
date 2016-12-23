"use strict";!function(){var t=0;Vue.component("tribble-user",{props:["playerName"],template:'\n\t  \t<div class="tribble-user" v-bind:class="getUserClass()">\n\t  \t\t<h2>{{playerName}}</h2>\n\t  \t\t<div class="score">\n\t  \t\t\t<ul>\n\t  \t\t\t\t<li v-for="score in scoreReverse">{{score}}</li>\n\t  \t\t\t</ul>\n\t  \t\t</div>\n\t  \t\t<div class="btns">\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(1)">1</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(10)">10</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(100)">100</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(1000)">1000</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(10000)">10000</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="add(100000)">100000</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="addMany">+ X</button>\n\t\t  \t\t<button class="btn-floating btn-large waves-effect waves-light" v-on:click="set">Set</button>\n\t\t  \t</div>\n\t  \t</div>\n\t  ',data:function(){return{scoreTotal:0,scoreList:[]}},created:function(){t++,this.userId=t},methods:{getUserClass:function(){var t={};return t["user"+this.userId]=!0,t},add:function(t){this.scoreTotal=this.scoreTotal+t,this.scoreList.push(this.scoreTotal)},addMany:function(){var t=prompt("How many to add?");!isNaN(t)&&t&&this.add(Number(t))},set:function(){var t=prompt("Set score to...");!isNaN(t)&&t&&(this.scoreTotal=Number(t),this.scoreList.push(Number(t)))}},computed:{scoreReverse:function(){return this.scoreList.reverse()}}});new Vue({el:"#app",data:{players:[],round:1},methods:{addPlayer:function(){var t=prompt("Player name?");t&&this.players.push(t)},addRound:function(){this.round++,this.round>5&&(this.round=1)},reset:function(){confirm("Are You Sure?")&&(this.players=[],this.round=1)}},computed:{roundRoman:function(){switch(this.round){case 1:return"I";case 2:return"II";case 3:return"III";case 4:return"IV";case 5:return"V"}}}})}();