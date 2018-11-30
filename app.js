//Retrieve the API response through JSONP method
window.onload = function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://www.mocky.io/v2/5bdd28dd32000075008c6227?format=jsonp&callback=displayData";
    document.getElementsByTagName("head")[0].appendChild(script);
};

function displayData(response) {
    var results = response.data;
    var totalLikes = results.reduce(function(previousValue, currentValue) {
        return previousValue ? previousValue + currentValue.likes  :  currentValue.likes;
    }, 0);

    var app = new Vue({
        el: '#app',
        data: {
            search: '',
            totalLikes: totalLikes,
            apiHits: 0,
            selectedIndex: -1,
            sortCriteria: 'ratings',
            noResultMessage: 'Sorry, the entered search text does not match with any name in our list. Please try another search text',
            displayNoMatch: false,
            resultList: results
        },
        methods: {
            setSelected: function(index){
                this.selectedIndex = index;   
            },
            removeSelected: function(index){
                this.selectedIndex = -1;   
            },
            showOptions: function() {

            },
            hideOptions: function() {

            }
        },
        computed: {
            filteredResults() {
                var searchTerm = this.search;
                this.filteredList = this.resultList.filter(function(result) {
                  return result.place.toLowerCase().includes(searchTerm.trim().toLowerCase());
                });
                if (!this.filteredList.length) {
                    this.displayNoMatch = true;
                }
                this.filteredList.sort(function (a, b) {
                    return b.ratings - a.ratings;
                });
                return this.filteredList;
            }
        }
    });
}
