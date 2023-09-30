 // Onload
 fetch('https://valorant-api.com/v1/agents')
 .then(
     function (response) {
         if (response.status != 200) {
             console.log("Looks like there was a problem. Status Code: " + response.status);
             return;
         }

         response.json().then(function (data) {
             console.log(data);
            
            const agents = data.data;
            agents.forEach(agent => {
                document.getElementById('agents').innerHTML += 
                `
                    <img class="mx-auto mt-6 rounded-md shadow-md" src="${agent.displayIcon}">
                `;
            });
        })
     }
 );


 fetch('https://valorant-api.com/v1/playercards')
 .then(
     function (response) {
         if (response.status != 200) {
             console.log("Looks like there was a problem. Status Code: " + response.status);
             return;
         }

         response.json().then(function (data) {
             console.log(data);
            
            const cards = data.data;
            cards.slice(0, 30).forEach(card => {
                document.getElementById('cards').innerHTML += 
                `
                    <img class="mx-auto mt-6 rounded-md shadow-md" src="${card.largeArt}">
                `;
            });
        })
     }
 );

 